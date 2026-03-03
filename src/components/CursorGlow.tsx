import { useEffect, useRef } from "react";

/**
 * Mouse-following iridescent glow orb.
 * Smoothly tracks the cursor with a rainbow hue-rotating glow.
 */
const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-50 hidden md:block"
      style={{
        background:
          "radial-gradient(circle, hsla(270, 80%, 65%, 0.12) 0%, hsla(200, 80%, 60%, 0.06) 40%, transparent 70%)",
        filter: "blur(40px)",
        animation: "cursor-hue-rotate 8s linear infinite",
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
