import { FC, useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
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

// Cache configuration
const CACHE_KEY = "instagram_feed_cache_v1";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

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
const PAGE_SIZE = 6; // Reduced from 9 for faster loading
const API_URL = import.meta.env.VITE_INSTAGRAM_API_URL;
const REQUEST_TIMEOUT = 15000; // 15 second timeout for API requests

// Cache utilities
const cacheManager = {
  get: (): { data: InstagramFeedResponse; timestamp: number } | null => {
    try {
      if (typeof window === "undefined") return null;
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const parsed = JSON.parse(cached);
      const isExpired = Date.now() - parsed.timestamp > CACHE_TTL;
      return isExpired ? null : parsed;
    } catch {
      return null;
    }
  },
  set: (data: InstagramFeedResponse): void => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
      // Silently fail if storage is full
    }
  },
  clear: (): void => {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(CACHE_KEY);
    } catch {
      // Silently fail
    }
  },
};

// Optimize image URLs for faster loading
const getOptimizedImageUrl = (url: string, width: number = 400): string => {
  if (!url) return "";
  // If using Instagram CDN, add query params for optimization
  if (url.includes("instagram.com")) {
    return `${url}?w=${width}&q=75`;
  }
  return url;
};

// Optimize video URLs for faster playback
const getOptimizedVideoUrl = (url: string): string => {
  if (!url) return "";
  // Add video optimization parameters
  if (url.includes("instagram.com")) {
    // Instagram video CDN optimization
    return `${url}?format=mp4`;
  }
  return url;
};

async function fetchInstagramJson(
  url: string,
  signal?: AbortSignal
): Promise<InstagramFeedResponse> {
  // Create timeout controller
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort();
  }, REQUEST_TIMEOUT);

  try {
    // Race between request and timeout
    const response = await fetch(url, { 
      signal: signal || timeoutController.signal 
    });
    clearTimeout(timeoutId);

    const text = await response.text();

    let json: InstagramFeedResponse;
    try {
      json = JSON.parse(text);
    } catch (error) {
      console.error("Instagram API did not return valid JSON:", text);
      throw error;
    }

    if (!response.ok || json.error) {
      throw new Error(json.error || `Instagram feed returned ${response.status}`);
    }

    return json;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - API took too long to respond");
    }
    throw error;
  }
}

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
  // Create a Set of existing IDs for O(1) lookup
  const existingIds = new Set(existing.map((post) => post.id));
  
  // Filter incoming posts to only include new ones with images
  const newPosts = incoming.filter((post) => post.image && !existingIds.has(post.id));
  
  // Combine and return - maintains chronological order
  return [...existing, ...newPosts];
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
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadMoreAbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Check cache first
    const cached = cacheManager.get();
    if (cached && cached.data.posts) {
      setPosts(cached.data.posts);
      if (cached.data.profile?.url) setProfileUrl(cached.data.profile.url);
      cursorRef.current = cached.data.nextCursor ?? null;
      setHasMore(Boolean(cached.data.hasMore && cached.data.nextCursor));
      setState(cached.data.posts.length ? "ready" : "empty");
      return;
    }

    abortControllerRef.current = new AbortController();
    const controller = abortControllerRef.current;

    const loadInstagramFeed = async (): Promise<void> => {
      setState("loading");
      setError("");
      isFetchingRef.current = true;

      if (!API_URL) {
        setPosts([]);
        setState("error");
        setError("Instagram API URL is not configured. Set VITE_INSTAGRAM_API_URL and restart the app.");
        isFetchingRef.current = false;
        return;
      }

      try {
        const payload = await fetchInstagramJson(
          `${API_URL}?limit=${PAGE_SIZE}`,
          controller.signal
        );

        if (controller.signal.aborted) return;

        const fetchedPosts = Array.isArray(payload.posts)
          ? payload.posts.filter((post) => post.image)
          : [];
        
        // Optimize image and video URLs
        const optimizedPosts = fetchedPosts.map((post) => ({
          ...post,
          image: getOptimizedImageUrl(post.image),
          video: post.video ? getOptimizedVideoUrl(post.video) : null,
        }));
        
        setPosts(optimizedPosts);
        if (payload.profile?.url) setProfileUrl(payload.profile.url);
        cursorRef.current = payload.nextCursor ?? null;
        setHasMore(Boolean(payload.hasMore && payload.nextCursor));
        setState(optimizedPosts.length ? "ready" : "empty");
        
        // Cache the results
        cacheManager.set({ ...payload, posts: optimizedPosts });
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
      loadMoreAbortControllerRef.current?.abort();
      isFetchingRef.current = false;
    };
  }, []);

  const loadMore = useCallback((): void => {
    if (!API_URL) {
      setLoadMoreError("Instagram API URL is not configured.");
      return;
    }
    
    // Prevent multiple concurrent requests
    if (isFetchingRef.current || !hasMore || !cursorRef.current) {
      return;
    }

    // Cancel any previous load more requests
    if (loadMoreAbortControllerRef.current) {
      loadMoreAbortControllerRef.current.abort();
    }

    isFetchingRef.current = true;
    setLoadingMore(true);
    setLoadMoreError("");
    
    // Create new abort controller for this request
    loadMoreAbortControllerRef.current = new AbortController();
    const currentController = loadMoreAbortControllerRef.current;

    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      after: cursorRef.current,
    });

    // Retry logic for failed requests
    const performFetch = (retries = 0): void => {
      fetchInstagramJson(`${API_URL}?${params.toString()}`, currentController.signal)
        .then((payload) => {
          // Check if request was aborted
          if (currentController.signal.aborted) return;
          
          const fetchedPosts = Array.isArray(payload.posts) ? payload.posts : [];
          
          // Optimize image and video URLs
          const optimizedPosts = fetchedPosts.map((post) => ({
            ...post,
            image: getOptimizedImageUrl(post.image),
            video: post.video ? getOptimizedVideoUrl(post.video) : null,
          }));
          
          // Only update if we got new posts
          if (optimizedPosts.length > 0) {
            setPosts((prev) => dedupePosts(prev, optimizedPosts));
          }
          
          cursorRef.current = payload.nextCursor ?? null;
          setHasMore(Boolean(payload.hasMore && payload.nextCursor));
        })
        .catch((err) => {
          if (currentController.signal.aborted) return;
          
          // Retry on timeout (max 2 retries)
          if (retries < 2 && err instanceof Error && err.message.includes("timeout")) {
            console.log(`Retrying load more (attempt ${retries + 1})...`);
            performFetch(retries + 1);
            return;
          }
          
          setLoadMoreError(
            err instanceof Error ? err.message : "Unable to load more posts."
          );
        })
        .finally(() => {
          if (currentController.signal.aborted) return;
          isFetchingRef.current = false;
          setLoadingMore(false);
          loadMoreAbortControllerRef.current = null;
        });
    };

    performFetch();
  }, [hasMore]);

  return { posts, state, error, profileUrl, hasMore, loadingMore, loadMoreError, loadMore };
}

// Memoized components for better performance
interface InstagramPostCardProps {
  post: InstagramPost;
  index: number;
  onSelect: (post: InstagramPost) => void;
}

const InstagramPostCard = memo(({ post, index, onSelect }: InstagramPostCardProps) => {
  const caption = trimCaption(post.caption);
  const videoUrl = post.video ? getOptimizedVideoUrl(post.video) : null;
  
  return (
    <Reveal
      key={post.id || post.shortcode}
      className="aspect-square min-w-0 overflow-hidden bg-white"
      data-anim-delay={String((index % 6) * 0.04)}
    >
      <button
        type="button"
        onClick={() => onSelect(post)}
        aria-label={caption || "Open Zigma Instagram post"}
        className="group relative block h-full w-full overflow-hidden bg-white"
      >
        {post.isVideo && videoUrl ? (
          <video
            src={videoUrl}
            poster={post.image}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            preload="auto"
            muted
            playsInline
            loop
          />
        ) : (
          <img
            src={post.image}
            alt={caption || "Zigma Instagram post"}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        )}
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
});

InstagramPostCard.displayName = "InstagramPostCard";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  error: string;
}

const LoadMoreButton = memo(({ onLoadMore, isLoading, error }: LoadMoreButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lazy load the button with Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Just track visibility; we'll let the parent handle the load
      },
      { rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Reveal className="mt-10 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-white px-8 py-3 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
          {isLoading ? "Loading more..." : "Load more posts"}
        </button>
        {error ? (
          <span className="text-xs font-medium text-destructive">{error}</span>
        ) : null}
      </Reveal>
    </div>
  );
});

LoadMoreButton.displayName = "LoadMoreButton";

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
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const hasPosts = useMemo(() => posts.length > 0, [posts.length]);

  // Memoize posts grid to prevent re-renders
  const postsGrid = useMemo(
    () =>
      posts.map((post, index) => (
        <InstagramPostCard
          key={post.id || post.shortcode}
          post={post}
          index={index}
          onSelect={setSelectedPost}
        />
      )),
    [posts]
  );

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
                      loading="lazy"
                      decoding="async"
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

            <div className="grid grid-cols-3 gap-px bg-slate-300">{postsGrid}</div>
          </Reveal>
        ) : null}

        <InstagramPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />

        {state !== "loading" && hasPosts && hasMore ? (
          <LoadMoreButton
            onLoadMore={loadMore}
            isLoading={loadingMore}
            error={loadMoreError}
          />
        ) : null}

        {state !== "loading" && !hasPosts ? (
          <Reveal className="mx-auto mt-12 max-w-2xl rounded-3xl border border-emerald-100 bg-white px-5 py-5 text-left text-foreground shadow-sm">
            <div className="flex gap-3">
              <AlertCircle size={20} className="mt-0.5 flex-none text-primary" />
              <div>
                <strong className="block text-sm font-bold">
                  Instagram feed is not rendering from the configured API endpoint.
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





