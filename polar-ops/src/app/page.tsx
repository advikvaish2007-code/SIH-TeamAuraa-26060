import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Wind, ThermometerSnowflake, Zap, Droplet, Users, AlertTriangle, CheckCircle2, PlayCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Maitri Command</h2>
          <p className="text-muted-foreground">Station Overview & Live Telemetry</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default" className="bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)] animate-pulse">
            <PlayCircle className="h-4 w-4 mr-2" />
            Start Demo Mode
          </Button>
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 py-1 px-3 hidden md:flex">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
            Live Telemetry Active
          </Badge>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI: Station Health */}
        <Card className="col-span-1 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
              STATION HEALTH
              <Activity className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-mono font-bold text-success">92<span className="text-2xl text-muted-foreground">/100</span></div>
            <p className="text-xs text-muted-foreground mt-2">+2 from yesterday</p>
            <div className="mt-4 flex gap-2">
              <Badge variant="success" className="text-[10px]">Power: 100%</Badge>
              <Badge variant="warning" className="text-[10px]">Comms: 85%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* KPI: Fuel Days */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
              WINTER FUEL SUPPLY
              <Zap className="h-4 w-4 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-mono font-bold text-amber-500">142<span className="text-xl text-muted-foreground"> Days</span></div>
            <p className="text-xs text-muted-foreground mt-2">Next resupply: 32 days</p>
            <div className="w-full bg-secondary h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-amber-500 h-full w-[65%]"></div>
            </div>
          </CardContent>
        </Card>

        {/* KPI: Environment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
              EXTERIOR CONDITIONS
              <ThermometerSnowflake className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temp</span>
              <span className="font-mono text-xl">-42.5°C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wind</span>
              <span className="font-mono text-xl flex items-center gap-1">
                <Wind className="h-3 w-3" /> 85 km/h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Visibility</span>
              <span className="font-mono text-xl">0.5 km</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI: Personnel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
              HEADCOUNT
              <Users className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-mono font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-2">18 Inside • 6 Outside</p>
            <div className="mt-4 flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-warning"><span>Outside limit:</span> <span className="font-mono">2h max (Extreme Cold)</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Schematic & Telemetry */}
        <Card className="col-span-1 lg:col-span-2 min-h-[300px]">
          <CardHeader>
            <CardTitle>Station Systems Overview</CardTitle>
            <CardDescription>Click subsystems for detailed telemetry</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px] border border-white/5 rounded-lg bg-white/5 mx-6">
            <p className="text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 animate-spin-slow" />
              Interactive SVG Schematic Loading...
            </p>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-destructive">Gen-2 Temp Spike</span>
                <span className="text-[10px] font-mono text-muted-foreground">14m ago</span>
              </div>
              <span className="text-xs text-muted-foreground">Coolant pressure drop detected. Auto-shedding load.</span>
            </div>
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-warning">Comms Link Degraded</span>
                <span className="text-[10px] font-mono text-muted-foreground">1h ago</span>
              </div>
              <span className="text-xs text-muted-foreground">Bandwidth reduced to 12kbps. Sync queued.</span>
            </div>
          </CardContent>
        </Card>

        {/* Daily Brief */}
        <Card className="col-span-1 lg:col-span-1 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Daily Decision Brief
              <Badge variant="outline" className="text-[10px] font-mono">1.2 KB</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">Auto-generated summary for HQ:</p>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Blizzard approaching (+12h). All outdoor tasks postponed.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Switched to Generator 1 to perform maintenance on Gen 2.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Food stores nominal. Awaiting approval on rationing plan #A4.</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
