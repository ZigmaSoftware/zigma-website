import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  Play,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Reveal from "@/components/animation/Reveal";
import SectionHeader from "./SectionHeader";
import InstagramPostModal from "./InstagramPostModal";
import zigmaLogo from "@/assets/icons/zigma-logo-f.png";

interface InstagramPost {
  id: string;
  shortcode: string;
  image: string;
  video?: string | null;
  caption: string;
  likes: number | null;
  comments: number | null;
  date: string;
  isVideo: boolean;
  permalink: string;
}

interface InstagramFeedResponse {
  profile?: {
    username: string;
    name: string;
    url: string;
  };
  source?: "graph" | "embed";
  posts?: InstagramPost[];
  nextCursor?: string | null;
  hasMore?: boolean;
  error?: string;
}

type InstagramFeedState = "loading" | "ready" | "empty" | "error";

const DEFAULT_PROFILE_URL = "https://www.instagram.com/zigma_2015/";
const PAGE_SIZE = 9;

const formatSocialCount = (value: number | null): string => {
  if (typeof value !== "number") return "";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
};

const trimCaption = (caption: string): string => {
  const normalized = caption.replace(/\s+/g, " ").trim();
  if (normalized.length <= 150) return normalized;
  return `${normalized.slice(0, 147).trim()}...`;
};

function dedupePosts(existing: InstagramPost[], incoming: InstagramPost[]): InstagramPost[] {
  const seen = new Set(existing.map((post) => post.id));
  const fresh = incoming.filter((post) => post.image && !seen.has(post.id));
  return [...existing, ...fresh];
}

function useInstagramFeed(): {
  posts: InstagramPost[];
  state: InstagramFeedState;
  error: string;
  profileUrl: string;
  hasMore: boolean;
  loadingMore: boolean;
  loadMoreError: string;
  loadMore: () => void;
} {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [state, setState] = useState<InstagramFeedState>("loading");
  const [error, setError] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>(DEFAULT_PROFILE_URL);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loadMoreError, setLoadMoreError] = useState<string>("");
  const cursorRef = useRef<string | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadInstagramFeed = async (): Promise<void> => {
      setState("loading");
      setError("");
      isFetchingRef.current = true;

      try {
        const response = await fetch(`/api/instagram-feed.php?limit=${PAGE_SIZE}`, {
          signal: controller.signal,
        });
        const payload = (await response.json()) as InstagramFeedResponse;

        if (!response.ok) {
          throw new Error(payload.error || `Instagram feed returned ${response.status}`);
        }

        if (controller.signal.aborted) return;

        const fetchedPosts = Array.isArray(payload.posts)
          ? payload.posts.filter((post) => post.image)
          : [];
        setPosts(fetchedPosts);
        if (payload.profile?.url) setProfileUrl(payload.profile.url);
        cursorRef.current = payload.nextCursor ?? null;
        setHasMore(Boolean(payload.hasMore && payload.nextCursor));
        setState(fetchedPosts.length ? "ready" : "empty");
      } catch (err) {
        if (controller.signal.aborted) return;
        setPosts([]);
        setState("error");
        setError(err instanceof Error ? err.message : "Unable to load Instagram feed.");
      } finally {
        isFetchingRef.current = false;
      }
    };

    void loadInstagramFeed();

    return () => {
      controller.abort();
      isFetchingRef.current = false;
    };
  }, []);

  const loadMore = useCallback((): void => {
    if (isFetchingRef.current || !hasMore || !cursorRef.current) return;

    isFetchingRef.current = true;
    setLoadingMore(true);
    setLoadMoreError("");

    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      after: cursorRef.current,
    });

    fetch(`/api/instagram-feed.php?${params.toString()}`)
      .then(async (response) => {
        const payload = (await response.json()) as InstagramFeedResponse;

        if (!response.ok) {
          throw new Error(payload.error || `Instagram feed returned ${response.status}`);
        }

        const fetchedPosts = Array.isArray(payload.posts) ? payload.posts : [];
        setPosts((prev) => dedupePosts(prev, fetchedPosts));
        cursorRef.current = payload.nextCursor ?? null;
        setHasMore(Boolean(payload.hasMore && payload.nextCursor));
      })
      .catch((err) => {
        setLoadMoreError(
          err instanceof Error ? err.message : "Unable to load more posts."
        );
      })
      .finally(() => {
        isFetchingRef.current = false;
        setLoadingMore(false);
      });
  }, [hasMore]);

  return { posts, state, error, profileUrl, hasMore, loadingMore, loadMoreError, loadMore };
}

const InstagramFeedSection: FC = () => {
  const {
    posts,
    state,
    error,
    profileUrl,
    hasMore,
    loadingMore,
    loadMoreError,
    loadMore,
  } = useInstagramFeed();
  const hasPosts = posts.length > 0;
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <section className="section-padding">
      <div className="container-main text-center">
        <SectionHeader
          eyebrow="Social Proof"
          title={
            <>
              The Conversation <span className="text-primary">Around Us</span>
            </>
          }
          description="Real-time voices from Instagram, LinkedIn, Twitter & industry forums"
        />

        {state === "loading" ? (
          <Reveal className="mt-12 flex min-h-[180px] items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-xl border-2 border-border bg-white px-8 py-3.5 font-semibold text-muted-foreground">
              <Loader2 size={18} className="animate-spin text-primary" />
              <span>Loading Instagram posts</span>
            </div>
          </Reveal>
        ) : null}

        {state !== "loading" && hasPosts ? (
          <Reveal className="mx-auto mt-10 max-w-[1080px] text-left">
            <div className="mb-3 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-slate-200 bg-white p-1.5">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                    <img
                      src={zigmaLogo}
                      alt="Zigma"
                      className="h-8 w-full object-contain"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-foreground">
                    zigma_2015
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    Zigma Global Environ Solutions
                  </p>
                </div>
              </div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-none items-center gap-2 rounded-md bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#515bd4] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                <Instagram size={16} />
                Follow
              </a>
            </div>

            <div className="grid grid-cols-3 gap-px bg-slate-300">
              {posts.map((post, index) => {
                const caption = trimCaption(post.caption);

                return (
                  <Reveal
                    key={post.id || post.shortcode}
                    className="aspect-square min-w-0 overflow-hidden bg-white"
                    data-anim-delay={String((index % 6) * 0.04)}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      aria-label={caption || "Open Zigma Instagram post"}
                      className="group relative block h-full w-full overflow-hidden bg-white"
                    >
                      <img
                        src={post.image}
                        alt={caption || "Zigma Instagram post"}
                        className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      {post.isVideo ? (
                        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                          <Play size={13} fill="currentColor" />
                        </div>
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center gap-5 bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                        {post.likes !== null ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold drop-shadow-sm">
                            <Heart size={16} fill="currentColor" />
                            {formatSocialCount(post.likes)}
                          </span>
                        ) : null}
                        {post.comments !== null ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold drop-shadow-sm">
                            <MessageCircle size={16} fill="currentColor" />
                            {formatSocialCount(post.comments)}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <InstagramPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />

        {state !== "loading" && hasPosts && hasMore ? (
          <Reveal className="mt-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-white px-8 py-3 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? <Loader2 size={16} className="animate-spin" /> : null}
              {loadingMore ? "Loading more..." : "Load more posts"}
            </button>
            {loadMoreError ? (
              <span className="text-xs font-medium text-destructive">{loadMoreError}</span>
            ) : null}
          </Reveal>
        ) : null}

        {state !== "loading" && !hasPosts ? (
          <Reveal className="mx-auto mt-12 max-w-2xl rounded-3xl border border-emerald-100 bg-white px-5 py-5 text-left text-foreground shadow-sm">
            <div className="flex gap-3">
              <AlertCircle size={20} className="mt-0.5 flex-none text-primary" />
              <div>
                <strong className="block text-sm font-bold">
                  Instagram feed is not rendering from the local endpoint.
                </strong>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {state === "error"
                    ? error || "The feed API returned an error."
                    : "The feed API responded, but did not return any posts."}
                </p>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <Instagram size={16} />
                  Visit @zigma_2015
                </a>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
};

export default InstagramFeedSection;
