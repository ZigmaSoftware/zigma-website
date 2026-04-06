import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/publications/Publications-hero.png";
import sectionBg from "@/assets/background-1.png";

type Publication = {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  year: number | null;
  fileName: string;
  fileUrl: string;
  coverImageUrl?: string;
};

const publicationMetaByFileName: Record<
  string,
  { title: string; summary: string; category: string; source: string }
> = {
  "0.23748400_1669874727_12---dte-734-december-1-15,-2022.pdf": {
    title: "DTE 734: December 1-15, 2022",
    summary:
      "Industry bulletin covering developments in waste management execution and sustainability interventions.",
    category: "Magazine",
    source: "DTE",
  },
  "Biomining and Bioremediation_Report 1.pdf": {
    title: "Biomining and Bioremediation Report",
    summary:
      "Technical publication focused on remediation methodologies, operating practices, and landfill transformation outcomes.",
    category: "Report",
    source: "Zigma Research",
  },
  "Business Connect.pdf": {
    title: "Business Connect",
    summary:
      "Editorial coverage highlighting industry partnerships and scalable environmental service delivery models.",
    category: "Magazine",
    source: "Business Connect",
  },
  "CSE.pdf": {
    title: "CSE Publication",
    summary:
      "Reference publication on sustainable waste management systems and implementation insights.",
    category: "Report",
    source: "CSE",
  },
  "GIZ-Waste-Dumpsite.pdf": {
    title: "GIZ Waste Dumpsite Report",
    summary:
      "Publication addressing dumpsite remediation priorities, field-level execution, and policy alignment.",
    category: "Report",
    source: "GIZ",
  },
  "GIZ_CaseStudy_Legacy_Waste_Remediation.pdf": {
    title: "GIZ Case Study: Legacy Waste Remediation",
    summary:
      "Case-study documentation of legacy waste remediation workflows and measurable recovery outcomes.",
    category: "Case Study",
    source: "GIZ",
  },
  "http___cdn.cseindia.org_attachments_0.50177400_1663214757_final-toolkit---legacy-waste-management-and-dumpsite-remediation-08092022-(2).pdf": {
    title: "Toolkit: Legacy Waste Management and Dumpsite Remediation",
    summary:
      "Practical toolkit for planning, execution, and monitoring of legacy waste remediation programs.",
    category: "Toolkit",
    source: "CSE",
  },
  "http___cdn.cseindia.org_attachments_0.54385300_1663215224_final-toolkit-for-cswap-inorganic.pdf": {
    title: "Toolkit for CSWAP Inorganic Waste",
    summary:
      "Operational toolkit for handling inorganic waste streams under city-scale waste action plans.",
    category: "Toolkit",
    source: "CSE",
  },
  "http___cdn.cseindia.org_attachments_0.64358900_1663214992_toolkit-for-cswap-organic.pdf": {
    title: "Toolkit for CSWAP Organic Waste",
    summary:
      "Implementation handbook for organic waste handling, processing, and treatment pathways.",
    category: "Toolkit",
    source: "CSE",
  },
  "IFC - Guidance Note on Business Models - 20-05-24.pdf": {
    title: "IFC Guidance Note on Business Models",
    summary:
      "Guidance note on financing and operating models for sustainable waste management projects.",
    category: "Guidance Note",
    source: "IFC",
  },
  "INK@WASH.pdf": {
    title: "INK@WASH",
    summary:
      "Knowledge publication focused on water, sanitation, and associated environmental best practices.",
    category: "Magazine",
    source: "INK@WASH",
  },
  "Methane_emission.pdf": {
    title: "Methane Emission Report",
    summary:
      "Analytical report on landfill methane emissions and mitigation considerations for project planning.",
    category: "Report",
    source: "Research Publication",
  },
  "NITI Ayog.pdf": {
    title: "NITI Aayog Publication",
    summary:
      "Policy-oriented publication supporting national priorities on circular economy and waste remediation.",
    category: "Report",
    source: "NITI Aayog",
  },
  "NIUA.pdf": {
    title: "NIUA Publication",
    summary:
      "Urban development reference publication addressing city-level waste management implementation.",
    category: "Report",
    source: "NIUA",
  },
  "SBM Advisory on Landfill Reclamation.pdf": {
    title: "SBM Advisory on Landfill Reclamation",
    summary:
      "Advisory framework for landfill reclamation projects under Swachh Bharat Mission-aligned programs.",
    category: "Advisory",
    source: "SBM",
  },
  "Solidwaste India.pdf": {
    title: "Solid Waste India",
    summary:
      "Industry feature publication on solid waste management strategy, operations, and innovation.",
    category: "Magazine",
    source: "Solid Waste India",
  },
  "The Week.pdf": {
    title: "The Week Feature",
    summary:
      "Media feature highlighting environmental impact and project execution across large-scale remediation sites.",
    category: "Magazine",
    source: "The Week",
  },
  "Waste to Wealth_2 Oct.pdf": {
    title: "Waste to Wealth",
    summary:
      "Publication showcasing value recovery pathways and circular outcomes from legacy waste processing.",
    category: "Report",
    source: "Waste to Wealth",
  },
};

const publicationFiles = import.meta.glob("../assets/publications/*.pdf", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const publicationCoverFiles = import.meta.glob(
  "../assets/publications/cover page/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const toFileName = (filePath: string): string =>
  decodeURIComponent(filePath.split("/").pop() ?? "");

const withoutExtension = (name: string): string =>
  name.replace(/\.[^/.]+$/, "");

const publicationCoverByBaseName = Object.fromEntries(
  Object.entries(publicationCoverFiles).map(([path, coverUrl]) => [
    withoutExtension(toFileName(path)),
    coverUrl,
  ]),
) as Record<string, string>;

const inferYear = (fileName: string): number | null => {
  const fullYearMatch = fileName.match(/(?:19|20)\d{2}/);
  if (fullYearMatch) return Number(fullYearMatch[0]);

  const shortDateMatch = fileName.match(/\b\d{2}-\d{2}-(\d{2})\b/);
  if (!shortDateMatch) return null;

  const yearSuffix = Number(shortDateMatch[1]);
  return Number.isNaN(yearSuffix) ? null : 2000 + yearSuffix;
};

const inferSortTimestamp = (fileName: string): number => {
  const normalized = fileName.toLowerCase();

  // Prefer numeric timestamp prefixes (e.g. 1752667989_...)
  const prefixMatch = normalized.match(/^(\d{10,13})_/);
  if (prefixMatch) {
    const raw = Number(prefixMatch[1]);
    return prefixMatch[1].length === 13 ? raw : raw * 1000;
  }

  // Fallback: infer month + year from filename text
  const monthMap: Record<string, number> = {
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
    sept: 8,
    sep: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11,
  };

  const monthPattern = new RegExp(`\\b(${Object.keys(monthMap).join("|")})\\b`, "i");
  const monthMatch = normalized.match(monthPattern);
  const yearMatch = normalized.match(/(?:19|20)\d{2}/);

  if (monthMatch && yearMatch) {
    const month = monthMap[monthMatch[1].toLowerCase()];
    const year = Number(yearMatch[0]);
    return Date.UTC(year, month, 1);
  }

  const yearOnly = inferYear(fileName);
  return yearOnly ? Date.UTC(yearOnly, 0, 1) : 0;
};

const buildFallbackTitle = (fileName: string): string =>
  fileName
    .replace(/\.pdf$/i, "")
    .replace(/^http___cdn\.cseindia\.org_attachments_[^_]+_[^_]+_/i, "")
    .replace(/^[0-9.]+_[0-9]+_/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const publications: Publication[] = Object.entries(publicationFiles)
  .map(([path, fileUrl]) => {
    const fileName = toFileName(path);
    const meta = publicationMetaByFileName[fileName];

    return {
      id: path,
      title: meta?.title ?? buildFallbackTitle(fileName),
      summary:
        meta?.summary ??
        "Reference publication related to waste management, remediation, and circular resource recovery.",
      category: meta?.category ?? "Publication",
      source: meta?.source ?? "Zigma",
      year: inferYear(fileName),
      fileName,
      fileUrl,
      coverImageUrl: publicationCoverByBaseName[withoutExtension(fileName)],
    };
  })
  .sort((a, b) => inferSortTimestamp(b.fileName) - inferSortTimestamp(a.fileName));

const Publications = () => {
  const filteredPublications = publications.filter(
    (publication) => publication.coverImageUrl,
  );

  const openPublication = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100vh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            aria-hidden="true"
            style={{ backgroundImage: `url(${heroBg})` }}            
          />
          {/* <div className="absolute inset-0 bg-black/50" aria-hidden="true" /> */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/35"
            aria-hidden="true"
          />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">
              Newsroom
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
              Publications
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl text-center">
              Explore reports, case studies, advisories, and technical publications
              related to landfill remediation, waste management, and circular economy
              outcomes.
            </p>
          </div>
        </section>

        <section
          className="section-padding bg-top bg-repeat"
          style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "520px auto" }}
        >
          <div className="container-main">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground font-medium">
                  Publication Library
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                  Resource <span className="text-primary">Collection</span>
                </h2>
              </div>
            </div>

            {filteredPublications.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No publications available right now.
              </div>
            ) : (
              <div className="grid justify-items-center  gap-y-10 md:grid-cols-2 xl:grid-cols-2">
                {filteredPublications.map((publication) => (
                  <article
                    key={publication.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openPublication(publication.fileUrl)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openPublication(publication.fileUrl);
                      }
                    }}
                    className="group flex h-[470px] w-full max-w-[340px] cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="h-[470px] w-full overflow-hidden">
                      {publication.coverImageUrl ? (
                        <img
                          src={publication.coverImageUrl}
                          alt={publication.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500">
                          <FileText size={36} aria-hidden="true" />
                        </div>
                      )}
                    </div>
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

export default Publications;
