import { Leaf, Mountain, Trash2 } from "lucide-react";
import type { ProjectStat } from "@/data/projects";

const iconMap = {
  waste: Trash2,
  land: Mountain,
  co2: Leaf,
};

const formatValue = (value: number) => {
  const hasDecimal = value % 1 !== 0;
  return hasDecimal ? value.toFixed(1) : value.toLocaleString();
};

interface ProjectStatCardProps {
  stat: ProjectStat;
  compact?: boolean;
}

const ProjectStatCard = ({ stat, compact = false }: ProjectStatCardProps) => {
  const numericValue = typeof stat.value === "string" ? parseFloat(stat.value) : stat.value;
  const displayValue = formatValue(numericValue);
  const Icon = iconMap[stat.icon];

  return (
    <article className="rounded-lg border border-white/50 bg-white/92 p-2.5 shadow-sm backdrop-blur">
      <div
        className={`mb-1.5 inline-flex items-center justify-center rounded-md bg-primary/10 text-primary ${
          compact ? "h-7 w-7" : "h-9 w-9"
        }`}
      >
        <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </div>
      <p className={`font-bold uppercase tracking-[0.1em] text-slate-600 ${compact ? "text-[9px]" : "text-[11px]"}`}>
        {stat.label}
      </p>
      <div className={`mt-0.5 flex items-baseline ${compact ? "gap-1.5" : "gap-2"}`}>
        <span className={`font-bold text-slate-900 ${compact ? "text-base" : "text-2xl"}`}>{displayValue}</span>
        <span className={`font-bold uppercase tracking-[0.08em] text-slate-500 ${compact ? "text-[9px]" : "text-[11px]"}`}>
          {stat.unit}
        </span>
      </div>
      {!compact && stat.description && <p className="mt-2 text-xs leading-relaxed text-slate-600">{stat.description}</p>}
    </article>
  );
};

export default ProjectStatCard;
