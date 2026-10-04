"use client";

import { useCallback, useState, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, ArrowRight } from "lucide-react";

// Mock Data
const initialNodes = [
  { id: "gen1", position: { x: 250, y: 50 }, data: { label: "Main Generator 1" }, type: "input", className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "gen2", position: { x: 450, y: 50 }, data: { label: "Backup Generator 2" }, type: "input", className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "power_hub", position: { x: 350, y: 150 }, data: { label: "Power Distribution" }, className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "heating", position: { x: 150, y: 250 }, data: { label: "Heating System" }, className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "comms", position: { x: 350, y: 250 }, data: { label: "Comms Array" }, className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "water", position: { x: 550, y: 250 }, data: { label: "Desalination Plant" }, className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "accom", position: { x: 150, y: 350 }, data: { label: "Accommodation" }, type: "output", className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
  { id: "labs", position: { x: 350, y: 350 }, data: { label: "Research Labs" }, type: "output", className: "bg-secondary text-foreground border-white/20 rounded-md p-2 w-40 text-center text-sm font-medium" },
];

const initialEdges = [
  { id: "e1-hub", source: "gen1", target: "power_hub", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
  { id: "e2-hub", source: "gen2", target: "power_hub", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
  { id: "eh-hub", source: "power_hub", target: "heating", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
  { id: "ec-hub", source: "power_hub", target: "comms", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
  { id: "ew-hub", source: "power_hub", target: "water", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
  { id: "ea-heat", source: "heating", target: "accom", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
  { id: "el-comms", source: "comms", target: "labs", markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }, style: { stroke: '#94A3B8' } },
];

// Simple blast radius logic (DFS)
const getDownstreamNodes = (nodeId: string, edges: typeof initialEdges): string[] => {
  const downstream = new Set<string>();
  const stack = [nodeId];

  while (stack.length > 0) {
    const current = stack.pop()!;
    edges.forEach((edge) => {
      if (edge.source === current) {
        downstream.add(edge.target);
        stack.push(edge.target);
      }
    });
  }
  return Array.from(downstream);
};

export default function DependencyGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const affectedNodes = useMemo(() => {
    if (!selectedNode || !isSimulating) return [];
    return getDownstreamNodes(selectedNode, initialEdges);
  }, [selectedNode, isSimulating]);

  // Apply visual styling based on simulation
  const displayNodes = nodes.map((node) => {
    if (isSimulating && node.id === selectedNode) {
      return { ...node, className: "bg-destructive text-destructive-foreground border-destructive rounded-md p-2 w-40 text-center text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]" };
    }
    if (isSimulating && affectedNodes.includes(node.id)) {
      return { ...node, className: "bg-warning text-warning-foreground border-warning rounded-md p-2 w-40 text-center text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]" };
    }
    return node;
  });

  const displayEdges = edges.map((edge) => {
    if (isSimulating && (edge.source === selectedNode || affectedNodes.includes(edge.source))) {
      return { ...edge, style: { stroke: '#EF4444', strokeWidth: 2 }, animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' } };
    }
    return edge;
  });

  const onNodeClick = (_: any, node: any) => {
    setSelectedNode(node.id);
    setIsSimulating(false);
  };

  const selectedNodeData = initialNodes.find((n) => n.id === selectedNode);

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Graph Area */}
      <Card className="flex-1 overflow-hidden">
        <div className="h-full bg-[#0B1220]">
          <ReactFlow
            nodes={displayNodes}
            edges={displayEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            colorMode="dark"
            fitView
          >
            <Background color="#1E293B" gap={16} />
            <Controls className="bg-card border-white/10" />
            <MiniMap 
              nodeColor={(n) => {
                if (isSimulating && n.id === selectedNode) return '#EF4444';
                if (isSimulating && affectedNodes.includes(n.id)) return '#F59E0B';
                return '#1E293B';
              }} 
              maskColor="rgba(11, 18, 32, 0.7)"
              className="bg-card"
            />
          </ReactFlow>
        </div>
      </Card>

      {/* Side Panel */}
      <div className="w-80 flex flex-col gap-4">
        {selectedNode ? (
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle>{selectedNodeData?.data.label}</CardTitle>
              <CardDescription>System ID: {selectedNode.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={isSimulating ? "destructive" : "success"}>
                  {isSimulating ? "Failed" : "Operational"}
                </Badge>
              </div>

              <Button 
                variant={isSimulating ? "outline" : "destructive"}
                className="w-full"
                onClick={() => setIsSimulating(!isSimulating)}
              >
                {isSimulating ? "Reset Simulation" : "Simulate Failure"}
              </Button>

              {isSimulating && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                    <h4 className="text-destructive font-semibold flex items-center gap-2 text-sm mb-2">
                      <AlertTriangle className="h-4 w-4" /> Blast Radius
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {affectedNodes.length} downstream systems affected.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Affected Systems Ranked</h5>
                    {affectedNodes.map((id) => {
                      const n = initialNodes.find((x) => x.id === id);
                      return (
                        <div key={id} className="bg-white/5 p-2 rounded flex justify-between items-center text-sm border-l-2 border-warning">
                          <span>{n?.data.label}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">CRITICAL</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white/5 p-3 rounded-md space-y-2 border border-white/5">
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Info className="h-3 w-3" /> Recommended Fallback
                    </h5>
                    <p className="text-sm">
                      Switch to Generator 1, shed workshop load. <br/>
                      <span className="text-primary font-mono text-xs mt-1 block">Est. diesel: +14 L/day</span>
                    </p>
                    <Button size="sm" className="w-full mt-2 gap-2">
                      Execute Fallback <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center text-center p-6 bg-white/5 border-dashed">
            <div className="space-y-2">
              <Network className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Select a node to view system details and simulate blast radius.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
