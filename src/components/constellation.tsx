"use client";

import { useEffect, useState } from "react";
import { inkStrength, traceConstellation, type Constellation } from "@/lib/constellation";

/** Clip art is traced at this resolution: enough detail, still a few ms. */
const TRACE_SIZE = 200;
/** Longest side of the gray icon used in the light-mode tile. */
const ICON_SIZE = 160;
/** Longest side of the gray outline drawing shown behind the details by day. */
const OUTLINE_SIZE = 480;
/** How many pixels (at OUTLINE_SIZE) each stroke is thickened by on every side. */
const OUTLINE_BOLDEN = 2;
/** Color of the daytime outline drawing (Tailwind neutral-500). */
const OUTLINE_GRAY = [115, 115, 115] as const;

type Traced = {
  constellation: Constellation;
  /** The clip art's ink as a white-on-transparent image, used as a CSS mask. */
  silhouette: string;
  /** The clip art's ink in gray on transparent, with slightly bolder strokes. */
  outline: string;
};

const cache = new Map<string, Promise<Traced>>();

function draw(image: HTMLImageElement, box: number, margin: number) {
  const fit = (box - margin * 2) / Math.max(image.naturalWidth, image.naturalHeight);
  const w = image.naturalWidth * fit;
  const h = image.naturalHeight * fit;
  const canvas = document.createElement("canvas");
  canvas.width = box;
  canvas.height = box;
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  context.drawImage(image, (box - w) / 2, (box - h) / 2, w, h);
  return { canvas, context };
}

/**
 * The clip art's ink in a single color on a transparent background (whatever
 * the original background was), optionally with strokes thickened by
 * `bolden` pixels. Returns a PNG data URL.
 */
function recolor(
  image: HTMLImageElement,
  size: number,
  [r, g, b]: readonly [number, number, number],
  bolden: number,
) {
  const { canvas, context } = draw(image, size, bolden + 1);
  const pixels = context.getImageData(0, 0, size, size);
  const d = pixels.data;
  let alpha = new Float32Array(size * size);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = inkStrength(d[i * 4]!, d[i * 4 + 1]!, d[i * 4 + 2]!, d[i * 4 + 3]!);
  }
  // Square max filter, applied as two 1-D passes, grows every stroke outward.
  for (const [dx, dy] of [[1, 0], [0, 1]] as const) {
    if (!bolden) break;
    const grown = new Float32Array(alpha.length);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let max = 0;
        for (let k = -bolden; k <= bolden; k++) {
          const nx = x + k * dx;
          const ny = y + k * dy;
          if (nx >= 0 && ny >= 0 && nx < size && ny < size) max = Math.max(max, alpha[ny * size + nx]!);
        }
        grown[y * size + x] = max;
      }
    }
    alpha = grown;
  }
  for (let i = 0; i < alpha.length; i++) {
    d[i * 4] = r;
    d[i * 4 + 1] = g;
    d[i * 4 + 2] = b;
    d[i * 4 + 3] = alpha[i]! * 255;
  }
  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL();
}

function load(src: string) {
  let pending = cache.get(src);
  if (!pending) {
    pending = new Promise<Traced>((resolve, reject) => {
      const image = new window.Image();
      image.onload = () => {
        const trace = draw(image, TRACE_SIZE, 2);
        const constellation = traceConstellation(
          trace.context.getImageData(0, 0, TRACE_SIZE, TRACE_SIZE).data,
          TRACE_SIZE,
          TRACE_SIZE,
        );

        resolve({
          constellation,
          silhouette: recolor(image, ICON_SIZE, [255, 255, 255], 0),
          outline: recolor(image, OUTLINE_SIZE, OUTLINE_GRAY, OUTLINE_BOLDEN),
        });
      };
      image.onerror = () => reject(new Error(`Could not load ${src}`));
      image.src = src;
    });
    cache.set(src, pending);
  }
  return pending;
}

function useTraced(src: string) {
  const [traced, setTraced] = useState<Traced | null>(null);
  useEffect(() => {
    let active = true;
    load(src).then(
      (result) => active && setTraced(result),
      () => active && setTraced(null),
    );
    return () => {
      active = false;
    };
  }, [src]);
  return traced;
}

/** Milliseconds each constellation line takes to draw (night). */
const DRAW_MS = 700;
/**
 * Decoration traced from clip art, revealed whenever the surrounding `.group`
 * row is hovered, focused, or expanded. By night it is a constellation whose
 * lines draw in while stars light up along them; by day the clip art itself
 * fades in as a gray outline drawing.
 */
export function ConstellationBackdrop({ src }: { src: string }) {
  const traced = useTraced(src);
  if (!traced) return null;
  const { paths, stars } = traced.constellation;
  const stagger = Math.min(90, 1400 / Math.max(paths.length, 1));
  const start = (path: number) => 150 + path * stagger;

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="constellation pointer-events-none absolute top-1/2 right-2 aspect-square h-[calc(100%-1rem)] max-h-64 -translate-y-1/2"
    >
      <g className="constellation-sky">
        <g className="constellation-lines">
          {paths.map((points, i) => (
            <polyline
              key={i}
              points={points.join(" ")}
              pathLength={1}
              style={{ "--delay": `${start(i)}ms`, "--draw": `${DRAW_MS}ms` } as React.CSSProperties}
            />
          ))}
        </g>
        {stars.map((star, i) => (
          <g
            key={i}
            className="constellation-star"
            style={
              {
                "--delay": `${Math.round(start(star.path) + star.along * DRAW_MS)}ms`,
                transformOrigin: `${star.x}px ${star.y}px`,
              } as React.CSSProperties
            }
          >
            <circle cx={star.x} cy={star.y} r={1.1 + 1.6 * star.magnitude} className="constellation-halo" />
            <circle
              cx={star.x}
              cy={star.y}
              r={0.35 + 0.65 * star.magnitude}
              className="constellation-core"
              style={{ animationDelay: `${-((i * 1.3) % 5)}s` }}
            />
          </g>
        ))}
      </g>

      <image
        href={traced.outline}
        x="4"
        y="4"
        width="92"
        height="92"
        preserveAspectRatio="xMidYMid meet"
        className="constellation-drawing"
      />
    </svg>
  );
}

/**
 * The row's icon tile: the clip art in gray on a white tile by day, and a
 * pulsing star by night.
 */
export function ConstellationTile({ src, index = 0 }: { src: string; index?: number }) {
  const traced = useTraced(src);
  return (
    <div aria-hidden className="relative size-16 shrink-0">
      <div className="absolute inset-0 rounded-lg border border-border/60 bg-white shadow-sm transition-opacity duration-[650ms] ease-in-out dark:opacity-0 dark:shadow-none">
        {traced && (
          <div
            className="absolute inset-2 bg-neutral-500"
            style={{
              maskImage: `url(${traced.silhouette})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        )}
      </div>
      <svg
        viewBox="0 0 64 64"
        className="tile-star absolute inset-0 size-full opacity-0 transition-opacity duration-[650ms] ease-in-out dark:opacity-100"
        style={{ "--pulse-delay": `${-index * 1.1}s` } as React.CSSProperties}
      >
        <defs>
          <radialGradient id={`tile-star-glow-${index}`}>
            <stop offset="0%" stopColor="#dfe8ff" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#a9bcff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#a9bcff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill={`url(#tile-star-glow-${index})`} className="tile-star-glow" />
        <g className="tile-star-body">
          {/* Long cross-shaped rays, then short diagonal ones. */}
          <path
            d="M32 6 C33.2 25 34.5 29.6 58 32 C34.5 34.4 33.2 39 32 58 C30.8 39 29.5 34.4 6 32 C29.5 29.6 30.8 25 32 6 Z"
            fill="#f4f7ff"
          />
          <path
            d="M32 20 L33.4 30.6 L44 32 L33.4 33.4 L32 44 L30.6 33.4 L20 32 L30.6 30.6 Z"
            transform="rotate(45 32 32)"
            fill="#cdd9ff"
            opacity="0.7"
          />
          <circle cx="32" cy="32" r="3.2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
