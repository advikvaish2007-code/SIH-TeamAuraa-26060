"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Truck, Calculator, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

type Consumable = {
  id: string;
  name: string;
  currentDays: number;
  consumptionRate: number; // units per day
};

const INITIAL_CONSUMABLES: Consumable[] = [
  { id: "fuel", name: "Diesel Fuel", currentDays: 35, consumptionRate: 200 },
  { id: "food", name: "Rations", currentDays: 45, consumptionRate: 15 },
  { id: "water", name: "Potable Water", currentDays: 40, consumptionRate: 50 },
  { id: "medical", name: "Medical Supplies", currentDays: 120, consumptionRate: 1 },
];

export default function LogisticsPage() {
  const [delayDays, setDelayDays] = useState(0);
  const [approvedPlan, setApprovedPlan] = useState(false);
  
  const targetETA = 32; // base ETA in days
  const newETA = targetETA + delayDays;

  // The Engine: Identifies which consumable hits zero first
  const criticalConsumable = useMemo(() => {
    return INITIAL_CONSUMABLES.find(c => c.currentDays < newETA);
  }, [newETA]);

  // Generate Rationing Plan
  const rationingPlan = useMemo(() => {
    if (!criticalConsumable) return null;
    
    // Rule-based logic based on the critical consumable
    if (criticalConsumable.id === "fuel") {
      const deficitDays = newETA - criticalConsumable.currentDays;
      const reductionNeeded = Math.ceil((deficitDays / newETA) * 100);
      return {
        target: "Diesel Fuel",
        deficit: deficitDays,
        actions: [
          `Reduce non-essential heating by ${reductionNeeded}%`,
          "Shed load from secondary research labs",
          "Restrict vehicle usage to emergencies only"
        ],
        gainedDays: deficitDays + 2
      };
    }
    if (criticalConsumable.id === "food") {
      const deficitDays = newETA - criticalConsumable.currentDays;
      return {
        target: "Rations",
        deficit: deficitDays,
        actions: [
          `Switch to reserve rations starting Day ${criticalConsumable.currentDays - 5}`,
          "Reduce caloric output for non-manual roles"
        ],
        gainedDays: deficitDays + 4
      };
    }
    // Generic
    const deficitDays = newETA - criticalConsumable.currentDays;
    return {
      target: criticalConsumable.name,
      deficit: deficitDays,
      actions: [
        `Enforce strict rationing on ${criticalConsumable.name}`,
        "Audit current inventory for unaccounted stock"
      ],
      gainedDays: deficitDays + 1
    };
  }, [criticalConsumable, newETA]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Truck className="h-8 w-8" />
            Logistics & Resupply
          </h2>
          <p className="text-muted-foreground">Manage supplies, forecasts, and auto-generated rationing plans.</p>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
          BANDWIDTH BUDGET: 150 KB
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simulation Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Resupply Delay Simulator
            </CardTitle>
            <CardDescription>Adjust the slider to simulate shipment delays.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current ETA (Shipment #402)</p>
                <p className="text-2xl font-mono font-bold">{targetETA} Days</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Adjusted ETA</p>
                <p className={`text-2xl font-mono font-bold ${delayDays > 0 ? 'text-warning' : 'text-success'}`}>
                  {newETA} Days
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Delay: {delayDays} days</span>
                <span className="text-muted-foreground">Max: 30 days</span>
              </div>
              <Slider 
                value={[delayDays]} 
                onValueChange={(val) => {
                  setDelayDays(val[0]);
                  setApprovedPlan(false);
                }} 
                max={30} 
                step={1} 
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Consumable Forecast</h4>
              {INITIAL_CONSUMABLES.map(c => {
                const hitsZero = c.currentDays < newETA;
                const percent = Math.min(100, Math.max(0, (c.currentDays / newETA) * 100));
                
                return (
                  <div key={c.id} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className={hitsZero ? "text-destructive font-bold" : ""}>{c.name}</span>
                      <span className={hitsZero ? "text-destructive font-mono" : "font-mono"}>{c.currentDays} Days left</span>
                    </div>
                    <Progress 
                      value={percent} 
                      className="h-2" 
                      indicatorClassName={hitsZero ? "bg-destructive" : (percent < 120 ? "bg-warning" : "bg-success")} 
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Rationing Plan Panel */}
        <div className="space-y-6">
          {rationingPlan ? (
            <Card className="border-warning bg-warning/5 animate-in fade-in zoom-in-95 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <ShieldAlert className="h-5 w-5" />
                  Auto-Generated Rationing Plan
                </CardTitle>
                <CardDescription>
                  {rationingPlan.target} will be depleted {rationingPlan.deficit} days before resupply.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-card border border-white/5 rounded-md text-sm">
                  <div className="text-muted-foreground">Projected Survival</div>
                  <div className="font-mono text-destructive line-through opacity-70">{criticalConsumable?.currentDays} Days</div>
                  <div className="font-mono text-success font-bold">{criticalConsumable!.currentDays + rationingPlan.gainedDays} Days</div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Recommended Actions:</p>
                  <ul className="space-y-2">
                    {rationingPlan.actions.map((act, i) => (
                      <li key={i} className="text-sm flex items-start gap-2 bg-white/5 p-2 rounded">
                        <span className="text-warning mt-0.5">•</span> {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="gap-3 border-t border-warning/20 pt-4">
                {approvedPlan ? (
                  <div className="w-full bg-success/20 text-success p-2 rounded text-center text-sm font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Plan Approved & Synced to HQ
                  </div>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1 border-destructive/50 hover:bg-destructive/10 text-destructive">
                      <XCircle className="h-4 w-4 mr-2" /> Reject
                    </Button>
                    <Button className="flex-1 bg-warning text-warning-foreground hover:bg-warning/90" onClick={() => setApprovedPlan(true)}>
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Approve Plan
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 border-dashed border-white/10 opacity-70">
              <ShieldAlert className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-muted-foreground">No Rationing Required</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-[250px]">
                Current supplies are sufficient for the forecasted ETA. Adjust the delay slider to simulate a crisis.
              </p>
            </Card>
          )}
        </div>
        
      </div>
    </div>
  );
}
