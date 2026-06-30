export interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "Active" | "Inactive" | "Churned";
  labels: string[];
  attributeValue?: string;
}

export interface TestGroup {
  id: string;
  name: string;
  description: string;
  labels: string[];
  customers: Customer[];
  attributeName?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastEditedBy: string;
  usageCount: number;
  isPinned: boolean;
  isFavorite: boolean;
}

export const ALL_LABELS = [
  "VIP", "QA", "Internal", "CRM", "UK", "High Value",
  "Campaign Testing", "Stakeholder", "Control", "High Roller",
  "Test", "EU", "US", "Churn Risk",
];

export const LABEL_COLORS: Record<string, string> = {
  "VIP":              "bg-amber-50   text-amber-700   border-amber-200",
  "QA":               "bg-blue-50    text-blue-700    border-blue-200",
  "Internal":         "bg-gray-100   text-gray-600    border-gray-300",
  "CRM":              "bg-purple-50  text-purple-700  border-purple-200",
  "UK":               "bg-emerald-50 text-emerald-700 border-emerald-200",
  "High Value":       "bg-rose-50    text-rose-700    border-rose-200",
  "Campaign Testing": "bg-indigo-50  text-indigo-700  border-indigo-200",
  "Stakeholder":      "bg-orange-50  text-orange-700  border-orange-200",
  "Control":          "bg-teal-50    text-teal-700    border-teal-200",
  "High Roller":      "bg-red-50     text-red-700     border-red-200",
  "Test":             "bg-sky-50     text-sky-700     border-sky-200",
  "EU":               "bg-lime-50    text-lime-700    border-lime-200",
  "US":               "bg-cyan-50    text-cyan-700    border-cyan-200",
  "Churn Risk":       "bg-pink-50    text-pink-700    border-pink-200",
};

export const CUSTOMER_PROFILES: Customer[] = [
  { id: "32299512", name: "James O'Brien",    email: "james.obrien@email.com",    country: "UK",  status: "Active",   labels: ["VIP", "High Value"] },
  { id: "88910212", name: "Carlos Mendez",    email: "carlos.m@email.com",        country: "ES",  status: "Active",   labels: ["CRM"] },
  { id: "64372839", name: "Marie Dupont",     email: "marie.dupont@email.com",    country: "FR",  status: "Active",   labels: ["VIP"] },
  { id: "37849537", name: "Ivan Petrov",      email: "ivan.petrov@email.com",     country: "BG",  status: "Active",   labels: [] },
  { id: "59375833", name: "Cora Williams",    email: "cora.w@email.com",          country: "UK",  status: "Active",   labels: ["High Value"] },
  { id: "71234567", name: "Ahmed Al-Rashid",  email: "ahmed.r@email.com",         country: "AE",  status: "Active",   labels: ["VIP", "High Roller"] },
  { id: "22345678", name: "Yuki Tanaka",      email: "yuki.t@email.com",          country: "JP",  status: "Inactive", labels: [] },
  { id: "33456789", name: "Emma Schmidt",     email: "emma.s@email.com",          country: "DE",  status: "Active",   labels: ["CRM"] },
  { id: "44567890", name: "Luca Romano",      email: "luca.r@email.com",          country: "IT",  status: "Active",   labels: ["High Value"] },
  { id: "55678901", name: "Sofia Andersen",   email: "sofia.a@email.com",         country: "DK",  status: "Churned",  labels: ["Churn Risk"] },
  { id: "66789012", name: "Patrick Murphy",   email: "pat.m@email.com",           country: "IE",  status: "Active",   labels: ["VIP"] },
  { id: "77890123", name: "Amara Osei",       email: "amara.o@email.com",         country: "GH",  status: "Active",   labels: [] },
  { id: "88901234", name: "Nikolai Volkov",   email: "nikolai.v@email.com",       country: "RU",  status: "Inactive", labels: ["Churn Risk"] },
  { id: "99012345", name: "Priya Sharma",     email: "priya.s@email.com",         country: "IN",  status: "Active",   labels: ["CRM", "High Value"] },
  { id: "10123456", name: "Lucas Ferreira",   email: "lucas.f@email.com",         country: "BR",  status: "Active",   labels: [] },
  { id: "11234567", name: "Ingrid Larsson",   email: "ingrid.l@email.com",        country: "SE",  status: "Active",   labels: ["VIP"] },
  { id: "12345678", name: "Omar Hassan",      email: "omar.h@email.com",          country: "EG",  status: "Active",   labels: ["High Roller"] },
  { id: "13456789", name: "Mei Lin",          email: "mei.lin@email.com",         country: "CN",  status: "Active",   labels: ["VIP", "CRM"] },
  { id: "14567890", name: "Rachel Cohen",     email: "rachel.c@email.com",        country: "IL",  status: "Active",   labels: [] },
  { id: "15678901", name: "Thomas Müller",    email: "thomas.m@email.com",        country: "DE",  status: "Churned",  labels: ["Churn Risk"] },
];

const base: Customer[] = CUSTOMER_PROFILES;

export const INITIAL_TEST_GROUPS: TestGroup[] = [
  {
    id: "tg-1",
    name: "VIP UK Champions",
    description: "High-value UK customers for Champions League campaign QA",
    labels: ["VIP", "UK", "High Value"],
    customers: base.filter((_, i) => [0, 4, 5, 10].includes(i)),
    createdBy: "Haiden McGill",
    createdAt: "2026-04-12",
    updatedAt: "2026-06-28",
    lastEditedBy: "Omer Cohen",
    usageCount: 12,
    isPinned: true,
    isFavorite: true,
  },
  {
    id: "tg-2",
    name: "QA Regression Set",
    description: "Standard regression profiles — one from each region",
    labels: ["QA", "Internal"],
    customers: base.filter((_, i) => [0,1,2,3,6,7,8,9].includes(i)),
    createdBy: "Omer Cohen",
    createdAt: "2026-03-01",
    updatedAt: "2026-06-20",
    lastEditedBy: "Omer Cohen",
    usageCount: 48,
    isPinned: true,
    isFavorite: false,
  },
  {
    id: "tg-3",
    name: "Churn Risk Monitoring",
    description: "Customers flagged as churn risk — used in re-engagement flows",
    labels: ["CRM", "Churn Risk"],
    customers: base.filter((_, i) => [9, 12, 19].includes(i)),
    createdBy: "Haiden McGill",
    createdAt: "2026-05-18",
    updatedAt: "2026-06-15",
    lastEditedBy: "Haiden McGill",
    usageCount: 7,
    isPinned: false,
    isFavorite: false,
  },
  {
    id: "tg-4",
    name: "High Roller VIPs",
    description: "Top-spend customers for premium offer testing",
    labels: ["VIP", "High Roller", "High Value"],
    customers: base.filter((_, i) => [5, 11, 16].includes(i)),
    createdBy: "Sara Klein",
    createdAt: "2026-02-14",
    updatedAt: "2026-05-30",
    lastEditedBy: "Sara Klein",
    usageCount: 3,
    isPinned: false,
    isFavorite: true,
  },
  {
    id: "tg-5",
    name: "EU Stakeholder Panel",
    description: "EU regional stakeholders for localisation review",
    labels: ["Stakeholder", "EU"],
    customers: base.filter((_, i) => [1,2,7,8,10,13,15].includes(i)),
    createdBy: "Marie Dupont",
    createdAt: "2026-01-20",
    updatedAt: "2026-04-10",
    lastEditedBy: "Haiden McGill",
    usageCount: 2,
    isPinned: false,
    isFavorite: false,
  },
  {
    id: "tg-6",
    name: "Control Group — Q3",
    description: "Holdout control group for Q3 campaign measurement",
    labels: ["Control", "Campaign Testing"],
    customers: base.filter((_, i) => [3,6,9,12,14,17,18,19].includes(i)),
    createdBy: "Omer Cohen",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-25",
    lastEditedBy: "Omer Cohen",
    usageCount: 1,
    isPinned: false,
    isFavorite: false,
  },
];
