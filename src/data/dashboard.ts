export type STR = {
  id: string;
  name: string;
  empId: string;
  tc: string;
  phase: string;
  phaseDay: string;
  phaseProgress: number; // 0-1
  channels: string;
  quizAvg: number; // 0-1
  ptAvg: string;
  pt1: string;
  pt2: string;
  pt3: string;
  pt4: string;
  review1: "Received" | "Pending" | "Not due";
  review2: "Received" | "Pending" | "Not due";
  daysCompleted: string;
  adherence: number; // 0-1
  surveyScore: number; // 1-5 scale from latest pulse survey
};

export const strs: STR[] = [
  { id: "001", name: "Arjun Mehta", empId: "ITC-2024-001", tc: "Rahul Sharma", phase: "Phase 1 · Core Induction", phaseDay: "Day 32 / 32", phaseProgress: 1, channels: "Core", quizAvg: 0.74, ptAvg: "37/50", pt1: "37/50", pt2: "—", pt3: "—", pt4: "—", review1: "Received", review2: "Not due", daysCompleted: "32 / 122", adherence: 1.0, surveyScore: 3.2 },
  { id: "002", name: "Priya Nair", empId: "ITC-2024-002", tc: "Sunita Verma", phase: "Phase 2 · CFP Advanced", phaseDay: "Day 20 / 22", phaseProgress: 20/22, channels: "Core", quizAvg: 0.86, ptAvg: "40.5/50", pt1: "42/50", pt2: "39/50", pt3: "—", pt4: "—", review1: "Received", review2: "Not due", daysCompleted: "52 / 122", adherence: 0.9, surveyScore: 4.1 },
  { id: "003", name: "Rohit Das", empId: "ITC-2024-003", tc: "Rahul Sharma", phase: "Phase 1 · Core Induction", phaseDay: "Day 18 / 32", phaseProgress: 18/32, channels: "none", quizAvg: 0.61, ptAvg: "—", pt1: "—", pt2: "—", pt3: "—", pt4: "—", review1: "Not due", review2: "Not due", daysCompleted: "18 / 122", adherence: 0.5, surveyScore: 2.4 },
  { id: "004", name: "Sneha Kulkarni", empId: "ITC-2024-004", tc: "Anil Bose", phase: "Phase 4 · MT/Loyalty/Insti", phaseDay: "Day 15 / 22", phaseProgress: 15/22, channels: "Core, CFP, GR1, GR2", quizAvg: 0.92, ptAvg: "44.5/50", pt1: "45/50", pt2: "44/50", pt3: "43/50", pt4: "46/50", review1: "Received", review2: "Received", daysCompleted: "115 / 122", adherence: 0.8, surveyScore: 4.5 },
  { id: "005", name: "Vikram Singh", empId: "ITC-2024-005", tc: "Sunita Verma", phase: "Phase 2 · CFP Advanced", phaseDay: "Day 16 / 22", phaseProgress: 16/22, channels: "Core", quizAvg: 0.70, ptAvg: "36/50", pt1: "36/50", pt2: "—", pt3: "—", pt4: "—", review1: "Received", review2: "Not due", daysCompleted: "48 / 122", adherence: 0.8, surveyScore: 3.8 },
];

export const summary = {
  totalActive: 5,
  inductionNonAdherence: 2,
  lowFeedbackScore: 1,
  phasesCompleted: [
    { label: "Phase 1: Core Induction", count: 3 },
    { label: "Phase 2: CFP Advanced", count: 2 },
    { label: "Phase 3: GR1 + GR2", count: 0 },
    { label: "Phase 4: MT/Loyalty/Insti", count: 1 },
  ],
  reviewsPending: 0,
  lowProctoredScore: 1,
  proctoredAvgs: [
    { label: "PT 1", avg: 0.77, low: 0.72, high: 0.90 },
    { label: "PT 2", avg: 0.74, low: 0.78, high: 0.88 },
    { label: "PT 3", avg: 0.80, low: 0.86, high: 0.86 },
    { label: "PT 4", avg: 0.71, low: 0.92, high: 0.92 },
  ],
};

export const batchSummary = [
  { name: "Weekly Quizzes", avg: "77%", high: "92%", low: "61%", attempted: "5/5", cleared: "—" },
  { name: "PT 1 (Day 32)", avg: "40/50", high: "45", low: "36", attempted: "4/5", cleared: "4/5" },
  { name: "PT 2 (Day 54)", avg: "41.5/50", high: "44", low: "39", attempted: "2/5", cleared: "2/5" },
  { name: "PT 3 (Day 100)", avg: "43/50", high: "43", low: "43", attempted: "1/5", cleared: "1/5" },
  { name: "PT 4 (Day 122)", avg: "46/50", high: "46", low: "46", attempted: "1/5", cleared: "1/5" },
];

// All India Leaderboard
export type LeaderRow = { rank: string; name: string; branch: string; score: string; isOurs: boolean; medal?: string };

export const proctoredLeaderboard: LeaderRow[] = [
  { rank: "1", medal: "🥇", name: "Ananya Iyer", branch: "Chennai", score: "45.5" , isOurs: false },
  { rank: "2", medal: "🥈", name: "Ishaan Verma", branch: "Delhi", score: "45.3", isOurs: false },
  { rank: "3", medal: "🥉", name: "Sneha Kulkarni", branch: "Kolkata", score: "44.5", isOurs: true },
  { rank: "4", name: "Nisha Patel", branch: "Ahmedabad", score: "44.3", isOurs: false },
  { rank: "5", name: "Chirag Pandya", branch: "Pune", score: "44.0", isOurs: false },
  { rank: "6", name: "Ravi Teja", branch: "Hyderabad", score: "42.7", isOurs: false },
  { rank: "7", name: "Meghna Pillai", branch: "Kochi", score: "42.7", isOurs: false },
  { rank: "8", name: "Divya Menon", branch: "Bengaluru", score: "41.7", isOurs: false },
  { rank: "9", name: "Shalini Bhat", branch: "Bengaluru", score: "40.7", isOurs: false },
  { rank: "10", name: "Sourav Ghosh", branch: "Kolkata", score: "41.7", isOurs: true },
  { rank: "11", name: "Priya Nair", branch: "Kolkata", score: "40.5", isOurs: true },
  { rank: "12", name: "Faizan Ahmed", branch: "Hyderabad", score: "40.3", isOurs: false },
  { rank: "13", name: "Aditya Joshi", branch: "Pune", score: "39.7", isOurs: false },
  { rank: "14", name: "Preethi Nair", branch: "Chennai", score: "39.5", isOurs: false },
  { rank: "15", name: "Suresh Nambiar", branch: "Kochi", score: "39.0", isOurs: false },
  { rank: "16", name: "Kavya Reddy", branch: "Hyderabad", score: "39.0", isOurs: false },
  { rank: "17", name: "Pooja Sharma", branch: "Delhi", score: "37.5", isOurs: false },
  { rank: "18", name: "Ritika Saxena", branch: "Lucknow", score: "36.0", isOurs: false },
  { rank: "19", name: "Aarav Mehta", branch: "Ahmedabad", score: "36.0", isOurs: false },
  { rank: "20", name: "Arjun Mehta", branch: "Kolkata", score: "38.0", isOurs: true },
  { rank: "21", name: "Simran Kaur", branch: "Chandigarh", score: "34.0", isOurs: false },
  { rank: "22", name: "Vikram Singh", branch: "Kolkata", score: "36.0", isOurs: true },
  { rank: "23", name: "Nikhil Pillai", branch: "Bengaluru", score: "33.0", isOurs: false },
  { rank: "24", name: "Karthik Raj", branch: "Chennai", score: "32.0", isOurs: false },
  { rank: "25", name: "Tarun Bose", branch: "Guwahati", score: "31.0", isOurs: false },
  { rank: "26", name: "Manish Tiwari", branch: "Lucknow", score: "30.0", isOurs: false },
  { rank: "27", name: "Lakshmi Venkat", branch: "Chennai", score: "29.0", isOurs: false },
  { rank: "28", name: "Hardik Shah", branch: "Ahmedabad", score: "28.0", isOurs: false },
  { rank: "29", name: "Rohit Das", branch: "Kolkata", score: "—", isOurs: true },
  { rank: "30", name: "Rajesh Kumar", branch: "Patna", score: "—", isOurs: false },
];

export const quizLeaderboard: LeaderRow[] = [
  { rank: "1", medal: "🥇", name: "Ananya Iyer", branch: "Chennai", score: "94%", isOurs: false },
  { rank: "2", medal: "🥈", name: "Ishaan Verma", branch: "Delhi", score: "93%", isOurs: false },
  { rank: "3", medal: "🥉", name: "Sneha Kulkarni", branch: "Kolkata", score: "92%", isOurs: true },
  { rank: "4", name: "Nisha Patel", branch: "Ahmedabad", score: "91%", isOurs: false },
  { rank: "5", name: "Chirag Pandya", branch: "Pune", score: "90%", isOurs: false },
  { rank: "6", name: "Ravi Teja", branch: "Hyderabad", score: "88%", isOurs: false },
  { rank: "7", name: "Meghna Pillai", branch: "Kochi", score: "87%", isOurs: false },
  { rank: "8", name: "Priya Nair", branch: "Kolkata", score: "86%", isOurs: true },
  { rank: "9", name: "Divya Menon", branch: "Bengaluru", score: "85%", isOurs: false },
  { rank: "10", name: "Sourav Ghosh", branch: "Kolkata", score: "84%", isOurs: true },
  { rank: "11", name: "Shalini Bhat", branch: "Bengaluru", score: "83%", isOurs: false },
  { rank: "12", name: "Preethi Nair", branch: "Chennai", score: "82%", isOurs: false },
  { rank: "13", name: "Faizan Ahmed", branch: "Hyderabad", score: "82%", isOurs: false },
  { rank: "14", name: "Aditya Joshi", branch: "Pune", score: "81%", isOurs: false },
  { rank: "15", name: "Suresh Nambiar", branch: "Kochi", score: "80%", isOurs: false },
  { rank: "16", name: "Kavya Reddy", branch: "Hyderabad", score: "79%", isOurs: false },
  { rank: "17", name: "Pooja Sharma", branch: "Delhi", score: "76%", isOurs: false },
  { rank: "18", name: "Arjun Mehta", branch: "Kolkata", score: "74%", isOurs: true },
  { rank: "19", name: "Ritika Saxena", branch: "Lucknow", score: "74%", isOurs: false },
  { rank: "20", name: "Aarav Mehta", branch: "Ahmedabad", score: "72%", isOurs: false },
  { rank: "21", name: "Vikram Singh", branch: "Kolkata", score: "70%", isOurs: true },
  { rank: "22", name: "Simran Kaur", branch: "Chandigarh", score: "69%", isOurs: false },
  { rank: "23", name: "Karthik Raj", branch: "Chennai", score: "67%", isOurs: false },
  { rank: "24", name: "Nikhil Pillai", branch: "Bengaluru", score: "65%", isOurs: false },
  { rank: "25", name: "Tarun Bose", branch: "Guwahati", score: "63%", isOurs: false },
  { rank: "26", name: "Rohit Das", branch: "Kolkata", score: "61%", isOurs: true },
  { rank: "27", name: "Manish Tiwari", branch: "Lucknow", score: "60%", isOurs: false },
  { rank: "28", name: "Lakshmi Venkat", branch: "Chennai", score: "59%", isOurs: false },
  { rank: "29", name: "Hardik Shah", branch: "Ahmedabad", score: "58%", isOurs: false },
  { rank: "30", name: "Rajesh Kumar", branch: "Patna", score: "55%", isOurs: false },
];

// Individual STR detailed data (per id)
export type STRDetail = {
  batchStart: string;
  surveySentiment: string;
  reviewsCompleted: string;
  proctoredTests: { test: string; day: string; score: string; pct: string; status: string }[];
  formalReviews: { review: string; day: string; observations: string; actionItems: string; status: string }[];
  workbooks: { completed: number; pending: number; total: number };
  tcFeedback: { date: string; phase: string; feedback: string }[];
  quizzes: { test: string; marks: string; status: string }[];
};

export const strDetails: Record<string, STRDetail> = {
  "001": {
    batchStart: "01-Apr-2025",
    surveySentiment: "Neutral",
    reviewsCompleted: "1 of 2",
    proctoredTests: [
      { test: "PT 1 – Core Induction", day: "Day 32", score: "38", pct: "76%", status: "✔ Done" },
      { test: "PT 2 – CFP Advanced", day: "Day 54", score: "—", pct: "—", status: "Pending" },
      { test: "PT 3 – GR1 + GR2", day: "Day 100", score: "—", pct: "—", status: "Pending" },
      { test: "PT 4 – MT/Loyalty/Insti", day: "Day 122", score: "—", pct: "—", status: "Pending" },
    ],
    formalReviews: [
      { review: "Formal Review 1", day: "Day 32", observations: "Adequate Phase 1 understanding", actionItems: "Revisit BIR basics before Phase 2", status: "✔ Done" },
      { review: "Formal Review 2", day: "Day 122", observations: "—", actionItems: "—", status: "Not due yet" },
    ],
    workbooks: { completed: 18, pending: 52, total: 70 },
    tcFeedback: [
      { date: "12-Apr-2025", phase: "Phase 1 · Core Induction", feedback: "STR consistent with beat adherence. Needs to improve DKD call speed — taking too long per outlet." },
      { date: "22-Apr-2025", phase: "Phase 2 · CFP Advanced", feedback: "Good grasp of CFP concepts. Workbook entries are detailed and accurate." },
    ],
    quizzes: [
      { test: "Quiz 1", marks: "4/5", status: "✔ Done" },
      { test: "Quiz 2", marks: "5/5", status: "✔ Done" },
      { test: "Quiz 3", marks: "3/5", status: "✔ Done" },
      { test: "Quiz 4", marks: "—", status: "Pending" },
    ],
  },
};

export function getSTRDetail(id: string): STRDetail {
  return strDetails[id] ?? strDetails["001"];
}
