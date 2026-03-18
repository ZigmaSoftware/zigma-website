export interface StateData {
  id: string;
  name: string;
  ongoing: number;
  completed: number;
  description: string;
}

export const stateData: Record<string, StateData> = {
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    ongoing: 3,
    completed: 5,
    description: "Leading biomining initiatives in southern India.",
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
  },
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
  },
  assam: {
    id: "assam",
    name: "Assam",
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    ongoing: 2,
    completed: 2,
    description: "Scaling landfill reclamation across key urban centers.",
  },
  telangana: {
    id: "telangana",
    name: "Telangana",
    ongoing: 1,
    completed: 1,
    description: "New projects focused on sustainable waste recovery.",
  },
};

export const legendItems = [
  { label: "Ongoing", color: "hsl(145, 63%, 32%)" },
  { label: "Completed", color: "#F59E0B" },
];
