type StateCode = "AP" | "TN" | "TS" | "Other" | "all";

interface Client {
  name: string;
  logoSrc: string;
  type?: string;
  state: Exclude<StateCode, "all">;
}


const ULB_LOGOS = import.meta.glob("../../assets/ULB Logos/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const normalizeName = (value: string) =>
  value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\(\s*/g, " (")
    .replace(/\s*\)/g, ")")
    .trim();

const getStateAndType = (name: string): { state: Exclude<StateCode, "all">; type?: string } => {
  const lower = name.toLowerCase();

  if (lower.includes("telungana") || lower.includes("telangana")) {
    return { state: "TS", type: "State Government" };
  }

  if (lower === "govt of ap" || lower === "govt of andhra pradesh") {
    return { state: "AP", type: "State Government" };
  }

  const tamilNadu = new Set([
    "cuddlore",
    "cuddalore",
    "dindukal",
    "dindigul",
    "karaikudi",
    "tambaram",
    "tiruchirappalli",
    "perungudi(chennai corporation)",
    "perungudi (chennai corporation)",
  ]);

  if (tamilNadu.has(lower)) return { state: "TN" };

  const other = new Set(["gurugram", "guwahati", "puduchery", "puducherry"]);
  if (other.has(lower)) return { state: "Other" };

  return { state: "AP" };
};

const CLIENTS: Client[] = Object.entries(ULB_LOGOS)
  .map(([filePath, logoSrc]) => {
    const rawFile = filePath.split("/").pop() || filePath;
    const name = normalizeName(rawFile);
    const meta = getStateAndType(name);
    return {
      name,
      logoSrc,
      state: meta.state,
      type: meta.type ?? "ULB Client",
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));



const ClientMarqueeCard = ({ client }: { client: Client }) => (
  <div className="group relative min-w-[140px] md:min-w-[170px] h-14 md:h-36 bg-card rounded-lg flex items-center justify-center px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:z-10">
    <img
      src={client.logoSrc}
      alt={client.name}
      loading="lazy"
      className="h-28 w-auto max-w-full object-contain opacity-95 transition-opacity transition-transform duration-300 ease-out group-hover:opacity-100"
    />
  </div>
);

const MarqueeRow = ({
  clients,
  direction,
  durationSeconds,
}: {
  clients: Client[];
  direction: "left" | "right";
  durationSeconds?: number;
}) => (
  <div className="relative overflow-hidden rounded-xl bg-card/40">
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    <div
      className={[
        "flex w-max items-center gap-4 py-3 px-3 hover:[animation-play-state:paused]",
        direction === "left" ? "animate-partners-marquee" : "animate-partners-marquee-reverse",
      ].join(" ")}
      style={durationSeconds ? { animationDuration: `${durationSeconds}s` } : undefined}
    >
      {clients.map((client) => (
        <ClientMarqueeCard key={`${client.name}-a`} client={client} />
      ))}
      {clients.map((client) => (
        <ClientMarqueeCard key={`${client.name}-b`} client={client} />
      ))}
    </div>
  </div>
);

const ULBClientsMarquee = ({ clients }: { clients: Client[] }) => {
  return (
    <div className="mt-10">
      <MarqueeRow clients={clients} direction="left" />
    </div>
  );
};



export default function ULBClientsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-main relative">
        <div className="text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
           Our esteemed Clients
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
           Trusted by<span className="text-primary"> Urban Local Bodies</span>
          </h2>

          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg">
            Partnering with Urban Local Bodies across India to deliver transformative civic solutions.
          </p>
        </div>

        <ULBClientsMarquee clients={CLIENTS} />

       
      </div>
    </section>
  );
}
