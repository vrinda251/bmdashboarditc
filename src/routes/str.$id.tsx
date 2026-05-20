import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { InfoTip } from "@/components/InfoTip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { strs, getSTRDetail, type STR, type STRDetail } from "@/data/dashboard";
import { ArrowLeft, Calendar, ClipboardCheck, FileText, MessageCircle, Smile, Trophy } from "lucide-react";

export const Route = createFileRoute("/str/$id")({
  head: ({ params }) => {
    const str = strs.find((s) => s.id === params.id);
    return {
      meta: [
        { title: str ? `${str.name} — STR Progress` : "STR Progress" },
        { name: "description", content: "Individual STR training progress, assessments, reviews, feedback." },
      ],
    };
  },
  loader: ({ params }) => {
    const str = strs.find((s) => s.id === params.id);
    if (!str) throw notFound();
    const detail = getSTRDetail(params.id);
    return { str, detail };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="text-center py-16">
        <h1 className="text-xl font-semibold">STR not found</h1>
        <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">← Back to dashboard</Link>
      </div>
    </AppShell>
  ),
  errorComponent: ({ error }) => (
    <AppShell>
      <div className="text-center py-16 text-sm text-muted-foreground">{error.message}</div>
    </AppShell>
  ),
  component: STRView,
});

function StatusBadge({ status }: { status: string }) {
  const ok = status.includes("Done") || status === "Received";
  const pending = status === "Pending";
  const cls = ok
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
    : pending
    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
    : "bg-muted text-muted-foreground";
  return <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
}

function STRView() {
  const { str, detail } = Route.useLoaderData() as { str: STR; detail: STRDetail };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to dashboard
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mt-2">{str.name}</h1>
          <p className="text-sm text-muted-foreground">Individual STR Progress · Branch Manager View</p>
        </div>

        {/* Header info grid */}
        <Card>
          <CardContent className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            <Info label="Employee ID" value={str.empId} />
            <Info label="Training Champion" value={str.tc} />
            <Info label="Batch Start" value={detail.batchStart} icon={Calendar} />
            <Info label="Days Completed" value={str.daysCompleted} />
            <Info label="Current Phase" value={str.phase} />
            <Info label="Phase Completion" value={`${Math.round(str.phaseProgress * 100)}%`} />
            <Info label="Weekly Quiz Avg" value={`${Math.round(str.quizAvg * 100)}%`} />
            <Info label="Reviews Completed" value={detail.reviewsCompleted} />
            <Info label="Survey Sentiment" value={detail.surveySentiment} icon={Smile} />
            <Info label="Adherence" value={`${Math.round(str.adherence * 100)}%`} />
          </CardContent>
        </Card>

        {/* Proctored Tests */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" /> Proctored Test Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2">Test</th><th>Day</th><th>Score / 50</th><th>%</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {detail.proctoredTests.map((pt) => (
                  <tr key={pt.test} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{pt.test}</td>
                    <td className="text-muted-foreground">{pt.day}</td>
                    <td>{pt.score}</td>
                    <td>{pt.pct}</td>
                    <td><StatusBadge status={pt.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Formal Reviews */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <ClipboardCheck className="h-4 w-4 text-primary mr-2" /> Formal Reviews (Day 32 & Day 122)
              <InfoTip text="BM submits via MS Form." />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2">Review</th><th>Day</th><th>Observations</th><th>Action Items</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {detail.formalReviews.map((r) => (
                  <tr key={r.review} className="border-b last:border-0 align-top">
                    <td className="py-2.5 font-medium">{r.review}</td>
                    <td className="text-muted-foreground">{r.day}</td>
                    <td className="max-w-xs">{r.observations}</td>
                    <td className="max-w-xs text-muted-foreground">{r.actionItems}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Workbooks + Quizzes */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Workbooks Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-3 text-center">
                <Tile label="Completed" value={detail.workbooks.completed} tone="ok" />
                <Tile label="Pending" value={detail.workbooks.pending} tone="warn" />
                <Tile label="Total" value={detail.workbooks.total} />
              </div>
              <div className="mt-3 h-2 bg-muted rounded overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.round((detail.workbooks.completed / detail.workbooks.total) * 100)}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quiz Scores</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2">Test</th><th>Marks / 5</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.quizzes.map((q) => (
                    <tr key={q.test} className="border-b last:border-0">
                      <td className="py-2 font-medium">{q.test}</td>
                      <td>{q.marks}</td>
                      <td><StatusBadge status={q.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* TC Feedback */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> TC Feedback
              <Badge variant="secondary" className="text-[10px]">Entered by TC via mAstra</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {detail.tcFeedback.map((f, i) => (
              <div key={i} className="rounded-md border p-3 bg-card">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{f.phase}</span>
                  <span>{f.date}</span>
                </div>
                <p className="text-sm">{f.feedback}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function Info({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />} {label}
      </div>
      <div className="text-sm font-medium mt-1">{value}</div>
    </div>
  );
}

function Tile({ label, value, tone = "default" }: { label: string; value: number; tone?: "default" | "ok" | "warn" }) {
  const cls = tone === "ok" ? "text-emerald-600" : tone === "warn" ? "text-amber-600" : "text-foreground";
  return (
    <div className="rounded-md border p-3 bg-card">
      <div className={`text-xl font-semibold ${cls}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
