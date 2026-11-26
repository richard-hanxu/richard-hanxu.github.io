/**
 * Turns line-art clip art into a constellation: every stroke in the image is
 * thinned to its centre line and traced into a polyline, then stars are
 * sprinkled along those lines (always at their ends and junctions).
 *
 * Pure and deterministic, so the same image always yields the same sky.
 */

export type Star = {
  /** Position in a 0–100 square viewBox. */
  x: number;
  y: number;
  /** Relative brightness, 0–1. Line ends and junctions are brightest. */
  magnitude: number;
  /** The line this star sits on, and how far along it (0–1). */
  path: number;
  along: number;
};

export type Constellation = {
  /** Polylines as flat [x0, y0, x1, y1, …] lists in the 0–100 viewBox. */
  paths: number[][];
  stars: Star[];
};

type Options = {
  /** Average gap between sprinkled stars, in viewBox units. */
  starSpacing?: number;
};

/** Ink strength (0–1) of an RGBA pixel: opaque and noticeably non-white. */
export function inkStrength(r: number, g: number, b: number, a: number) {
  const distanceFromWhite = (255 - Math.min(r, g, b)) / 255;
  return Math.min(1, distanceFromWhite * 2.5) * (a / 255);
}

const RING = [
  [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1],
] as const;

/**
 * @param data RGBA pixels, as returned by CanvasRenderingContext2D.getImageData.
 *   Leave a blank margin of at least one pixel around the drawing.
 */
export function traceConstellation(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  { starSpacing = 7 }: Options = {},
): Constellation {
  const size = width * height;
  const skeleton = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    const p = i * 4;
    skeleton[i] = inkStrength(data[p]!, data[p + 1]!, data[p + 2]!, data[p + 3]!) > 0.5 ? 1 : 0;
  }
  for (let x = 0; x < width; x++) skeleton[x] = skeleton[size - 1 - x] = 0;
  for (let y = 0; y < height; y++) skeleton[y * width] = skeleton[y * width + width - 1] = 0;
  thin(skeleton, width, height);

  const at = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < width && y < height ? skeleton[y * width + x]! : 0;
  const ring = (i: number) => {
    const x = i % width;
    const y = (i - x) / width;
    return RING.map(([dx, dy]) => ({ i: (y + dy) * width + x + dx, set: at(x + dx, y + dy) === 1, diagonal: dx !== 0 && dy !== 0 }));
  };
  /** Number of separate branches leaving a pixel (the crossing number). */
  const branches = (i: number) => {
    const r = ring(i);
    let count = 0;
    for (let k = 0; k < 8; k++) if (!r[k]!.set && r[(k + 1) % 8]!.set) count++;
    return count === 0 && r.some((n) => n.set) ? 1 : count;
  };

  const isNode = new Uint8Array(size);
  const nodes: number[] = [];
  for (let i = 0; i < size; i++) {
    if (!skeleton[i]) continue;
    if (branches(i) !== 2) {
      isNode[i] = 1;
      nodes.push(i);
    }
  }

  // Walk the skeleton from every line end / junction, then sweep up loops.
  const visited = new Uint8Array(size);
  const rawPaths: { pixels: number[]; spur: boolean }[] = [];
  const walk = (start: number, first: number) => {
    const pixels = [start, first];
    if (!isNode[first]) visited[first] = 1;
    let prev = start;
    let current = first;
    while (!isNode[current] || current === start) {
      const options = ring(current).filter(
        (n) => n.set && n.i !== prev && (isNode[n.i] ? n.i !== start || pixels.length > 3 : !visited[n.i]),
      );
      const next =
        options.find((n) => isNode[n.i]) ??
        options.find((n) => !n.diagonal) ??
        options[0];
      if (!next) break;
      pixels.push(next.i);
      if (!isNode[next.i]) visited[next.i] = 1;
      prev = current;
      current = next.i;
      if (current === start) break;
    }
    return pixels;
  };
  for (const node of nodes) {
    for (const n of ring(node)) {
      if (!n.set || visited[n.i]) continue;
      if (isNode[n.i] && n.i < node) continue; // node–node links once
      const pixels = walk(node, n.i);
      const ends = [pixels[0]!, pixels[pixels.length - 1]!];
      const spur = ends.some((e) => branches(e) === 1) && ends.some((e) => branches(e) >= 3);
      rawPaths.push({ pixels, spur });
    }
  }
  for (let i = 0; i < size; i++) {
    if (!skeleton[i] || visited[i] || isNode[i]) continue;
    visited[i] = 1;
    const next = ring(i).find((n) => n.set && !visited[n.i]);
    if (!next) continue;
    const pixels = walk(i, next.i);
    pixels.push(i); // close the loop
    rawPaths.push({ pixels, spur: false });
  }

  // Drop thinning artefacts: tiny spurs and specks.
  const minLength = Math.max(width, height) / 40;
  const kept = rawPaths
    .filter(({ pixels, spur }) => pixels.length >= (spur ? minLength * 1.5 : minLength))
    .map(({ pixels }) =>
      simplify(
        pixels.map((i) => [i % width, Math.floor(i / width)] as [number, number]),
        1,
      ),
    );
  if (kept.length === 0) return { paths: [], stars: [] };

  // Fit everything into a padded 0–100 square, keeping the aspect ratio.
  const all = kept.flat();
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const pad = 6;
  const unit = (100 - pad * 2) / Math.max(maxX - minX, maxY - minY, 1);
  const offsetX = (100 - (maxX - minX) * unit) / 2;
  const offsetY = (100 - (maxY - minY) * unit) / 2;
  const lines = kept
    .map((line) =>
      line.map(([x, y]) => [offsetX + (x - minX) * unit, offsetY + (y - minY) * unit] as [number, number]),
    )
    // Draw top to bottom, left to right.
    .sort((a, b) => topLeft(a) - topLeft(b));

  // Sprinkle stars: both ends of every line, then roughly every starSpacing.
  const stars: Star[] = [];
  const tooClose = (x: number, y: number, gap: number) =>
    stars.some((s) => (s.x - x) ** 2 + (s.y - y) ** 2 < gap * gap);
  const place = (x: number, y: number, magnitude: number, path: number, along: number, gap: number) => {
    if (!tooClose(x, y, gap)) stars.push({ x: round(x), y: round(y), magnitude, path, along });
  };
  lines.forEach((line, path) => {
    const lengths = [0];
    for (let k = 1; k < line.length; k++) {
      lengths.push(lengths[k - 1]! + Math.hypot(line[k]![0] - line[k - 1]![0], line[k]![1] - line[k - 1]![1]));
    }
    const total = lengths[lengths.length - 1]!;
    place(line[0]![0], line[0]![1], 1, path, 0, starSpacing * 0.45);
    let distance = starSpacing * (0.5 + hash(path * 7.3));
    let n = 0;
    while (distance < total - starSpacing * 0.4) {
      let k = 1;
      while (lengths[k]! < distance) k++;
      const t = (distance - lengths[k - 1]!) / (lengths[k]! - lengths[k - 1]! || 1);
      const x = line[k - 1]![0] + (line[k]![0] - line[k - 1]![0]) * t;
      const y = line[k - 1]![1] + (line[k]![1] - line[k - 1]![1]) * t;
      const seed = hash(path * 31.7 + n++ * 1.91);
      place(x, y, 0.25 + 0.55 * seed, path, distance / total, starSpacing * 0.45);
      distance += starSpacing * (0.6 + 0.8 * hash(seed * 97.1));
    }
    const last = line[line.length - 1]!;
    place(last[0], last[1], 1, path, 1, starSpacing * 0.45);
  });

  return {
    paths: lines.map((line) => line.flatMap(([x, y]) => [round(x), round(y)])),
    stars,
  };
}

/** Zhang–Suen thinning, in place: reduces strokes to 1-pixel centre lines. */
function thin(image: Uint8Array, width: number, height: number) {
  const remove: number[] = [];
  let changed = true;
  while (changed) {
    changed = false;
    for (const step of [0, 1]) {
      remove.length = 0;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const i = y * width + x;
          if (!image[i]) continue;
          const p2 = image[i - width]!, p3 = image[i - width + 1]!, p4 = image[i + 1]!;
          const p5 = image[i + width + 1]!, p6 = image[i + width]!, p7 = image[i + width - 1]!;
          const p8 = image[i - 1]!, p9 = image[i - width - 1]!;
          const count = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
          if (count < 2 || count > 6) continue;
          const seq = [p2, p3, p4, p5, p6, p7, p8, p9, p2];
          let transitions = 0;
          for (let k = 0; k < 8; k++) if (!seq[k] && seq[k + 1]) transitions++;
          if (transitions !== 1) continue;
          if (step === 0 ? p2 * p4 * p6 || p4 * p6 * p8 : p2 * p4 * p8 || p2 * p6 * p8) continue;
          remove.push(i);
        }
      }
      for (const i of remove) image[i] = 0;
      if (remove.length) changed = true;
    }
  }
}

/** Ramer–Douglas–Peucker: drops points within `epsilon` of the line. */
function simplify(points: [number, number][], epsilon: number): [number, number][] {
  if (points.length < 3) return points;
  const [ax, ay] = points[0]!;
  const [bx, by] = points[points.length - 1]!;
  const length = Math.hypot(bx - ax, by - ay);
  let worst = 0;
  let index = 0;
  for (let k = 1; k < points.length - 1; k++) {
    const [px, py] = points[k]!;
    const d = length
      ? Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / length
      : Math.hypot(px - ax, py - ay);
    if (d > worst) {
      worst = d;
      index = k;
    }
  }
  if (worst <= epsilon) return [points[0]!, points[points.length - 1]!];
  return [
    ...simplify(points.slice(0, index + 1), epsilon).slice(0, -1),
    ...simplify(points.slice(index), epsilon),
  ];
}

function topLeft(line: [number, number][]) {
  return Math.min(...line.map(([x, y]) => y * 2 + x));
}

function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}
