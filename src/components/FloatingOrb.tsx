import { motion } from "framer-motion";

/**
 * A large morphing gradient orb that floats in the hero section.
 * Creates a dramatic, cinematic focal point.
 */
const FloatingOrb = () => (
  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none">
    {/* Primary orb */}
    <motion.div
      className="absolute inset-0"
      animate={{
        scale: [1, 1.15, 0.95, 1.08, 1],
        borderRadius: ["40% 60% 55% 45%", "55% 45% 40% 60%", "45% 55% 60% 40%", "60% 40% 45% 55%", "40% 60% 55% 45%"],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(ellipse at 30% 40%, hsl(265 85% 55% / 0.12), hsl(220 80% 55% / 0.06) 50%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
    {/* Secondary accent orb */}
    <motion.div
      className="absolute inset-[15%]"
      animate={{
        scale: [1.1, 0.9, 1.15, 0.95, 1.1],
        borderRadius: ["55% 45% 40% 60%", "40% 60% 55% 45%", "60% 40% 45% 55%", "45% 55% 60% 40%", "55% 45% 40% 60%"],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(ellipse at 60% 50%, hsl(280 90% 60% / 0.15), hsl(200 80% 65% / 0.05) 55%, transparent 75%)",
        filter: "blur(40px)",
      }}
    />
    {/* Core bright spot */}
    <motion.div
      className="absolute inset-[30%]"
      animate={{
        opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(circle at 50% 50%, hsl(265 90% 70% / 0.2), transparent 60%)",
        filter: "blur(30px)",
      }}
    />
  </div>
);

export default FloatingOrb;
