"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Siren, WifiOff, Scan, AlertTriangle } from "lucide-react";

export function QRRelayDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"confirm" | "streaming">("confirm");
  const [frameIndex, setFrameIndex] = useState(0);
  
  // Dummy SOS payload split into multiple frames
  const frames = [
    "SOS/1:MAITRI:17:47Z:-70.76,11.73:FIRE:24",
    "SOS/2:CONTACT:leader@maitri.aq:HQ_URGENT",
    "SOS/3:SITREP:Gen1_offline_fire_contained",
    "SOS/4:END_PAYLOAD:EOM"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "streaming") {
      interval = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % frames.length);
      }, 800); // 800ms per frame for scanning
    }
    return () => clearInterval(interval);
  }, [step, frames.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0F172A] border-destructive/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Siren className="h-5 w-5 animate-pulse" />
            Emergency Relay Protocol
          </DialogTitle>
          <DialogDescription>
            Satellite link is OFFLINE. Proceeding with QR optical stream relay.
          </DialogDescription>
        </DialogHeader>

        {step === "confirm" ? (
          <div className="space-y-4 pt-4">
            <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg text-sm text-destructive-foreground">
              <p className="font-mono text-xs mb-2 text-destructive">PAYLOAD SUMMARY [184 BYTES]</p>
              <ul className="space-y-1 text-xs opacity-90">
                <li><strong>Station:</strong> Maitri (70°46'S, 11°43'E)</li>
                <li><strong>Incident:</strong> FIRE</li>
                <li><strong>Headcount:</strong> 24 (All accounted)</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1 gap-2 font-bold" onClick={() => setStep("streaming")}>
                <WifiOff className="h-4 w-4" /> Start QR Stream
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 pt-6 pb-2">
            <div className="p-4 bg-white rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] border-4 border-destructive relative">
              <QRCodeSVG 
                value={frames[frameIndex]} 
                size={200}
                level="L"
              />
              <div className="absolute top-2 right-2 bg-destructive text-white text-[10px] font-mono px-1.5 rounded">
                {frameIndex + 1}/{frames.length}
              </div>
            </div>

            <div className="w-full space-y-2 text-center">
              <p className="text-sm font-mono text-muted-foreground animate-pulse flex items-center justify-center gap-2">
                <Scan className="h-4 w-4" /> SCAN WITH RELAY DEVICE
              </p>
              <Progress value={((frameIndex + 1) / frames.length) * 100} className="h-2 bg-secondary" indicatorClassName="bg-destructive" />
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => setStep("confirm")}>
              Stop Transmission
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
