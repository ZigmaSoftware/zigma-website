import { defineConfig, loadEnv } from "vite";
import type { Connect, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const INSTAGRAM_USERNAME = "zigma_2015";
const INSTAGRAM_LIMIT = 100;
let INSTAGRAM_GRAPH_USER_ID = process.env.IG_USER_ID || "";
let INSTAGRAM_GRAPH_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN || "";

interface InstagramGraphMedia {
  id?: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramGraphPayload {
  data?: InstagramGraphMedia[];
  paging?: {
    cursors?: {
      after?: string;
    };
    next?: string;
  };
  error?: {
    message?: string;
  };
}

const encodeInstagramImageUrl = (url: string): string =>
  Buffer.from(url, "utf8").toString("base64url");

const decodeInstagramImageUrl = (value: string): string =>
  Buffer.from(value, "base64url").toString("utf8");

const getProxiedInstagramImageUrl = (url: string): string =>
  `/api/instagram-feed.php?image=${encodeURIComponent(encodeInstagramImageUrl(url))}`;

const isAllowedInstagramImageUrl = (url: string): boolean => {
  try {
    const host = new URL(url).hostname;
    return (
      host.endsWith("fbcdn.net") ||
      host.endsWith("instagram.com") ||
      host.endsWith("cdninstagram.com")
    );
  } catch {
    return false;
  }
};

const decodeInstagramString = (value: string): string => {
  try {
    return JSON.parse(`"${value}"`);
  } catch {
    return value.replace(/\\\//g, "/").replace(/\\"/g, '"').replace(/\\n/g, "\n");
  }
};

const formatInstagramDate = (timestamp?: number): string => {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp * 1000));
};

const parseInstagramEmbed = (html: string, limit: number) => {
  const posts = [];
  const seen = new Set<string>();
  const contextMatch = html.match(/"contextJSON":"((?:\\.|[^"\\])*)"/);

  if (contextMatch?.[1]) {
    try {
      const contextJson = JSON.parse(`"${contextMatch[1]}"`);
      const payload = JSON.parse(contextJson);
      const mediaItems = Array.isArray(payload?.context?.graphql_media)
        ? payload.context.graphql_media
        : [];

      for (const item of mediaItems) {
        if (posts.length >= limit) break;

        const media = item?.shortcode_media;
        const shortcode = media?.shortcode;
        const image =
          media?.display_url ||
          media?.thumbnail_src ||
          media?.display_resources?.[0]?.src;
        const video = media?.video_url;

        if (!shortcode || seen.has(shortcode) || !image) continue;

        const caption =
          media?.edge_media_to_caption?.edges?.[0]?.node?.text ||
          media?.title ||
          "";
        const timestamp =
          typeof media?.taken_at_timestamp === "number"
            ? media.taken_at_timestamp
            : undefined;

        seen.add(shortcode);
        posts.push({
          id: media?.id || shortcode,
          shortcode,
          image: getProxiedInstagramImageUrl(image),
          caption,
          likes:
            typeof media?.edge_liked_by?.count === "number"
              ? media.edge_liked_by.count
              : null,
          comments:
            typeof media?.edge_media_to_comment?.count === "number"
              ? media.edge_media_to_comment.count
              : null,
          timestamp: timestamp || null,
          date: formatInstagramDate(timestamp),
          isVideo: Boolean(media?.is_video),
          video: video ? getProxiedInstagramImageUrl(video) : undefined,
          permalink: `https://www.instagram.com/p/${shortcode}/`,
        });
      }
    } catch {
      posts.length = 0;
      seen.clear();
    }
  }

  if (posts.length) return posts;

  const blocks = html.matchAll(/\\"shortcode_media\\":\\{(.*?)\\"pinned_for_users\\":\[\]/gs);

  for (const match of blocks) {
    if (posts.length >= limit) break;

    const block = match[1];
    const id = block.match(/\\"id\\":\\"([^\\"]+)\\"/)?.[1];
    const shortcode = block.match(/\\"shortcode\\":\\"([^\\"]+)\\"/)?.[1];
    const displayUrl = block.match(/\\"display_url\\":\\"((?:\\\\.|[^\\"])*)\\"/)?.[1];
    const thumbnailSrc = block.match(/\\"thumbnail_src\\":\\"((?:\\\\.|[^\\"])*)\\"/)?.[1];
    const comments = block.match(/\\"edge_media_to_comment\\":\\{\\"count\\":([0-9]+)/)?.[1];
    const likes = block.match(/\\"edge_liked_by\\":\\{\\"count\\":([0-9]+)/)?.[1];
    const timestamp = block.match(/\\"taken_at_timestamp\\":([0-9]+)/)?.[1];
    const isVideo = block.match(/\\"is_video\\":(true|false)/)?.[1] === "true";
    const videoUrl = block.match(/\\"video_url\\":\\"((?:\\\\.|[^\\"])*)\\"/)?.[1];
    const caption = block.match(
      /\\"edge_media_to_caption\\":\\{\\"edges\\":\[\\{\\"node\\":\\{\\"text\\":\\"((?:\\\\.|[^\\"])*)\\"/
    )?.[1];

    if (!shortcode || seen.has(shortcode)) continue;

    const image = displayUrl || thumbnailSrc;
    if (!image) continue;

    seen.add(shortcode);

    const unixTimestamp = timestamp ? Number(timestamp) : undefined;
    posts.push({
      id: id || shortcode,
      shortcode,
      image: getProxiedInstagramImageUrl(decodeInstagramString(image)),
      caption: caption ? decodeInstagramString(caption) : "",
      likes: likes ? Number(likes) : null,
      comments: comments ? Number(comments) : null,
      timestamp: unixTimestamp || null,
      date: formatInstagramDate(unixTimestamp),
      isVideo,
      video: videoUrl ? getProxiedInstagramImageUrl(decodeInstagramString(videoUrl)) : undefined,
      permalink: `https://www.instagram.com/p/${shortcode}/`,
    });
  }

  return posts;
};

const getShortcodeFromPermalink = (permalink?: string): string => {
  if (!permalink) return "";

  return permalink.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/)?.[1] || "";
};

const fetchInstagramGraphPosts = async (limit: number, after: string | null) => {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "like_count",
    "comments_count",
  ].join(",");
  const graphUrl = new URL(
    `https://graph.facebook.com/v23.0/${INSTAGRAM_GRAPH_USER_ID}/media`
  );

  graphUrl.searchParams.set("fields", fields);
  graphUrl.searchParams.set("limit", String(limit));
  graphUrl.searchParams.set("access_token", INSTAGRAM_GRAPH_ACCESS_TOKEN);
  if (after) graphUrl.searchParams.set("after", after);

  const response = await fetch(graphUrl);
  const payload = (await response.json()) as InstagramGraphPayload;

  if (!response.ok) {
    throw new Error(payload?.error?.message || `Instagram Graph API returned ${response.status}`);
  }

  const posts = Array.isArray(payload?.data)
    ? payload.data
        .map((item) => {
          const shortcode = getShortcodeFromPermalink(item.permalink);
          const image = item.thumbnail_url || item.media_url;
          const video =
            item.media_type === "VIDEO" || item.media_type === "REELS"
              ? item.media_url
              : undefined;

          if (!item.id || !image || !item.permalink) return null;

          return {
            id: item.id,
            shortcode: shortcode || item.id,
            image: getProxiedInstagramImageUrl(image),
            caption: item.caption || "",
            likes: typeof item.like_count === "number" ? item.like_count : null,
            comments:
              typeof item.comments_count === "number" ? item.comments_count : null,
            timestamp: item.timestamp || null,
            date: item.timestamp
              ? new Intl.DateTimeFormat("en", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(item.timestamp))
              : "",
            isVideo: item.media_type === "VIDEO" || item.media_type === "REELS",
            video: video ? getProxiedInstagramImageUrl(video) : undefined,
            permalink: item.permalink,
          };
        })
        .filter(Boolean)
    : [];

  const nextCursor = payload?.paging?.cursors?.after || null;
  const hasMore = Boolean(payload?.paging?.next && nextCursor);

  return { posts, nextCursor, hasMore };
};

const useInstagramFeedMiddleware = (middlewares: Connect.Server): void => {
  middlewares.use(async (req, res, next) => {
    if (!req.url?.startsWith("/api/instagram-feed.php")) {
      next();
      return;
    }

    try {
      const requestUrl = new URL(req.url, "http://localhost");
      const imageToken = requestUrl.searchParams.get("image");

      if (imageToken) {
        const imageUrl = decodeInstagramImageUrl(imageToken);

        if (!isAllowedInstagramImageUrl(imageUrl)) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: "Invalid Instagram image URL." }));
          return;
        }

        const imageResponse = await fetch(imageUrl, {
          headers: {
            Accept: "video/mp4,video/*,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            Referer: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
            "User-Agent": "Mozilla/5.0 (compatible; ZigmaWebsiteDev/1.0)",
          },
        });

        if (!imageResponse.ok || !imageResponse.body) {
          throw new Error(`Instagram image returned ${imageResponse.status}`);
        }

        const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
        const body = Buffer.from(await imageResponse.arrayBuffer());

        res.statusCode = 200;
        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=900");
        res.end(body);
        return;
      }

      const limit = Math.max(
        1,
        Math.min(100, Number(requestUrl.searchParams.get("limit")) || INSTAGRAM_LIMIT)
      );
      const after = requestUrl.searchParams.get("after");

      if (INSTAGRAM_GRAPH_USER_ID && INSTAGRAM_GRAPH_ACCESS_TOKEN) {
        const graphFeed = await fetchInstagramGraphPosts(limit, after);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(
          JSON.stringify({
            profile: {
              username: INSTAGRAM_USERNAME,
              name: "Zigma Global Environ Solutions Pvt Ltd",
              url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
            },
            source: "graph",
            ...graphFeed,
          })
        );
        return;
      }

      const response = await fetch(`https://www.instagram.com/${INSTAGRAM_USERNAME}/embed`, {
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent": "Mozilla/5.0 (compatible; ZigmaWebsiteDev/1.0)",
        },
      });

      if (!response.ok) {
        throw new Error(`Instagram returned ${response.status}`);
      }

      const html = await response.text();
      const posts = parseInstagramEmbed(html, limit);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          profile: {
            username: INSTAGRAM_USERNAME,
            name: "Zigma Global Environ Solutions Pvt Ltd",
            url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
          },
          source: "embed",
          posts,
          nextCursor: null,
          hasMore: false,
        })
      );
    } catch (error) {
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          error:
            error instanceof Error
              ? error.message
              : "Unable to load Instagram feed in local server.",
          posts: [],
        })
      );
    }
  });
};

const instagramDevFeedPlugin = (): Plugin => ({
  name: "instagram-dev-feed",
  configureServer(server) {
    useInstagramFeedMiddleware(server.middlewares);
  },
  configurePreviewServer(server) {
    useInstagramFeedMiddleware(server.middlewares);
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  INSTAGRAM_GRAPH_USER_ID = env.IG_USER_ID || process.env.IG_USER_ID || "";
  INSTAGRAM_GRAPH_ACCESS_TOKEN = env.IG_ACCESS_TOKEN || process.env.IG_ACCESS_TOKEN || "";

  return {
    assetsInclude: ["**/*.JPG", "**/*.JPEG", "**/*.PNG", "**/*.WEBP", "**/*.AVIF"],

    server: {
      host: "0.0.0.0",
      port: 8080,
    },

    plugins: [react(), instagramDevFeedPlugin()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
