export type NewsArticlePage = {
  page: number;
  url: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  pages: NewsArticlePage[];
  coverUrl: string;
  language: string;
  sourcePaths: string[];
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const pageWiseImages = import.meta.glob<string>(
  "../assets/News/**/*.{webp,jpg,jpeg,png,WEBP,JPG,JPEG,PNG}",
  { eager: true, import: "default" },
);

const bySlug = new Map<string, Omit<NewsArticle, "coverUrl"> & { coverUrl?: string }>();

function normalizeAssetUrl(assetUrl: string): string {
  return assetUrl.replace(/%(?![0-9a-fA-F]{2})/g, "%25");
}

for (const [path, url] of Object.entries(pageWiseImages)) {
  const fileName = path.split("/").pop() ?? "";
  const match = fileName.match(/^(.*)_page_?(\d+)\.[^.]+$/i);
  if (!match) continue;

  const title = match[1].trim();
  const page = Number.parseInt(match[2], 10);
  if (!Number.isFinite(page)) continue;

  const languageMatch = path.match(/\/News\/([^/]+)\//i);
  const language = languageMatch?.[1] ?? "Other";
  const slugBase = slugify(title) || slugify(fileName.replace(/\.[^.]+$/i, ""));
  const slug = `${slugify(language)}-${slugBase}`;
  const existing = bySlug.get(slug);
  const normalizedUrl = normalizeAssetUrl(url);

  if (!existing) {
    bySlug.set(slug, {
      slug,
      title,
      language,
      pages: [{ page, url: normalizedUrl }],
      coverUrl: page === 1 ? normalizedUrl : undefined,
      sourcePaths: [path],
    });
    continue;
  }

  existing.pages.push({ page, url: normalizedUrl });
  if (!existing.coverUrl && page === 1) existing.coverUrl = normalizedUrl;
  existing.sourcePaths.push(path);
}

export const newsEnglishArticles: NewsArticle[] = Array.from(bySlug.values())
  .map((article) => {
    const pages = [...article.pages].sort((a, b) => a.page - b.page);
    const coverUrl = article.coverUrl ?? pages[0]?.url ?? "";
    return {
      slug: article.slug,
      title: article.title,
      pages,
      coverUrl,
      language: article.language,
      sourcePaths: [...new Set(article.sourcePaths)],
    };
  })
  .sort((a, b) => a.language.localeCompare(b.language) || a.title.localeCompare(b.title));

export const newsPagedAssetPaths = new Set(
  newsEnglishArticles.flatMap((article) => article.sourcePaths),
);
