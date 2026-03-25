import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';




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
const P1b = PLACEHOLDER_IMAGE; const P1a = PLACEHOLDER_IMAGE;
const P2b = PLACEHOLDER_IMAGE; const P2a = PLACEHOLDER_IMAGE;
const P3b = PLACEHOLDER_IMAGE; const P3a = PLACEHOLDER_IMAGE;
const P4b = PLACEHOLDER_IMAGE; const P4a = PLACEHOLDER_IMAGE;
const P5b = PLACEHOLDER_IMAGE; const P5a = PLACEHOLDER_IMAGE;
const P6b = PLACEHOLDER_IMAGE; const P6a = PLACEHOLDER_IMAGE;
const P7b = PLACEHOLDER_IMAGE; const P7a = PLACEHOLDER_IMAGE;
const P8b = PLACEHOLDER_IMAGE; const P8a = PLACEHOLDER_IMAGE;
const P9b = PLACEHOLDER_IMAGE; const P9a = PLACEHOLDER_IMAGE;
const P10b = PLACEHOLDER_IMAGE; const P10a = PLACEHOLDER_IMAGE;
const P11b = PLACEHOLDER_IMAGE; const P11a = PLACEHOLDER_IMAGE;
const P12b = PLACEHOLDER_IMAGE; const P12a = PLACEHOLDER_IMAGE;
const P13b = PLACEHOLDER_IMAGE; const P13a = PLACEHOLDER_IMAGE;
const P14b = PLACEHOLDER_IMAGE; const P14a = PLACEHOLDER_IMAGE;
const P15b = PLACEHOLDER_IMAGE; const P15a = PLACEHOLDER_IMAGE;

const PROJECTS: Project[] = [
  { id: 1, title: "Kumbakonam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Kumbakonam dumpsite reclamation project.", project: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.", focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280.", metrics: ["CO2 mitigated per square meter (MT): 2.39", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794", "Carbon sequestered by 1.43 lakh acres of US forests in one year", "GHG emissions avoided by 33 wind turbines running for a year", "Carbon emissions from 26,720 gasoline powered-passenger vehicles driven for one year"], waste: 231782, land: 12, co2: 116280, beforeImage: P1b, afterImage: P1a },
  { id: 2, title: "Sembakkam Lake", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Sembakkam Lake dumpsite reclamation project.", project: "Quantity: 38,026 cubic meter. Area reclaimed: 4 acres.", focus: "Project period: August 2017 - August 2018. Quantity of RDF disposed (MT): 7,316.", outcome: "CO2 mitigated by processing the legacy waste (MT): 15,823.", metrics: ["CO2 mitigated per square meter (MT): 0.98", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,229", "Carbon sequestered by 20,335 acres of US forests in one year", "GHG emissions avoided by 5 wind turbines running for a year", "Carbon emissions from 3,795 gasoline powered-passenger vehicles driven for one year"], waste: 38026, land: 4, co2: 15823, beforeImage: P2b, afterImage: P2a },
  { id: 3, title: "Noida Sector 54", subtitle: "Community Development Projects", state: "Uttar Pradesh", desc: "Award-winning project under the National Green Tribunal. Converted a neglected dumping ground into a state-of-the-art wetland area now frequented by thousands of visitors.", project: "Quantity: 99,665 metric tonnes. Area reclaimed: 4 acres.", focus: "Project period: December 2018 � July 2019. Quantity of RDF disposed: 15,498 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 68,698 metric tonnes.", metrics: ["CO2 mitigated per square metre: 4.26 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 2,604 metric tonnes", "Area of US forests carbon sequestered: 85,351 acres", "GHG emissions avoided: Running 20 wind turbines for a year", "Carbon emissions from 15,927 gasoline-powered passenger vehicles driven for one year"], waste: 99665, land: 4, co2: 68698, beforeImage: P3b, afterImage: P3a },
  { id: 4, title: "Vadodara-Atladara", subtitle: "Dumpsite Reclamation Project", state: "Gujarat", desc: "Removed the pollution source from the landfill on the banks of the Vishwamitri River, preserving the habitat of critically endangered gharials � an IUCN-protected species.", project: "Quantity: 4,21,187 cubic metres. Area reclaimed: 10.5 acres.", focus: "Project period: July 2018 � February 2021. Quantity of RDF disposed: 58,897 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,91,462 metric tonnes.", metrics: ["CO2 mitigated per square metre: 6.86 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 9,895 metric tonnes", "Area of US forests carbon sequestered in one year: 3.59 lakh acres", "GHG emissions avoided: Running 84 wind turbines for a year", "Carbon emissions from 67,061 gasoline-powered passenger vehicles driven for one year"], waste: 421187, land: 10.5, co2: 291462, beforeImage: P4b, afterImage: P4a },
  { id: 5, title: "Poonamallee", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Poonamallee dumpsite reclamation project.", project: "Quantity: 30,930 cubic meter. Area reclaimed: 3 acres.", focus: "Project period: July 2018 - September 2019. Quantity of RDF disposed (MT): 6,034.", outcome: "CO2 mitigated by processing the legacy waste (MT): 14,823.", metrics: ["CO2 mitigated per square meter (MT): 1.22", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,014", "Carbon sequestered by 18,886 acres of US forests in one year", "GHG emissions avoided by 4 wind turbines running for a year", "Carbon emissions from 3,524 gasoline powered-passenger vehicles"], waste: 30930, land: 3, co2: 14823, beforeImage: P5b, afterImage: P5a },
  { id: 6, title: "Vijayawada-Ajitsingh Nagar", subtitle: "Community Development Projects", state: "Andhra Pradesh", desc: "Reclaimed India's largest dump site spanning 45 acres. Over 2,500 apartments previously unoccupied were allocated to low-income groups through a slum rehabilitation programme.", project: "Quantity: 3,05,897 cubic metres. Area reclaimed: 45 acres.", focus: "Project period: July 2018 � July 2020. Quantity of RDF disposed: 47,178 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,11,681 metric tonnes.", metrics: ["CO2 mitigated by using RDF as alternate fuel resource: 7,926 tonnes", "Area of US forests carbon sequestered in one year: 2.61 lakh acres", "GHG emissions avoided: Running 61 wind turbines for a year", "Carbon emissions from 48,869 gasoline-powered passenger vehicles driven for one year"], waste: 305897, land: 45, co2: 211681, beforeImage: P6b, afterImage: P6a },
  { id: 7, title: "Erode-Vairapalayam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Reclaimed a 7-acre dumpsite on the banks of the Cauvery river. Now transformed into a Miyawaki forest. Winner of the prestigious Smart City award.", project: "Quantity: 1,25,092 cubic metres. Area reclaimed: 7 acres.", focus: "Project period: September 2019 � August 2021. Quantity of RDF disposed: 8,719 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 91,009 metric tonnes.", metrics: ["CO2 mitigated per square metre: 3.21 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 1,465 metric tonnes", "Area of US forests carbon sequestered in one year: 1.1 lakh acres", "GHG emissions avoided: Running 26 wind turbines for a year", "Carbon emissions from 20,578 gasoline-powered passenger vehicles driven for one year"], waste: 125092, land: 7, co2: 91009, beforeImage: P7b, afterImage: P7a },
  { id: 8, title: "Pammal", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Pammal dumpsite reclamation project.", project: "Quantity: 59,175 cubic meter. Area reclaimed: 2.4 acres.", focus: "Project period: August 2018 - August 2020. Quantity of RDF disposed (MT): 6,682.", outcome: "CO2 mitigated by processing the legacy waste (MT): 34,801.", metrics: ["CO2 mitigated per square meter (MT): 3.58", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,123", "Carbon sequestered by 42,840 acres of US forests in one year", "GHG emissions avoided by 10 wind turbines running for a year", "Carbon emissions from 7,994 gasoline powered-passenger vehicles"], waste: 59175, land: 2.4, co2: 34801, beforeImage: P8b, afterImage: P8a },
  { id: 9, title: "Noida Sector 145A", subtitle: "Dumpsite Reclamation Project", state: "Uttar Pradesh", desc: "Noida Sector 145 A dumpsite reclamation project.", project: "Quantity: 1,02,837 cubic meter. Area reclaimed: 6.2 acres.", focus: "Project period: July 2019 - August 2020. Quantity of RDF disposed (MT): 10,259.", outcome: "CO2 mitigated by processing the legacy waste (MT): 71,163.", metrics: ["CO2 mitigated per square meter (MT): 2.8", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,724", "Carbon sequestered by 86,919 acres of US forests in one year", "GHG emissions avoided by 20 wind turbines running for a year", "Carbon emissions from 16,220 gasoline powered-passenger vehicles driven for one year"], waste: 102837, land: 6.2, co2: 71163, beforeImage: P9b, afterImage: P9a },
  { id: 10, title: "Tirupathi", subtitle: "Surface Stabilization", state: "Andhra Pradesh", desc: "Stabilized the surface by leveling and clearing, reducing runoff issues.", project: "Surface stabilization and cleanup.", focus: "Leveling, drainage pathing, cleanup.", outcome: "Stable surface with reduced runoff.", metrics: [], waste: 0, land: 0, co2: 0, beforeImage: P10b, afterImage: P10a },
  { id: 11, title: "Chidambaram", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Chidambaram dumpsite reclamation project.", project: "Quantity: 52,000 cubic meter. Area reclaimed: 4 acres.", focus: "Project period: April 2019 - March 2021. Quantity of RDF disposed (MT): 4,804.", outcome: "CO2 mitigated by processing the legacy waste: 30,634.", metrics: ["CO2 mitigated per square meter (MT): 1.89", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 807", "Carbon sequestered by 37,494 acres of US forests in one year", "GHG emissions avoided by 9 wind turbines running for a year", "Carbon emissions from 6,997 gasoline powered-passenger vehicles driven for one year"], waste: 52000, land: 4, co2: 30634, beforeImage: P11b, afterImage: P11a },
  { id: 12, title: "Pallavaram", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Pallavaram dumpsite reclamation project.", project: "Quantity: 1,08,000 cubic meter. Area reclaimed: 5 acres.", focus: "Project period: Jan 2020 - Sept 2021. Quantity of RDF disposed (MT): 13,271.", outcome: "CO2 mitigated by processing the legacy waste (MT): 49,809.", metrics: ["CO2 mitigated per square meter (MT): 2.46", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,230", "Carbon sequestered by 62,057 acres of US forests in one year", "GHG emissions avoided by 15 wind turbines running for a year", "Carbon emissions from 11,580 gasoline powered-passenger vehicles driven for one year"], waste: 108000, land: 5, co2: 49809, beforeImage: P12b, afterImage: P12a },
  { id: 13, title: "Karaikudi", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Karaikudi dumpsite reclamation project.", project: "Quantity: 1,35,635 cubic meter. Area reclaimed: 13.75 acres.", focus: "Project period: Feb 2020 - Sept 2021. Quantity of RDF disposed (MT): 15,796.", outcome: "CO2 mitigated by processing the legacy waste (MT): 81,381.", metrics: ["CO2 mitigated per square meter (MT): 1.46", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,654", "Carbon sequestered by 1 lakh acres of US forests in one year", "GHG emissions avoided by 23 wind turbines running for a year", "Carbon emissions from 18,700 gasoline powered-passenger vehicles driven for one year"], waste: 135635, land: 13.75, co2: 81381, beforeImage: P13b, afterImage: P13a },
  { id: 14, title: "Karur", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Karur dumpsite reclamation project.", project: "Quantity: 1,37,394 cubic meter. Area reclaimed: 15 acres.", focus: "Project period: February 2020 - March 2021. Quantity of RDF disposed (MT): 6,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 90,461.", metrics: ["CO2 mitigated per square meter (MT): 1.49", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,106", "Carbon sequestered by 1.09 lakh acres of US forests in one year", "GHG emissions avoided by 26 wind turbines running for a year", "Carbon emissions from 20,376 gasoline powered-passenger vehicles driven for one year"], waste: 137394, land: 15, co2: 90461, beforeImage: P14b, afterImage: P14a },
  { id: 15, title: "Tambaram-Kannadapalayam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Tambaram-Kannadapalayam dumpsite reclamation project.", project: "Quantity: 1,50,494 cubic meter. Area reclaimed: 5 acres.", focus: "Project period: August 2019 - June 2022. Quantity of RDF disposed (MT): 24,841.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,18,362.", metrics: ["CO2 mitigated per square meter (MT): 5.85", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 4,173", "Carbon sequestered by 1.46 lakh acres of US forests in one year", "GHG emissions avoided by 34 wind turbines running for a year", "Carbon emissions from 27,268 gasoline powered-passenger vehicles driven for one year"], waste: 150494, land: 5, co2: 118362, beforeImage: P15b, afterImage: P15a },
  { id: 16, title: "Vizag", subtitle: "Project Completed", state: "Andhra Pradesh", desc: "Vizag legacy waste project.", project: "Quantity: 250,046 tons. Area reclaimed: 25 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 48,143.", outcome: "Category: AP.", metrics: [], waste: 250046, land: 25, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 17, title: "Vizag New", subtitle: "Project Completed", state: "Andhra Pradesh", desc: "Vizag New legacy waste project.", project: "Quantity: 435,057 tons. Area reclaimed: 10 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 94,725.", outcome: "Category: AP.", metrics: [], waste: 435057, land: 10, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 18, title: "GVMC Vizag", subtitle: "Project Under Progress", state: "Andhra Pradesh", desc: "GVMC Vizag legacy waste project.", project: "Quantity: 246,939 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 42,045.", outcome: "Category: AP.", metrics: [], waste: 246939, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 19, title: "Cuddalore", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Cuddalore legacy waste project.", project: "Quantity: 98,941 tons. Area reclaimed: 10 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 13,551.", outcome: "Category: TN.", metrics: [], waste: 98941, land: 10, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 20, title: "Dindigul", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Dindigul legacy waste project.", project: "Quantity: 190,088 tons. Area reclaimed: 10 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 14,963.", outcome: "Category: TN.", metrics: [], waste: 190088, land: 10, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 21, title: "Perungudi Package-3", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Perungudi Package-3 legacy waste project.", project: "Quantity: 489,150 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 111,672.", outcome: "Category: TN.", metrics: [], waste: 489150, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 22, title: "Perungudi Package-4", subtitle: "Project Under Progress", state: "Tamil Nadu", desc: "Perungudi Package-4 legacy waste project.", project: "Quantity: 453,829 tons. Area reclaimed: 90 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 98,934.", outcome: "Category: TN.", metrics: [], waste: 453829, land: 90, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 23, title: "Perungudi Package-5", subtitle: "Project Under Progress", state: "Tamil Nadu", desc: "Perungudi Package-5 legacy waste project.", project: "Quantity: 443,576 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 100,649.", outcome: "Category: TN.", metrics: [], waste: 443576, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 24, title: "Trichy", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Trichy legacy waste project.", project: "Quantity: 619,925 tons. Area reclaimed: 38 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 97,386.", outcome: "Category: TN.", metrics: [], waste: 619925, land: 38, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 25, title: "Trichy New", subtitle: "Project Under Progress", state: "Tamil Nadu", desc: "Trichy New legacy waste project.", project: "Quantity: 289,621 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 95,786.", outcome: "Category: TN.", metrics: [], waste: 289621, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 26, title: "ITC", subtitle: "Project Under Progress", state: "Tamil Nadu", desc: "ITC legacy waste project.", project: "Quantity: 225,000 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 17,958.", outcome: "Category: TN.", metrics: [], waste: 225000, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 27, title: "Sathya Sub", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Sathya Sub legacy waste project.", project: "Quantity: 25,097 tons. Area reclaimed: 6.2 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 1,917.", outcome: "Category: TN.", metrics: [], waste: 25097, land: 6.2, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 28, title: "Vendipalayam", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Vendipalayam legacy waste project.", project: "Quantity: 575,960 tons. Area reclaimed: 20 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 70,739.", outcome: "Category: TN.", metrics: [], waste: 575960, land: 20, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 29, title: "Muthusamy Colony", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Muthusamy Colony legacy waste project.", project: "Quantity: 18,819 tons. Area reclaimed: 3 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 1,613.", outcome: "Category: TN.", metrics: [], waste: 18819, land: 3, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 30, title: "KDG-PG1", subtitle: "Project Under Progress", state: "Tamil Nadu", desc: "KDG-PG1 legacy waste project.", project: "Quantity: 11,384 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 350.", outcome: "Category: TN.", metrics: [], waste: 11384, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 31, title: "KDG-PG3", subtitle: "Project Under Progress", state: "Tamil Nadu", desc: "KDG-PG3 legacy waste project.", project: "Quantity: 15,697 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 910.", outcome: "Category: TN.", metrics: [], waste: 15697, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 32, title: "Kollam", subtitle: "Project Completed", state: "Kerala", desc: "Kollam legacy waste project.", project: "Quantity: 92,605 tons. Area reclaimed: 4 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 13,522.", outcome: "Category: Kerala.", metrics: [], waste: 92605, land: 4, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 33, title: "Makkarpura", subtitle: "Project Completed", state: "Gujarat", desc: "Makkarpura legacy waste project.", project: "Quantity: 515,097 tons. Area reclaimed: 2 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 105,892.", outcome: "Category: Gujarat.", metrics: [], waste: 515097, land: 2, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 34, title: "Makkarpura-New", subtitle: "Project Under Progress", state: "Gujarat", desc: "Makkarpura-New legacy waste project.", project: "Quantity: 265,085 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 44,821.", outcome: "Category: Gujarat.", metrics: [], waste: 265085, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 35, title: "Nagpur", subtitle: "Project Completed", state: "Maharashtra", desc: "Nagpur legacy waste project.", project: "Quantity: 1,000,698 tons. Area reclaimed: 53 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 88,868.", outcome: "Category: MH.", metrics: [], waste: 1000698, land: 53, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 36, title: "Nagpur Smart City", subtitle: "Project Completed", state: "Maharashtra", desc: "Nagpur Smart City legacy waste project.", project: "Quantity: 600,015 tons. Area reclaimed: 8 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 122,423.", outcome: "Category: MH.", metrics: [], waste: 600015, land: 8, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 37, title: "NMC-Project 2", subtitle: "Project Under Progress", state: "Maharashtra", desc: "NMC-Project 2 legacy waste project.", project: "Quantity: 266,371 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 30,340.", outcome: "Category: MH.", metrics: [], waste: 266371, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 38, title: "Noida-145 Old", subtitle: "Project Completed", state: "Uttar Pradesh", desc: "Noida-145 Old legacy waste project.", project: "Quantity: 102,838 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 10,259.", outcome: "Category: UP.", metrics: [], waste: 102838, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 39, title: "Noida-New", subtitle: "Project Completed", state: "Uttar Pradesh", desc: "Noida-New legacy waste project.", project: "Quantity: 612,511 tons. Area reclaimed: 5 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 154,994.", outcome: "Category: UP.", metrics: [], waste: 612511, land: 5, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 40, title: "Pondy", subtitle: "Project Under Progress", state: "Puducherry", desc: "Pondy legacy waste project.", project: "Quantity: 553,135 tons. Area reclaimed: 11 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 139,468.", outcome: "Category: Pondy.", metrics: [], waste: 553135, land: 11, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 41, title: "Pondy-2", subtitle: "Project Under Progress", state: "Puducherry", desc: "Pondy-2 legacy waste project.", project: "Quantity: 349,345 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 0.", outcome: "Category: Pondy.", metrics: [], waste: 349345, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 42, title: "Guwahati", subtitle: "Project Under Progress", state: "Assam", desc: "Guwahati legacy waste project.", project: "Quantity: 410,907 tons. Area reclaimed: 2 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 117,158.", outcome: "Category: Assam.", metrics: [], waste: 410907, land: 2, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 43, title: "Gurugram", subtitle: "Project Under Progress", state: "Haryana", desc: "Gurugram legacy waste project.", project: "Quantity: 200,185 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 57,259.", outcome: "Category: Haryana.", metrics: [], waste: 200185, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 44, title: "TTD-Tirumala", subtitle: "Project Under Progress", state: "Andhra Pradesh", desc: "TTD-Tirumala legacy waste project.", project: "Quantity: 182,881 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 8,175.", outcome: "Category: AP.", metrics: [], waste: 182881, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
  { id: 45, title: "Pudukkottai", subtitle: "Project Completed", state: "Tamil Nadu", desc: "Pudukkottai legacy waste project.", project: "Quantity: 1,552 tons. Area reclaimed: 0 acres.", focus: "Project status: Project Completed. Quantity of RDF disposed (tons): 272.", outcome: "Category: TN.", metrics: [], waste: 1552, land: 0, co2: 0, beforeImage: PLACEHOLDER_IMAGE, afterImage: PLACEHOLDER_IMAGE },
];

const ONGOING_TITLES = [
  "Vizag New",
  "GVMC Vizag",
  "Makkarpura-New",
  "Perungudi Package-4",
  "Perungudi Package-5",
  "Trichy New",
  "ITC",
  "Nagpur Smart City",
  "NMC-Project 2",
  "Pondy-2",
  "Guwahati",
  "Gurugram",
  "TTD-Tirumala",
  "KDG-PG1",
  "KDG-PG3",
] as const;

const ONGOING_OVERRIDES: Record<string, Partial<Project>> = {
  "Vizag New": {
    subtitle: "Project Under Progress",
    project: "Quantity: 435,057 tons. Area reclaimed: 10 acres.",
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 94,725.",
    outcome: "Category: AP.",
    waste: 435057,
    land: 10,
  },
  "GVMC Vizag": {
    title: "GVMC-Vizag",
    subtitle: "Project Under Progress",
    project: "Quantity: 246,939 tons. Area reclaimed: 0 acres.",
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 42,045.",
    outcome: "Category: AP.",
    waste: 246939,
    land: 0,
  },
  "Makkarpura-New": {
    title: "Makarpura-New",
    subtitle: "Project Under Progress",
    project: "Quantity: 265,085 tons. Area reclaimed: 0 acres.",
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 44,821.",
    outcome: "Category: Gujarat.",
    waste: 265085,
    land: 0,
  },
  "Perungudi Package-4": {
    subtitle: "Project Under Progress",
    project: "Area to be reclaimed: 22.36 acres. Order quantity: 552,321 cu.m.",
    focus: "Processed quantity: 453,829 tons. RDF disposed quantity: 98,934 tons.",
    waste: 453829,
    land: 22.36,
  },
  "Perungudi Package-5": {
    subtitle: "Project Under Progress",
    project: "Area to be reclaimed: 38.31 acres. Order quantity: 587,130 cu.m.",
    focus: "Processed quantity: 443,576 tons. RDF disposed quantity: 100,649 tons.",
    waste: 443576,
    land: 38.31,
  },
  "Trichy New": {
    subtitle: "Project Under Progress",
    waste: 289621,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 95,786.",
  },
  ITC: {
    subtitle: "Project Under Progress",
    waste: 225000,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 17,958.",
  },
  "Nagpur Smart City": {
    subtitle: "Project Under Progress",
    waste: 600015,
    land: 8,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 122,423.",
  },
  "NMC-Project 2": {
    subtitle: "Project Under Progress",
    waste: 266371,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 30,340.",
  },
  "Pondy-2": {
    subtitle: "Project Under Progress",
    waste: 349345,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 0.",
  },
  Guwahati: {
    subtitle: "Project Under Progress",
    project: "Area to be reclaimed: 40 acres. Order quantity: 150,000 MT.",
    focus: "Processed quantity: 410,907 tons. RDF disposed quantity: 117,158 tons.",
    waste: 410907,
    land: 40,
  },
  Gurugram: {
    subtitle: "Project Under Progress",
    project: "Order quantity: 200,000 MT.",
    focus: "Processed quantity: 200,185 tons. RDF disposed quantity: 57,259 tons.",
    waste: 200185,
    land: 0,
  },
  "TTD-Tirumala": {
    title: "TTD -Tirumala",
    subtitle: "Project Under Progress",
    waste: 182881,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 8,175.",
  },
  "KDG-PG1": {
    subtitle: "Project Under Progress",
    waste: 11384,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 350.",
  },
  "KDG-PG3": {
    subtitle: "Project Under Progress",
    waste: 15697,
    land: 0,
    focus: "Project status: Project Under Progress. Quantity of RDF disposed (tons): 910.",
  },
};

const ONGOING_PROJECTS: Project[] = PROJECTS
  .filter((project) => ONGOING_TITLES.includes(project.title as (typeof ONGOING_TITLES)[number]))
  .map((project) => ({
    ...project,
    ...(ONGOING_OVERRIDES[project.title] ?? {}),
  }));

// -- Counter hook -----------------------------------------------
const PROJECT_LIMITS = ONGOING_PROJECTS.reduce(
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
      label: 'Recovery Rate',
      railValue: project.metrics[1] ?? leadMetric,
      eyebrow: 'Efficiency',
      title: 'Material Recovery Rate',
      displayValue: project.metrics.length > 0 ? '78.4' : '-',
      unit: 'PERCENT OF TOTAL WASTE',
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
  const [activeMetric, setActiveMetric] = useState<MetricKey>(metricItems[0]?.key ?? 'waste');

  const currentMetric = metricItems.find((item) => item.key === activeMetric) ?? metricItems[0];

  const metaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveMetric(metricItems[0]?.key ?? 'waste');
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
                  onClick={() => setDetailsOpen(false)}
                  aria-label="Collapse metric details"
                  className="absolute right-4 top-4 h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mx-auto"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* <p className="text-[0.68rem] tracking-[0.2em] uppercase font-semibold text-primary mb-2">{currentMetric.eyebrow}</p> */}
                <h3 className="text-2xl font-semibold text-foreground leading-tight mb-4">{currentMetric.title}</h3>
                <p className="text-6xl font-semibold leading-none text-primary mb-1">{currentMetric.displayValue}</p>            
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

        <div className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[15=8%] lg:border-l">
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
              View Full Report
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

// -- Main Page --------------------------------------------------
const ProjectShowcase: React.FC = () => {
  const STATES = Array.from(new Set(ONGOING_PROJECTS.map(p => p.state)));
  const [selectedState, setSelectedState] = useState(STATES[0] || '');
  const filteredProjects = ONGOING_PROJECTS.filter(p => p.state === selectedState);
  const [modalId, setModalId] = useState<number | null>(null);

  const activeProject = modalId !== null ? ONGOING_PROJECTS.find(p => p.id === modalId) ?? null : null;

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
      <nav className="sticky top-[64px]  p-2 pt-4 overflow-hidden border-y border-border bg-background/95 backdrop-blur z-40">
        <div className="max-w-[1400px] mx-auto px-[5%] py-2 flex justify-center">

          <div className="flex flex-wrap justify-center gap-2">
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






