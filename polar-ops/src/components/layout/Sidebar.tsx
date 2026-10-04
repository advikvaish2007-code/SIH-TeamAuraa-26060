"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Network, 
  Users, 
  CheckSquare, 
  AlertTriangle, 
  Truck, 
  Siren, 
  RefreshCw, 
  FileText, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Assets & Maint.", href: "/assets", icon: Wrench },
  { name: "Dependency Map", href: "/dependency-map", icon: Network },
  { name: "Personnel", href: "/personnel", icon: Users },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Logistics", href: "/logistics", icon: Truck },
  { name: "Drills", href: "/drills", icon: Siren },
  { name: "Sync Center", href: "/sync-center", icon: RefreshCw },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card/40 border-r border-white/5 backdrop-blur-xl flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-primary">PolarOps<span className="text-foreground">.</span></h1>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-lg p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Status: Online</p>
          <p>Maitri Station</p>
        </div>
      </div>
    </aside>
  );
}
