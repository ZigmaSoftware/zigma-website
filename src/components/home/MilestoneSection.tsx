import { cn } from "@/lib/utils";

export type MilestoneItem = {
  year: string;
  title: string;
  description: string;
};

type MilestoneSectionProps = {
  className?: string;
  heading?: string;
  title?: string;
  items?: MilestoneItem[];
};

const defaultMilestones: MilestoneItem[] = [
  {
    year: "2015",
    title: "Company Foundation",
    description:
      "Established with a focused mission to solve legacy waste management challenges through scalable engineering.",
  },
  {
    year: "2018",
    title: "Execution Scale-Up",
    description:
      "Expanded project delivery capacity with stronger process controls, safety practices, and municipal partnerships.",
  },
  {
    year: "2021",
    title: "Multi-City Delivery",
    description:
      "Successfully delivered remediation programs across multiple cities with consistent quality and turnaround time.",
  },
  {
    year: "2025",
    title: "Decade of Impact",
    description:
      "Completed ten years of operations with measurable land reclamation outcomes and sustained environmental impact.",
  },
];

const MilestoneSection = ({
  className,
  heading = "Company Timeline",
  title = "Milestones",
  items = defaultMilestones,
}: MilestoneSectionProps) => {
  return (
    <section className={cn("section-padding bg-slate-50", className)}>
      <div className="container-main">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{heading}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Key moments that define our growth, delivery capability, and long-term value creation.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="absolute bottom-0 left-[17px] top-0 w-px bg-slate-200" aria-hidden="true" />

          <ul className="space-y-5">
            {items.map((item) => (
              <li key={`${item.year}-${item.title}`} className="relative pl-12">
                <span
                  className="absolute left-3 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-green-700 shadow"
                  aria-hidden="true"
                />

                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MilestoneSection;
