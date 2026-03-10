import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/website/hero/landfill-mining-hero.jpg";
import P1b from "@/assets/Before - After/1 kumbakonam b.jpg";
import P1a from "@/assets/Before - After/1 kumbakonam_A.jpg";
import P2b from "@/assets/Before - After/2 sembakam_B.jpg";
import P2a from "@/assets/Before - After/2 sembakam_A.jpg";
import P3b from "@/assets/Before - After/3 noida_B.jpg";
import P3a from "@/assets/Before - After/3 noid_A.jpg";
import P4b from "@/assets/Before - After/4 atladara_B.jpg";
import P4a from "@/assets/Before - After/4 atladara_A.jpg";
import P5b from "@/assets/Before - After/5 poonamallee_B.jpg";
import P5a from "@/assets/Before - After/5 poonamallee_A.jpg";
import P6b from "@/assets/Before - After/6 vijawada_B.jpg";
import P6a from "@/assets/Before - After/6 vijawada_A.jpg";
import P7b from "@/assets/Before - After/7 vairapalayam_B.jpg";
import P7a from "@/assets/Before - After/7 vairapalayam_A.jpg";
import P8b from "@/assets/Before - After/8 pammal_B.jpg";
import P8a from "@/assets/Before - After/8 pammal_A.jpg";
import P9b from "@/assets/Before - After/9 noida_B.jpg";
import P9a from "@/assets/Before - After/9 noida_A.jpg";
import P10b from "@/assets/Before - After/10 tirupathi_B.jpg";
import P10a from "@/assets/Before - After/10 tirupathi_A.jpg";
import P11b from "@/assets/Before - After/11 chidambaram_B.jpg";
import P11a from "@/assets/Before - After/11 chidambaram_a.jpg";
import P12b from "@/assets/Before - After/12 pallavaram_B.jpg";
import P12a from "@/assets/Before - After/12 pallavaram_A.jpg";
import P13b from "@/assets/Before - After/13 karaikudi_B.jpg";
import P13a from "@/assets/Before - After/13 karaikudi_A.jpg";
import P14b from "@/assets/Before - After/14 karur_B.jpg";
import P14a from "@/assets/Before - After/14 karur_A.jpg";
import P15b from "@/assets/Before - After/Tambaram_B.jpg";
import P15a from "@/assets/Before - After/Tambaram_A.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectStat {
  label: string;
  value: number;
  unit: string;
}

interface ProjectModalData {
  type: string;
  title: string;
  desc: string;
  projectInfo: string;
  focus: string;
  outcome: string;
  metrics: string[];
}

interface Project {
  id: string;
  name: string;
  location: string;
  projectType: string;
  beforeImg: string;
  afterImg: string;
  stats: ProjectStat[];
  modal: ProjectModalData;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RAW_PROJECTS: Project[] = [
  {
    id: "kumbakonam",
    name: "Kumbakonam",
    location: "Tamil Nadu",
    projectType: "Dump Yard Reclamation",
    beforeImg: P1b,
    afterImg: P1a,
    stats: [
      { label: "Waste Processed", value: 100000, unit: "m³" },
      { label: "Land Reclaimed", value: 6.5, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 34801, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Kumbakonam",
      desc: "Kumbakonam dumpsite reclamation project.",
      projectInfo: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.",
      focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280.",
      metrics: [
        "CO2 mitigated per square meter (MT): 2.39",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794",
        "Carbon sequestered by 1.43 lakh acres of US forests in one year",
        "GHG emissions avoided by 33 wind turbines running for a year",
      ],
    },
  },
  {
    id: "sembakkam",
    name: "Sembakkam",
    location: "Tamil Nadu",
    projectType: "Legacy Waste Processing",
    beforeImg: P2b,
    afterImg: P2a,
    stats: [
      { label: "Waste Processed", value: 45000, unit: "m³" },
      { label: "Land Reclaimed", value: 3.2, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 18500, unit: "MT" },
    ],
    modal: {
      type: "LEGACY WASTE PROCESSING",
      title: "Sembakkam",
      desc: "Sembakkam Lake restoration and waste processing.",
      projectInfo: "Quantity: 45,000 cubic meter. Total area reclaimed: 3.2 acres.",
      focus: "Bio-mining of legacy waste accumulated over decades.",
      outcome: "Restoration of lake ecosystem and recovered land.",
      metrics: [
        "Significant improvement in water quality",
        "Successfully removed 45,000 m³ of legacy waste",
        "Recovered 3.2 acres of sensitive lake-front land",
        "Eliminated source of pollution for Sembakkam Lake",
      ],
    },
  },
  {
    id: "noida-sector-54",
    name: "Noida Sector 54",
    location: "Uttar Pradesh",
    projectType: "Community Development Projects",
    beforeImg: P3b,
    afterImg: P3a,
    stats: [
      { label: "Waste Processed", value: 99665, unit: "MT" },
      { label: "Land Reclaimed", value: 4, unit: "Acres" },
      { label: "CO2 Mitigated", value: 68698, unit: "MT" },
    ],
    modal: {
      type: "COMMUNITY DEVELOPMENT PROJECTS",
      title: "Noida Sector 54",
      desc: "Noida Sector 54 dumpsite reclamation project.",
      projectInfo: "Quantity: 99,665 metric tonnes. Area reclaimed: 4 acres.",
      focus: "Project period: December 2018 - July 2019. Quantity of RDF disposed: 15,498 metric tonnes.",
      outcome: "CO2 mitigated by processing the legacy waste: 68,698 metric tonnes.",
      metrics: [
        "CO2 mitigated per square metre: 4.26 metric tonnes",
        "CO2 mitigated by using RDF as an alternate fuel resource: 2,604 metric tonnes",
        "Area of US forests where carbon was sequestered in one year: 85,351 acres",
        "GHG emissions avoided: Running 20 wind turbines for a year",
        "Carbon emissions from: 15,927 gasoline-powered passenger vehicles driven for one year",
      ],
    },
  },
  {
    id: "pammal",
    name: "Pammal",
    location: "Tamil Nadu",
    projectType: "Legacy Waste Processing",
    beforeImg: P8b,
    afterImg: P8a,
    stats: [
      { label: "Waste Processed", value: 55000, unit: "m³" },
      { label: "Land Reclaimed", value: 4.2, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 22000, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Pammal",
      desc: "Tambaram City Municipal Corporation - Pammal Dumpsite.",
      projectInfo: "Bio-mining of legacy waste at Pammal.",
      focus: "Complete removal of accumulated waste and site restoration.",
      outcome: "Restoration of natural drainage and land value.",
      metrics: [
        "Eco-friendly bio-mining process implemented",
        "Restored environmental balance in residential area",
        "Zero-waste approach used during processing",
        "Successfully reclaimed the entire project site",
      ],
    },
  },
  {
    id: "poonamallee",
    name: "Poonamallee",
    location: "Tamil Nadu",
    projectType: "Legacy Waste Remediation",
    beforeImg: P5b,
    afterImg: P5a,
    stats: [
      { label: "Waste Processed", value: 95000, unit: "m³" },
      { label: "Land Reclaimed", value: 6.0, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 28000, unit: "MT" },
    ],
    modal: {
      type: "LEGACY WASTE REMEDIATION",
      title: "Poonamallee",
      desc: "Poonamallee Municipality - Legacy Waste Remediation.",
      projectInfo: "Large scale remediation of historical waste.",
      focus: "Industrial scale bio-mining and RDF extraction.",
      outcome: "High volume CO2 mitigation and land recovery.",
      metrics: [
        "Processed 95,000 cubic meters of legacy waste",
        "Supplied high-quality RDF to cement factories",
        "Freed up valuable urban land in Poonamallee",
        "Mitigated groundwater contamination risks",
      ],
    },
  },
  {
    id: "atladara",
    name: "Atladara",
    location: "Gujarat",
    projectType: "Dump Yard Reclamation",
    beforeImg: P4b,
    afterImg: P4a,
    stats: [
      { label: "Waste Processed", value: 320000, unit: "m³" },
      { label: "Land Reclaimed", value: 22.5, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 34801, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Atladara",
      desc: "Vadodara Municipal Corporation (VMC) - Atladara Dumpsite.",
      projectInfo: "Quantity: 3,20,000 cubic meter. Area reclaimed: 22.5 acres.",
      focus: "Project period: 2019 - 2021. Legacy waste remediation using bioremediation.",
      outcome: "Total Land Reclaimed for urban development and green belt.",
      metrics: [
        "Processed 3.2 Lakh cubic meters of legacy waste",
        "Reclaimed valuable urban land in Vadodara",
        "Significant reduction in local environmental pollution",
        "Enhanced aesthetic and health standards for the area",
      ],
    },
  },
  {
    id: "ajithsingh",
    name: "Ajithsingh Nagar",
    location: "Andhra Pradesh",
    projectType: "Legacy Waste Processing",
    beforeImg: P6b,
    afterImg: P6a,
    stats: [
      { label: "Waste Processed", value: 180000, unit: "m³" },
      { label: "Land Reclaimed", value: 12.0, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 34801, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Ajithsingh Nagar",
      desc: "Vijayawada Municipal Corporation (VMC) - Ajit Singh Nagar Dumpsite.",
      projectInfo: "Quantity: 1,80,000 cubic meter. Total area under reclamation: 12 acres.",
      focus: "Legacy waste remediation and scientific closure of old dumpsite.",
      outcome: "Clean city initiative and land recovery for VMC.",
      metrics: [
        "Mitigated groundwater contamination risks",
        "Eliminated recurring landfill fires",
        "Recovered major land parcel for civic utility",
        "Improved air quality for surrounding residents",
      ],
    },
  },
  {
    id: "vairapalayam",
    name: "Vairapalayam",
    location: "Tamil Nadu",
    projectType: "Legacy Waste Processing",
    beforeImg: P7b,
    afterImg: P7a,
    stats: [
      { label: "Waste Processed", value: 110000, unit: "m³" },
      { label: "Land Reclaimed", value: 7.5, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 34801, unit: "MT" },
    ],
    modal: {
      type: "LEGACY WASTE PROCESSING",
      title: "Vairapalayam",
      desc: "Vairapalayam Dumpsite remediation project.",
      projectInfo: "Quantity: 1,10,000 cubic meter. Area reclaimed: 7.5 acres.",
      focus: "Bio-mining and remediation of municipal solid waste.",
      outcome: "Environmental restoration and land recovery.",
      metrics: [
        "Processed 1.1 Lakh cubic meters of waste",
        "Reclaimed 7.5 acres of valuable public land",
        "Reduced health hazards for local community",
        "Major step towards zero-dumping city",
      ],
    },
  },
  {
    id: "tirupati",
    name: "Tirupati",
    location: "Andhra Pradesh",
    projectType: "Legacy Waste Remediation",
    beforeImg: P10b,
    afterImg: P10a,
    stats: [
      { label: "Waste Processed", value: 150000, unit: "m³" },
      { label: "Land Reclaimed", value: 10.5, unit: "Acres" },
      { label: "CO₂ Mitigated", value: 34801, unit: "MT" },
    ],
    modal: {
      type: "LEGACY WASTE REMEDIATION",
      title: "Tirupati",
      desc: "Tirupati Municipal Corporation - Legacy Waste Remediation.",
      projectInfo: "Quantity: 1,50,000 cubic meter. Area reclaimed: 10.5 acres.",
      focus: "Scientific remediation of heritage city dumpsite.",
      outcome: "Modernized waste management and land recovery.",
      metrics: [
        "Processed 1.5 Lakh cubic meters of legacy waste",
        "Reclaimed 10.5 acres for city expansion/parks",
        "Strong focus on environmental compliance",
        "Showcase project for religious tourism cities",
      ],
    },
  },
  {
    id: "noida-sector-145a",
    name: "Noida Sector 145 A",
    location: "Uttar Pradesh",
    projectType: "Dump Yard Reclamation",
    beforeImg: P9b,
    afterImg: P9a,
    stats: [
      { label: "Waste Processed", value: 102837, unit: "m³" },
      { label: "Land Reclaimed", value: 6.2, unit: "Acres" },
      { label: "CO2 Mitigated", value: 71163, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Noida Sector 145 A",
      desc: "Noida Sector 145 A dumpsite reclamation project.",
      projectInfo: "Quantity: 1,02,837 cubic meter. Area reclaimed: 6.2 acres.",
      focus: "Project period: July 2019 - August 2020. Quantity of RDF disposed (MT): 10,259.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 71,163.",
      metrics: [
        "CO2 mitigated per square meter (MT): 2.8",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,724",
        "Carbon sequestered by 86,919 acres of US forests in one year",
        "GHG emissions avoided by 20 wind turbines running for a year",
        "Carbon emissions from 16,220 gasoline powered-passenger vehicles driven for one year",
      ],
    },
  },
  {
    id: "chidambaram",
    name: "Chidambaram",
    location: "Tamil Nadu",
    projectType: "Dump Yard Reclamation",
    beforeImg: P11b,
    afterImg: P11a,
    stats: [
      { label: "Waste Processed", value: 52000, unit: "m³" },
      { label: "Land Reclaimed", value: 4, unit: "Acres" },
      { label: "CO2 Mitigated", value: 30634, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Chidambaram",
      desc: "Chidambaram dumpsite reclamation project.",
      projectInfo: "Quantity: 52,000 cubic meter. Area reclaimed: 4 acres.",
      focus: "Project period : April 2019- March 2021. Quantity of RDF disposed (MT) : 4,804.",
      outcome: "CO2 mitigated by processing the legacy waste: 30,634.",
      metrics: [
        "CO2 mitigated per square meter (MT): 1.89",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 807",
        "Carbon sequestered by 37,494 acres of US forests in one year",
        "GHG emissions avoided by 9 wind turbines running for a year",
        "Carbon emissions from 6,997 gasoline powered-passenger vehicles driven for one year",
      ],
    },
  },
  {
    id: "pallavaram",
    name: "Pallavaram",
    location: "Tamil Nadu",
    projectType: "Dump Yard Reclamation",
    beforeImg: P12b,
    afterImg: P12a,
    stats: [
      { label: "Waste Processed", value: 108000, unit: "m³" },
      { label: "Land Reclaimed", value: 5, unit: "Acres" },
      { label: "CO2 Mitigated", value: 49809, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Pallavaram",
      desc: "Pallavaram dumpsite reclamation project.",
      projectInfo: "Quantity: 1,08,000 cubic meter. Area reclaimed: 5 acres.",
      focus: "Project period : Jan 2020 -Sept 2021. Quantity of RDF disposed (MT) : 13,271.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 49,809.",
      metrics: [
        "CO2 mitigated per square meter (MT): 2.46",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,230",
        "Carbon sequestered by 62,057 acres of US forests in one year",
        "GHG emissions avoided by 15 wind turbines running for a year",
        "Carbon emissions from 11,580 gasoline powered-passenger vehicles driven for one year",
      ],
    },
  },
  {
    id: "karaikudi",
    name: "Karaikudi",
    location: "Tamil Nadu",
    projectType: "Dump Yard Reclamation",
    beforeImg: P13b,
    afterImg: P13a,
    stats: [
      { label: "Waste Processed", value: 135635, unit: "m³" },
      { label: "Land Reclaimed", value: 13.75, unit: "Acres" },
      { label: "CO2 Mitigated", value: 81381, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Karaikudi",
      desc: "Karaikudi dumpsite reclamation project.",
      projectInfo: "Quantity: 1,35,635 cubic meter. Area reclaimed: 13.75 acres.",
      focus: "Project period : Feb 2020 - Sept 2021. Quantity of RDF disposed (MT) : 15,796.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 81,381.",
      metrics: [
        "CO2 mitigated per square meter (MT): 1.46",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,654",
        "Carbon sequestered by 1 lakh acres of US forests in one year",
        "GHG emissions avoided by 23 wind turbines running for a year",
        "Carbon emissions from 18,700 gasoline powered-passenger vehicles driven for one year",
      ],
    },
  },
  {
    id: "karur",
    name: "Karur",
    location: "Tamil Nadu",
    projectType: "Dump Yard Reclamation",
    beforeImg: P14b,
    afterImg: P14a,
    stats: [
      { label: "Waste Processed", value: 137394, unit: "m³" },
      { label: "Land Reclaimed", value: 15, unit: "Acres" },
      { label: "CO2 Mitigated", value: 90461, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Karur",
      desc: "Karur dumpsite reclamation project.",
      projectInfo: "Quantity: 1,37,394 cubic meter. Area reclaimed: 15 acres.",
      focus: "Project period : February 2020 - March 2021. Quantity of RDF disposed (MT) : 6,586.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 90,461.",
      metrics: [
        "CO2 mitigated per square meter (MT): 1.49",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,106",
        "Carbon sequestered by 1.09 lakh acres of US forests in one year",
        "GHG emissions avoided by 26 wind turbines running for a year",
        "Carbon emissions from 20,376 gasoline powered-passenger vehicles driven for one year",
      ],
    },
  },
  {
    id: "tambaram-kannadapalayam",
    name: "Tambaram- Kannadapalayam",
    location: "Tamil Nadu",
    projectType: "Dump Yard Reclamation",
    beforeImg: P15b,
    afterImg: P15a,
    stats: [
      { label: "Waste Processed", value: 150494, unit: "m³" },
      { label: "Land Reclaimed", value: 5, unit: "Acres" },
      { label: "CO2 Mitigated", value: 118362, unit: "MT" },
    ],
    modal: {
      type: "DUMPSITE RECLAMATION PROJECT",
      title: "Tambaram- Kannadapalayam",
      desc: "Tambaram- Kannadapalayam dumpsite reclamation project.",
      projectInfo: "Quantity : 1,50,494 cubic meter. Area reclaimed : 5 acres.",
      focus: "Project period : August 2019 - June 2022. Quantity of RDF disposed (MT) : 24,841.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 1,18,362.",
      metrics: [
        "CO2 mitigated per square meter (MT): 5.85",
        "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 4,173",
        "Carbon sequestered by 1.46 lakh acres of US forests in one year",
        "GHG emissions avoided by 34 wind turbines running for a year",
        "Carbon emissions from 27,268 gasoline powered-passenger vehicles driven for one year",
      ],
    },
  },
];
const PROJECT_MODAL_OVERRIDES: Record<string, ProjectModalData> = {
  kumbakonam: {
    type: "DUMPSITE RECLAMATION PROJECT",
    title: "Kumbakonam",
    desc: "Kumbakonam dumpsite reclamation project.",
    projectInfo: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.",
    focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.",
    outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280.",
    metrics: [
      "CO2 mitigated per square meter (MT): 2.39",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794",
      "Carbon sequestered by 1.43 lakh acres of US forests in one year",
      "GHG emissions avoided by 33 wind turbines running for a year",
      "Carbon emissions from 26,720 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  sembakkam: {
    type: "DUMPSITE RECLAMATION PROJECT",
    title: "Sembakkam Lake",
    desc: "Sembakkam Lake dumpsite reclamation project.",
    projectInfo: "Quantity: 38,026 cubic meter. Area reclaimed: 4 acres.",
    focus: "Project period: August 2017 - August 2018. Quantity of RDF disposed (MT): 7,316.",
    outcome: "CO2 mitigated by processing the legacy waste (MT): 15,823.",
    metrics: [
      "CO2 mitigated per square meter (MT): 0.98",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,229",
      "Carbon sequestered by 20,335 acres of US forests in one year",
      "GHO emissions avoided by 5 wind turbines running for a year",
      "Carbon emissions from 3,795 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  pammal: {
    type: "DUMPSITE RECLAMATION PROJECT",
    title: "Pammal",
    desc: "Pammal dumpsite reclamation project.",
    projectInfo: "Quantity: 59,175 cubic meter. Area reclaimed: 2.4 acres.",
    focus: "Project period: August 2018 - August 2020. Quantity of RDF disposed (MT): 6,682.",
    outcome: "CO2 mitigated by processing the legacy waste (MT): 34,801.",
    metrics: [
      "CO2 mitigated per square meter (MT): 3.58",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,123",
      "Carbon sequestered by 42,840 acres of US forests in one year",
      "GHG emissions avoided by 10 wind turbines running for a year",
      "Carbon emissions from 7,994 gasoline powered-passenger vehicles",
    ],
  },
  poonamallee: {
    type: "DUMPSITE RECLAMATION PROJECT",
    title: "Poonamallee",
    desc: "Poonamallee dumpsite reclamation project.",
    projectInfo: "Quantity: 30,930 cubic meter. Area reclaimed: 3 acres.",
    focus: "Project period: July 2018 - September 2019. Quantity of RDF disposed (MT): 6,034.",
    outcome: "CO2 mitigated by processing the legacy waste (MT): 14,823.",
    metrics: [
      "CO2 mitigated per square meter (MT): 1.22",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,014",
      "Carbon sequestered by 18,886 acres of US forests in one year",
      "GHG emissions avoided by 4 wind turbines running for a year",
      "Carbon emissions from 3,524 gasoline powered-passenger vehicles",
    ],
  },
  atladara: {
    type: "DUMPSITE RECLAMATION PROJECT",
    title: "Vadodara-Atladara",
    desc: "Under the vigilant monitoring of the Honourable National Green Tribunal, this remarkable project successfully removed the pollution source from the landfill situated on the banks of the Vishwamitri River, preserving the natural habitat of the critically endangered gharials - an IUCN-protected species. The reclaimed land was effectively utilised to establish waste management facilities, including a construction and demolition waste treatment facility, plastic waste treatment facility and waste-to-energy plant. The NGT's oversight ensured compliance with environmental regulations and promoted sustainable practices, further safeguarding the endangered gharials.",
    projectInfo: "Quantity: 4,21,187 cubic metres. Area reclaimed: 10.5 acres.",
    focus: "Project period: July 2018 - February 2021. Quantity of RDF disposed: 58,897 metric tonnes.",
    outcome: "CO2 mitigated by processing the legacy waste: 2,91,462 metric tonnes.",
    metrics: [
      "CO2 mitigated per square metre: 6.86 metric tonnes",
      "CO2 mitigated by using RDF as an alternate fuel resource: 9,895 metric tonnes",
      "Area of US forests where carbon was sequestered in one year: 3.59 lakh",
      "GHG emissions avoided: Running 84 wind turbines for a year",
      "Carbon emissions from: 67,061 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  ajithsingh: {
    type: "COMMUNITY DEVELOPMENT PROJECTS",
    title: "Vijayawada-Ajitsingh Nagar",
    desc: "The project played a vital role in reclaiming India's largest dump site to date, spanning 45 acres in Vijayawada, amidst densely populated areas. One significant accomplishment was the successful occupation of over 2,500 apartments that had previously remained unoccupied. These apartments were specifically allocated to individuals from low-income groups through a slum rehabilitation programme, ensuring a positive social impact. The reclaimed land was intelligently repurposed to incorporate various essential facilities, including a construction and demolition waste management facility, material recovery facility, waste transfer station, farmer's produce market and a children's park.",
    projectInfo: "Quantity: 3,05,897 cubic metres. Area reclaimed: 45 acres.",
    focus: "Project period: July 2018 - July 2020. Quantity of RDF disposed: 47,178 metric tonnes.",
    outcome: "CO2 mitigated by processing the legacy waste: 2,11,681 metric tonnes.",
    metrics: [
      "CO2 mitigated by using RDF as an alternate fuel resource: 7,926 tonnes",
      "Area of US forests where carbon was sequestered in one year: 2.61 lakh",
      "GHG emissions avoided: Running 61 wind turbines for a year",
      "Carbon emissions from: 48,869 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  vairapalayam: {
    type: "DUMPSITE RECLAMATION PROJECT",
    title: "Erode-Vairapalayam",
    desc: "Under the vigilant monitoring of the esteemed National Green Tribunal, the acclaimed project has successfully reclaimed a sprawling seven-acre dumpsite situated along the banks of the Cauvery river. The Cauvery river serves as a vital source of drinking water for millions of individuals. Presently, the reclaimed land has been transformed into a magnificent Miyawaki forest by the urban local body. In recognition of its significant role in preserving the region's flora and fauna, the project has received the prestigious Smart City award for the urban local body.",
    projectInfo: "Quantity: 1,25,092 cubic metres. Area reclaimed: 7 acres.",
    focus: "Project period: September 2019 - August 2021. Quantity of RDF disposed: 8,719 metric tonnes.",
    outcome: "CO2 mitigated by processing the legacy waste: 91,009 metric tonnes.",
    metrics: [
      "CO2 mitigated per square metre: 3.21 metric tonnes",
      "CO2 mitigated by using RDF as an alternate fuel resource: 1,465 metric tonnes",
      "Area of US forests where carbon was sequestered in one year: 1.1 lakh",
      "GHG emissions avoided: Running 26 wind turbines for a year",
      "Carbon emissions from: 20,578 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  tirupati: {
    type: "SURFACE STABILIZATION",
    title: "Tirupathi",
    desc: "Stabilized the surface by leveling and clearing, reducing runoff issues.",
    projectInfo: "Surface stabilization and cleanup.",
    focus: "Leveling, drainage pathing, cleanup.",
    outcome: "Stable surface with reduced runoff.",
    metrics: [
      "Surface grading completed",
      "Runoff reduced through improved drainage paths",
      "Area cleared and stabilized for safe use",
      "Ongoing maintenance framework established",
    ],
  },
};

const PROJECTS: Project[] = RAW_PROJECTS.map((project) => ({
  ...project,
  modal: PROJECT_MODAL_OVERRIDES[project.id] ?? project.modal,
}));


// ─── Animated Counter ─────────────────────────────────────────────────────────

function useAnimatedCounter(target: number, triggered: boolean, duration = 1800): string {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!triggered) return;
    startRef.current = null;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = eased * target;
      setDisplay(isDecimal ? v.toFixed(1) : Math.floor(v).toLocaleString());
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setDisplay(isDecimal ? target.toFixed(1) : target.toLocaleString());
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggered, target, duration, isDecimal]);

  return display;
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({ stat, triggered, delay }: { stat: ProjectStat; triggered: boolean; delay: number }) {
  const val = useAnimatedCounter(stat.value, triggered);
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms`,
      }}
    >
      <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.3em] text-slate-600">
        {stat.label}
      </span>
      <strong className="text-3xl font-bold leading-none text-slate-900">
        {val}
      </strong>
      <span className="text-sm font-semibold text-primary">
        {stat.unit}
      </span>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface BeforeAfterPanelProps {
  image: string;
  label: "Before" | "After";
  panelsVisible: boolean;
  tilt: { x: number; y: number };
  transition: string;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

function BeforeAfterPanel({
  image,
  label,
  panelsVisible,
  tilt,
  transition,
  onMouseMove,
  onMouseLeave,
}: BeforeAfterPanelProps) {
  const isBefore = label === "Before";

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-full w-full cursor-default overflow-hidden"
      style={{
        opacity: panelsVisible ? 1 : 0,
        transform: panelsVisible ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.0)` : "scale(0.95)",
        transition,
      }}
    >
      <div className="absolute inset-0 scale-[1.08] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className={`absolute inset-0 bg-gradient-to-t ${isBefore ? "from-black/55" : "from-black/45"} to-transparent to-[45%]`} />
      <span
        className={`absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md ${
          isBefore ? "border-white/20 bg-black/50" : "border-white/25 bg-primary"
        }`}
      >
        {isBefore ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={12} height={12}>
            <circle cx={12} cy={12} r={10} />
            <line x1={12} y1={8} x2={12} y2={12} />
            <line x1={12} y1={16} x2={12.01} y2={16} />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} width={12} height={12}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project, onOpenModal }: { project: Project; onOpenModal: (id: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [metaVisible, setMetaVisible] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [imageTilt, setImageTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setMetaVisible(true);
            setTimeout(() => setPanelsVisible(true), 100);
            setTimeout(() => setStatsVisible(true), 400);
            obs.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>, setter: (value: { x: number; y: number }) => void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setter({ x: dx * 4, y: -dy * 4 });
  }, []);

  const resetTilt = useCallback((setter: (value: { x: number; y: number }) => void) => {
    setter({ x: 0, y: 0 });
  }, []);

  return (
    <article ref={cardRef} id={project.id} className="relative mb-32 scroll-mt-48">
      {/* Meta */}
      <div
        className=" flex items-start"
        style={{
          opacity: metaVisible ? 1 : 0,
          transform: metaVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {project.name}
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 text-sm font-medium text-slate-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={12} height={12}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx={12} cy={10} r={3} />
              </svg>
              {project.location}
            </span>
          </div>
        </div>
      </div>

      {/* Card Frame */}
      <div className=" flex min-h-[420px] overflow-hidden rounded-md bg-white shadow-[0_28px_70px_rgba(0,0,0,0.16)] ">
        {/* BA Grid */}
        <div className="relative flex-[1_1_auto] overflow-hidden">
          <div className="absolute right-5 top-5 z-[5] inline-flex overflow-hidden rounded-full border border-white/30 bg-black/45 p-1 backdrop-blur-sm">
            <button
              onClick={() => setShowAfter(false)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors ${
                !showAfter ? "bg-white/25" : "hover:bg-white/15"
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors ${
                showAfter ? "bg-primary text-primary-foreground" : "hover:bg-white/15"
              }`}
            >
              After
            </button>
          </div>

          <BeforeAfterPanel
            image={showAfter ? project.afterImg : project.beforeImg}
            label={showAfter ? "After" : "Before"}
            panelsVisible={panelsVisible}
            tilt={imageTilt}
            transition={
              panelsVisible
                ? "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.15s ease"
                : "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)"
            }
            onMouseMove={(e) => handleTilt(e, setImageTilt)}
            onMouseLeave={() => resetTilt(setImageTilt)}
          />
        </div>

        {/* Stats Strip */}
        <div className="flex w-[180px] shrink-0 flex-col border-l border-slate-200 bg-white">
          {project.stats.map((stat, i) => (
            <div key={stat.label}>
              <StatPill stat={stat} triggered={statsVisible} delay={i * 120} />
              {i < project.stats.length - 1 && (
                <div className="mx-4 h-px bg-gradient-to-r from-transparent via-green-800/15 to-transparent" />
              )}
            </div>
          ))}
          <button
            onClick={() => onOpenModal(project.id)}
            className="mt-auto inline-flex w-full items-center justify-center gap-2 border-t border-slate-200 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Project Details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={14} height={14}>
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const active = !!project;

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/45 p-8 backdrop-blur-md transition-opacity duration-[400ms]"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_rgba(0,0,0,0.25)]"
        style={{
          transform: active ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
          opacity: active ? 1 : 0,
          transition: "transform 0.6s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.5s ease",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-slate-600 transition-all duration-300 hover:rotate-90 hover:bg-primary hover:text-primary-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={22} height={22}>
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-12 py-10">
          {project && (
            <>
              {/* Header */}
              <div className="mb-8">
                <span className="mb-2 block text-sm font-medium uppercase tracking-[0.3em] text-slate-600/70">
                  {project.modal.type}
                </span>
                <h2 className="mb-2.5 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                  {project.modal.title}
                </h2>
                <p className="max-w-[600px] text-base leading-relaxed text-slate-600 md:text-lg">
                  {project.modal.desc}
                </p>
              </div>

              {/* Info Grid */}
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { title: "Project", body: project.modal.projectInfo },
                  { title: "Focus", body: project.modal.focus },
                  { title: "Outcome", body: project.modal.outcome },
                ].map((box) => (
                  <div
                    key={box.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600/70">
                      {box.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-slate-900">
                      {box.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
                Key Metrics
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.modal.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center rounded-xl border-l-4 border-primary bg-slate-50 px-7 py-5 text-base font-medium leading-snug text-slate-900"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompletedProjects() {
  const STATES = Array.from(new Set(PROJECTS.map((p) => p.location)));
  const [selectedState, setSelectedState] = useState<string>(STATES[0] ?? "");
  const filteredProjects = PROJECTS.filter((p) => p.location === selectedState);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const TOP_OFFSET = 190;
  const didInitStateScrollRef = useRef(false);

  const openModal = useCallback((id: string) => {
    const p = PROJECTS.find((p) => p.id === id) ?? null;
    setModalProject(p);
  }, []);

  const closeModal = useCallback(() => setModalProject(null), []);
  const handleStateSelect = useCallback((state: string) => {
    setSelectedState(state);
  }, []);

  useEffect(() => {
    if (!didInitStateScrollRef.current) {
      didInitStateScrollRef.current = true;
      return;
    }
    const firstProject = filteredProjects[0];
    if (!firstProject) return;
    const el = document.getElementById(firstProject.id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, [selectedState]);

  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <Header />

        {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 text-center lg:px-10">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mx-auto max-w-3xl">
              <span className="block text-xs font-medium uppercase tracking-[0.3em] text-white/85 md:text-sm">
                Impact in Action
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Projects That Reclaimed Land at Scale
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                Explore how Zigma transforms legacy waste into measurable environmental outcomes across multiple cities in India.
              </p>
            </div>
          </div>
        </section>

        {/* State Filter */}
        <nav className="sticky top-20 z-40 overflow-hidden border-y border-slate-200 bg-white/95 backdrop-blur">
          <div className="px-8 py-4">
            <div className="flex flex-wrap gap-2.5">
              {STATES.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedState === state
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {state}
              </button>
            ))}
            </div>
          </div>
        </nav>

        {/* Projects */}
        <main className="mx-auto max-w-[1440px] px-[5%] py-20">
          {filteredProjects.map((project, i) => (
            <div key={project.id} className="relative">
              <ProjectCard project={project} onOpenModal={openModal} />
              {i < filteredProjects.length - 1 && (
                <div className="absolute -bottom-16 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />
              )}
            </div>
          ))}
        </main>

        {/* Modal */}
        <ProjectModal project={modalProject} onClose={closeModal} />
        <Footer />
      </div>
    </>
  );
}







