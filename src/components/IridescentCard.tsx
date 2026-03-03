import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface IridescentCardProps extends Omit<HTMLMotionProps<"div">, "onMouseMove"> {
  children: ReactNode;
  className?: string;
  glowIntensity?: number;
}

/**
 * Card with mouse-tracking iridescent border glow.
 * Tracks the mouse position relative to the card and renders a
 * rainbow-shifting highlight along the border.
 */
const IridescentCard = ({
  children,
  className,
  glowIntensity = 1,
  ...props
}: IridescentCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.opacity = "1";
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, 
      hsla(270, 90%, 65%, ${0.15 * glowIntensity}), 
      hsla(220, 80%, 60%, ${0.08 * glowIntensity}), 
      hsla(320, 70%, 55%, ${0.04 * glowIntensity}), 
      transparent 70%)`;
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card transition-colors",
        className
      )}
      {...props}
    >
      {/* Iridescent glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Border shimmer */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "conic-gradient(from 0deg, hsla(270,80%,65%,0.15), hsla(200,80%,60%,0.1), hsla(320,70%,55%,0.15), hsla(270,80%,65%,0.15))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default IridescentCard;
