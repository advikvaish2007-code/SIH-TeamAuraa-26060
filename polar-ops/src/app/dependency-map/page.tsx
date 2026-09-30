import DependencyGraph from "./DependencyGraph";
import { Network } from "lucide-react";

export default function DependencyMapPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <Network className="h-8 w-8" />
          Dependency Map
        </h2>
        <p className="text-muted-foreground">Interactive asset graph and blast-radius simulator.</p>
      </div>
      
      <div className="flex-1 min-h-0">
        <DependencyGraph />
      </div>
    </div>
  );
}
