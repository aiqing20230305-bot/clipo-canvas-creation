import { motion } from "framer-motion";

/**
 * Animated glowing divider line between sections.
 * A subtle beam of light travels across a faint line.
 */
const GlowDivider = () => (
  <div className="relative h-px w-full overflow-hidden">
    {/* Base line */}
    <div className="absolute inset-0 bg-border/30" />
    {/* Traveling light beam */}
    <motion.div
      className="absolute top-0 h-full w-1/3"
      style={{
        background:
          "linear-gradient(90deg, transparent, hsl(265 85% 65% / 0.6), hsl(220 80% 65% / 0.4), transparent)",
      }}
      animate={{ x: ["-100%", "400%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
    />
  </div>
);

export default GlowDivider;
