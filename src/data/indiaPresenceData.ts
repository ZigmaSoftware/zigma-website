export const plantTypeLabels: Record<string, string> = {
  integrated: "Integrated Plant",
  grinding: "Grinding Unit",
  bulk: "Bulk Terminal",
};

export const legendItems = [
  { label: "Integrated Plants", color: "#10B981" },
  { label: "Grinding Units", color: "#3B82F6" },
  { label: "Bulk Terminals", color: "#F59E0B" },
];

export const stateData: Record<
  string,
  {
    id: string;
    name: string;
    plants: Array<{ brand: string; type: string; name: string }>;
  }
> = {
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    plants: [
      {
        brand: "Zigma",
        type: "integrated",
        name: "Visakhapatnam Integrated Plant",
      },
      { brand: "Zigma", type: "bulk", name: "Nellore Bulk Terminal" },
    ],
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    plants: [
      { brand: "Zigma", type: "integrated", name: "Chennai Integrated Plant" },
      { brand: "Zigma", type: "grinding", name: "Trichy Grinding Unit" },
    ],
  },
  puducherry: {
    id: "puducherry",
    name: "Puducherry",
    plants: [
      { brand: "Zigma", type: "integrated", name: "Puducherry Integrated Plant" },
    ],
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka",
    plants: [
      { brand: "Zigma", type: "grinding", name: "Bangalore Grinding Unit" },
    ],
  },
  telangana: {
    id: "telangana",
    name: "Telangana",
    plants: [
      { brand: "Zigma", type: "bulk", name: "Hyderabad Bulk Terminal" },
    ],
  },
  assam: {
    id: "assam",
    name: "Assam",
    plants: [
      { brand: "Zigma", type: "integrated", name: "Guwahati Integrated Plant" },
    ],
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    plants: [
      { brand: "Zigma", type: "grinding", name: "Mumbai Grinding Unit" },
    ],
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    plants: [
      { brand: "Zigma", type: "bulk", name: "Lucknow Bulk Terminal" },
    ],
  },
};
