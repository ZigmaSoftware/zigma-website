export interface StateData {
  id: string;
  name: string;
  ongoing: number;
  completed: number;
  description: string;
  districts?: string[];
}

export const stateData: Record<string, StateData> = {
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    ongoing: 3,
    completed: 5,
    description: "Leading biomining initiatives in southern India.",
    districts: [
      "Tiruchirappalli (Trichy)",
      "Chidambaram",
      "Cuddalore",
      "Dindigul",
      "Karaikudi",
      "Karur",
      "Kumbakonam",
      "Pallavaram",
      "Pammal",
      "Perungudi Package-3",
      "Poonamallee",
      "Sembakkam",
      "Tambaram",
      "Sathya Sub",
      "Vairapalayam",
      "Vendipalayam",
      "Erode Muthusamy Colony",
      "Pondy",
      "Pudukottai",
    ],
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
    districts: ["Kollam", "Kochi"],
  },
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
    districts: ["Tirupati", "Vijayawada", "Vizag"],
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
    districts: ["Vadodara", "Makkarpura"],
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
    districts: ["Nagpur"],
  },
  assam: {
    id: "assam",
    name: "Assam",
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
    districts: [],
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    ongoing: 2,
    completed: 2,
    description: "Scaling landfill reclamation across key urban centers.",
    districts: ["Noida-54", "Noida-145 Old", "Noida-New"],
  },
};

export const legendItems = [
  { label: "Ongoing", color: "hsl(145, 63%, 32%)" },
  { label: "Completed", color: "#F59E0B" },
];
