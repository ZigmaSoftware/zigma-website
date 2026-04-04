import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/website/news_bg.jpeg";
import sectionBg from "@/assets/background-1.png";

type Newsletter = {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  coverImageUrl?: string;
  year: number | null;
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

const inferYear = (fileName: string): number | null => {
  const fullYearMatch = fileName.match(/(?:19|20)\d{2}/);
  if (fullYearMatch) return Number(fullYearMatch[0]);
  return null;
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
    withoutExtension(toFileName(path)),
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
      year: inferYear(fileName),
      coverImageUrl: coverByBaseName[withoutExtension(fileName)],
    };
  })
  .filter((newsletter) => newsletter.coverImageUrl)
  .sort((a, b) => {
    if (a.year === b.year) return a.title.localeCompare(b.title);
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return b.year - a.year;
  });

const Newsletters = () => {
  const openNewsletter = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100vh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/35"
            aria-hidden="true"
          />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">
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
          style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "520px auto" }}
        >
          <div className="container-main">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground font-medium">
                Newsletter Library
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Monthly <span className="text-primary">Editions</span>
              </h2>
            </div>

            {newsletters.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No newsletters available right now.
              </div>
            ) : (
              <div className="grid justify-items-center gap-y-10 md:grid-cols-2 xl:grid-cols-2">
                {newsletters.map((newsletter) => (
                  <article
                    key={newsletter.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openNewsletter(newsletter.fileUrl)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openNewsletter(newsletter.fileUrl);
                      }
                    }}
                    className="group flex h-[470px] w-full max-w-[340px] cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="h-full w-full overflow-hidden">
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
                    </div>
                    {/* <div className="flex flex-1 items-center border-t border-slate-200 px-4 py-3">
                      <p className="line-clamp-2 text-base font-semibold leading-snug text-slate-800">
                        {newsletter.title}
                      </p>
                    </div> */}
                  </article>
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
