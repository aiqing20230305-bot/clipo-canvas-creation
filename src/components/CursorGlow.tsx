import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor with:
 * - A small dot that follows the mouse precisely
 * - A larger ring that follows with spring physics delay
 * - Scale up when hovering over interactive elements (a, button, [data-cursor="expand"])
 * - Blend mode for a glassy feel
 */
const CursorGlow = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ring follows with spring delay
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Glow follows with more delay
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    // Detect hovering over interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor='expand'], input, textarea, select, [role='button']")
      ) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor='expand'], input, textarea, select, [role='button']")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Ambient glow — large, blurred, slow follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60] hidden md:block"
        style={{
          x: glowX,
          y: glowY,
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          background:
            "radial-gradient(circle, hsla(270, 80%, 65%, 0.08) 0%, hsla(200, 80%, 60%, 0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
          animation: "cursor-hue-rotate 8s linear infinite",
        }}
        aria-hidden="true"
      />

      {/* Ring — medium, spring-delayed */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[61] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          marginLeft: isHovering ? -28 : -16,
          marginTop: isHovering ? -28 : -16,
          borderColor: isHovering
            ? "hsl(265 85% 65% / 0.5)"
            : "hsl(0 0% 96% / 0.15)",
          scale: isPressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full border transition-colors duration-200"
          style={{
            borderColor: "inherit",
            mixBlendMode: "difference",
          }}
        />
      </motion.div>

      {/* Dot — precise, no delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[62] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          marginLeft: -3,
          marginTop: -3,
        }}
        animate={{
          scale: isPressed ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        aria-hidden="true"
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-foreground"
          style={{ mixBlendMode: "difference" }}
        />
      </motion.div>
    </>
  );
};

export default CursorGlow;
