import { FC, type ReactNode } from "react";
import Reveal from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";

const SECTION_EYEBROW_CLASS =
  "text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground";
const SECTION_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-foreground leading-tight md:text-4xl";
const SECTION_SUBTITLE_CLASS =
  "mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  className,
}) => (
  <>
    <Reveal className={cn("inline-flex items-center gap-2", className)}>
      <span className={SECTION_EYEBROW_CLASS}>{eyebrow}</span>
    </Reveal>
    <Reveal className="mt-3">
      <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
    </Reveal>
    <Reveal
      className="mt-3"
      data-anim-duration="0.6"
      data-anim-ease="power1.out"
    >
      <p className={SECTION_SUBTITLE_CLASS}>{description}</p>
    </Reveal>
  </>
);

export default SectionHeader;
