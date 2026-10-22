"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useMounted } from "@/components/use-mounted";

type Vec3 = [number, number, number];

const GLOBE_RADIUS = 135;
const SCENE_UNIT = GLOBE_RADIUS / 1.5;
const PERSPECTIVE = 600;

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function scaleVec([x, y, z]: Vec3, s: number): Vec3 {
  return [x * s, y * s, z * s];
}

function normalizeVec(v: Vec3): Vec3 {
  return scaleVec(v, 1 / Math.hypot(v[0], v[1], v[2]));
}

const PHI = (1 + Math.sqrt(5)) / 2;

// Icosahedron wireframe: keep vertex pairs at edge distance (~2).
const ICO_EDGES: ReadonlyArray<readonly [Vec3, Vec3]> = (() => {
  const raw: Vec3[] = [];
  for (const a of [1, -1]) {
    for (const b of [1, -1]) {
      raw.push([0, a, b * PHI]);
      raw.push([a, b * PHI, 0]);
      raw.push([a * PHI, 0, b]);
    }
  }
  const edges: Array<readonly [Vec3, Vec3]> = [];
  for (let i = 0; i < raw.length; i++) {
    for (let j = i + 1; j < raw.length; j++) {
      const [a, b] = [raw[i], raw[j]];
      if (Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 2.1) {
        edges.push([
          scaleVec(normalizeVec(a), GLOBE_RADIUS),
          scaleVec(normalizeVec(b), GLOBE_RADIUS),
        ]);
      }
    }
  }
  return edges;
})();

const DOT_COLORS = [
  "var(--color-moonstone-500)",
  "var(--color-celadon-500)",
  "var(--color-fairy-tale-500)",
  "var(--color-quinacridone-magenta-600)",
];

// Two static tilted ellipses; only the satellites animate.
const RINGS = [
  {
    radius: 2.0 * SCENE_UNIT,
    tiltX: 68.75,
    tiltY: 8,
    color: "var(--color-moonstone-600)",
    opacity: 0.45,
  },
  {
    radius: 2.3 * SCENE_UNIT,
    tiltX: 34.38,
    tiltY: -14,
    color: "var(--color-space-cadet-700)",
    opacity: 0.35,
  },
];

const SATELLITES = (() => {
  const rand = mulberry32(0x5ee7);
  return Array.from({ length: 6 }, (_, i) => ({
    tiltX: (0.5 + rand() * 0.7) * (180 / Math.PI),
    tiltY: (rand() - 0.5) * 40,
    radius: (1.9 + rand() * 0.5) * SCENE_UNIT,
    phase: rand() * 360,
    duration: 9 + rand() * 13,
    size: 4 + Math.round(rand() * 2),
    color: DOT_COLORS[(i + 1) % DOT_COLORS.length],
  }));
})();

function linearSpin(duration: number) {
  return { duration, repeat: Infinity, ease: "linear" as const };
}

function q(n: number, digits = 3) {
  const m = 10 ** digits;
  return Math.round(n * m) / m;
}


function lineStyle(a: Vec3, b: Vec3): CSSProperties {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const len = Math.hypot(dx, dy, dz);
  const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  const ux = dx / len;
  const uy = dy / len;
  const uz = dz / len;
  // rotate3d aligns the local +x axis with the segment direction.
  let rotate = "";
  const cross = Math.hypot(uy, uz);
  if (cross > 1e-6) {
    const angle = (Math.acos(Math.min(1, Math.max(-1, ux))) * 180) / Math.PI;
    rotate = ` rotate3d(0, ${(-uz / cross).toFixed(4)}, ${(uy / cross).toFixed(4)}, ${angle.toFixed(2)}deg)`;
  } else if (ux < 0) {
    rotate = " rotate3d(0, 1, 0, 180deg)";
  }
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: q(len),
    height: 1,
    transformOrigin: "50% 50%",
    transform: `translate3d(${q(mid[0])}px, ${q(mid[1])}px, ${q(mid[2])}px) translate(-50%, -50%)${rotate}`,
  };
}

function dotStyle(pos: Vec3, size: number): CSSProperties {
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    transform: `translate3d(${q(pos[0])}px, ${q(pos[1])}px, ${q(pos[2])}px) translate(-50%, -50%)`,
  };
}

export default function HeroVisual() {
  // useReducedMotion() is null during SSR, so gate on mount to keep hydration
  // identical; the real preference applies on the re-render after mounting.
  const prefersReduced = useReducedMotion();
  const mounted = useMounted();
  const reduced = mounted ? prefersReduced : null;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 40, damping: 15 });
  const rotateX = useSpring(pointerY, { stiffness: 40, damping: 15 });

  useEffect(() => {
    if (reduced) return;
    const onPointerMove = (e: PointerEvent) => {
      pointerX.set(((e.clientX / window.innerWidth) * 2 - 1) * 9);
      pointerY.set(((e.clientY / window.innerHeight) * 2 - 1) * -7);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduced, pointerX, pointerY]);

  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { dots, chords } = useMemo(() => {
    const rand = mulberry32(0xb0b);
    const count = small ? 60 : 120;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: Array<{ pos: Vec3; size: number; color: string }> = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (2 * (i + 0.5)) / count;
      const r = Math.sqrt(1 - y * y);
      const theta = i * golden;
      pts.push({
        pos: scaleVec(
          [Math.cos(theta) * r, y, Math.sin(theta) * r],
          GLOBE_RADIUS,
        ),
        size: 2 + Math.round(rand() * 2),
        color: DOT_COLORS[Math.floor(rand() * DOT_COLORS.length)],
      });
    }
    const lines = Array.from({ length: 20 }, () => {
      const i = Math.floor(rand() * count);
      const j = (i + 1 + Math.floor(rand() * (count - 1))) % count;
      return {
        a: pts[i].pos,
        b: pts[j].pos,
        duration: 3 + rand() * 4,
        delay: rand() * 5,
      };
    });
    return { dots: pts, chords: lines };
  }, [small]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="hero_visual pointer-events-none relative mx-auto flex h-[440px] w-full max-w-[520px] items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <motion.div
          className="relative h-0 w-0"
          style={{ perspective: `${PERSPECTIVE}px` }}
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute left-0 top-0 h-0 w-0"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Atmosphere glow: kept outside the spinning group. */}
            <div
              className="absolute left-0 top-0 rounded-full"
              style={{
                width: GLOBE_RADIUS * 3.2,
                height: GLOBE_RADIUS * 3.2,
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-moonstone-500) 20%, transparent) 0%, transparent 65%)",
              }}
            />

            <motion.div
              className="absolute left-0 top-0 h-0 w-0"
              style={{ transformStyle: "preserve-3d" }}
              animate={reduced ? undefined : { rotateY: 360 }}
              transition={reduced ? undefined : linearSpin(36)}
            >
              {ICO_EDGES.map(([a, b], i) => (
                <div
                  key={`edge-${i}`}
                  style={{
                    ...lineStyle(a, b),
                    backgroundColor: "var(--color-moonstone-500)",
                    opacity: 0.3,
                  }}
                />
              ))}
              {dots.map((d, i) => (
                <div
                  key={`dot-${i}`}
                  style={{
                    ...dotStyle(d.pos, d.size),
                    backgroundColor: d.color,
                  }}
                />
              ))}
              {chords.map((c, i) => (
                <motion.div
                  key={`chord-${i}`}
                  style={{
                    ...lineStyle(c.a, c.b),
                    backgroundColor: "var(--color-moonstone-600)",
                  }}
                  animate={
                    reduced ? { opacity: 0.15 } : { opacity: [0.06, 0.3, 0.06] }
                  }
                  transition={
                    reduced
                      ? undefined
                      : {
                          duration: c.duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: c.delay,
                        }
                  }
                />
              ))}
            </motion.div>

            {RINGS.map((ring, i) => (
              <div
                key={`ring-${i}`}
                className="absolute left-0 top-0 h-0 w-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${ring.tiltX}deg) rotateY(${ring.tiltY}deg)`,
                }}
              >
                <div
                  className="absolute left-0 top-0 rounded-full"
                  style={{
                    width: ring.radius * 2,
                    height: ring.radius * 2,
                    transform: "translate(-50%, -50%)",
                    border: `1px solid ${ring.color}`,
                    opacity: ring.opacity,
                  }}
                />
              </div>
            ))}

            {SATELLITES.map((sat, i) => (
              <div
                key={`satellite-${i}`}
                className="absolute left-0 top-0 h-0 w-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${sat.tiltX}deg) rotateY(${sat.tiltY}deg)`,
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-0 w-0"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={reduced ? undefined : linearSpin(sat.duration)}
                >
                  <div
                    className="absolute left-0 top-0 h-0 w-0"
                    style={{ transform: `rotate(${sat.phase}deg)` }}
                  >
                    <div
                      className="absolute left-0 top-0 rounded-full"
                      style={{
                        ...dotStyle([sat.radius, 0, 0], sat.size),
                        backgroundColor: sat.color,
                        boxShadow: `0 0 10px 1px color-mix(in srgb, ${sat.color} 55%, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
