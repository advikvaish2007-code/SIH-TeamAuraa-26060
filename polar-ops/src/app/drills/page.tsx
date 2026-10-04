"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Siren, Timer, CheckSquare, Trophy, AlertCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DrillType = "Fire" | "Medical" | "Power Blackout" | "Comms Failure";

const DRILL_SCENARIOS: Record<DrillType, string[]> = {
  "Fire": [
    "Acknowledge alarm at HQ",
    "Identify sector (Module 3 - Labs)",
    "Isolate ventilation to Module 3",
    "Deploy fire suppression team (2 pax)",
    "Confirm containment via thermal sensors",
    "Transmit ALL CLEAR to HQ"
  ],
  "Medical": [
    "Acknowledge distress signal",
    "Assess triage level (Level 2 - Severe)",
    "Prepare medbay and telemedicine link",
    "Extract personnel from field",
    "Stabilize and log vitals",
    "Submit evacuation request to HQ"
  ],
  "Power Blackout": [
    "Acknowledge grid failure",
    "Verify auto-start of Backup Gen 1",
    "Shed non-essential load (heating 50%)",
    "Inspect main transformer for faults",
    "Restore grid or initiate rationing protocol"
  ],
  "Comms Failure": [
    "Identify signal loss on primary band",
    "Attempt failover to secondary VSAT",
    "Initiate optical/QR relay protocol",
    "Send heartbeat ping via emergency beacon",
    "Re-establish secure handshake"
  ]
};

export default function DrillsPage() {
  const [activeDrill, setActiveDrill] = useState<DrillType | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [scorecard, setScorecard] = useState<any>(null);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeDrill && startTime && !scorecard) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeDrill, startTime, scorecard]);

  const startDrill = (type: DrillType) => {
    setActiveDrill(type);
    setStartTime(Date.now());
    setElapsed(0);
    setCompletedSteps([]);
    setScorecard(null);
  };

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter(i => i !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  const finishDrill = () => {
    const totalTime = elapsed;
    const steps = DRILL_SCENARIOS[activeDrill!].length;
    const done = completedSteps.length;
    
    // Grading logic
    let grade = "A";
    if (done < steps) grade = "F (Incomplete)";
    else if (totalTime > 120) grade = "C";
    else if (totalTime > 60) grade = "B";

    setScorecard({
      time: totalTime,
      stepsDone: done,
      totalSteps: steps,
      grade
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <Siren className="h-8 w-8" />
          Emergency Drill Simulator
        </h2>
        <p className="text-muted-foreground">HQ tabletop simulations for crisis preparedness.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scenario Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Launch Scenario</CardTitle>
            <CardDescription>Select a crisis to test station response.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {(Object.keys(DRILL_SCENARIOS) as DrillType[]).map((type) => (
              <Button 
                key={type}
                variant={activeDrill === type ? "default" : "outline"}
                className={cn("w-full justify-start gap-3", activeDrill === type && !scorecard ? "animate-pulse border-primary" : "")}
                onClick={() => startDrill(type)}
                disabled={activeDrill !== null && !scorecard}
              >
                <PlayCircle className="h-4 w-4" />
                {type} Drill
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Active Drill / Scorecard */}
        <div className="lg:col-span-2">
          {!activeDrill ? (
            <Card className="h-full flex flex-col items-center justify-center p-8 bg-white/5 border-dashed border-white/10 opacity-70">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-muted-foreground">No Active Drill</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-[300px] text-center">
                HQ Admin: Launch a scenario from the left panel to begin a tabletop emergency simulation.
              </p>
            </Card>
          ) : !scorecard ? (
            <Card className="border-destructive/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <CardHeader className="flex flex-row items-start justify-between bg-destructive/5 rounded-t-xl pb-6 border-b border-destructive/10">
                <div>
                  <CardTitle className="text-destructive flex items-center gap-2 text-2xl">
                    <Siren className="h-6 w-6 animate-pulse" />
                    ACTIVE: {activeDrill}
                  </CardTitle>
                  <CardDescription className="mt-2 text-destructive/80">
                    Station personnel have been notified. Complete the checklist.
                  </CardDescription>
                </div>
                <div className="bg-card px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center min-w-[100px]">
                  <span className="text-[10px] text-muted-foreground font-semibold tracking-wider">ELAPSED TIME</span>
                  <span className="text-2xl font-mono text-foreground flex items-center gap-2">
                    <Timer className="h-5 w-5 text-primary" />
                    {formatTime(elapsed)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {DRILL_SCENARIOS[activeDrill].map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-md border transition-all cursor-pointer",
                          isDone ? "bg-success/10 border-success/30" : "bg-white/5 border-white/10 hover:border-white/20"
                        )}
                        onClick={() => toggleStep(idx)}
                      >
                        <div className={cn("h-5 w-5 rounded border flex items-center justify-center shrink-0", isDone ? "bg-success border-success text-success-foreground" : "border-muted-foreground")}>
                          {isDone && <CheckSquare className="h-3 w-3" />}
                        </div>
                        <span className={cn("text-sm", isDone && "text-muted-foreground line-through")}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 border-t border-white/5 pt-4">
                <Button className="w-full gap-2 font-bold" onClick={finishDrill}>
                  End Simulation & Generate Scorecard
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-primary/30 animate-in zoom-in-95 duration-300">
              <CardHeader className="text-center pb-2">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl">Simulation Complete</CardTitle>
                <CardDescription>{activeDrill} Drill Scorecard</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Time to Complete</p>
                    <p className="text-3xl font-mono">{formatTime(scorecard.time)}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Checklist</p>
                    <p className="text-3xl font-mono">{scorecard.stepsDone}<span className="text-lg text-muted-foreground">/{scorecard.totalSteps}</span></p>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg text-center">
                  <p className="text-sm text-primary uppercase tracking-wider mb-2 font-semibold">Overall Grade</p>
                  <p className={cn("text-5xl font-black", scorecard.grade.includes("F") ? "text-destructive" : "text-primary")}>
                    {scorecard.grade}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveDrill(null)}>
                  Return to Scenarios
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
