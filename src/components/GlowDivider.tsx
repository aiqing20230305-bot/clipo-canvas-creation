import { motion } from "framer-motion";

/**
 * Cyberpunk neon divider with traveling data pulse
 */
const GlowDivider = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, hsl(185 90% 50% / 0.1), hsl(265 85% 65% / 0.08), transparent)" }} />
    <motion.div
      className="absolute top-0 h-full w-1/4"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(185 90% 50% / 0.6), hsl(265 85% 65% / 0.4), hsl(330 85% 60% / 0.3), transparent)",
      }}
      animate={{ x: ["-100%", "500%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
    />
  </div>
);

export default GlowDivider;
