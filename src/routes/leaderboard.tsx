import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { proctoredLeaderboard, quizLeaderboard } from "@/data/dashboard";
import { Trophy } from "lucide-react";

const searchSchema = z.object({
  type: z.enum(["proctored", "quiz"]).catch("proctored"),
});

export const Route = createFileRoute("/leaderboard")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "All India STR Leaderboard" },
      { name: "description", content: "All India ranking of STRs by Proctored Test or Weekly Quiz averages." },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  const { type } = Route.useSearch();
  const navigate = useNavigate();

  const rows = type === "quiz" ? quizLeaderboard : proctoredLeaderboard;
  const kolkataAvg = type === "quiz" ? "77%" : "72%";
  const allIndiaAvg = type === "quiz" ? "78%" : "73%";
  const scoreHeader = type === "quiz" ? "Weekly Quiz Avg" : "PT Avg (/50)";

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-500" /> All India STR Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground">★ marks STRs from your branch (Kolkata)</p>
          </div>

          <div className="inline-flex rounded-md border bg-card p-0.5">
            {(["proctored", "quiz"] as const).map((t) => (
              <button
                key={t}
                onClick={() => navigate({ to: "/leaderboard", search: { type: t } })}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  type === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "proctored" ? "Proctored Test" : "Weekly Quiz"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md">
          <Card><CardContent className="p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Kolkata Avg</div>
            <div className="text-2xl font-semibold mt-1">{kolkataAvg}</div>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">All India Avg</div>
            <div className="text-2xl font-semibold mt-1">{allIndiaAvg}</div>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {type === "quiz" ? "Ranked by Weekly Quiz Average" : "Ranked by Proctored Test Average"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 w-16">Rank</th>
                  <th>STR Name</th>
                  <th>Branch</th>
                  <th className="text-right">{scoreHeader}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={`${r.rank}-${r.name}`}
                    className={`border-b last:border-0 transition-colors ${
                      r.isOurs ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/40"
                    }`}
                  >
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1">
                        {r.isOurs && <span className="text-amber-500">★</span>}
                        {r.medal ?? <span className="text-muted-foreground">{r.rank}</span>}
                      </span>
                    </td>
                    <td className="font-medium">{r.name}</td>
                    <td className="text-muted-foreground">{r.branch}</td>
                    <td className="text-right tabular-nums font-medium">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
