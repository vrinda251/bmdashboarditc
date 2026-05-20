import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { strs } from "@/data/dashboard";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/strs")({
  head: () => ({
    meta: [{ title: "All STRs — BM Dashboard" }],
  }),
  component: STRs,
});

function STRs() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">STRs</h1>
          <p className="text-sm text-muted-foreground">Open any STR for the full individual dashboard</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {strs.map((s) => (
            <Link key={s.id} to="/str/$id" params={{ id: s.id }} className="group">
              <Card className="hover:border-primary/50 transition-colors h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {s.name}
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{s.empId} · TC: {s.tc}</p>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="text-xs">{s.phase}</div>
                  <div className="text-xs text-muted-foreground">{s.phaseDay}</div>
                  <div className="h-1.5 bg-muted rounded overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${Math.round(s.phaseProgress*100)}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span>Quiz: <b>{Math.round(s.quizAvg*100)}%</b></span>
                    <span>PT: <b>{s.ptAvg}</b></span>
                    <span>Adh: <b>{Math.round(s.adherence*100)}%</b></span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
