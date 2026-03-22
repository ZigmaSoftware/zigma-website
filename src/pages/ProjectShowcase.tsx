import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ── Image imports ──────────────────────────────────────────────
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




// ── Types ──────────────────────────────────────────────────────
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

// ── Data ───────────────────────────────────────────────────────
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23e2e8f0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-family="Arial,sans-serif" font-size="40">Project Image Placeholder</text></svg>';

const PROJECTS: Project[] = [
  { id: 1, title: "Kumbakonam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Kumbakonam dumpsite reclamation project.", project: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.", focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280.", metrics: ["CO2 mitigated per square meter (MT): 2.39", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794", "Carbon sequestered by 1.43 lakh acres of US forests in one year", "GHG emissions avoided by 33 wind turbines running for a year", "Carbon emissions from 26,720 gasoline powered-passenger vehicles driven for one year"], waste: 231782, land: 12, co2: 116280, beforeImage: P1b, afterImage: P1a },
  { id: 2, title: "Sembakkam Lake", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Sembakkam Lake dumpsite reclamation project.", project: "Quantity: 38,026 cubic meter. Area reclaimed: 4 acres.", focus: "Project period: August 2017 - August 2018. Quantity of RDF disposed (MT): 7,316.", outcome: "CO2 mitigated by processing the legacy waste (MT): 15,823.", metrics: ["CO2 mitigated per square meter (MT): 0.98", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,229", "Carbon sequestered by 20,335 acres of US forests in one year", "GHG emissions avoided by 5 wind turbines running for a year", "Carbon emissions from 3,795 gasoline powered-passenger vehicles driven for one year"], waste: 38026, land: 4, co2: 15823, beforeImage: P2b, afterImage: P2a },
  { id: 3, title: "Noida Sector 54", subtitle: "Community Development Projects", state: "Uttar Pradesh", desc: "Award-winning project under the National Green Tribunal. Converted a neglected dumping ground into a state-of-the-art wetland area now frequented by thousands of visitors.", project: "Quantity: 99,665 metric tonnes. Area reclaimed: 4 acres.", focus: "Project period: December 2018 – July 2019. Quantity of RDF disposed: 15,498 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 68,698 metric tonnes.", metrics: ["CO2 mitigated per square metre: 4.26 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 2,604 metric tonnes", "Area of US forests carbon sequestered: 85,351 acres", "GHG emissions avoided: Running 20 wind turbines for a year", "Carbon emissions from 15,927 gasoline-powered passenger vehicles driven for one year"], waste: 99665, land: 4, co2: 68698, beforeImage: P3b, afterImage: P3a },
  { id: 4, title: "Vadodara-Atladara", subtitle: "Dumpsite Reclamation Project", state: "Gujarat", desc: "Removed the pollution source from the landfill on the banks of the Vishwamitri River, preserving the habitat of critically endangered gharials – an IUCN-protected species.", project: "Quantity: 4,21,187 cubic metres. Area reclaimed: 10.5 acres.", focus: "Project period: July 2018 – February 2021. Quantity of RDF disposed: 58,897 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,91,462 metric tonnes.", metrics: ["CO2 mitigated per square metre: 6.86 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 9,895 metric tonnes", "Area of US forests carbon sequestered in one year: 3.59 lakh acres", "GHG emissions avoided: Running 84 wind turbines for a year", "Carbon emissions from 67,061 gasoline-powered passenger vehicles driven for one year"], waste: 421187, land: 10.5, co2: 291462, beforeImage: P4b, afterImage: P4a },
  { id: 5, title: "Poonamallee", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Poonamallee dumpsite reclamation project.", project: "Quantity: 30,930 cubic meter. Area reclaimed: 3 acres.", focus: "Project period: July 2018 - September 2019. Quantity of RDF disposed (MT): 6,034.", outcome: "CO2 mitigated by processing the legacy waste (MT): 14,823.", metrics: ["CO2 mitigated per square meter (MT): 1.22", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,014", "Carbon sequestered by 18,886 acres of US forests in one year", "GHG emissions avoided by 4 wind turbines running for a year", "Carbon emissions from 3,524 gasoline powered-passenger vehicles"], waste: 30930, land: 3, co2: 14823, beforeImage: P5b, afterImage: P5a },
  { id: 6, title: "Vijayawada-Ajitsingh Nagar", subtitle: "Community Development Projects", state: "Andhra Pradesh", desc: "Reclaimed India's largest dump site spanning 45 acres. Over 2,500 apartments previously unoccupied were allocated to low-income groups through a slum rehabilitation programme.", project: "Quantity: 3,05,897 cubic metres. Area reclaimed: 45 acres.", focus: "Project period: July 2018 – July 2020. Quantity of RDF disposed: 47,178 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,11,681 metric tonnes.", metrics: ["CO2 mitigated by using RDF as alternate fuel resource: 7,926 tonnes", "Area of US forests carbon sequestered in one year: 2.61 lakh acres", "GHG emissions avoided: Running 61 wind turbines for a year", "Carbon emissions from 48,869 gasoline-powered passenger vehicles driven for one year"], waste: 305897, land: 45, co2: 211681, beforeImage: P6b, afterImage: P6a },
  { id: 7, title: "Erode-Vairapalayam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Reclaimed a 7-acre dumpsite on the banks of the Cauvery river. Now transformed into a Miyawaki forest. Winner of the prestigious Smart City award.", project: "Quantity: 1,25,092 cubic metres. Area reclaimed: 7 acres.", focus: "Project period: September 2019 – August 2021. Quantity of RDF disposed: 8,719 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 91,009 metric tonnes.", metrics: ["CO2 mitigated per square metre: 3.21 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 1,465 metric tonnes", "Area of US forests carbon sequestered in one year: 1.1 lakh acres", "GHG emissions avoided: Running 26 wind turbines for a year", "Carbon emissions from 20,578 gasoline-powered passenger vehicles driven for one year"], waste: 125092, land: 7, co2: 91009, beforeImage: P7b, afterImage: P7a },
  { id: 8, title: "Pammal", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Pammal dumpsite reclamation project.", project: "Quantity: 59,175 cubic meter. Area reclaimed: 2.4 acres.", focus: "Project period: August 2018 - August 2020. Quantity of RDF disposed (MT): 6,682.", outcome: "CO2 mitigated by processing the legacy waste (MT): 34,801.", metrics: ["CO2 mitigated per square meter (MT): 3.58", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,123", "Carbon sequestered by 42,840 acres of US forests in one year", "GHG emissions avoided by 10 wind turbines running for a year", "Carbon emissions from 7,994 gasoline powered-passenger vehicles"], waste: 59175, land: 2.4, co2: 34801, beforeImage: P8b, afterImage: P8a },
  { id: 9, title: "Noida Sector 145A", subtitle: "Dumpsite Reclamation Project", state: "Uttar Pradesh", desc: "Noida Sector 145 A dumpsite reclamation project.", project: "Quantity: 1,02,837 cubic meter. Area reclaimed: 6.2 acres.", focus: "Project period: July 2019 - August 2020. Quantity of RDF disposed (MT): 10,259.", outcome: "CO2 mitigated by processing the legacy waste (MT): 71,163.", metrics: ["CO2 mitigated per square meter (MT): 2.8", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,724", "Carbon sequestered by 86,919 acres of US forests in one year", "GHG emissions avoided by 20 wind turbines running for a year", "Carbon emissions from 16,220 gasoline powered-passenger vehicles driven for one year"], waste: 102837, land: 6.2, co2: 71163, beforeImage: P9b, afterImage: P9a },
  { id: 10, title: "Tirupathi", subtitle: "Surface Stabilization", state: "Andhra Pradesh", desc: "Stabilized the surface by leveling and clearing, reducing runoff issues.", project: "Surface stabilization and cleanup.", focus: "Leveling, drainage pathing, cleanup.", outcome: "Stable surface with reduced runoff.", metrics: [], waste: 0, land: 0, co2: 0, beforeImage: P10b, afterImage: P10a },
  { id: 11, title: "Chidambaram", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Chidambaram dumpsite reclamation project.", project: "Quantity: 52,000 cubic meter. Area reclaimed: 4 acres.", focus: "Project period: April 2019 - March 2021. Quantity of RDF disposed (MT): 4,804.", outcome: "CO2 mitigated by processing the legacy waste: 30,634.", metrics: ["CO2 mitigated per square meter (MT): 1.89", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 807", "Carbon sequestered by 37,494 acres of US forests in one year", "GHG emissions avoided by 9 wind turbines running for a year", "Carbon emissions from 6,997 gasoline powered-passenger vehicles driven for one year"], waste: 52000, land: 4, co2: 30634, beforeImage: P11b, afterImage: P11a },
  { id: 12, title: "Pallavaram", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Pallavaram dumpsite reclamation project.", project: "Quantity: 1,08,000 cubic meter. Area reclaimed: 5 acres.", focus: "Project period: Jan 2020 - Sept 2021. Quantity of RDF disposed (MT): 13,271.", outcome: "CO2 mitigated by processing the legacy waste (MT): 49,809.", metrics: ["CO2 mitigated per square meter (MT): 2.46", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,230", "Carbon sequestered by 62,057 acres of US forests in one year", "GHG emissions avoided by 15 wind turbines running for a year", "Carbon emissions from 11,580 gasoline powered-passenger vehicles driven for one year"], waste: 108000, land: 5, co2: 49809, beforeImage: P12b, afterImage: P12a },
  { id: 13, title: "Karaikudi", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Karaikudi dumpsite reclamation project.", project: "Quantity: 1,35,635 cubic meter. Area reclaimed: 13.75 acres.", focus: "Project period: Feb 2020 - Sept 2021. Quantity of RDF disposed (MT): 15,796.", outcome: "CO2 mitigated by processing the legacy waste (MT): 81,381.", metrics: ["CO2 mitigated per square meter (MT): 1.46", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,654", "Carbon sequestered by 1 lakh acres of US forests in one year", "GHG emissions avoided by 23 wind turbines running for a year", "Carbon emissions from 18,700 gasoline powered-passenger vehicles driven for one year"], waste: 135635, land: 13.75, co2: 81381, beforeImage: P13b, afterImage: P13a },
  { id: 14, title: "Karur", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Karur dumpsite reclamation project.", project: "Quantity: 1,37,394 cubic meter. Area reclaimed: 15 acres.", focus: "Project period: February 2020 - March 2021. Quantity of RDF disposed (MT): 6,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 90,461.", metrics: ["CO2 mitigated per square meter (MT): 1.49", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,106", "Carbon sequestered by 1.09 lakh acres of US forests in one year", "GHG emissions avoided by 26 wind turbines running for a year", "Carbon emissions from 20,376 gasoline powered-passenger vehicles driven for one year"], waste: 137394, land: 15, co2: 90461, beforeImage: P14b, afterImage: P14a },
  { id: 15, title: "Tambaram-Kannadapalayam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Tambaram-Kannadapalayam dumpsite reclamation project.", project: "Quantity: 1,50,494 cubic meter. Area reclaimed: 5 acres.", focus: "Project period: August 2019 - June 2022. Quantity of RDF disposed (MT): 24,841.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,18,362.", metrics: ["CO2 mitigated per square meter (MT): 5.85", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 4,173", "Carbon sequestered by 1.46 lakh acres of US forests in one year", "GHG emissions avoided by 34 wind turbines running for a year", "Carbon emissions from 27,268 gasoline powered-passenger vehicles driven for one year"], waste: 150494, land: 5, co2: 118362, beforeImage: P15b, afterImage: P15a },
  { id: 16, title: "Vizag", subtitle: "Project Completed", state: "AP", desc: "Vizag legacy waste project.", project: "Quantity: 250,046 tons. Area reclaimed: 25 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 48,143.", outcome: "Category: AP.", metrics: [], waste: 250046, land: 25, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 17, title: "Vizag New", subtitle: "Project Completed", state: "AP", desc: "Vizag New legacy waste project.", project: "Quantity: 435,057 tons. Area reclaimed: 10 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 94,725.", outcome: "Category: AP.", metrics: [], waste: 435057, land: 10, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 18, title: "GVMC Vizag", subtitle: "Project Under Progress", state: "AP", desc: "GVMC Vizag legacy waste project.", project: "Quantity: 246,939 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 42,045.", outcome: "Category: AP.", metrics: [], waste: 246939, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 19, title: "Cuddalore", subtitle: "Project Completed", state: "TN", desc: "Cuddalore legacy waste project.", project: "Quantity: 98,941 tons. Area reclaimed: 10 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 13,551.", outcome: "Category: TN.", metrics: [], waste: 98941, land: 10, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 20, title: "Dindigul", subtitle: "Project Completed", state: "TN", desc: "Dindigul legacy waste project.", project: "Quantity: 190,088 tons. Area reclaimed: 10 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 14,963.", outcome: "Category: TN.", metrics: [], waste: 190088, land: 10, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 21, title: "Perungudi Package-3", subtitle: "Project Completed", state: "TN", desc: "Perungudi Package-3 legacy waste project.", project: "Quantity: 489,150 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 111,672.", outcome: "Category: TN.", metrics: [], waste: 489150, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 22, title: "Perungudi Package-4", subtitle: "Project Under Progress", state: "TN", desc: "Perungudi Package-4 legacy waste project.", project: "Quantity: 453,829 tons. Area reclaimed: 90 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 98,934.", outcome: "Category: TN.", metrics: [], waste: 453829, land: 90, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 23, title: "Perungudi Package-5", subtitle: "Project Under Progress", state: "TN", desc: "Perungudi Package-5 legacy waste project.", project: "Quantity: 443,576 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 100,649.", outcome: "Category: TN.", metrics: [], waste: 443576, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 24, title: "Trichy", subtitle: "Project Completed", state: "TN", desc: "Trichy legacy waste project.", project: "Quantity: 619,925 tons. Area reclaimed: 38 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 97,386.", outcome: "Category: TN.", metrics: [], waste: 619925, land: 38, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 25, title: "Trichy New", subtitle: "Project Under Progress", state: "TN", desc: "Trichy New legacy waste project.", project: "Quantity: 289,621 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 95,786.", outcome: "Category: TN.", metrics: [], waste: 289621, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 26, title: "ITC", subtitle: "Project Under Progress", state: "TN", desc: "ITC legacy waste project.", project: "Quantity: 225,000 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 17,958.", outcome: "Category: TN.", metrics: [], waste: 225000, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 27, title: "Sathya Sub", subtitle: "Project Completed", state: "TN", desc: "Sathya Sub legacy waste project.", project: "Quantity: 25,097 tons. Area reclaimed: 6.2 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 1,917.", outcome: "Category: TN.", metrics: [], waste: 25097, land: 6.2, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 28, title: "Vendipalayam", subtitle: "Project Completed", state: "TN", desc: "Vendipalayam legacy waste project.", project: "Quantity: 575,960 tons. Area reclaimed: 20 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 70,739.", outcome: "Category: TN.", metrics: [], waste: 575960, land: 20, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 29, title: "Muthusamy Colony", subtitle: "Project Completed", state: "TN", desc: "Muthusamy Colony legacy waste project.", project: "Quantity: 18,819 tons. Area reclaimed: 3 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 1,613.", outcome: "Category: TN.", metrics: [], waste: 18819, land: 3, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 30, title: "KDG-PG1", subtitle: "Project Under Progress", state: "TN", desc: "KDG-PG1 legacy waste project.", project: "Quantity: 11,384 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 350.", outcome: "Category: TN.", metrics: [], waste: 11384, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 31, title: "KDG-PG3", subtitle: "Project Under Progress", state: "TN", desc: "KDG-PG3 legacy waste project.", project: "Quantity: 15,697 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 910.", outcome: "Category: TN.", metrics: [], waste: 15697, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 32, title: "Kollam", subtitle: "Project Completed", state: "Kerala", desc: "Kollam legacy waste project.", project: "Quantity: 92,605 tons. Area reclaimed: 4 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 13,522.", outcome: "Category: Kerala.", metrics: [], waste: 92605, land: 4, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 33, title: "Makkarpura", subtitle: "Project Completed", state: "Gujarat", desc: "Makkarpura legacy waste project.", project: "Quantity: 515,097 tons. Area reclaimed: 2 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 105,892.", outcome: "Category: Gujarat.", metrics: [], waste: 515097, land: 2, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 34, title: "Makkarpura-New", subtitle: "Project Under Progress", state: "Gujarat", desc: "Makkarpura-New legacy waste project.", project: "Quantity: 265,085 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 44,821.", outcome: "Category: Gujarat.", metrics: [], waste: 265085, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 35, title: "Nagpur", subtitle: "Project Completed", state: "MH", desc: "Nagpur legacy waste project.", project: "Quantity: 1,000,698 tons. Area reclaimed: 53 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 88,868.", outcome: "Category: MH.", metrics: [], waste: 1000698, land: 53, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 36, title: "Nagpur Smart City", subtitle: "Project Completed", state: "MH", desc: "Nagpur Smart City legacy waste project.", project: "Quantity: 600,015 tons. Area reclaimed: 8 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 122,423.", outcome: "Category: MH.", metrics: [], waste: 600015, land: 8, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 37, title: "NMC-Project 2", subtitle: "Project Under Progress", state: "MH", desc: "NMC-Project 2 legacy waste project.", project: "Quantity: 266,371 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 30,340.", outcome: "Category: MH.", metrics: [], waste: 266371, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 38, title: "Noida-145 Old", subtitle: "Project Completed", state: "UP", desc: "Noida-145 Old legacy waste project.", project: "Quantity: 102,838 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 10,259.", outcome: "Category: UP.", metrics: [], waste: 102838, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 39, title: "Noida-New", subtitle: "Project Completed", state: "UP", desc: "Noida-New legacy waste project.", project: "Quantity: 612,511 tons. Area reclaimed: 5 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 154,994.", outcome: "Category: UP.", metrics: [], waste: 612511, land: 5, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 40, title: "Pondy", subtitle: "Project Under Progress", state: "Pondy", desc: "Pondy legacy waste project.", project: "Quantity: 553,135 tons. Area reclaimed: 11 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 139,468.", outcome: "Category: Pondy.", metrics: [], waste: 553135, land: 11, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 41, title: "Pondy-2", subtitle: "Project Under Progress", state: "Pondy", desc: "Pondy-2 legacy waste project.", project: "Quantity: 349,345 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 0.", outcome: "Category: Pondy.", metrics: [], waste: 349345, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 42, title: "Guwahati", subtitle: "Project Under Progress", state: "Assam", desc: "Guwahati legacy waste project.", project: "Quantity: 410,907 tons. Area reclaimed: 2 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 117,158.", outcome: "Category: Assam.", metrics: [], waste: 410907, land: 2, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 43, title: "Gurugram", subtitle: "Project Under Progress", state: "Haryana", desc: "Gurugram legacy waste project.", project: "Quantity: 200,185 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 57,259.", outcome: "Category: Haryana.", metrics: [], waste: 200185, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 44, title: "TTD-Tirumala", subtitle: "Project Under Progress", state: "AP", desc: "TTD-Tirumala legacy waste project.", project: "Quantity: 182,881 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 8,175.", outcome: "Category: AP.", metrics: [], waste: 182881, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 45, title: "Pudukkottai", subtitle: "Project Completed", state: "TN", desc: "Pudukkottai legacy waste project.", project: "Quantity: 1,552 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 272.", outcome: "Category: TN.", metrics: [], waste: 1552, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
];

// ── Counter hook ───────────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current || target === 0) return;
    started.current = true;
    const isDecimal = target % 1 !== 0;
    let startTs: number | null = null;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  const target_ = target;
  const isDecimal = target_ % 1 !== 0;
  return isDecimal ? value.toFixed(1) : value.toLocaleString('en-IN');
}

// ── StatPill ───────────────────────────────────────────────────
const StatPill: React.FC<{ label: string; target: number; unit: string; active: boolean; delay?: number }> = ({
  label, target, unit, active, delay = 0,
}) => {
  const display = useCounter(target, active);
  return (
    <div
      className=" stat-pill flex flex-col items-center justify-center px-3 py-4 text-center flex-1 transition-all duration-500 hover:bg-muted/20"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.88)',
        transitionDelay: `${delay}ms`,
        transition: `opacity 0.55s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms, transform 0.55s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms`,
      }}
    >
      <span className="block text-[0.65rem]  tracking-widest font-bold text-muted-foreground mb-1">{label}</span>
      <strong className="block font-black leading-none text-primary" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)' }}>
        {target === 0 ? '—' : display}
      </strong>
      <span className="text-[0.65rem] font-semibold  tracking-wide text-muted-foreground mt-0.5">{unit}</span>
    </div>
  );
};

// ── ComparisonSlider ───────────────────────────────────────────
const ComparisonSlider: React.FC<{ beforeSrc: string; afterSrc: string; revealed: boolean; onToggle: () => void }> = ({
  beforeSrc, afterSrc, revealed, onToggle,
}) => {
  const sliderPos = revealed ? '100%' : '15%';

  return (
    <div
      className=" relative flex-1 min-h-[500px] cursor-pointer overflow-hidden select-none bg-slate-950"
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

// ── ProjectCard ────────────────────────────────────────────────
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  total: number;
  onViewDetails: (id: number) => void;
}> = ({ project, index, total, onViewDetails }) => {
  const [revealed, setRevealed] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const metaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasStats = project.waste > 0 || project.land > 0 || project.co2 > 0;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (metaRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMetaVisible(true); }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
      o.observe(metaRef.current); observers.push(o);
    }
    if (cardRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCardRevealed(true); o.disconnect(); } }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
      o.observe(cardRef.current); observers.push(o);
    }
    if (statsRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true); o.disconnect(); } }, { threshold: 0.25 });
      o.observe(statsRef.current); observers.push(o);
    }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <article id={`proj-${project.id}`} className="flex flex-col gap-4">
      {/* Meta */}
      <div
        ref={metaRef}
        className="flex text-left gap-2 flex-col md:flex-row "
      >
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms',
          }}
        >
          <h2 className=" text-3xl leading-tight text-slate-900 font-bold">
            {project.title}
          </h2>
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

      {/* Card */}
      <div
        ref={cardRef}
        className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden relative "
        style={{
          boxShadow: '0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
          opacity: cardRevealed ? 1 : 0,
          transform: cardRevealed ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms, box-shadow 0.3s',
        }}
      >


        {/* Comparison slider */}
        <ComparisonSlider
          beforeSrc={project.beforeImage}
          afterSrc={project.afterImage}
          revealed={revealed}
          onToggle={() => setRevealed(r => !r)}
        />

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="flex md:flex-col md:w-40 border-t md:border-t-0 md:border-l border-border bg-muted/20"
          style={{
            opacity: cardRevealed ? 1 : 0,
            transform: cardRevealed ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms',
          }}
        >
          {hasStats ? (
            <>
              <StatPill label="Waste Processed" target={project.waste} unit="m³" active={statsActive} delay={0} />
              <div className="h-px md:h-auto md:w-4/5 md:mx-auto bg-border/40 md:my-0 my-auto" style={{ minHeight: '1px' }} />
              <StatPill label="Land Reclaimed" target={project.land} unit="Acres" active={statsActive} delay={100} />
              <div className="h-px md:h-auto md:w-4/5 md:mx-auto bg-border/40 md:my-0 my-auto" style={{ minHeight: '1px' }} />
              <StatPill label="CO₂ Mitigated" target={project.co2} unit="MT" active={statsActive} delay={200} />
              <div className="h-px md:h-auto md:w-4/5 md:mx-auto bg-border/40 md:my-0 my-auto" style={{ minHeight: '1px' }} />
            </>
          ) : null}

          {/* View Details button */}
          <button
            type="button"
            onClick={() => onViewDetails(project.id)}
            className="mt-auto text-sm w-full flex items-center justify-center gap-3 py-4 px-6 bg-primary text-white font-semibold  tracking-wide border-t border-primary/30 transition-all duration-300"
          >
            View Details

            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

    </article>
  );
};

// ── Modal ──────────────────────────────────────────────────────
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

          {project.metrics.length > 0 && (
            <div className="border-t border-slate-100 pt-5">
              <p className="text-[0.75rem]  tracking-widest font-bold text-slate-400 mb-3">Key Metrics</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.metrics.map((m, i) => (
                  <li key={i} className="bg-green-50 border-l-4 border-green-600 rounded-lg px-4 py-3 text-[0.85rem] font-medium text-slate-700 leading-snug">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────
const ProjectShowcase: React.FC = () => {
  const STATES = Array.from(new Set(PROJECTS.map(p => p.state)));
  const [selectedState, setSelectedState] = useState(STATES[0] || '');
  const filteredProjects = PROJECTS.filter(p => p.state === selectedState);
  const [modalId, setModalId] = useState<number | null>(null);

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

      <Header />
      {/* State Filter */}
      <nav className="sticky top-[64px] p-3 overflow-hidden border-y border-slate-200 bg-white/95 backdrop-blur z-40">
        <div className="max-w-[1400px] mx-auto px-[5%] py-4 flex justify-center">

          <div className="flex flex-wrap justify-center gap-2.5">
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${selectedState === state
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

      <Footer />
    </div>
  );
};

export default ProjectShowcase;
