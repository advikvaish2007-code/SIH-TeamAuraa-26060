import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, HardDrive, History, ArrowRightLeft, RadioReceiver, UploadCloud } from "lucide-react";

export default function SyncCenterPage() {
  const pendingQueue = [
    { id: 1, action: "Rationing Plan #A4 Approval", module: "Logistics", size: 0.8, priority: "Critical" },
    { id: 2, action: "Inventory Daily Delta", module: "Inventory", size: 12.5, priority: "High" },
    { id: 3, action: "Gen-2 Telemetry log", module: "Assets", size: 45.0, priority: "Normal" },
    { id: 4, action: "Weekly Medical Report", module: "Reports", size: 320.0, priority: "Low" },
  ];

  const ledger = [
    { time: "14:22Z", action: "Daily Decision Brief", module: "Dashboard", size: 1.2, status: "Sent" },
    { time: "11:05Z", action: "SOS Handshake Ping", module: "System", size: 0.1, status: "Sent" },
    { time: "09:30Z", action: "Weather DB Update", module: "Weather", size: 15.4, status: "Merged" },
    { time: "08:00Z", action: "Shift Roster Sync", module: "Personnel", size: 4.2, status: "Sent" },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <RefreshCw className="h-8 w-8" />
          Sync Center & Ledger
        </h2>
        <p className="text-muted-foreground">Manage offline queues, bandwidth usage, and physical sync manifests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Pending Queue */}
        <Card className="flex flex-col h-full border-warning/30 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-warning" />
              Pending Sync Queue
            </CardTitle>
            <CardDescription>Actions queued locally. Waiting for next link window.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-3 pr-2">
            {pendingQueue.map((item) => (
              <div key={item.id} className="bg-card border border-white/10 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.module}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={item.priority === "Critical" ? "destructive" : item.priority === "High" ? "warning" : "secondary"} className="text-[10px]">
                    {item.priority}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground">{item.size} KB</span>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-warning/20 flex justify-between items-center bg-card">
            <span className="text-sm text-muted-foreground">Total Pending: <strong className="font-mono text-foreground">378.3 KB</strong></span>
            <Button variant="outline" className="text-warning border-warning hover:bg-warning/10" disabled>
              Link Offline - Queued
            </Button>
          </div>
        </Card>

        {/* Bandwidth Ledger & Physical Sync */}
        <div className="space-y-6 h-full flex flex-col">
          
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Bandwidth Ledger
              </CardTitle>
              <CardDescription>Transmission history for today.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-2">
              {ledger.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors text-sm border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">{item.time}</span>
                    <div>
                      <p>{item.action}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{item.module}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">{item.size} KB</span>
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shrink-0 bg-secondary/50 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <HardDrive className="h-4 w-4" />
                Physical Sync Manifest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">Drive ID: MAI-HQ-844</p>
                  <p className="text-xs text-muted-foreground mt-1">Status: In Transit (Sealed)</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">1.4 TB</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">View Manifest</Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

// Needed because we reference CheckCircle2 which isn't imported from lucide-react in the above snippet. I will add it.
import { CheckCircle2 } from "lucide-react";
