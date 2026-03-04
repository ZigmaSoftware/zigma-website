import KumbakonamBefore from "@/assets/Before - After/1 kumbakonam b.jpg";
import KumbakonamAfter from "@/assets/Before - After/1 kumbakonam_A.jpg";
import SembakkamBefore from "@/assets/Before - After/2 sembakam_B.jpg";
import SembakkamAfter from "@/assets/Before - After/2 sembakam_A.jpg";
import Noida54Before from "@/assets/Before - After/3 noida_B.jpg";
import Noida54After from "@/assets/Before - After/3 noid_A.jpg";
import AtladaraBefore from "@/assets/Before - After/4 atladara_B.jpg";
import AtladaraAfter from "@/assets/Before - After/4 atladara_A.jpg";
import PoonamalleeBefore from "@/assets/Before - After/5 poonamallee_B.jpg";
import PoonamalleeAfter from "@/assets/Before - After/5 poonamallee_A.jpg";
import AjithsinghBefore from "@/assets/Before - After/6 vijawada_B.jpg";
import AjithsinghAfter from "@/assets/Before - After/6 vijawada_A.jpg";
import VairapalayamBefore from "@/assets/Before - After/7 vairapalayam_B.jpg";
import VairapalayamAfter from "@/assets/Before - After/7 vairapalayam_A.jpg";
import PammalBefore from "@/assets/Before - After/8 pammal_B.jpg";
import PammalAfter from "@/assets/Before - After/8 pammal_A.jpg";
import Noida145Before from "@/assets/Before - After/9 noida_B.jpg";
import Noida145After from "@/assets/Before - After/9 noida_A.jpg";
import TirupatiBefore from "@/assets/Before - After/10 tirupathi_B.jpg";
import TirupatiAfter from "@/assets/Before - After/10 tirupathi_A.jpg";
import ChidambaramBefore from "@/assets/Before - After/11 chidambaram_B.jpg";
import ChidambaramAfter from "@/assets/Before - After/11 chidambaram_a.jpg";
import PallavaramBefore from "@/assets/Before - After/12 pallavaram_B.jpg";
import PallavaramAfter from "@/assets/Before - After/12 pallavaram_A.jpg";
import KaraikudiBefore from "@/assets/Before - After/13 karaikudi_B.jpg";
import KaraikudiAfter from "@/assets/Before - After/13 karaikudi_A.jpg";
import KarurBefore from "@/assets/Before - After/14 karur_B.jpg";
import KarurAfter from "@/assets/Before - After/14 karur_A.jpg";
import TambaramBefore from "@/assets/Before - After/Tambaram_B.jpg";
import TambaramAfter from "@/assets/Before - After/Tambaram_A.jpg";

export type ProjectStatIcon = "waste" | "land" | "co2";

export interface ProjectStat {
  label: string;
  value: number;
  unit: string;
  icon: ProjectStatIcon;
  description?: string;
}

export interface ProjectEntry {
  id: string;
  index: string;
  name: string;
  state: string;
  type: string;
  beforeImage?: string;
  afterImage?: string;
  stats: ProjectStat[];
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: "kumbakonam",
    index: "01",
    name: "Kumbakonam",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: KumbakonamBefore,
    afterImage: KumbakonamAfter,
    stats: [
      { label: "Waste Processed", value: 231782, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 12, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 116280,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "sembakkam",
    index: "02",
    name: "Sembakkam",
    state: "Tamil Nadu",
    type: "Legacy Waste Processing",
    beforeImage: SembakkamBefore,
    afterImage: SembakkamAfter,
    stats: [
      { label: "Waste Processed", value: 38026, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 4, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 15823,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "noida-sector-54",
    index: "03",
    name: "Noida Sector 54",
    state: "Uttar Pradesh",
    type: "Community Development Projects",
    beforeImage: Noida54Before,
    afterImage: Noida54After,
    stats: [
      { label: "Waste Processed", value: 99665, unit: "Metric Tonnes", icon: "waste" },
      { label: "Land Reclaimed", value: 4, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 68698,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "poonamallee",
    index: "04",
    name: "Atladara",
    state: "Gujarat",
    type: "Dump Yard Reclamation",
    beforeImage: AtladaraBefore,
    afterImage: AtladaraAfter,
    stats: [
      { label: "Waste Processed", value: 421187, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 10.5, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 291462,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "poonamallee",
    index: "05",
    name: "Poonamallee",
    state: "Tamil Nadu",
    type: "Legacy Waste Remediation",
    beforeImage: PoonamalleeBefore,
    afterImage: PoonamalleeAfter,
    stats: [
      { label: "Waste Processed", value: 30930, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 3, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 14823,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "ajithsingh",
    index: "06",
    name: "Ajithsingh Nagar",
    state: "Andhra Pradesh",
    type: "Community Development Projects",
    beforeImage: AjithsinghBefore,
    afterImage: AjithsinghAfter,
    stats: [
      { label: "Waste Processed", value: 305897, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 45, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 211681,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "vairapalayam",
    index: "07",
    name: "Vairapalayam",
    state: "Tamil Nadu",
    type: "Legacy Waste Processing",
    beforeImage: VairapalayamBefore,
    afterImage: VairapalayamAfter,
    stats: [
      { label: "Waste Processed", value: 125092, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 7, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 91009,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "pammal",
    index: "08",
    name: "Pammal",
    state: "Tamil Nadu",
    type: "Legacy Waste Processing",
    beforeImage: PammalBefore,
    afterImage: PammalAfter,
    stats: [
      { label: "Waste Processed", value: 59175, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 2.4, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 34801,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "noida-sector-145a",
    index: "09",
    name: "Noida Sector 145 A",
    state: "Uttar Pradesh",
    type: "Dump Yard Reclamation",
    beforeImage: Noida145Before,
    afterImage: Noida145After,
    stats: [
      { label: "Waste Processed", value: 102837, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 6.2, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 71163,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "tirupati",
    index: "10",
    name: "Tirupati",
    state: "Andhra Pradesh",
    type: "Surface Stabilization",
    beforeImage: TirupatiBefore,
    afterImage: TirupatiAfter,
    stats: [
      { label: "Waste Processed", value: 150000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 10.5, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 50200,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "chidambaram",
    index: "11",
    name: "Chidambaram",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: ChidambaramBefore,
    afterImage: ChidambaramAfter,
    stats: [
      { label: "Waste Processed", value: 52000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 4, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 30634,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "pallavaram",
    index: "12",
    name: "Pallavaram",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: PallavaramBefore,
    afterImage: PallavaramAfter,
    stats: [
      { label: "Waste Processed", value: 108000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 5, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 49809,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "karaikudi",
    index: "13",
    name: "Karaikudi",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: KaraikudiBefore,
    afterImage: KaraikudiAfter,
    stats: [
      { label: "Waste Processed", value: 135635, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 13.75, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 81381,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "karur",
    index: "14",
    name: "Karur",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: KarurBefore,
    afterImage: KarurAfter,
    stats: [
      { label: "Waste Processed", value: 137394, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 15, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 90461,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
  {
    id: "tambaram-kannadapalayam",
    index: "15",
    name: "Tambaram- Kannadapalayam",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: TambaramBefore,
    afterImage: TambaramAfter,
    stats: [
      { label: "Waste Processed", value: 150494, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 5, unit: "Acres", icon: "land" },
      {
        label: "CO2 Mitigated",
        value: 118362,
        unit: "MT",
        icon: "co2",
        description: "CO2 mitigated by processing the legacy waste",
      },
    ],
  },
];
