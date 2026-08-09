export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type GraphEdge = {
  from: string;
  to: string;
};

/** Undirected sample graph used across all scenes */
export const NODES: GraphNode[] = [
  { id: "A", label: "A", x: 320, y: 180 },
  { id: "B", label: "B", x: 560, y: 100 },
  { id: "C", label: "C", x: 780, y: 180 },
  { id: "D", label: "D", x: 420, y: 360 },
  { id: "E", label: "E", x: 680, y: 360 },
];

export const EDGES: GraphEdge[] = [
  { from: "A", to: "B" },
  { from: "A", to: "D" },
  { from: "B", to: "C" },
  { from: "B", to: "E" },
  { from: "C", to: "E" },
  { from: "D", to: "E" },
];

export const ADJACENCY_LIST: Record<string, string[]> = {
  A: ["B", "D"],
  B: ["A", "C", "E"],
  C: ["B", "E"],
  D: ["A", "E"],
  E: ["B", "C", "D"],
};

export const NODE_ORDER = ["A", "B", "C", "D", "E"] as const;

export const getNode = (id: string): GraphNode => {
  const node = NODES.find((n) => n.id === id);
  if (!node) {
    throw new Error(`Unknown node: ${id}`);
  }
  return node;
};
