import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// -- Image imports ----------------------------------------------
import P1b from "@/assets/before after projects/kumbakonam before.png";
import P1a from "@/assets/before after projects/kumbakonam after.png";
import P2b from "@/assets/before after projects/SEMBAKKAM LAKE  before.png";
import P2a from "@/assets/before after projects/SEMBAKKAM LAKE  after.png";
import P3b from "@/assets/before after projects/noida before.png";
import P3a from "@/assets/before after projects/noida after.png";
import P4b from "@/assets/before after projects/VADODARA - ATLADAR  before.png";
import P4a from "@/assets/before after projects/VADODARA - ATLADAR  after.png";
import P5b from "@/assets/before after projects/poonamallee before.png";
import P5a from "@/assets/before after projects/poonamallee after.png";
import P6b from "@/assets/before after projects/VIJAYAWADA-AJITSINGH NAGAR before.png";
import P6a from "@/assets/before after projects/VIJAYAWADA-AJITSINGH NAGAR after.png";
import P7b from "@/assets/before after projects/Erode-Vairapalayam before.png";
import P7a from "@/assets/before after projects/Erode-Vairapalayam after.png";
import P8b from "@/assets/before after projects/pammal before.png";
import P8a from "@/assets/before after projects/pammal after.png";
import P9b from "@/assets/before after projects/noida sector 145- before (1).png";
import P9a from "@/assets/before after projects/noida sector 145 after.png";
import P10b from "@/assets/before after projects/tirupathi before.png";
import P10a from "@/assets/before after projects/tirupathi before after.png";
import P11b from "@/assets/before after projects/chidambaram before.png";
import P11a from "@/assets/before after projects/chidambaram after.png";
import P12b from "@/assets/before after projects/pallavaram before.jpg";
import P12a from "@/assets/before after projects/pallavaram after.png";
import P13b from "@/assets/before after projects/karaikudi before.png";
import P13a from "@/assets/before after projects/karaikudi after.png";
import P14b from "@/assets/before after projects/karur before.png";
import P14a from "@/assets/before after projects/karur after.png";
import P15b from "@/assets/before after projects/tambaram before.png";
import P15a from "@/assets/before after projects/tambaram after.png";
import p16b from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  before.png";
import p16a from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  after.png";
import p17b from "@/assets/before after projects/KOLLAM - KUREEPUZHA before.png";
import p17a from "@/assets/before after projects/KOLLAM - KUREEPUZHA  after.png";
import p18b from "@/assets/before after projects/GUWAHATI - BORAGOAN before.png";
import p18a from "@/assets/before after projects/GUWAHATI - BORAGOAN after.png";
import p19b from "@/assets/before after projects/Perungudi before.png";
import p19a from "@/assets/before after projects/Perungudi after.png";
import p20b from "@/assets/before after projects/muthusamy colony before.png";
import p20a from "@/assets/before after projects/muthusamy colony after.png";
import p21b from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  before.png";
import p21a from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  after.png";
import p22b from "@/assets/before after projects/Dindigul-Before.jpg"; 
import p22a from "@/assets/before after projects/Dindigul-After.jpg";
import p23b from "@/assets/before after projects/Trichy phase 1 Before.jpg";
import p23a from "@/assets/before after projects/Trichy phase 1 After.jpg";   
import p24b from "@/assets/before after projects/Trichy Phase 2-Before.jpg";
import p24a from "@/assets/before after projects/Trichy Phase 2-After.jpg";
import p25b from "@/assets/before after projects/Makarpura-(Before).jpg";
import p25a from "@/assets/before after projects/Makarpura- (After).jpg";
import p26b from "@/assets/before after projects/Nagpur Bhandewadi-before.jpg";
import p26a from "@/assets/before after projects/Nagpur Bhandewadi-After.png";
import p27b from "@/assets/before after projects/Noida S-145 Site B-Before.jpg";
import p27a from "@/assets/before after projects/Noida S-145 Site B-After.jpg";
import p28b from "@/assets/before after projects/Puducherry-Before..jpg";
import p28a from "@/assets/before after projects/Puducherry-After.jpg";







// -- Types ------------------------------------------------------
interface Project {
  id: number;
  title: string;
  subtitle: string;
  state: string;
  desc: string;
  project: string;
  focus: string;
  outcome: string;
  metrics: string[];
  waste: number;
  land: number;
  co2: number;
  beforeImage: string;
  afterImage: string;
}

type MetricKey = 'waste' | 'land' | 'co2' | 'timeline' | 'recovery';

interface InteractiveMetric {
  key: MetricKey;
  label: string;
  railValue: string;
  eyebrow: string;
  title: string;
  displayValue: string;
  unit: string;
  status: string;
  progress: number;
  details: Array<{ label: string; value: string }>;
}

// -- Data -------------------------------------------------------
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23e2e8f0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-family="Arial,sans-serif" font-size="40"></text></svg>';

interface CompletedProjectSheetRow {
  title: string;
  state: string;
  waste: number | string | null;
  land: number | string | null;
  co2: number | string | null;
  start: string | null;
  end: string | null;
  credibility: string | null;
}

const SHEET3_COMPLETED_ROWS: CompletedProjectSheetRow[] = [
  {
    title: "Kumbakonam",
    state: "Tamilnadu",
    waste: 231782,
    land: 12,
    co2: 160509.035,
    start: "18.05.2015",
    end: "6-2-2019",
    credibility: "Featured in the Swacch Bharath Mission Best Practises 2016. Visited by the Supreme Court Panel for Solid Waste Management. First Project in India executed in an Integrated Model with Zero residues. The project got featured in the Centre for Science and Environment's \"Clean it Right- Dumpsite Management in India\"",
  },
  {
    title: "Sembakkam",
    state: "Tamilnadu",
    waste: 38624,
    land: 4,
    co2: 26747.12,
    start: "16.08.2017",
    end: "7-2-2019",
    credibility: "Project executed on the banks of Sembakkam lake which ultimately drain to Pallikaranai Marshland- a RAMSAR site. ",
  },
  {
    title: "Pammal",
    state: "Tamilnadu",
    waste: 59175,
    land: 4,
    co2: 40978.6875,
    start: "20.08.2018",
    end: "21-1-2020",
    credibility: null,
  },
  {
    title: "Vijayawada",
    state: "Andhra Pradesh",
    waste: 305890,
    land: 45,
    co2: 211828.825,
    start: "26.06.2018",
    end: "6-7-2020",
    credibility: "The largest dumpsite recovering project executed in the state of Andhra Pradesh in terms of land reclaimed. The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission. The recovered land helped build houses for BPL families under the JNNURM project, a construction and demolition waste facility, a plastic waste management facility, a farmer's market and a children's park. The project also bagged the Skoch Silver Award in waste management. The project got featured in the Centre for Science and Environment's \"Clean it Right- Dumpsite Management in India\". The project got featured in the Centre for Science and Environment's toolkit on Legacy Waste Management and Dumpsite Remediation to support SBM 2.0.",
  },
  {
    title: "Atladara- Vadodara",
    state: "Gujarat",
    waste: 375000,
    land: 19,
    co2: 259687.5,
    start: "16.07.2018",
    end: "26-12-2020",
    credibility: "The project was monitored by NGT as the dumpsite leachate was leaking to adjoining river Vishwamitri, a fragile river which houses over 400 Indian Marsh Crocodiles \"mugger\" protected under Indian Wildlife (Protection) Act- 1972. The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission. The project got featured in the Centre for Science and Environment's toolkit on Legacy Waste Management and Dumpsite Remediation to support SBM 2.0.",
  },
  {
    title: "Sector 145 NOIDA",
    state: "Uttar Pradesh",
    waste: 742535,
    land: 8.2,
    co2: 514205.4875,
    start: "09.12.2018",
    end: "27-11-2022",
    credibility: "The dumping ground has been transformed into a thriving \"Waste to Wealth\" wetland park which bagged the 2019, Smart City Awards for the best Urban Development Project bestowed by the Indian Ministry for Housing and Urban Affairs. The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission. The project got featured in the Centre for Science and Environment's toolkit on Legacy Waste Management and Dumpsite Remediation to support SBM 2.0.",
  },
  {
    title: "Sector 54NOIDA",
    state: "Uttar Pradesh",
    waste: 99665,
    land: 25.75,
    co2: 69018.0125,
    start: "09.12.2018",
    end: "30-12-2020",
    credibility: "The dumping ground has been transformed into a thriving \"Waste to Wealth\" wetland park which bagged the 2019, Smart City Awards for the best Urban Development Project bestowed by the Indian Ministry for Housing and Urban Affairs. The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission. The project got featured in the Centre for Science and Environment's toolkit on Legacy Waste Management and Dumpsite Remediation to support SBM 2.0.",
  },
  {
    title: "Poonamallee",
    state: "Tamilnadu",
    waste: 30932.14,
    land: 2,
    co2: 21420.50695,
    start: "4.02.2019",
    end: "31-1-2020",
    credibility: null,
  },
  {
    title: "Pallavapuram",
    state: "Tamilnadu",
    waste: 108000,
    land: 5.25,
    co2: 74790,
    start: "21.01.2020",
    end: "17-9-2021",
    credibility: null,
  },
  {
    title: "Chidambaram",
    state: "Tamilnadu",
    waste: 52000,
    land: 4.2,
    co2: 36010,
    start: "19.04.2019",
    end: "29-3-2021",
    credibility: null,
  },
  {
    title: "Tambaram",
    state: "Tamilnadu",
    waste: 150494,
    land: 7,
    co2: 104217.095,
    start: "16.08.2019",
    end: "24-12-2020",
    credibility: null,
  },
  {
    title: "Tirupati",
    state: "Andhra Pradesh",
    waste: 217500,
    land: 26,
    co2: 150618.75,
    start: "16.08.2019",
    end: "31-12-2021",
    credibility: "This project bagged first place in the Sanitation category at the India Smart Cities Awards Contest (ISAC) 2020 for its innovation in waste management. The project also got featured in the Landfill Mining Advisory released by the Indian Ministry for Housing and Urban Affairs in 2020. The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission.",
  },
  {
    title: "Nagpur- Phase 1",
    state: "Maharashtra",
    waste: 1000000,
    land: 43,
    co2: 692500,
    start: "24.10.2019",
    end: "15-2-2023",
    credibility: "The project is the largest project executed in the state of Maharastra till date in terms of the land reclaimed. The reclaimed land houses a state of the art Bio-methanation facility, a thriving miyawaki forest, a construction and demolition waste management facility and a Nandgram project to house aboondoned cattle. The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission.",
  },
  {
    title: "Tiruchirapalli- Phase 1",
    state: "Tamilnadu",
    waste: 760000,
    land: 40,
    co2: 526300,
    start: "24.01.2020",
    end: "31-3-2022",
    credibility: "The project got featured in \"Towards Lakshya Zero dumpsite- collection of case studies\" released by GIZ- Germany in association with Swacch Bharath Mission.",
  },
  {
    title: "Vairapalayam- Erode",
    state: "Tamilnadu",
    waste: 125974,
    land: 7,
    co2: 87236.995,
    start: "16.09.2019",
    end: "24-11-2022",
    credibility: "This project bagged first place in the Sanitation category at the India Smart Cities Awards Contest (ISAC) 2020 for its best performance. The project was monitored by the Hon. National Green Tribunal as it was executed on the banks of River Cauvery wherein the dumpsite's leachate was overflowing into the river which is primary source of drinking water to millions. ",
  },
  {
    title: "Vendipalayam- Erode",
    state: "Tamilnadu",
    waste: 549026,
    land: 17.3,
    co2: 380200.505,
    start: "21.01.2022",
    end: "24-11-2022",
    credibility: null,
  },
  {
    title: "Karaikudi",
    state: "Tamilnadu",
    waste: 112000,
    land: 14,
    co2: 77560,
    start: "07.02.2020",
    end: "8-9-2021",
    credibility: null,
  },
  {
    title: "Karur",
    state: "Tamilnadu",
    waste: 141731,
    land: 15,
    co2: 98148.7175,
    start: "22.02.2020",
    end: "31-3-2021",
    credibility: null,
  },
  {
    title: "Kamiyanpettai- Cuddalore",
    state: "Tamilnadu",
    waste: 77000,
    land: 3.6,
    co2: 53322.5,
    start: "20.08.2021",
    end: "20-04-2022",
    credibility: null,
  },
  {
    title: "Panchayankuppam- Cuddalore",
    state: "Tamilnadu",
    waste: 25000,
    land: 1.92,
    co2: 17312.5,
    start: "20.08.2021",
    end: "20-04-2022",
    credibility: null,
  },
  {
    title: "Dindigul",
    state: "Tamilnadu",
    waste: 200000,
    land: 10,
    co2: 138500,
    start: "28.07.2020",
    end: "25-4-2022",
    credibility: null,
  },
  {
    title: "Visakhapatnam- Phase 1",
    state: "Andhra Pradesh",
    waste: 250000,
    land: 20,
    co2: 173125,
    start: "30.12.2020",
    end: "1-8-2022",
    credibility: null,
  },
  {
    title: "Makarpura- Vadodara- Phase 1",
    state: "Gujarat",
    waste: 500000,
    land: 19,
    co2: 346250,
    start: "10.02.2021",
    end: "24-12-2023",
    credibility: null,
  },
  {
    title: "Perungudi- Chennai",
    state: "Tamilnadu",
    waste: 1730584.23,
    land: 94.31,
    co2: 1198429.5792750001,
    start: "12.10.2021",
    end: "31-9-2024",
    credibility: "The project was executed on the fragile RAMSAR Pallikaranai Marshland reclaiming the largest area of 92 acres in South India. The project upon completion also hosted the AVPN Summit 2025 Workshop with delegates from 25 countries attending, the first of its kind event hosted in a reclaimed dumpsite. ",
  },
  {
    title: "Puducherry",
    state: "Puducherry",
    waste: 901989,
    land: 19.1,
    co2: 624627.3825,
    start: "31.12.2021",
    end: "30-4-2023",
    credibility: null,
  },
  {
    title: "Kollam",
    state: "Keralam",
    waste: 104906.87,
    land: 15.8,
    co2: 72648.00747499999,
    start: "12.07.2021",
    end: "18-3-2023",
    credibility: "The project was executed on the banks of RAMSAR denoted Ashtamudi lake and was the first integrated landfill mining project executed in the state of Kerala. The project featured in the best practises case studies identified by the Kerala State Pollution Control Board. ",
  },
  {
    title: "Nagpur- Phase 2",
    state: "Maharashtra",
    waste: 600000,
    land: 20.5,
    co2: 415500,
    start: "20.09.2021",
    end: "10-2-2024",
    credibility: null,
  },
  {
    title: "Tiruchirapalli- Phase 2",
    state: "Tamilnadu",
    waste: 349285,
    land: 10,
    co2: 241879.8625,
    start: "22.07.2022",
    end: "15-4-2024",
    credibility: null,
  },
  {
    title: "Paschim Boragaon- Guwahati",
    state: "Assam",
    waste: 1500000,
    land: 15.73,
    co2: 1038750,
    start: "10.06.2022",
    end: "20-9-2026",
    credibility: "The project was executed on the banks of Deepor Beel which is a RAMSAR identified site and is the largest landfill mining project executed in the state till date. The project is monitored by the Hon. National Green Tribunal.",
  },
  {
    title: "ITC- Coimbatore",
    state: "Tamilnadu",
    waste: 225000,
    land: 7.49,
    co2: 155812.5,
    start: "08.09.2022",
    end: "28-2-2024",
    credibility: "The project was monitored by the Tamilnadu Pollution Control Board. ",
  },
  {
    title: "Visakhapatnam- Phase 2",
    state: "Andhra Pradesh",
    waste: 435000,
    land: 20.75,
    co2: 301237.5,
    start: "12.01.2023",
    end: "31-3-2024",
    credibility: null,
  },
  {
    title: "Gurugram",
    state: "Haryana",
    waste: 200000,
    land: 15.73,
    co2: 138500,
    start: "25.02.2023",
    end: "27-7-2024",
    credibility: null,
  },
  {
    title: "Keeramangalam",
    state: "Tamilnadu",
    waste: 1552,
    land: 1.7,
    co2: 1074.76,
    start: "30.06.2023",
    end: "31-08-2023",
    credibility: null,
  },
  {
    title: "Kochi",
    state: "Kerala",
    waste: 821250,
    land: "Not applicable",
    co2: 568715.625,
    start: "14.09.2023",
    end: "14-9-2026",
    credibility: null,
  },
  {
    title: "Tirupati Tirumala Devasthanams",
    state: "Andhra Pradesh",
    waste: 200000,
    land: 7,
    co2: 138500,
    start: "14.02.2024",
    end: "11-4-2024",
    credibility: "The project as executed amidst the Sri Venkateswara National Park, located in the Seshachalam hills, a 353-507 sq km protected area known for its biodiversity, deep valleys, waterfalls and home to rare flora like Red Sanders and wildlife such as sloth bears, elephants, and over 175 bird species.",
  },
  {
    title: "Nagpur- Phase 3",
    state: "Maharashtra",
    waste: 1500000,
    land: 11.17,
    co2: 1038750,
    start: "21.02.2024",
    end: "15-9-2026",
    credibility: null,
  },
  {
    title: "Makarpura- Vadodara- Phase 2",
    state: "Gujarat",
    waste: 500000,
    land: 8.67,
    co2: 346250,
    start: "01.01.2024",
    end: "15-7-2025",
    credibility: null,
  },
  {
    title: "Kodungaiyur- Chennai",
    state: "Tamilnadu",
    waste: 4403088.41,
    land: null,
    co2: 3049138.723925,
    start: "12.02.2024",
    end: "12-2-2026",
    credibility: "Upon completion, the project would be India's largest landfill mining project executed in terms of land reclaimed. ",
  },
  {
    title: "Visakhapatnam- Phase 3",
    state: "Andhra Pradesh",
    waste: 251000,
    land: 12,
    co2: 173817.5,
    start: "12.02.2024",
    end: "12-2-2026",
    credibility: "13.09.2024",
  },
  {
    title: "Visakhapatnam- Phase 4",
    state: "Andhra Pradesh",
    waste: 201400,
    land: 5,
    co2: 139469.5,
    start: "12-03-2025",
    end: "22-09-2025",
    credibility: null,
  },
  {
    title: "Allipuram- Nellore",
    state: "Andhra Pradesh",
    waste: 34037.4,
    land: 22.26,
    co2: 23570.8995,
    start: "24-02-2025",
    end: "06-11-2025",
    credibility: "The project received the Chief Minister's Award for best performing Bio-mining company in the state. ",
  },
  {
    title: "Dhontali- Nellore",
    state: "Andhra Pradesh",
    waste: 590442.38,
    land: 7.15,
    co2: 408881.34815,
    start: "24-02-2025",
    end: "Ongoing",
    credibility: "The project received the Chief Minister's Award for best performing Bio-mining company in the state. ",
  },
  {
    title: "B.Kothakota",
    state: "Andhra Pradesh",
    waste: 3816.99,
    land: 8.86,
    co2: 2643.265575,
    start: "29-03-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Chittoor",
    state: "Andhra Pradesh",
    waste: 260526.6,
    land: 21.717,
    co2: 180414.6705,
    start: "29-03-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Kuppam",
    state: "Andhra Pradesh",
    waste: 20018.32,
    land: 0.6,
    co2: 13862.686599999999,
    start: "29-03-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Madanapalle",
    state: "Andhra Pradesh",
    waste: 36505.15,
    land: 27.52,
    co2: 25279.816375,
    start: "29-03-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Palamaneru",
    state: "Andhra Pradesh",
    waste: 16515.32,
    land: 8.97,
    co2: 11436.8591,
    start: "29-03-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Punganur",
    state: "Andhra Pradesh",
    waste: 45623.8,
    land: 10.25,
    co2: 31594.481500000005,
    start: "29-03-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Nagari",
    state: "Andhra Pradesh",
    waste: 14451.71,
    land: 8.46,
    co2: 10007.809174999999,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Puttur",
    state: "Andhra Pradesh",
    waste: 28022.46,
    land: 3.16,
    co2: 19405.55355,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Srikalahasti",
    state: "Andhra Pradesh",
    waste: 118528.04,
    land: 21.08,
    co2: 82080.6677,
    start: "03-04-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Sullurpet",
    state: "Andhra Pradesh",
    waste: 48316.46,
    land: 3.21,
    co2: 33459.14855,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Venkatagiri",
    state: "Andhra Pradesh",
    waste: 20845.97,
    land: 7.41,
    co2: 14435.834225000002,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Anantapur",
    state: "Andhra Pradesh",
    waste: 168285,
    land: 10.21,
    co2: 116537.3625,
    start: "03-04-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Gooty",
    state: "Andhra Pradesh",
    waste: 4563,
    land: 9.3,
    co2: 3159.8775,
    start: "03-04-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Guntakal",
    state: "Andhra Pradesh",
    waste: 20000,
    land: 25,
    co2: 13850,
    start: "03-04-2025",
    end: "01-12-2025",
    credibility: null,
  },
  {
    title: "Rayadurgam",
    state: "Andhra Pradesh",
    waste: 108876,
    land: 12.32,
    co2: 75396.63,
    start: "03-04-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Alluru",
    state: "Andhra Pradesh",
    waste: 2099.52,
    land: 1.32,
    co2: 1453.9176,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Atmakur(N)",
    state: "Andhra Pradesh",
    waste: 16004.81,
    land: 9.3,
    co2: 11083.330924999998,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Buchireddypalem",
    state: "Andhra Pradesh",
    waste: 6030,
    land: 2.77,
    co2: 4175.775,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Gudur(N)",
    state: "Andhra Pradesh",
    waste: 62501.47,
    land: 5.79,
    co2: 43282.267975,
    start: "03-04-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Kavali",
    state: "Andhra Pradesh",
    waste: 33536,
    land: 5.93,
    co2: 23223.68,
    start: "03-04-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Naidupet",
    state: "Andhra Pradesh",
    waste: 4186.06,
    land: 6.29,
    co2: 2898.84655,
    start: "03-04-2025",
    end: "02-10-2025",
    credibility: null,
  },
  {
    title: "Visakhapatnam- Phase 5",
    state: "Andhra Pradesh",
    waste: 300000,
    land: null,
    co2: 207750,
    start: "11-11-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Tiruchirapalli- Phase 3",
    state: "Tamilnadu",
    waste: 617716,
    land: null,
    co2: 427768.33,
    start: "19-12-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Kozhikode",
    state: "Keralam",
    waste: 200966,
    land: null,
    co2: 139168.955,
    start: "12-01-2026",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Athipattu- Chennai",
    state: "Tamilnadu",
    waste: 72043,
    land: null,
    co2: 49889.7775,
    start: "22-12-2025",
    end: "Ongoing",
    credibility: null,
  },
  {
    title: "Nagpur- Phase 4",
    state: "Maharashtra",
    waste: 480000,
    land: null,
    co2: 332400,
    start: "05-02-2026",
    end: "Ongoing",
    credibility: null,
  },
];

const STATE_NORMALIZATION_MAP: Record<string, string> = {
  tamilnadu: 'Tamil Nadu',
  keralam: 'Kerala',
  kerala: 'Kerala',
  puducherry: 'Puducherry',
  'andhra pradesh': 'Andhra Pradesh',
  gujarat: 'Gujarat',
  maharashtra: 'Maharashtra',
  haryana: 'Haryana',
  assam: 'Assam',
  'uttar pradesh': 'Uttar Pradesh',
};

const normalizeState = (value: string) => {
  const key = value.trim().toLowerCase();
  return STATE_NORMALIZATION_MAP[key] ?? value.trim();
};

const buildScopeKey = (title: string, state: string) =>
  `${title.trim().toLowerCase()}|${state.trim().toLowerCase()}`;

const OFFICIAL_SCOPE_BY_KEY: Record<string, string> = {
  "kumbakonam|tamilnadu": "Revamping and Clearing of Existing Dumped Municipal Solid Waste in Thepperamanallur Compost Yard using Bio-Mining technolgy",
  "sembakkam|tamilnadu": "Removal of Legacy Waste Dumped (Approximately 32,000 cu.m) on the Banks of Sembakkam Lake Throught Bio-Mining Process",
  "pammal|tamilnadu": "Removal of Legacy Waste Dumped (Approximately 51,500 cu.m) on private land (Survey No. 150, 152 & 153) Throught Bio-Mining Process on design, Build, Own and operate (DBOO) Concept.",
  "vijayawada|andhra pradesh": "Vijayawada Municipal Corporation- Engineering- Remediation of existing MSW dumpsite of Ajithsingh Nagar Through Bio-Mining process in Vijayawada Municipal Corporation on Design- Build- Operate(DBO)",
  "atladara- vadodara|gujarat": "Remediation of Legacy waste located at Atladara utilizing various methodologies/ technologies confirming SWM Rule 2016 Swachh Bharat Mission Guidelines, Mahatma Gandhi, Swahhata Mission Guidelines and as per the guidelines of Hon. National Green Tribunal",
  "sector 145 noida|uttar pradesh": "Dumpsite Remediation of Municipal Solid waste at NOIDA",
  "sector 54noida|uttar pradesh": "Dumpsite Remediation of Municipal Solid waste at NOIDA",
  "poonamallee|tamilnadu": "Removal of Legacy waste dumped (Approximately 25,500 cu.m) At parivakkam Dumpyard through Bio-Mining process",
  "pallavapuram|tamilnadu": "Removal of Legacy waste dumped at Periya Eri through Bio-Mining process",
  "chidambaram|tamilnadu": "Revamping of Dumpsite (approximately 52,000 cu.m) through Bio- Mining process on Design, Build, Own and Operate Concept",
  "tambaram|tamilnadu": "Removal of Legacy Waste Dumped at Kanndapalyam Dump Yard through Bio-Mining",
  "tirupati|andhra pradesh": "Solid Waste Management project - Remediation of Exosting MSW Dumpsite at Ramapuram through Bio-Mining Process under implementation of the Smart City Mission in tirupati",
  "nagpur- phase 1|maharashtra": "Remediation/ Bio-Mining of Existing Landfill / Stabilised windrows located at Bhandewadi.",
  "tiruchirapalli- phase 1|tamilnadu": "Reclamation of Existing dump yard at Ariyamangalam Through Bio-Mining process",
  "vairapalayam- erode|tamilnadu": "Revamping of existing Dumped Garbage (Approximately 5,60,000 cu.m) at Vendipalayam and Vairapalayam dumpyard Through Bio-Mining process on DBFOO Concept",
  "vendipalayam- erode|tamilnadu": "Disposal of Additional Legacy Waste dumped in vendipalayam compost yard by Biomining processes(Approx. 1,15,000 Cubic Meter)",
  "karaikudi|tamilnadu": "Removing of dump site through Bio-Mining to recover the land at Devakottai Road compost yard in Karaikudi Municipality",
  "karur|tamilnadu": "Removing the Legacy Waste Dumped in the Compost yard through Bio-Mining Process at Karur Municipality",
  "kamiyanpettai- cuddalore|tamilnadu": "Revamping of Dumpsite Through Bio Mining to recover the land at Kamiyanpettai and Panchayankuppam Compost yard in Cuddalore Municipality",
  "panchayankuppam- cuddalore|tamilnadu": "Revamping of Dumpsite Through Bio Mining to recover the land at Kamiyanpettai and Panchayankuppam Compost yard in Cuddalore Municipality",
  "dindigul|tamilnadu": "Removal of Legacy Waste 200000 Cu.m through Bio mining process to Reclaim the existing site at Murugabavanam in Dindigul City Municipal Corporation",
  "visakhapatnam- phase 1|andhra pradesh": "Remediation of existing MSW dumpsite at Kapulappada Dumping Site through Bio-Mining Process in Greater Visakhapatnam Municipal Corporation on “Design-Build-Operate (DBO)",
  "makarpura- vadodara- phase 1|gujarat": "Biomining of the Legacy waste at Existing Landfill site located at R.S.346 Makarpura Landfill Site using scientific methods for Vadodara Municipal Corporation",
  "perungudi- chennai|tamilnadu": "Reclamation of Perungudi Dumping Ground through Bio-Mining",
  "puducherry|puducherry": "Disposal of legacy waste from the existing Kurumbapet dumping site, through Bioremediation & Bio-mining means with complete reclamation of the dumpsite land in compliance with Solid Waste Management (Management & Handling) Rules 2016 on Design, Build, Finance, Own and Operate model",
  "kollam|keralam": "Bio-Mining and Scientific Closure of Legacy Wastes at the Dumpsite in Kureepuzha, Kollam",
  "nagpur- phase 2|maharashtra": "Bio-mining of existing old dumped waste at Bhandewadi, Nagpur",
  "tiruchirapalli- phase 2|tamilnadu": "Implementation of Bio-remediation (Phase - II) Process for disposal of existing Legacy Solid Waste in Ariyamangalam Compost Yard at Triruchirappalli City Corporation",
  "paschim boragaon- guwahati|assam": "Landfill Mining of Boragaon Dumpsite at Guwahati as per CPCB Guideline for Legacy Waste Disposal",
  "itc- coimbatore|tamilnadu": "Excavation, Segregation & Processing and Disposal of Legacy Plastic Waste at Kovai",
  "visakhapatnam- phase 2|andhra pradesh": "Remediation of existing MSW dumpsite at Kapulappada Dumping Site through Bio-Mining Process in Greater Visakhapatnam Municipal Corporation on “Design-Build-Operate (DBO)",
  "gurugram|haryana": "Remediation and reclamation of exisiting dump site at Bandahwari",
  "keeramangalam|tamilnadu": "Solid Waste Management \"Revamping of Dump Site through Bio-Mining to recover the land at Compost Yard in Keeramangalam Town Panchayat",
  "kochi|kerala": "BIODEGRADABLE WASTE PROCESSING PLANT USING BLACK SOLDIER FLY (BSF)",
  "tirupati tirumala devasthanams|andhra pradesh": "Processing and disposal of the Legacy Municipal Solid Waste near Kakulamanutippa, Tirumala through Bio-Remediation & Bio-Mining as in whereis basis",
  "nagpur- phase 3|maharashtra": "Remediation of Landfill site through bio-mining of Legacy waste, Disposal of excavated material and Reclamation of Land at Bhandewadi, Landfill Site, Nagpur.",
  "makarpura- vadodara- phase 2|gujarat": "Processing aof waste located at R.S. No. 346 Makarpura using scientific method conforming to SWM Rules 2016",
  "kodungaiyur- chennai|tamilnadu": "Reclamation of Kodungaiyur Dumping Ground through Bio Mining",
  "visakhapatnam- phase 3|andhra pradesh": "Remediation of balance dump site at Kapuluppada, Visakhapatnam though bio-mining process in GVMC (Phase-3)",
  "visakhapatnam- phase 4|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Greater Visakhapatnam Municipal Corporation (Phase-4) with near-Zero residues”.",
  "allipuram- nellore|andhra pradesh": "The work of \"Legacy Waste Land Reclamation though Bio-remediation and Bio-mining in Nellore Municipal Corporation with near-Zero residues\". Allipuram and Donthali",
  "dhontali- nellore|andhra pradesh": "The work of \"Legacy Waste Land Reclamation though Bio-remediation and Bio-mining in Nellore Municipal Corporation with near-Zero residues\". Allipuram and Donthali",
  "b.kothakota|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Chittoor Cluster (6 ULB’s) with near-Zero residues”.",
  "chittoor|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Chittoor Cluster (6 ULB’s) with near-Zero residues”.",
  "kuppam|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Chittoor Cluster (6 ULB’s) with near-Zero residues”.",
  "madanapalle|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Chittoor Cluster (6 ULB’s) with near-Zero residues”.",
  "palamaneru|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Chittoor Cluster (6 ULB’s) with near-Zero residues”.",
  "punganur|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Chittoor Cluster (6 ULB’s) with near-Zero residues”.",
  "nagari|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Tirupati Cluster (6 ULBs) with near-Zero residues”.",
  "puttur|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Tirupati Cluster (6 ULBs) with near-Zero residues”.",
  "srikalahasti|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Tirupati Cluster (6 ULBs) with near-Zero residues”.",
  "sullurpet|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Tirupati Cluster (6 ULBs) with near-Zero residues”.",
  "venkatagiri|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Tirupati Cluster (6 ULBs) with near-Zero residues”.",
  "anantapur|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Anantapur Cluster (6 ULBs) with near-Zero residues”.",
  "gooty|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Anantapur Cluster (6 ULBs) with near-Zero residues”.",
  "guntakal|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Anantapur Cluster (6 ULBs) with near-Zero residues”.",
  "rayadurgam|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Anantapur Cluster (6 ULBs) with near-Zero residues”.",
  "alluru|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Nellore Cluster (6 ULB’s) with near-Zero residues”.",
  "atmakur(n)|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Nellore Cluster (6 ULB’s) with near-Zero residues”.",
  "buchireddypalem|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Nellore Cluster (6 ULB’s) with near-Zero residues”.",
  "gudur(n)|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Nellore Cluster (6 ULB’s) with near-Zero residues”.",
  "kavali|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Nellore Cluster (6 ULB’s) with near-Zero residues”.",
  "naidupet|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Nellore Cluster (6 ULB’s) with near-Zero residues”.",
  "visakhapatnam- phase 5|andhra pradesh": "The Work of “Legacy Waste Land Reclamation through Bio-remediation and Bio-mining in Greater Visakhapatnam Municipal Corporation Additional Quantity with near zero residues\"",
  "tiruchirapalli- phase 3|tamilnadu": "Remediation of Legacy Waste through Bio-mining Process (Phase III) at Ariyamangalam Compost Yard, Tiruchirappalli Municipal Corporation",
  "kozhikode|keralam": "Biomining and Bioremediation of Legacy Waste Dumpsite at Njeliyanparambu Kozhikode Kerala",
  "athipattu- chennai|tamilnadu": "Reclamation additional quantity of Attipattu Dumpsite through Biomining technology process",
  "nagpur- phase 4|maharashtra": "Remediation of Landfill site through bio-mining of Legacy waste, Disposal of excavated material and Reclamation of Land at Bhandewadi, Landfill Site, Nagpur",
};

const normalizeProjectKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const toNumber = (value: number | string | null): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const normalized = value.replace(/,/g, '').trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const isDateLikeMarker = (value: string) =>
  /^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}$/.test(value.trim());

const splitCredibilityMarkers = (value: string | null): string[] => {
  if (!value) return [];
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized || isDateLikeMarker(normalized)) return [];

  const abbreviationMap = new Map<string, string>([
    ['Hon.', 'Hon<dot>'],
    ['Mr.', 'Mr<dot>'],
    ['Mrs.', 'Mrs<dot>'],
    ['Ms.', 'Ms<dot>'],
    ['Dr.', 'Dr<dot>'],
    ['Prof.', 'Prof<dot>'],
  ]);

  let safeText = normalized;
  abbreviationMap.forEach((token, abbr) => {
    safeText = safeText.split(abbr).join(token);
  });

  return safeText
    .split(/\.(?=\s+[A-Z"(])/)
    .map((entry) =>
      entry
        .replace(/<dot>/g, '.')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[.;]+$/, ''),
    )
    .filter((entry) => entry.length > 0 && !isDateLikeMarker(entry));
};

const formatMetricNumber = (value: number, digits = 2) =>
  value > 0
    ? value.toLocaleString('en-IN', { maximumFractionDigits: digits })
    : 'Not reported';

const IMAGE_LOOKUP: Record<string, { beforeImage: string; afterImage: string }> = {
  [normalizeProjectKey('Kumbakonam')]: { beforeImage: P1b, afterImage: P1a },
  [normalizeProjectKey('Sembakkam')]: { beforeImage: P2b, afterImage: P2a },
  [normalizeProjectKey('Sector 54NOIDA')]: { beforeImage: P3b, afterImage: P3a },
  [normalizeProjectKey('Atladara- Vadodara')]: { beforeImage: P4b, afterImage: P4a },
  [normalizeProjectKey('Poonamallee')]: { beforeImage: P5b, afterImage: P5a },
  [normalizeProjectKey('Vijayawada')]: { beforeImage: P6b, afterImage: P6a },
  // [normalizeProjectKey('Vairapalayam- Erode')]: { beforeImage: P7b, afterImage: P7a },
  [normalizeProjectKey('Pammal')]: { beforeImage: P8b, afterImage: P8a },
  [normalizeProjectKey('Sector 145 NOIDA')]: { beforeImage: P9b, afterImage: P9a },
  [normalizeProjectKey('Tirupati')]: { beforeImage: P10b, afterImage: P10a },
  [normalizeProjectKey('Chidambaram')]: { beforeImage: P11b, afterImage: P11a },
  [normalizeProjectKey('Pallavapuram')]: { beforeImage: P12b, afterImage: P12a },
  [normalizeProjectKey('Karaikudi')]: { beforeImage: P13b, afterImage: P13a },
  [normalizeProjectKey('Karur')]: { beforeImage: P14b, afterImage: P14a },
  // [normalizeProjectKey('Tambaram')]: { beforeImage: P15b, afterImage: P15a },
  // [normalizeProjectKey('Panchayankuppam- Cuddalore')]: { beforeImage: p16b, afterImage: p16a },  
  [normalizeProjectKey('Kollam')]: { beforeImage: p17b, afterImage: p17a },
  // [normalizeProjectKey('Paschim Boragaon- Guwahati')]: { beforeImage: p18b, afterImage: p18a },
  // [normalizeProjectKey('Perungudi- Chennai')]: { beforeImage: p19b, afterImage: p19a },
  [normalizeProjectKey('Muthusamy Colony')]: { beforeImage: p20b, afterImage: p20a },
  // [normalizeProjectKey('Kamiyanpettai- Cuddalore')]: { beforeImage: p21b, afterImage: p21a },
  [normalizeProjectKey('Dindigul')]: { beforeImage: p22b, afterImage: p22a },
  // [normalizeProjectKey('Tiruchirapalli- Phase 1')]: { beforeImage: p23b, afterImage: p23a },
  // [normalizeProjectKey('Tiruchirapalli- Phase 2')]: { beforeImage: p24b, afterImage: p24a },
  // [normalizeProjectKey('Makarpura- Vadodara- Phase 1')]: { beforeImage: p25b, afterImage: p25a },
  [normalizeProjectKey('Nagpur- Phase 1')]: { beforeImage: p26b, afterImage: p26a },
  // [normalizeProjectKey('Puducherry')]: { beforeImage: p28b, afterImage: p28a },
  [normalizeProjectKey('Noida -New')]: { beforeImage: p27b, afterImage: p27a },
};

const resolveProjectImages = (title: string) =>
  IMAGE_LOOKUP[normalizeProjectKey(title)] ?? { beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE };

const toCompletedProject = (row: CompletedProjectSheetRow, id: number): Project => {
  const title = row.title.trim();
  const state = normalizeState(row.state);
  const waste = toNumber(row.waste);
  const land = toNumber(row.land);
  const co2 = toNumber(row.co2);
  const periodStart = row.start?.trim() || 'Not available';
  const periodEnd = row.end?.trim() || 'Not available';
  const markers = splitCredibilityMarkers(row.credibility);
  const images = resolveProjectImages(title);
  const officialScope = OFFICIAL_SCOPE_BY_KEY[buildScopeKey(title, row.state)]?.trim();

  return {
    id,
    title,
    subtitle: 'Project Completed',
    state,
    desc: officialScope || `${title} legacy waste remediation project in ${state}.`,
    project: `Waste processed: ${formatMetricNumber(waste, 2)} m3. Land reclaimed: ${formatMetricNumber(land, 2)} acres.`,
    focus: `Project timeline: ${periodStart} to ${periodEnd}.`,
    outcome: `CO2 mitigated: ${formatMetricNumber(co2, 3)} MT.`,
    metrics: markers,
    waste,
    land,
    co2,
    beforeImage: images.beforeImage,
    afterImage: images.afterImage,
  };
};

const PROJECTS: Project[] = SHEET3_COMPLETED_ROWS.map((row, index) => toCompletedProject(row, index + 1));

// -- Counter hook -----------------------------------------------
const PROJECT_LIMITS = PROJECTS.reduce(
  (acc, p) => ({
    waste: Math.max(acc.waste, p.waste),
    land: Math.max(acc.land, p.land),
    co2: Math.max(acc.co2, p.co2),
  }),
  { waste: 1, land: 1, co2: 1 },
);

const formatIndian = (value: number) =>
  value.toLocaleString('en-IN', { maximumFractionDigits: value % 1 === 0 ? 0 : 1 });

const buildInteractiveMetrics = (project: Project): InteractiveMetric[] => {
  const status = project.subtitle.includes('Under Progress')
    ? 'In Progress'
    : project.subtitle.includes('Completed')
      ? 'Completed'
      : 'Active';
  const leadMetric = project.metrics[0] ?? project.outcome;

  return [
    {
      key: 'waste',
      label: 'Waste Processed',
      railValue: project.waste > 0 ? `${formatIndian(project.waste)} m3` : 'No data',
      eyebrow: 'Operations',
      title: 'Waste Processed',
      displayValue: project.waste > 0 ? formatIndian(project.waste) : '-',
      unit: 'CUBIC METERS',
      status,
      progress: Math.min(100, Math.round((project.waste / PROJECT_LIMITS.waste) * 100)),
      details: [
        { label: 'Project', value: project.project },
        { label: 'Location', value: `${project.title}, ${project.state}` },
        { label: 'Impact', value: leadMetric },
      ],
    },
    {
      key: 'land',
      label: 'Land Reclaimed',
      railValue: project.land > 0 ? `${formatIndian(project.land)} Acres` : 'No data',
      eyebrow: 'Restoration',
      title: 'Land Reclaimed',
      displayValue: project.land > 0 ? formatIndian(project.land) : '-',
      unit: 'ACRES RESTORED',
      status,
      progress: Math.min(100, Math.round((project.land / PROJECT_LIMITS.land) * 100)),
      details: [
        { label: 'Outcome', value: project.outcome },
        { label: 'Focus', value: project.focus },
        { label: 'Project Type', value: project.subtitle },
      ],
    },
    {
      key: 'co2',
      label: 'CO2 Mitigated',
      railValue: project.co2 > 0 ? `${formatIndian(project.co2)} MT` : 'No data',
      eyebrow: 'Climate',
      title: 'CO2 Mitigated',
      displayValue: project.co2 > 0 ? formatIndian(project.co2) : '-',
      unit: 'METRIC TONS',
      status,
      progress: Math.min(100, Math.round((project.co2 / PROJECT_LIMITS.co2) * 100)),
      details: [
        { label: 'Outcome', value: project.outcome },
        { label: 'Description', value: project.desc },
        { label: 'Benchmark', value: leadMetric },
      ],
    },
    {
      key: 'timeline',
      label: 'Project Timeline',
      railValue: project.focus.split('.').slice(0, 1).join('.').trim() || 'Schedule available',
      eyebrow: 'Timeline',
      title: 'Project Timeline',
      displayValue: project.subtitle.includes('Completed') ? '100' : '72',
      unit: 'SCHEDULE PROGRESS (%)',
      status,
      progress: project.subtitle.includes('Completed') ? 100 : 72,
      details: [
        { label: 'Focus', value: project.focus },
        { label: 'Project', value: project.project },
        { label: 'Status', value: project.subtitle },
      ],
    },
    {
      key: 'recovery',
      label: 'Project Status',
      railValue: project.metrics[1] ?? leadMetric,
      eyebrow: 'Efficiency',
      title: 'Project Status',
      displayValue: project.subtitle.includes('Completed') ? '100%' : status,
      unit: 'CURRENT PROJECT STAGE',
      status: project.metrics.length > 0 ? 'Above Benchmark' : status,
      progress: project.metrics.length > 0 ? 78 : 0,
      details: [
        { label: 'Key Metric', value: project.metrics[0] ?? project.outcome },
        { label: 'Reference', value: project.metrics[1] ?? project.project },
        { label: 'Project', value: project.title },
      ],
    },
  ];
};

const ComparisonSlider: React.FC<{ beforeSrc: string; afterSrc: string; revealed: boolean; onToggle: () => void }> = ({
  beforeSrc, afterSrc, revealed, onToggle,
}) => {
  const sliderPos = revealed ? '100%' : '15%';

  return (
    <div
      className="relative flex-1 min-h-[500px] h-full w-full cursor-pointer overflow-hidden select-none bg-slate-950"
      onClick={onToggle}
    >
      {/* After panel (base) */}
      <div className="absolute inset-0 z-[5]">
        <img
          src={afterSrc}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]"
          style={{ transform: revealed ? 'scale(1)' : 'scale(1.08)' }}
          draggable={false}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(310deg,rgba(0,40,10,.2) 0%,transparent 55%)' }} />
      </div>

      {/* Before panel (clipped overlay) */}
      <div
        className="absolute inset-0 z-[10] transition-all duration-[800ms]"
        style={{
          clipPath: `inset(0 calc(100% - ${sliderPos}) 0 0 round 0 ${revealed ? '0px' : '20px'} ${revealed ? '0px' : '20px'} 0)`,
          transition: 'clip-path 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <img
          src={beforeSrc}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]"
          style={{ transform: revealed ? 'scale(1.04)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(130deg,rgba(0,0,0,.25) 0%,transparent 55%)' }} />
      </div>

      {/* Shadow on before-panel edge */}
      <div
        className="absolute top-0 bottom-0 z-[11] pointer-events-none transition-all duration-[800ms]"
        style={{
          left: 0,
          width: sliderPos,
          boxShadow: revealed ? '-5px 0 22px rgba(0,0,0,.5)' : '10px 0 30px rgba(0,0,0,.4)',
          borderRadius: revealed ? '0' : '0 20px 20px 0',
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1), border-radius 0.8s, box-shadow 0.8s',
        }}
      />

      {/* Labels */}
      <span className="absolute left-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold  tracking-widest bg-black/50 border border-white/20 text-white backdrop-blur-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        Before
      </span>
      <span className="absolute right-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold  tracking-widest bg-primary/90 border border-white/20 text-white backdrop-blur-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        After
      </span>

      {/* Click hint */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[12] pointer-events-none rounded-full  p-1 text-[0.50rem] font-bold tracking-wide bg-black/60 text-white"
        style={{ opacity: revealed ? 0.5 : 0.85, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }}
      >
        {revealed ? 'Click to Hide' : 'Click to Reveal Before Image'}
      </span>
    </div>
  );
};

// -- ProjectCard ------------------------------------------------
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  total: number;
  onViewDetails: (id: number) => void;
}> = ({ project, index, total, onViewDetails }) => {
  const [revealed, setRevealed] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const metricItems = useMemo(() => buildInteractiveMetrics(project), [project]);
  const [activeMetric, setActiveMetric] = useState<MetricKey | null>(null);

  const currentMetric = metricItems.find((item) => item.key === activeMetric);

  const metaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveMetric(null);
    setDetailsOpen(false);
  }, [project.id, metricItems]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (metaRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMetaVisible(true); }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
      o.observe(metaRef.current);
      observers.push(o);
    }

    if (cardRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCardRevealed(true); o.disconnect(); } }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
      o.observe(cardRef.current);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <article id={`proj-${project.id}`} className="flex flex-col gap-4">
      <div
        ref={metaRef}
        className="flex text-left gap-2 flex-col md:flex-row md:items-center"
      >
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms',
          }}
        >
          <h2 className="text-3xl leading-tight text-slate-900 font-bold">{project.title}</h2>
        </div>
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms',
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {project.state}
          </span>
        </div>
      </div>

      <div
        ref={cardRef}
        className="flex flex-col lg:flex-row bg-card rounded-2xl overflow-hidden relative border border-border"
        style={{
          boxShadow: '0 16px 44px rgba(0,0,0,0.18)',
          opacity: cardRevealed ? 1 : 0,
          transform: cardRevealed ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms',
        }}
      >
        <div className="relative min-h-[500px] lg:flex-1">
          <ComparisonSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
            revealed={revealed}
            onToggle={() => setRevealed((r) => !r)}
          />

          <div
            className={`overflow-hidden border-t border-border transition-[max-height,opacity,transform] duration-500 lg:absolute lg:inset-y-0 lg:right-0 lg:z-20 lg:w-[30%] lg:border-l ${detailsOpen
              ? 'max-h-[650px] opacity-100 translate-y-0 lg:max-h-none lg:translate-x-0'
              : 'max-h-0 opacity-0 -translate-y-2 lg:max-h-none lg:translate-x-5 lg:translate-y-0 lg:pointer-events-none'
              }`}
            aria-hidden={!detailsOpen}
          >
            {currentMetric && (
              <div className="h-full p-6 text-foreground bg-background/95 backdrop-blur-sm relative">
                <button
                  type="button"
                  onClick={() => {
                    setDetailsOpen(false);
                    setActiveMetric(null);
                  }}
                  aria-label="Collapse metric details"
                  className="absolute right-4 top-4 h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mx-auto"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* <p className="text-[0.68rem] tracking-[0.2em] uppercase font-semibold text-primary mb-2">{currentMetric.eyebrow}</p> */}
                <h3 className="text-2xl font-semibold text-foreground leading-tight mb-4">{currentMetric.title}</h3>
                <p
                  className={`font-semibold text-primary mb-1 break-words ${
                    /[A-Za-z]/.test(currentMetric.displayValue)
                      ? 'text-3xl md:text-4xl leading-tight'
                      : 'text-5xl md:text-6xl leading-none'
                  }`}
                >
                  {currentMetric.displayValue}
                </p>
                <p className="text-sm tracking-[0.18em] text-muted-foreground">{currentMetric.unit}</p>

                <div className="mt-6 pt-5 border-t border-border space-y-3">
                  {currentMetric.details.map((item) => (
                    <div key={item.label} >
                      {/* <span className="text-muted-foreground">{item.label}</span> */}
                      <span className="text-foreground text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* <div className="mt-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-2">Metric Progress</p>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${currentMetric.progress}%` }}
                    />
                  </div>
                </div>

                <span className="mt-6 inline-flex rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-sm">
                  {currentMetric.status}
                </span> */}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[15.8%] lg:border-l">
          <div className="p-5 border-b border-border">
            <p className="text-lg font-semibold text-muted-foreground">Project Metrics</p>
            {/* <h4 className="text-2xl text-foreground font-medium mt-1">Impact Summary</h4> */}
          </div>

          <div className="flex flex-col">
            {metricItems.map((item) => {
              const isActive = item.key === activeMetric;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveMetric(item.key);
                    setDetailsOpen(true);
                  }}
                  className={`group border-b h-20 border-border text-left px-5 py-4 transition-colors ${isActive ? 'bg-primary/10' : 'hover:bg-muted/40'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-primary' : 'bg-muted-foreground/50'}`} /> */}
                      <span className={`text-base ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{item.label}</span>
                    </div>
                    <svg
                      className="h-4 w-4 text-muted-foreground group-hover:text-foreground"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </div>
                  {/* <p className={`mt-2 text-xs line-clamp-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{item.railValue}</p> */}
                </button>
              );
            })}
          </div>

          <div className="mt-auto p-5">
            <button
              type="button"
              onClick={() => onViewDetails(project.id)}
              className="w-full rounded-xl border border-primary text-primary font-semibold py-3 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Credibility Markers
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Modal 
const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '88vh', boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 pt-6 pb-4 bg-white border-b border-slate-100 lg:px-8">
          <div>
            <p className="text-[0.7rem] font-bold  text-slate-400 mb-1">{project.subtitle}</p>
            <h3 className="text-xl font-bold text-slate-900">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 transition-all duration-200 hover:bg-green-700 hover:text-white hover:border-green-700 hover:rotate-90 flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-6 py-5 lg:px-8">
          <p className="text-slate-600 leading-relaxed mb-6 text-[0.95rem]">{project.desc}</p>

          {project.metrics.length > 0 && (
            <div className="border-t border-slate-100 pt-5 mb-6">
              <p className="text-[0.75rem]  tracking-widest font-bold text-slate-400 mb-3">Credibility Markers</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.metrics.map((m, i) => (
                  <li key={i} className="bg-green-50 border-l-4 border-green-600 rounded-lg px-4 py-3 text-[0.85rem] font-medium text-slate-700 leading-snug">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Project', value: project.project },
              { label: 'Focus', value: project.focus },
              { label: 'Outcome', value: project.outcome },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all duration-200 hover:border-green-400 hover:-translate-y-1">
                <p className="text-sm  tracking-widest font-bold text-slate-400 mb-2">{label}</p>
                <p className="text-lg font-medium text-slate-800 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// -- Main Page --------------------------------------------------
interface CompletedProjectsProps {
  hideLayout?: boolean;
  showTabSwitcher?: boolean;
  activeTab?: 'completed' | 'ongoing';
  onTabChange?: (tab: 'completed' | 'ongoing') => void;
}

const CompletedProjects: React.FC<CompletedProjectsProps> = ({
  hideLayout = false,
  showTabSwitcher = false,
  activeTab = 'completed',
  onTabChange,
}) => {
  const STATES = Array.from(new Set(PROJECTS.map(p => p.state)));
  const [selectedState, setSelectedState] = useState(STATES[0] || '');
  const filteredProjects = PROJECTS.filter(p => p.state === selectedState);
  const [modalId, setModalId] = useState<number | null>(null);
  const stateNavTopClass = "top-[64px]";

  const activeProject = modalId !== null ? PROJECTS.find(p => p.id === modalId) ?? null : null;

  const handleStateSelect = useCallback((state: string) => {
    setSelectedState(state);
  }, []);

  useEffect(() => {
    const firstProject = filteredProjects[0];
    if (!firstProject) return;
    const el = document.getElementById(`proj-${firstProject.id}`);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + pageYOffset - 130, behavior: 'smooth' });
  }, [selectedState, filteredProjects]);

  return (
    <div className="min-h-screen bg-background">
      {/* shimmer keyframes */}
      <style>{`
        @keyframes barShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      {!hideLayout && <Header />}
      {/* State Filter */}
      <nav className={`sticky ${stateNavTopClass} p-2 pt-4 overflow-hidden border-y border-border bg-background/95 backdrop-blur z-40`}>
        <div className="max-w-[1400px] mx-auto px-[5%] py-2 flex flex-wrap items-center gap-3">
          <div className={`flex flex-wrap gap-2 ${showTabSwitcher ? "flex-1 justify-center md:justify-start" : "justify-center w-full"}`}>
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${selectedState === state
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
              >
                {state}
              </button>
            ))}
          </div>

          {showTabSwitcher && (
            <div className="relative ml-auto inline-grid grid-cols-2 rounded-full border border-border bg-muted/60 p-1">
              <span
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                  activeTab === 'ongoing' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
              <button
                type="button"
                onClick={() => onTabChange?.('completed')}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === 'completed'
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Completed
              </button>
              <button
                type="button"
                onClick={() => onTabChange?.('ongoing')}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === 'ongoing'
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Ongoing
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Projects list */}
      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
        {filteredProjects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={filteredProjects.length}
            onViewDetails={id => setModalId(id)}
          />
        ))}
      </main>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setModalId(null)} />
      )}

      {!hideLayout && <Footer />}
    </div>
  );
};

export default CompletedProjects;







