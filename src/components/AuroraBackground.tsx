import { useEffect, useRef } from "react";

/**
 * Cyberpunk aurora — cyan/purple/pink ambient blobs
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

    const blobs = [
      { hue: 185, x: 0.2, y: 0.3, r: 0.35, speed: 0.0003 },
      { hue: 265, x: 0.7, y: 0.6, r: 0.3, speed: 0.0004 },
      { hue: 330, x: 0.5, y: 0.2, r: 0.25, speed: 0.0005 },
      { hue: 200, x: 0.8, y: 0.8, r: 0.28, speed: 0.00035 },
    ];

    const draw = (time: number) => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      animMouse.current.x += (mouse.current.x - animMouse.current.x) * 0.02;
      animMouse.current.y += (mouse.current.y - animMouse.current.y) * 0.02;

      for (const blob of blobs) {
        const bx = (blob.x + Math.sin(time * blob.speed) * 0.15 + (animMouse.current.x - 0.5) * 0.1) * w;
        const by = (blob.y + Math.cos(time * blob.speed * 1.3) * 0.12 + (animMouse.current.y - 0.5) * 0.08) * h;
        const br = blob.r * Math.min(w, h);

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const hueShift = Math.sin(time * 0.0002 + blob.hue) * 20;
        grad.addColorStop(0, `hsla(${blob.hue + hueShift}, 85%, 50%, 0.06)`);
        grad.addColorStop(0.5, `hsla(${blob.hue + hueShift + 15}, 70%, 45%, 0.025)`);
        grad.addColorStop(1, `hsla(${blob.hue + hueShift}, 60%, 40%, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
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
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
};

export default AuroraBackground;
