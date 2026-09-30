"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wifi, Clock, AlertTriangle, Send, Save } from "lucide-react";

interface BandwidthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionName: string;
  payloadSizeKB: number;
  linkStatus: "Online" | "Degraded" | "Offline";
  currentBudgetKB: number;
  onConfirm: () => void;
  onQueue: () => void;
}

export function BandwidthDialog({
  isOpen,
  onOpenChange,
  actionName,
  payloadSizeKB,
  linkStatus,
  currentBudgetKB,
  onConfirm,
  onQueue
}: BandwidthDialogProps) {
  
  // Rule based logic for transmission time
  const getSpeedKbps = (status: string) => {
    if (status === "Online") return 256; // 256 kbps = 32 KB/s
    if (status === "Degraded") return 16; // 16 kbps = 2 KB/s
    return 0;
  };

  const speedKBps = getSpeedKbps(linkStatus) / 8;
  const timeSeconds = speedKBps > 0 ? payloadSizeKB / speedKBps : 0;
  
  const formatTime = (seconds: number) => {
    if (seconds === 0) return "∞";
    if (seconds < 60) return `${Math.ceil(seconds)} sec`;
    return `${Math.ceil(seconds / 60)} min`;
  };

  const isOverBudget = payloadSizeKB > currentBudgetKB;
  const remainingAfter = currentBudgetKB - payloadSizeKB;
  const percentUsed = (payloadSizeKB / currentBudgetKB) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Transmission</DialogTitle>
          <DialogDescription>
            Review bandwidth cost before sending data to HQ.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-sm font-medium">{actionName}</span>
              <span className="font-mono font-bold text-primary">{payloadSizeKB.toFixed(1)} KB</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Wifi className="h-4 w-4" /> Link Status
              </span>
              <span className={linkStatus === "Online" ? "text-success" : linkStatus === "Degraded" ? "text-warning" : "text-destructive"}>
                {linkStatus} ({speedKBps} KB/s)
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Est. Time
              </span>
              <span className="font-mono">{formatTime(timeSeconds)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Remaining Daily Budget</span>
              <span className={isOverBudget ? "text-destructive" : "text-foreground"}>
                {remainingAfter > 0 ? `${remainingAfter.toFixed(1)} KB` : "EXCEEDED"}
              </span>
            </div>
            <Progress 
              value={isOverBudget ? 100 : percentUsed} 
              className="h-1.5" 
              indicatorClassName={isOverBudget ? "bg-destructive" : percentUsed > 80 ? "bg-warning" : "bg-primary"}
            />
          </div>

          {isOverBudget && (
            <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-md text-sm flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              This action exceeds your daily bandwidth budget. Please queue it for the next unlimited link window.
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex gap-2 sm:justify-between">
          <Button variant="outline" className="flex-1" onClick={onQueue}>
            <Save className="h-4 w-4 mr-2" /> Queue (Offline)
          </Button>
          <Button 
            className="flex-1" 
            disabled={linkStatus === "Offline" || isOverBudget}
            onClick={onConfirm}
          >
            <Send className="h-4 w-4 mr-2" /> Send Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
