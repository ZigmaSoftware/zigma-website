<?php
declare(strict_types=1);

error_reporting(0);
ini_set('display_errors', '0');

header('Cache-Control: public, max-age=900');
header('Content-Type: application/json; charset=utf-8');

$username       = 'zigma_2015';
$limit          = isset($_GET['limit']) ? max(1, min(100, (int) $_GET['limit'])) : 9;
$after          = isset($_GET['after']) ? (string) $_GET['after'] : '';
$graphUserId    = getenv('IG_USER_ID') ?: '';
$graphAccessToken = getenv('IG_ACCESS_TOKEN') ?: '';

// ── Image proxy ──────────────────────────────────────────────────────────────

function decode_image_token(string $value): string {
    $normalized = strtr($value, '-_', '+/');
    $padding = strlen($normalized) % 4;
    if ($padding > 0) {
        $normalized .= str_repeat('=', 4 - $padding);
    }
    $decoded = base64_decode($normalized, true);
    return is_string($decoded) ? $decoded : '';
}

function encode_image_token(string $value): string {
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function proxied_image_url(string $value): string {
    return '/api/instagram-feed.php?image=' . rawurlencode(encode_image_token($value));
}

function is_allowed_instagram_image_url(string $value): bool {
    $host = parse_url($value, PHP_URL_HOST);
    if (!is_string($host)) return false;
    return substr($host, -9) === 'fbcdn.net'
        || substr($host, -13) === 'instagram.com'
        || substr($host, -16) === 'cdninstagram.com';
}

if (isset($_GET['image'])) {
    $imageUrl = decode_image_token((string) $_GET['image']);

    if ($imageUrl === '' || !is_allowed_instagram_image_url($imageUrl)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid Instagram image URL.']);
        exit;
    }

    $ch = curl_init($imageUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; ZigmaWebsite/1.0)',
        CURLOPT_REFERER        => "https://www.instagram.com/{$username}/",
        CURLOPT_HTTPHEADER     => [
            'Accept: video/mp4,video/*,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        ],
    ]);

    $image       = curl_exec($ch);
    $status      = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: 'image/jpeg';
    curl_close($ch);

    if (!is_string($image) || $image === '' || $status >= 400) {
        http_response_code(502);
        echo json_encode(['error' => 'Unable to load Instagram image.']);
        exit;
    }

    header('Content-Type: ' . $contentType);
    echo $image;
    exit;
}

// ── Graph API ─────────────────────────────────────────────────────────────────

if ($graphUserId === '' || $graphAccessToken === '') {
    http_response_code(503);
    echo json_encode(['error' => 'Instagram API credentials are not configured.', 'posts' => []]);
    exit;
}

function shortcode_from_permalink(string $permalink): string {
    if (preg_match('/instagram\.com\/(?:p|reel|tv)\/([^\/?#]+)/', $permalink, $match)) {
        return $match[1];
    }
    return '';
}

function graph_date(string $timestamp): string {
    $time = strtotime($timestamp);
    return $time ? gmdate('M j, Y', $time) : '';
}

$fields = implode(',', [
    'id',
    'caption',
    'media_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'timestamp',
    'like_count',
    'comments_count',
]);

$graphUrl = 'https://graph.facebook.com/v23.0/' . $graphUserId . '/media'
    . '?fields=' . rawurlencode($fields)
    . '&limit=' . $limit
    . '&access_token=' . rawurlencode($graphAccessToken);

if ($after !== '') {
    $graphUrl .= '&after=' . rawurlencode($after);
}

$ch = curl_init($graphUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; ZigmaWebsite/1.0)',
]);

$response  = curl_exec($ch);
$status    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

$payload = is_string($response) ? json_decode($response, true) : null;

if (!is_array($payload) || $status >= 400) {
    http_response_code(502);
    echo json_encode([
        'error' => $payload['error']['message'] ?? ($curlError ?: 'Unable to load Instagram feed.'),
        'posts' => [],
    ]);
    exit;
}

$posts = [];
foreach (($payload['data'] ?? []) as $item) {
    if (!is_array($item)) continue;

    $image     = $item['thumbnail_url'] ?? ($item['media_url'] ?? '');
    $video     = in_array(($item['media_type'] ?? ''), ['VIDEO', 'REELS'], true) ? ($item['media_url'] ?? '') : '';
    $permalink = $item['permalink'] ?? '';

    if ($image === '' || $permalink === '' || !isset($item['id'])) continue;

    $timestamp = $item['timestamp'] ?? '';

    $posts[] = [
        'id'        => (string) $item['id'],
        'shortcode' => shortcode_from_permalink($permalink) ?: (string) $item['id'],
        'image'     => proxied_image_url($image),
        'caption'   => $item['caption'] ?? '',
        'likes'     => isset($item['like_count']) ? (int) $item['like_count'] : null,
        'comments'  => isset($item['comments_count']) ? (int) $item['comments_count'] : null,
        'timestamp' => $timestamp,
        'date'      => is_string($timestamp) ? graph_date($timestamp) : '',
        'isVideo'   => in_array(($item['media_type'] ?? ''), ['VIDEO', 'REELS'], true),
        'video'     => $video !== '' ? proxied_image_url($video) : null,
        'permalink' => $permalink,
    ];
}

$nextCursor = $payload['paging']['cursors']['after'] ?? null;

echo json_encode([
    'profile' => [
        'username' => $username,
        'name'     => 'Zigma Global Environ Solutions Pvt Ltd',
        'url'      => "https://www.instagram.com/{$username}/",
    ],
    'source'     => 'graph',
    'posts'      => $posts,
    'nextCursor' => $nextCursor,
    'hasMore'    => isset($payload['paging']['next']) && is_string($nextCursor),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
