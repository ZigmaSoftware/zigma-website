import { useEffect, type FC } from "react";
import { ExternalLink, Heart, MessageCircle, X } from "lucide-react";
import zigmaLogo from "@/assets/icons/zigma-logo-f.png";

interface InstagramPostModalPost {
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

interface InstagramPostModalProps {
  post: InstagramPostModalPost | null;
  onClose: () => void;
}

const formatSocialCount = (value: number | null): string => {
  if (typeof value !== "number") return "";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
};

export const InstagramPostModal: FC<InstagramPostModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    if (!post) return;

    const lenis = (window as Window & {
      __lenis?: {
        scroll?: number;
        stop?: () => void;
        start?: () => void;
        scrollTo: (
          target: number | string | HTMLElement,
          options?: { immediate?: boolean; offset?: number },
        ) => void;
      };
    }).__lenis;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollY = typeof lenis?.scroll === "number" ? lenis.scroll : window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;

    window.addEventListener("keydown", handleEscapeKey);
    lenis?.stop?.();
    if (!lenis) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      if (lenis) {
        lenis.start?.();
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.body.style.overflow = originalBodyOverflow;
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      }
    };
  }, [post, onClose]);

  if (!post) return null;

  const likes = formatSocialCount(post.likes);
  const comments = formatSocialCount(post.comments);

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" onClick={onClose} />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-30 text-white transition-opacity hover:opacity-70"
      >
        <X className="h-7 w-7" />
      </button>

      {/* Modal card */}
      <div
        className="relative z-20 mx-auto flex flex-row overflow-hidden bg-white"
        style={{ width: "min(90vw, 935px)", height: "min(90vh, 600px)" }}
      >
        {/* Image — 45% width, full height */}
        <div className="relative flex-none self-stretch bg-black" style={{ width: "45%" }}>
          {post.isVideo && post.video ? (
            <video
              src={post.video}
              poster={post.image}
              controls
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <img
              src={post.image}
              alt={post.caption || "Zigma Instagram post"}
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Right panel — 55% width, full height */}
        <div className="flex flex-col overflow-hidden border-l border-[#dbdbdb] self-stretch" style={{ width: "55%" }}>

          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 border-b border-[#dbdbdb] px-4 py-3">
            <div className="h-8 w-8 flex-none overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
              <img src={zigmaLogo} alt="zigma_2015" className="h-full w-full object-contain p-1" />
            </div>
            <span className="flex-1 text-sm font-semibold text-foreground">zigma_2015</span>
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              aria-label="Open on Instagram"
              className="text-muted-foreground hover:text-foreground"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Scrollable caption */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <p className="whitespace-pre-line text-left text-sm leading-relaxed text-foreground">
              {post.caption || "View this update on Instagram."}
            </p>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-[#dbdbdb] px-4 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {likes ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Heart size={18} className="text-rose-500" fill="currentColor" />
                  {likes}
                </span>
              ) : null}
              {comments ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MessageCircle size={18} />
                  {comments}
                </span>
              ) : null}
              {post.date ? (
                <span className="text-xs text-muted-foreground">{post.date}</span>
              ) : null}
            </div>
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0095f6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1877f2] transition-colors"
            >
              <ExternalLink size={13} />
              View post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPostModal;
