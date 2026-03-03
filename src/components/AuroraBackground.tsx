import { useEffect, useRef } from "react";

/**
 * Full-page starfield / interstellar map background.
 * Renders layered stars, nebula clouds, and subtle constellation lines.
 */
const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const animMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const starCount = 400;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      brightness: Math.random(),
      speed: Math.random() * 0.0005 + 0.0001,
      hue: Math.random() > 0.7 ? 265 : Math.random() > 0.5 ? 200 : 0,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Constellation lines — connect some nearby stars
    const constellations: [number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const a = Math.floor(Math.random() * starCount);
      let closest = -1;
      let closestDist = 0.12;
      for (let j = 0; j < starCount; j++) {
        if (j === a) continue;
        const dx = stars[a].x - stars[j].x;
        const dy = stars[a].y - stars[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < closestDist && d > 0.02) {
          closestDist = d;
          closest = j;
        }
      }
      if (closest >= 0) constellations.push([a, closest]);
    }

    // Nebula blobs
    const nebulae = [
      { x: 0.15, y: 0.2, r: 0.3, hue: 265, alpha: 0.04 },
      { x: 0.75, y: 0.5, r: 0.35, hue: 220, alpha: 0.03 },
      { x: 0.5, y: 0.8, r: 0.25, hue: 280, alpha: 0.035 },
      { x: 0.85, y: 0.15, r: 0.2, hue: 185, alpha: 0.025 },
    ];

    const draw = (time: number) => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse follow
      animMouse.current.x += (mouse.current.x - animMouse.current.x) * 0.015;
      animMouse.current.y += (mouse.current.y - animMouse.current.y) * 0.015;
      const mx = (animMouse.current.x - 0.5) * 0.02;
      const my = (animMouse.current.y - 0.5) * 0.02;

      // Draw nebula clouds
      for (const neb of nebulae) {
        const nx = (neb.x + Math.sin(time * 0.0002) * 0.03 + mx) * w;
        const ny = (neb.y + Math.cos(time * 0.00015) * 0.03 + my) * h;
        const nr = neb.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
        const hueShift = Math.sin(time * 0.0001 + neb.hue) * 15;
        grad.addColorStop(0, `hsla(${neb.hue + hueShift}, 80%, 50%, ${neb.alpha})`);
        grad.addColorStop(0.4, `hsla(${neb.hue + hueShift + 20}, 60%, 40%, ${neb.alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${neb.hue}, 50%, 30%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Draw constellation lines
      ctx.strokeStyle = `hsla(265, 60%, 65%, 0.06)`;
      ctx.lineWidth = 0.5;
      for (const [a, b] of constellations) {
        const sa = stars[a];
        const sb = stars[b];
        ctx.beginPath();
        ctx.moveTo((sa.x + mx * 2) * w, (sa.y + my * 2) * h);
        ctx.lineTo((sb.x + mx * 2) * w, (sb.y + my * 2) * h);
        ctx.stroke();
      }

      // Draw stars
      for (const star of stars) {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * star.speed * 5 + star.twinkleOffset));
        const alpha = star.brightness * twinkle * 0.8;
        const sx = (star.x + mx * (star.r + 0.5)) * w;
        const sy = (star.y + my * (star.r + 0.5)) * h;

        if (star.hue > 0) {
          ctx.fillStyle = `hsla(${star.hue}, 70%, 75%, ${alpha})`;
        } else {
          ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fill();

        // Glow for brighter stars
        if (star.brightness > 0.7 && star.r > 1) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.r * 4);
          glow.addColorStop(0, `hsla(${star.hue || 265}, 60%, 70%, ${alpha * 0.15})`);
          glow.addColorStop(1, `hsla(${star.hue || 265}, 60%, 70%, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx, sy, star.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default AuroraBackground;
