import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Trophy, Users } from "lucide-react";

const links = [
  { to: "/", label: "BM Dashboard", icon: LayoutDashboard },
  { to: "/strs", label: "STRs", icon: Users },
  { to: "/leaderboard", label: "All India Leaderboard", icon: Trophy },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-sm tracking-tight">BM Dashboard</div>
              <div className="text-[11px] text-muted-foreground">Kolkata Branch · Training Programme</div>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            {links.map((l) => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <l.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-3">{children}</main>
    </div>
  );
}
