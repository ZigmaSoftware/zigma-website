export interface StateData {
  id: string;
  name: string;
  ongoing: number;
  completed: number;
  description: string;
  landfillMining?: string;
  bsflProject?: string;
  districts?: string[];
}

export const stateData: Record<string, StateData> = {
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    ongoing: 3,
    completed: 5,
    description: "Leading biomining initiatives in southern India.",
    landfillMining: "Kumbakonam",
    districts: [

      "Sembakkam - Chengalpattu",
      "Pammal - Chengalpattu",
      "Poonamallee - Tiruvallur",
      "Pallavaram - Chengalpattu",
      "Tambaram - Chengalpattu",
      "Perungudi - Chennai",
      "Kodungaiyur - Chennai",
      "Athipattu - Tiruvallur",
      "Vairapalayam - Erode",
      "Muthusamy Colony - Erode",
      "Vendipalayam - Erode",
      // "Sembakkam - Chennai",
      // "Pammal - Chennai",
      // "Poonamallee - Chennai",
      // "Pallavaram - Chennai",
      // "Kodungaiyur - Chennai",
      // "Athipattu - Chennai",
       
      "Chidambaram - Cuddalore",
      "Kammiyampettai - Cuddalore",
      "Pachayankuppam - Cuddalore",
      "Tambaram - Chennai",
      "Tiruchirappalli",
      "Perungudi - Chennai",
      "Kumbakonam - Thanjavur",
       "Keeramangalam - Pudukkottai",
      "Karaikudi  - Sivaganga",
      "Karur",
      "Dindigul",
    ],
  },
  Keralam: {
    id: "Keralam",
    name: "Keralam",
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
    landfillMining: "Kollam",
    bsflProject: "Kochi",
    districts: [
      "Kollam - Landfill Mining Project",
      "Kozhikode - Landfill Mining Project",
      "Kochi - BSFL Organic Waste Project",
    ],
  },
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
    landfillMining: "Vijayawada",
    bsflProject: "Tirupati",
    districts: [
      "Vijayawada",

      "Visakhapatnam",
      "Allipuram - Nellore",
      "Dhontali - Nellore",
      "B. Kothakota - Chittoor",

      "Kuppam - Chittoor",
      "Madanapalle -  Annamayya",
      "Palamaneru - Chittoor",
      "Punganur - Chittoor",
      "Nagari - Chittoor",
      "Puttur - Tirupati",
      "Srikalahasti - Tirupati",
      "Sullurpet - Tirupati",
      "Venkatagiri - Tirupati",

      "Gooty - Anantapur",
      "Guntakal - Anantapur",
      "Rayadurgam - Anantapur",

      "Atmakur - Nellore",
      "Buchireddypalem - Nellore",
      "Gudur - Nellore",
      "Kavali - Nellore",
      "Nayudupeta - Nellore",
    ],
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
    landfillMining: "Atladara",
    bsflProject: "Makarpura",
    districts: ["Atladara - Vadodara",
      "Makarpura - Vadodara"],
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
    landfillMining: "Nagpur",
    bsflProject: "Bhandewadi",
    districts: ["Bhandewadi - Nagpur",],
  },
  assam: {
    id: "assam",
    name: "Assam",
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
    landfillMining: "Guwahati",
    districts: ["Paschim Boragaon - Guwahati",
      "Belortol - Guwahati"],
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    ongoing: 2,
    completed: 2,
    description: "Scaling landfill reclamation across key urban centers.",
    landfillMining: "Noida",
    districts: [
      "  NOIDA -Sector 54",
      "  NOIDA -Sector 145"
    ],
  },
  haryana: {
    id: "haryana",
    name: "Haryana",
    ongoing: 1,
    completed: 0,
    description: "Urban landfill reclamation and waste processing initiatives.",
    landfillMining: "Gurugram",
    districts: ["Gurugram"],
  },
  puducherry: {
    id: "puducherry",
    name: "Puducherry",
    ongoing: 1,
    completed: 1,
    description: "Urban landfill reclamation and waste processing initiatives.",
    landfillMining: "Puducherry",
    districts: ["Puducherry"],
  },
};

export const legendItems = [
  { label: "Ongoing", color: "hsl(145, 63%, 32%)" },
  { label: "Completed", color: "#F59E0B" },
];
