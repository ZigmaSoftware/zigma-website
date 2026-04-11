import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/website/hero/Newsletter-bg.png";
// import sectionBg from "@/assets/background-1.png";

type Newsletter = {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  coverImageUrl?: string;
  year: number;
  month: number;
};

const newsletterFiles = import.meta.glob("../assets/Newsletters/*.pdf", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const newsletterCoverFiles = import.meta.glob(
  "../assets/Newsletters/news letter cover/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const toFileName = (filePath: string): string =>
  decodeURIComponent(filePath.split("/").pop() ?? "");

const withoutExtension = (name: string): string =>
  name.replace(/\.[^/.]+$/, "");

const toMatchKey = (name: string): string =>
  withoutExtension(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const inferYear = (fileName: string): number | null => {
  const fullYearMatch = fileName.match(/(?:19|20)\d{2}/);
  if (fullYearMatch) return Number(fullYearMatch[0]);
  return null;
};

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sep: 8,
  sept: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
};

const inferYearMonth = (fileName: string): { year: number; month: number } => {
  const monthMatch = fileName.match(
    /\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec)\b/i,
  );
  let year = inferYear(fileName);

  // Some filenames have a unix-prefix but no visible year in title text.
  // Use prefix year only as fallback, never as primary ordering signal.
  if (year === null) {
    const unixPrefix = fileName.match(/^(\d{10})_/);
    if (unixPrefix) {
      const timestamp = Number(unixPrefix[1]);
      if (Number.isFinite(timestamp)) {
        year = new Date(timestamp * 1000).getUTCFullYear();
      }
    }
  }

  const month = monthMatch ? MONTH_INDEX[monthMatch[1].toLowerCase()] : -1;
  return { year: year ?? 0, month };
};

const formatNewsletterTitle = (fileName: string): string =>
  fileName
    .replace(/\.pdf$/i, "")
    .replace(/^\d+_/, "")
    .replace(/\.{2,}/g, ".")
    .replace(/\s+/g, " ")
    .trim();

const coverByBaseName = Object.fromEntries(
  Object.entries(newsletterCoverFiles).map(([path, coverUrl]) => [
    toMatchKey(toFileName(path)),
    coverUrl,
  ]),
) as Record<string, string>;

const newsletters: Newsletter[] = Object.entries(newsletterFiles)
  .map(([path, fileUrl]) => {
    const fileName = toFileName(path);

    return {
      id: path,
      title: formatNewsletterTitle(fileName),
      fileName,
      fileUrl,
      ...inferYearMonth(fileName),
      coverImageUrl: coverByBaseName[toMatchKey(fileName)],
    };
  })
  .filter((newsletter) => newsletter.coverImageUrl)
  .sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    return a.title.localeCompare(b.title);
  });

const Newsletters = () => {
  const openNewsletter = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  // Group newsletters by year
  const groupedByYear = newsletters.reduce(
    (acc, newsletter) => {
      const year = newsletter.year || 0;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(newsletter);
      return acc;
    },
    {} as Record<number, Newsletter[]>
  );

  // Sort years in descending order
  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Get month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
              Newsroom
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
              Newsletters
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl text-center">
              Browse monthly newsletter editions covering updates, milestones, and
              field highlights from Zigma.
            </p>
          </div>
        </section>

        <section
          className="section-padding bg-top bg-repeat"
          // style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "520px auto" }}
        >
          <div className="container-main">
            {newsletters.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No newsletters available right now.
              </div>
            ) : (
              <div className="space-y-16">
                {sortedYears.map((year) => (
                  <div key={year}>
                    {/* Year Heading */}
                    <div className="mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {year}
                      </h2>
                    </div>

                    {/* Cards Grid - 5 per row */}
                    <div className="w-full">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 space-y-2">
                        {groupedByYear[year].map((newsletter) => (
                          <div key={newsletter.id} className="flex flex-col gap-3">
                            <article
                              role="button"
                              tabIndex={0}
                              onClick={() => openNewsletter(newsletter.fileUrl)}
                              onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  openNewsletter(newsletter.fileUrl);
                                }
                              }}
                              className="group w-full h-[320px] cursor-pointer overflow-hidden rounded-lg border-2 border-slate-300 shadow-md transition-all duration-300 hover:border-slate-400 hover:shadow-lg hover:-translate-y-2"
                            >
                              {newsletter.coverImageUrl ? (
                                <img
                                  src={newsletter.coverImageUrl}
                                  alt={newsletter.title}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500">
                                  <FileText size={36} aria-hidden="true" />
                                </div>
                              )}
                            </article>

                            {/* Month Label Below Card */}
                            <p className="text-lg font-medium text-muted-foreground">
                              {newsletter.month >= 0
                                ? monthNames[newsletter.month]
                                : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletters;

