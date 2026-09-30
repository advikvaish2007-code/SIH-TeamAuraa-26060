"use client";

import { 
  Wifi, 
  WifiOff, 
  Activity, 
  Search, 
  Bell, 
  Hand, 
  Siren, 
  RefreshCw 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { QRRelayDialog } from "@/components/QRRelayDialog";

export function TopBar() {
  const [linkStatus, setLinkStatus] = useState<"Online" | "Degraded" | "Offline">("Offline");
  const [gloveMode, setGloveMode] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const bandwidthUsed = 1450;
  const bandwidthTotal = 5000;
  const bandwidthPercent = (bandwidthUsed / bandwidthTotal) * 100;

  return (
    <header className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
      
      <div className="flex items-center gap-4">
        {/* Station Switcher */}
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          <button className="px-3 py-1 rounded-md text-sm font-medium bg-primary text-primary-foreground">Maitri</button>
          <button className="px-3 py-1 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">Bharati</button>
        </div>

        {/* Global Search */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search system..." 
            className="h-9 w-64 bg-white/5 border border-white/10 rounded-md pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all group-hover:bg-white/10"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Link Status */}
        <div className="flex items-center gap-2">
          {linkStatus === "Online" && <Badge variant="success" className="gap-1"><Wifi className="h-3 w-3" /> Online</Badge>}
          {linkStatus === "Degraded" && <Badge variant="warning" className="gap-1"><Activity className="h-3 w-3" /> Degraded</Badge>}
          {linkStatus === "Offline" && <Badge variant="destructive" className="gap-1"><WifiOff className="h-3 w-3" /> Offline</Badge>}
          
          <div className="flex flex-col ml-2">
            <span className="text-[10px] text-muted-foreground font-mono">LAST SYNC: 2m ago</span>
            <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
              <RefreshCw className="h-3 w-3" /> 4 pending
            </span>
          </div>
        </div>

        {/* Bandwidth Budget */}
        <div className="flex flex-col w-32 hidden lg:flex">
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-muted-foreground">B/W BUDGET</span>
            <span className="text-primary">{bandwidthTotal - bandwidthUsed} KB</span>
          </div>
          <Progress value={bandwidthPercent} className="h-1.5" />
        </div>

        <div className="h-6 w-px bg-white/10" />

        {/* Toggles & Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setGloveMode(!gloveMode)} title="Glove Mode" className={gloveMode ? "bg-primary/20 text-primary" : ""}>
            <Hand className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          
          {/* Role Switcher */}
          <select className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer">
            <option className="bg-background">Station Leader</option>
            <option className="bg-background">HQ Admin</option>
            <option className="bg-background">Engineer</option>
            <option className="bg-background">Doctor</option>
          </select>
        </div>

        {/* SOS */}
        <Button 
          variant="destructive" 
          size="sm" 
          className="gap-2 font-bold tracking-widest shadow-lg shadow-destructive/20 animate-pulse"
          onClick={() => setSosOpen(true)}
        >
          <Siren className="h-4 w-4" />
          SOS
        </Button>
      </div>

      <QRRelayDialog isOpen={sosOpen} onOpenChange={setSosOpen} />
    </header>
  );
}
