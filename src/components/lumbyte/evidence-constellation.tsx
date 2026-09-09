import { useEffect, useRef } from "react";

/**
 * Evidence Constellation — abstract, ambient visual for the auth environment.
 * Scattered data points slowly connect into structured evidence and converge
 * toward a single focal anchor. Canvas only, no external animation library.
 */
type Node = {
  x: number; y: number; r: number; phase: number; speed: number;
  ox: number; oy: number; anchor: boolean;
};

type Particle = { a: number; b: number; t: number; speed: number };

function makeNodes(count: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    const anchor = i < 4;
    const golden = i * 2.399963;
    const radius = anchor ? 0.16 + i * 0.06 : 0.12 + (i / count) * 0.42;
    const x = 0.5 + Math.cos(golden) * radius;
    const y = 0.52 + Math.sin(golden) * radius * 0.92;
    nodes.push({
      x, y, ox: x, oy: y, anchor,
      r: anchor ? 4.4 : 1.7 + ((i * 37) % 10) / 9,
      phase: (i * 1.37) % (Math.PI * 2),
      speed: 0.00006 + ((i * 13) % 7) * 0.00002,
    });
  }
  return nodes;
}

export function EvidenceConstellation({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 1280;
    const nodes = makeNodes(narrow ? 26 : 44);
    const links: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i]!.x - nodes[j]!.x, nodes[i]!.y - nodes[j]!.y);
        if (d < (narrow ? 0.19 : 0.17)) links.push([i, j]);
      }
    }
    const particles: Particle[] = links
      .filter((_, i) => i % (narrow ? 5 : 3) === 0)
      .map(([a, b], i) => ({ a, b, t: (i * 0.17) % 1, speed: 0.00022 + ((i * 11) % 5) * 0.00008 }));

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduced ? 6000 : now - start;
      ctx.clearRect(0, 0, width, height);

      // soft light fields picking up ice blue / lavender / peach through transparency
      const fields: Array<[number, number, number, string]> = [
        [0.32, 0.3, 0.52, "oklch(0.88 0.06 232 / 26%)"],
        [0.72, 0.62, 0.46, "oklch(0.9 0.055 305 / 22%)"],
        [0.5, 0.9, 0.5, "oklch(0.94 0.035 60 / 16%)"],
      ];
      for (const [fx, fy, fr, color] of fields) {
        const cx = width * (fx + Math.sin(t * 0.00004 + fx * 9) * 0.03);
        const cy = height * (fy + Math.cos(t * 0.000032 + fy * 7) * 0.03);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * fr);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // glass ribbons
      for (let k = 0; k < 3; k++) {
        const drift = Math.sin(t * 0.000045 + k * 2.1) * height * 0.05;
        ctx.beginPath();
        ctx.moveTo(-width * 0.1, height * (0.34 + k * 0.16) + drift);
        ctx.bezierCurveTo(
          width * 0.28, height * (0.16 + k * 0.14) - drift,
          width * 0.7, height * (0.6 + k * 0.1) + drift,
          width * 1.1, height * (0.3 + k * 0.18) - drift,
        );
        const rg = ctx.createLinearGradient(0, 0, width, height);
        rg.addColorStop(0, "oklch(1 0 0 / 0%)");
        rg.addColorStop(0.45, k === 1 ? "oklch(1 0 0 / 52%)" : "oklch(1 0 0 / 34%)");
        rg.addColorStop(1, "oklch(1 0 0 / 0%)");
        ctx.strokeStyle = rg;
        ctx.lineWidth = 26 + k * 16;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // node positions with slow orbital drift
      const pos = nodes.map((n) => {
        const dx = Math.sin(t * n.speed + n.phase) * 0.026;
        const dy = Math.cos(t * n.speed * 0.82 + n.phase) * 0.022;
        // occasional gentle convergence toward the focal anchor
        const conv = (Math.sin(t * 0.00006) * 0.5 + 0.5) ** 3 * (n.anchor ? 0.05 : 0.13);
        const x = (n.ox + dx) * (1 - conv) + 0.5 * conv;
        const y = (n.oy + dy) * (1 - conv) + 0.52 * conv;
        return { x: x * width, y: y * height };
      });

      // relationships appearing and disappearing
      links.forEach(([a, b], i) => {
        const wave = Math.sin(t * 0.00022 + i * 0.9) * 0.5 + 0.5;
        const alpha = 0.05 + wave * 0.2;
        const p1 = pos[a]!;
        const p2 = pos[b]!;
        const mx = (p1.x + p2.x) / 2 + Math.sin(t * 0.00008 + i) * 12;
        const my = (p1.y + p2.y) / 2 + Math.cos(t * 0.00008 + i) * 12;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(mx, my, p2.x, p2.y);
        ctx.strokeStyle = `oklch(0.52 0.05 275 / ${alpha * 100}%)`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      // particles travelling along paths
      for (const p of particles) {
        p.t = (p.t + (reduced ? 0 : p.speed * 16)) % 1;
        const p1 = pos[p.a]!;
        const p2 = pos[p.b]!;
        const x = p1.x + (p2.x - p1.x) * p.t;
        const y = p1.y + (p2.y - p1.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.7 0.09 286 / 62%)";
        ctx.fill();
      }

      // nodes
      nodes.forEach((n, i) => {
        const p = pos[i]!;
        const pulse = 0.6 + (Math.sin(t * 0.0004 + n.phase) * 0.5 + 0.5) * 0.4;
        if (n.anchor) {
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 34);
          halo.addColorStop(0, "oklch(0.96 0.03 260 / 70%)");
          halo.addColorStop(1, "transparent");
          ctx.fillStyle = halo;
          ctx.fillRect(p.x - 34, p.y - 34, 68, 68);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.anchor ? "oklch(0.3 0.02 280 / 82%)" : `oklch(0.42 0.03 278 / ${45 + pulse * 35}%)`;
        ctx.fill();
        if (n.anchor) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, n.r * pulse + 6, 0, Math.PI * 2);
          ctx.strokeStyle = "oklch(0.55 0.04 278 / 26%)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
