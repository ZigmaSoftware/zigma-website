export interface PlantLocation {
  name: string;
  type: "integrated" | "grinding" | "blending" | "bulk-terminal";
  brand: "ACC" | "Ambuja" | "Sanghi" | "Penna" | "Orient" | "ACIL" | "Asian";
}

export interface StateData {
  id: string;
  name: string;
  plants: PlantLocation[];
}

export const stateData: Record<string, StateData> = {
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    plants: [
      { name: "Vizag", type: "blending", brand: "ACC" },
      { name: "Krishnapatnam", type: "grinding", brand: "Penna" },
      { name: "Boyareddypalli", type: "integrated", brand: "Penna" },
      { name: "Talaricheruvu", type: "integrated", brand: "Penna" },
    ],
  },
  chhattisgarh: {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    plants: [
      { name: "Jamul", type: "integrated", brand: "ACC" },
      { name: "Bhatapara", type: "integrated", brand: "Ambuja" },
    ],
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    plants: [
      { name: "Sanghi, Kutch", type: "integrated", brand: "Sanghi" },
      { name: "Ambujanagar", type: "integrated", brand: "Ambuja" },
      { name: "Dahej", type: "grinding", brand: "ACIL" },
      { name: "Surat (Magdalla)", type: "bulk-terminal", brand: "Ambuja" },
      { name: "Navlakhi", type: "bulk-terminal", brand: "Sanghi" },
      { name: "Muldwarka", type: "bulk-terminal", brand: "Ambuja" },
    ],
  },
  "himachal-pradesh": {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    plants: [
      { name: "Gagal", type: "integrated", brand: "ACC" },
      { name: "Darlaghat (Suli)", type: "integrated", brand: "Ambuja" },
      { name: "Nalagarh", type: "grinding", brand: "Ambuja" },
    ],
  },
  jharkhand: {
    id: "jharkhand",
    name: "Jharkhand",
    plants: [
      { name: "Chaibasa", type: "integrated", brand: "ACC" },
      { name: "Sindri, Dhanbad", type: "grinding", brand: "ACC" },
    ],
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka",
    plants: [
      { name: "Kalaburagi", type: "integrated", brand: "ACC" },
      { name: "Wadi 1 & 2", type: "integrated", brand: "ACC" },
      { name: "Kudithini (Bellary)", type: "grinding", brand: "ACC" },
      { name: "Thondebhavi (Kolar)", type: "grinding", brand: "ACC" },
    ],
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    plants: [
      { name: "Cochin", type: "bulk-terminal", brand: "Ambuja" },
    ],
  },
  "madhya-pradesh": {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    plants: [
      { name: "Kymore", type: "integrated", brand: "ACC" },
      { name: "Ametha", type: "integrated", brand: "ACC" },
    ],
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    plants: [
      { name: "Jalgaon", type: "integrated", brand: "Orient" },
      { name: "Chanda", type: "integrated", brand: "ACC" },
      { name: "Maratha, Solapur", type: "integrated", brand: "Ambuja" },
      { name: "Patas", type: "grinding", brand: "Ambuja" },
      { name: "Panvel, BCT", type: "bulk-terminal", brand: "Ambuja" },
    ],
  },
  odisha: {
    id: "odisha",
    name: "Odisha",
    plants: [
      { name: "Bargarh", type: "integrated", brand: "ACC" },
      { name: "Gopalpur", type: "bulk-terminal", brand: "Penna" },
    ],
  },
  punjab: {
    id: "punjab",
    name: "Punjab",
    plants: [
      { name: "Asian Rajpura", type: "grinding", brand: "ACC" },
      { name: "Ropar", type: "grinding", brand: "Ambuja" },
      { name: "Bathinda", type: "grinding", brand: "Ambuja" },
    ],
  },
  rajasthan: {
    id: "rajasthan",
    name: "Rajasthan",
    plants: [
      { name: "Marwar Mundwa", type: "integrated", brand: "Ambuja" },
      { name: "Rabriyawas", type: "integrated", brand: "Ambuja" },
      { name: "Lakheri", type: "integrated", brand: "ACC" },
      { name: "Jodhpur", type: "grinding", brand: "Penna" },
    ],
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    plants: [
      { name: "Madukkarai", type: "grinding", brand: "ACC" },
      { name: "Tuticorin", type: "grinding", brand: "Ambuja" },
      { name: "Karaikal", type: "bulk-terminal", brand: "Penna" },
    ],
  },
  telangana: {
    id: "telangana",
    name: "Telangana",
    plants: [
      { name: "Devapur", type: "integrated", brand: "Penna" },
      { name: "Mancherial", type: "integrated", brand: "Penna" },
      { name: "Tandur", type: "integrated", brand: "Orient" },
      { name: "Ganeshpahad", type: "integrated", brand: "Penna" },
    ],
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    plants: [
      { name: "Dadri", type: "grinding", brand: "Ambuja" },
      { name: "Tikaria", type: "grinding", brand: "ACC" },
    ],
  },
  uttarakhand: {
    id: "uttarakhand",
    name: "Uttarakhand",
    plants: [
      { name: "Roorkee", type: "grinding", brand: "Ambuja" },
    ],
  },
  "west-bengal": {
    id: "west-bengal",
    name: "West Bengal",
    plants: [
      { name: "Farakka", type: "grinding", brand: "Ambuja" },
      { name: "Damodhar", type: "grinding", brand: "ACC" },
      { name: "Sankrail", type: "bulk-terminal", brand: "ACC" },
    ],
  },
};

export const legendItems = [
  { label: "ACC", color: "#005494" },
  { label: "Ambuja", color: "#00A651" },
  { label: "Sanghi", color: "#8B5CF6" },
  { label: "Dahej", color: "#F59E0B" },
  { label: "Penna", color: "#EF4444" },
  { label: "Orient", color: "#06B6D4" },
  { label: "ACIL", color: "#EC4899" },
];

export const plantTypeLabels: Record<string, string> = {
  integrated: "Integrated Units",
  grinding: "Grinding Units",
  blending: "Blending Units",
  "bulk-terminal": "Bulk Cement Terminals",
};
