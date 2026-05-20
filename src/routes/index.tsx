import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { InfoTip } from "@/components/InfoTip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { strs, summary, quizLeaderboard, proctoredLeaderboard } from "@/data/dashboard";
import { AlertTriangle, ChevronRight, Clock, GraduationCap, MessageSquareWarning, Search, TrendingDown, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function moodScoreLabel(score: number) {
  if (score >= 4.0) return "😊 Positive";
  if (score >= 3.0) return "😐 Neutral";
  return "😟 Needs Attention";
}

function moodScoreText() {
  const lines = strs.map(s => `${s.name}: ${s.surveyScore.toFixed(1)} — ${moodScoreLabel(s.surveyScore)}`);
  const avg = strs.reduce((sum, s) => sum + s.surveyScore, 0) / strs.length;
  return `Mood Score (1-5 pulse survey)\nBranch average: ${avg.toFixed(1)}\n\n${lines.join("\n")}`;
}

function getPhasesCompleted(str: typeof strs[0]) {
  const phaseMap: Record<string, string[]> = {
    "Phase 1": [],
    "Phase 2": ["Core Induction"],
    "Phase 3": ["Core Induction", "CFP Advanced"],
    "Phase 4": ["Core Induction", "CFP Advanced", "GR1 + GR2"],
  };
  const currentPhase = Object.keys(phaseMap).find(p => str.phase.includes(p)) ?? "Phase 1";
  const completed = [...(phaseMap[currentPhase] ?? [])];
  if (str.phaseProgress === 1) {
    const currentName = str.phase.replace(/^Phase \d+ · /, "");
    if (!completed.includes(currentName)) completed.push(currentName);
  }
  return completed;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BM Dashboard — Kolkata Branch" },
      { name: "description", content: "Overview of STR progress, assessments, reviews and leaderboards." },
    ],
  }),
  component: BMDashboard,
});

function Stat({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  tooltip,
  names,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "warn" | "danger" | "ok";
  tooltip?: string;
  names?: { title: string; items: string[] };
}) {
  const toneClass = {
    default: "text-primary bg-primary/10",
    warn: "text-amber-600 bg-amber-100 dark:bg-amber-500/15",
    danger: "text-red-600 bg-red-100 dark:bg-red-500/15",
    ok: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15",
  }[tone];
  const namesText = names
    ? `${names.title}\n${names.items.length ? names.items.map((i) => `• ${i}`).join("\n") : "None"}`
    : null;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center">
            {label}
            {tooltip && <InfoTip text={tooltip} />}
            {namesText && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors align-middle ml-1"
                    aria-label="STR names"
                  >
                    <Users className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs whitespace-pre-wrap leading-relaxed bg-popover text-popover-foreground border shadow-lg">
                  {namesText}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className={`h-8 w-8 rounded-md grid place-items-center ${toneClass}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </CardContent>
    </Card>
  );
}

function pctTone(p: number) {
  if (p >= 0.85) return "text-emerald-600";
  if (p >= 0.7) return "text-foreground";
  return "text-amber-600";
}

function ReviewBadge({ s }: { s: "Received" | "Pending" | "Not due" }) {
  const cls = s === "Received"
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
    : s === "Pending"
    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
    : "bg-muted text-muted-foreground";
  return <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${cls}`}>{s}</span>;
}

function BMDashboard() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filteredStrs = q
    ? strs.filter(s => s.name.toLowerCase().includes(q) || s.empId.toLowerCase().includes(q) || s.tc.toLowerCase().includes(q))
    : strs;
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center">
              Branch Manager Dashboard
              <InfoTip text="A mail is sent once every 15 days and after a Proctored Test to the BM. A reminder mail is sent 3 days before a review is due." />
            </h1>
            <p className="text-sm text-muted-foreground">STR training overview · Kolkata Branch</p>
          </div>
          <Badge variant="secondary" className="text-xs">Last updated · today</Badge>
        </div>

        {/* KPI ROW */}
        {(() => {
          const nonAdherent = strs.filter((s) => s.adherence < 0.8);
          const lowFeedback = strs.filter((s) => s.surveyScore < 3.0);
          const pendingReviews: { name: string; which: string; since: string }[] = [
            { name: "Arjun Mehta", which: "Review 2", since: "10-Jul-2025" },
            { name: "Vikram Singh", which: "Review 2", since: "18-Jul-2025" },
          ];
          const lowPT = [{ name: "Vikram Singh", note: "PT 1 · 72%" }];
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <Stat
                label="Total Active STRs"
                value={summary.totalActive}
                icon={Users}
                tooltip="Total STRs currently active in this branch"
                names={{ title: "Active STRs:", items: strs.map((s) => s.name) }}
              />
              <Stat
                label="Induction Non-Adherence"
                value={nonAdherent.length}
                icon={AlertTriangle}
                tone="warn"
                tooltip="STRs lagging behind more than 20 days as compared to their joining date."
                names={{
                  title: "Non-adherent STRs:",
                  items: nonAdherent.map((s) => `${s.name} — ${Math.round(s.adherence * 100)}% adherence`),
                }}
              />
              <Stat
                label="Low Feedback Score"
                value={lowFeedback.length}
                icon={MessageSquareWarning}
                tone="warn"
                tooltip="Calculated on the basis of the avg survey responses and the classifications:\n≥ 4.0 😊 Positive\n3.0–3.9 😐 Neutral\n< 3.0 😟 Needs Attention"
                names={{
                  title: "Low feedback STRs:",
                  items: lowFeedback.map((s) => `${s.name} — ${s.surveyScore.toFixed(1)} (${moodScoreLabel(s.surveyScore)})`),
                }}
              />
              <Stat
                label="Reviews Pending"
                value={pendingReviews.length}
                icon={Clock}
                tone="ok"
                tooltip="Based on the number of reviews due and not completed."
                names={{
                  title: "Pending reviews (since):",
                  items: pendingReviews.map((p) => `${p.name} — ${p.which} (since ${p.since})`),
                }}
              />
              <Stat
                label="Low Proctored Test Score"
                value={lowPT.length}
                icon={TrendingDown}
                tone="danger"
                tooltip="STRs who score less than 60% in any Proctored Test are flagged."
                names={{
                  title: "Low PT scorers:",
                  items: lowPT.map((p) => `${p.name} — ${p.note}`),
                }}
              />
            </div>
          );
        })()}

        {/* PHASES + PT AVGS */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                Phases Completed
                <InfoTip text="No. of STRs who have completed a particular phase" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-3">
              {summary.phasesCompleted.map((p) => (
                <div key={p.label} className="rounded-md border bg-card p-3">
                  <div className="text-xs text-muted-foreground">{p.label}</div>
                  <div className="text-xl font-semibold mt-1 flex items-baseline gap-1">
                    {p.count}
                    <span className="text-xs text-muted-foreground font-normal">STRs</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                Proctored Test Averages
                <InfoTip text="Batch average per Proctored Test. Hover any tile to see test-wise lowest and highest mark." />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-4 gap-2">
              {summary.proctoredAvgs.map((pt) => (
                <Tooltip key={pt.label}>
                  <TooltipTrigger asChild>
                    <div className="rounded-md border bg-card p-3 cursor-help">
                      <div className="text-[11px] text-muted-foreground">{pt.label}</div>
                      <div className={`text-lg font-semibold mt-1 ${pctTone(pt.avg)}`}>
                        {Math.round(pt.avg * 100)}%
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border shadow-lg">
                    <div className="text-xs space-y-0.5">
                      <div>Lowest: <b>{Math.round(pt.low*100)}%</b></div>
                      <div>Highest: <b>{Math.round(pt.high*100)}%</b></div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* STR OVERVIEW TABLE */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                STR Overview — Progress, Phases & Assessment Status
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, ID or TC…"
                  className="pl-8 h-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <Th tip="Full name of the STR. Source: SuccessFactors.">STR</Th>
                  <Th tip="TC/AM assigned to mentor this STR — entered manually.">TC</Th>
                  <Th tip="Current programme part derived from mAstra.">Phase</Th>
                  <Th tip="Days elapsed within the current part + total days in that part. Bar shows fill proportional to % through current part.">Phase Progress</Th>
                  <Th tip="Phases fully completed by this STR.">Phases Completed</Th>
                  <Th tip="Average of all weekly quiz scores. Auto-graded, open reference. Source: mAstra.">Quiz Avg</Th>
                  <Th tip="Average Proctored Test score across PTs taken so far. '—' if none taken yet.">PT Avg</Th>
                  <Th tip="Formal review at end of Part 1 (Day 32). BM submits via MS Form.">Review 1</Th>
                  <Th tip="Formal review at end of Day 100. BM submits via MS Form.">Review 2</Th>
                  <Th tip="Total programme days with active logged activity in mAstra, out of 122. Source: mAstra.">Days</Th>
                  <Th tip="(Days completed/total days since joining)*100. Measures whether the trainee is completing the expected number of training days based on the number of days since joining.">Adherence</Th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredStrs.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                    <td className="py-3">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.empId}</div>
                    </td>
                    <td className="text-muted-foreground">{s.tc}</td>
                    <td className="text-xs">{s.phase}</td>
                    <td className="min-w-[160px]">
                      <div className="text-xs text-muted-foreground">{s.phaseDay}</div>
                      <div className="mt-1 h-1.5 bg-muted rounded overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${Math.round(s.phaseProgress * 100)}%` }} />
                      </div>
                    </td>
                    <td className="text-xs max-w-[140px] truncate" title={getPhasesCompleted(s).join(", ")}>{getPhasesCompleted(s).join(", ") || "—"}</td>
                    <td className={`font-medium ${pctTone(s.quizAvg)}`}>{Math.round(s.quizAvg * 100)}%</td>
                    <td className="font-medium">{s.ptAvg}</td>
                    <td><ReviewBadge s={s.review1} /></td>
                    <td><ReviewBadge s={s.review2} /></td>
                    <td className="text-xs text-muted-foreground">{s.daysCompleted}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 bg-muted rounded overflow-hidden">
                          <div className={`h-full ${s.adherence >= 0.8 ? "bg-emerald-500" : s.adherence >= 0.6 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${Math.round(s.adherence * 100)}%` }} />
                        </div>
                        <span className="text-xs">{Math.round(s.adherence * 100)}%</span>
                      </div>
                    </td>
                    <td>
                      <Link
                        to="/str/$id"
                        params={{ id: s.id }}
                        className="inline-flex items-center text-xs text-primary hover:underline"
                      >
                        View <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>


        {/* LEADERBOARDS */}
        <div className="grid lg:grid-cols-2 gap-4">
          <MiniLeaderboard title="Quiz Leaderboard" subtitle="Ranked by Weekly Quiz Avg" rows={quizLeaderboard.filter(r => ["Sneha Kulkarni","Priya Nair","Arjun Mehta","Vikram Singh","Rohit Das"].includes(r.name)).map((r,i)=>({...r, rank:String(i+1)}))} />
          <MiniLeaderboard title="Proctored Test Leaderboard" subtitle="Ranked by Proctored Test Avg" rows={proctoredLeaderboard.filter(r => ["Sneha Kulkarni","Priya Nair","Arjun Mehta","Vikram Singh","Rohit Das"].includes(r.name)).map((r,i)=>({...r, rank:String(i+1)}))} />
        </div>
      </div>
    </AppShell>
  );
}

function Th({ children, tip }: { children: React.ReactNode; tip?: string }) {
  return (
    <th className="py-2 font-medium">
      <span className="inline-flex items-center">
        {children}
        {tip && <InfoTip text={tip} />}
      </span>
    </th>
  );
}

function MiniLeaderboard({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: { rank: string; name: string; score: string }[];
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b last:border-0">
                <td className="py-2 w-10 text-muted-foreground">#{r.rank}</td>
                <td className="font-medium">{r.name}</td>
                <td className="text-right tabular-nums">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <Link to="/leaderboard" className="text-xs text-primary hover:underline">
            View All India Leaderboard →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
