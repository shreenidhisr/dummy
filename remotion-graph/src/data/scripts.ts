import { ADJACENCY_LIST, EDGES, NODE_ORDER, NODES } from "./graph";
import {
  SCENE_TAIL_FRAMES,
  buildTimedCues,
  type CueScript,
} from "./narration";

export const TITLE_SCRIPTS: CueScript[] = [
  { text: "A graph has vertices connected by edges." },
  {
    text: "There are two common ways to store a graph: adjacency list and adjacency matrix.",
  },
  {
    text: "We will build one sample graph, then store it both ways.",
    extraFrames: 20,
  },
];

/** One cue per on-screen action while building */
export const BUILD_SCRIPTS: CueScript[] = [
  ...NODES.map((node) => ({
    text: `Add vertex ${node.id}.`,
  })),
  ...EDGES.map((edge) => ({
    text: `Add undirected edge ${edge.from}–${edge.to}.`,
  })),
  {
    text: "Graph is ready. Next: store it as an adjacency list.",
    extraFrames: 25,
  },
];

export const LIST_SCRIPTS: CueScript[] = [
  {
    text: "Adjacency list: each vertex stores a list of its neighbors.",
  },
  ...NODE_ORDER.map((id) => ({
    text: `${id} → [${ADJACENCY_LIST[id].join(", ")}]`,
    extraFrames: 15,
  })),
  {
    text: "Space is about O(V + E). Good when the graph is sparse.",
    extraFrames: 20,
  },
];

export const MATRIX_SCRIPTS: CueScript[] = [
  {
    text: "Adjacency matrix: a V×V table. Entry [i][j] is 1 if an edge exists, else 0.",
  },
  ...NODE_ORDER.map((id) => {
    const cells = NODE_ORDER.map((col) =>
      id === col ? "0" : ADJACENCY_LIST[id].includes(col) ? "1" : "0",
    ).join("  ");
    return {
      text: `Row ${id}:  ${cells}`,
      extraFrames: 20,
    };
  }),
  {
    text: "Space is O(V²). Edge check is O(1). Good when the graph is dense.",
    extraFrames: 20,
  },
];

export const COMPARE_SCRIPTS: CueScript[] = [
  {
    text: "Difference 1 — Space: list uses O(V + E); matrix uses O(V²).",
  },
  {
    text: "Difference 2 — Edge check: list may scan neighbors; matrix reads one cell in O(1).",
  },
  {
    text: "Difference 3 — Best use: list for sparse graphs; matrix for dense graphs or many edge queries.",
    extraFrames: 25,
  },
];

export const JAVA_LIST_SCRIPTS: CueScript[] = [
  {
    text: "Java adjacency list: Map from vertex to a list of neighbors.",
    extraFrames: 20,
  },
  {
    text: "put('A', [B, D]), put('B', [A, C, E]), and so on for C, D, E.",
    extraFrames: 30,
  },
  {
    text: "Adding an undirected edge means updating both neighbor lists.",
    extraFrames: 25,
  },
];

export const JAVA_MATRIX_SCRIPTS: CueScript[] = [
  {
    text: "Java adjacency matrix: an int[][] of size V×V, filled with 0/1.",
    extraFrames: 20,
  },
  {
    text: "For undirected edge u–v, set matrix[u][v] = 1 and matrix[v][u] = 1.",
    extraFrames: 30,
  },
  {
    text: "Query is simply matrix[u][v] == 1.",
    extraFrames: 25,
  },
];

export const TITLE_TIMING = buildTimedCues(TITLE_SCRIPTS);
export const BUILD_TIMING = buildTimedCues(BUILD_SCRIPTS);
export const LIST_TIMING = buildTimedCues(LIST_SCRIPTS);
export const MATRIX_TIMING = buildTimedCues(MATRIX_SCRIPTS);
export const COMPARE_TIMING = buildTimedCues(COMPARE_SCRIPTS);
export const JAVA_LIST_TIMING = buildTimedCues(JAVA_LIST_SCRIPTS);
export const JAVA_MATRIX_TIMING = buildTimedCues(JAVA_MATRIX_SCRIPTS);

export const SCENE_FRAMES = {
  title: TITLE_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  build: BUILD_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  list: LIST_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  matrix: MATRIX_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  compare: COMPARE_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  javaList: JAVA_LIST_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  javaMatrix: JAVA_MATRIX_TIMING.totalFrames + SCENE_TAIL_FRAMES,
} as const;
