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
      "Trichy",
      "Chidambaram",
      "Cuddalore",
      "Dindigul",
      "Karaikudi",
      "Karur",
      "Kumbakonam",
      "Pallavaram",
      "Pammal",
      "Perungudi Package-3",
      "Perungudi Package-4",
      "Perungudi Package-5",
      "Poonamalle",
      "Sembakkam",
      "Tambaram",
      "Trichy New",
      "ITC",
      "Sathya Sub",
      "Vairapalayam",
      "Vendipalayam",
      "Erode Muthusamy Colony",
      "KDG-PG1",
      "KDG-PG3",
      "Pudukkottai",
    ],
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
    landfillMining: "Kollam",
    districts: ["Kollam - Landfill Mining Project", "Kochi - BSFL Project", "Kozhikode - Landfill Mining Project"],
  },
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
    landfillMining: "Vijayawada",
    bsflProject: "Tirupati",
    districts: ["Tirupati", "Vijayawada", "Vizag", "Vizag New", "GVMC Vizag", "TTD -Tirumala"],
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
    landfillMining: "Vadodara",
    bsflProject: "Makkarpura",
    districts: ["Makkarpura", "Makkarpura-New", "Vadodara"],
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
    landfillMining: "Nagpur",
    bsflProject: "Nagpur",
    districts: ["Nagpur", "Nagpur Smart City", "NMC-Project 2"],
  },
  assam: {
    id: "assam",
    name: "Assam",
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
    landfillMining: "Guwahati",
    districts: ["Guwahati"],
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    ongoing: 2,
    completed: 2,
    description: "Scaling landfill reclamation across key urban centers.",
    landfillMining: "Noida",
    bsflProject: "Noida",
    districts: ["Noida-54", "Noida-145 Old", "Noida-New"],
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
    districts: ["Pondy", "Pondy -2"],
  },
};

export const legendItems = [
  { label: "Ongoing", color: "hsl(145, 63%, 32%)" },
  { label: "Completed", color: "#F59E0B" },
];
