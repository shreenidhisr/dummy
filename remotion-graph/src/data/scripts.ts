import { ADJACENCY_LIST } from "./graph";
import {
  SCENE_TAIL_FRAMES,
  buildTimedCues,
  type CueScript,
} from "./narration";

export const TITLE_SCRIPTS: CueScript[] = [
  {
    text: "A graph stores relationships — vertices linked by edges.",
  },
  {
    text: "We will see the same graph as a picture, a list, and a matrix.",
  },
  {
    text: "Watch slowly: each representation stores the same connections.",
    extraFrames: 20,
  },
];

export const BUILD_SCRIPTS: CueScript[] = [
  {
    text: "Start with vertices: each circle is a node labeled A through E.",
  },
  {
    text: "Nodes are the things we connect — cities, users, pages, and more.",
  },
  {
    text: "Now draw edges: an edge means two nodes are related to each other.",
  },
  {
    text: "This graph is undirected, so A connected to B is the same as B to A.",
  },
  {
    text: "The picture is intuitive. Next we store these links in memory.",
    extraFrames: 20,
  },
];

export const LIST_INTRO: CueScript = {
  text: "Adjacency list: for each node, store only the nodes it touches.",
};

export const LIST_NODE_SCRIPTS: CueScript[] = [
  {
    text: `Node A → [${ADJACENCY_LIST.A.join(", ")}]. The highlight shows those edges on the graph.`,
  },
  {
    text: `Node B → [${ADJACENCY_LIST.B.join(", ")}]. Degree three means three neighbors are stored.`,
  },
  {
    text: `Node C → [${ADJACENCY_LIST.C.join(", ")}]. Sparse graphs stay compact with this layout.`,
  },
  {
    text: `Node D → [${ADJACENCY_LIST.D.join(", ")}]. Overall memory use is about O(V + E).`,
  },
  {
    text: `Node E → [${ADJACENCY_LIST.E.join(", ")}]. Lists are the usual default for real graphs.`,
    extraFrames: 20,
  },
];

export const MATRIX_INTRO: CueScript = {
  text: "Adjacency matrix: a V by V grid. Cell i, j is 1 when an edge exists.",
};

export const MATRIX_ROW_SCRIPTS: CueScript[] = [
  {
    text: `Row A: ones mark neighbors [${ADJACENCY_LIST.A.join(", ")}]. The diagonal stays 0 with no self-loops.`,
  },
  {
    text: `Row B: edges to [${ADJACENCY_LIST.B.join(", ")}]. Reading one cell tests an edge in constant time.`,
  },
  {
    text: `Row C: neighbors [${ADJACENCY_LIST.C.join(", ")}]. Queries are fast, but we store every pair.`,
  },
  {
    text: `Row D: neighbors [${ADJACENCY_LIST.D.join(", ")}]. Cost is O(V squared) space — many zeros if sparse.`,
  },
  {
    text: `Row E: neighbors [${ADJACENCY_LIST.E.join(", ")}]. Prefer a matrix for dense graphs or frequent edge checks.`,
    extraFrames: 30,
  },
];

export const SUMMARY_SCRIPTS: CueScript[] = [
  {
    text: "Remember: one graph, three ways to show the same edges.",
  },
  {
    text: "Picture for intuition, list for sparse data, matrix for fast checks.",
  },
  {
    text: "Choose the representation that matches your graph and your operations.",
    extraFrames: 30,
  },
];

export const TITLE_TIMING = buildTimedCues(TITLE_SCRIPTS);
export const BUILD_TIMING = buildTimedCues(BUILD_SCRIPTS);
export const LIST_TIMING = buildTimedCues([LIST_INTRO, ...LIST_NODE_SCRIPTS]);
export const MATRIX_TIMING = buildTimedCues([
  MATRIX_INTRO,
  ...MATRIX_ROW_SCRIPTS,
]);
export const SUMMARY_TIMING = buildTimedCues(SUMMARY_SCRIPTS);

export const SCENE_FRAMES = {
  title: TITLE_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  build: BUILD_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  list: LIST_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  matrix: MATRIX_TIMING.totalFrames + SCENE_TAIL_FRAMES,
  summary: SUMMARY_TIMING.totalFrames + SCENE_TAIL_FRAMES,
} as const;
