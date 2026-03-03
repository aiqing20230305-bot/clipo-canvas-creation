import { motion } from "framer-motion";

/**
 * Cyberpunk morphing orb — cyan/purple/pink energy core
 */
const FloatingOrb = () => (
  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none">
    {/* Outer cyan haze */}
    <motion.div
      className="absolute inset-0"
      animate={{
        scale: [1, 1.15, 0.95, 1.08, 1],
        borderRadius: ["40% 60% 55% 45%", "55% 45% 40% 60%", "45% 55% 60% 40%", "60% 40% 45% 55%", "40% 60% 55% 45%"],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(ellipse at 30% 40%, hsl(185 90% 50% / 0.08), hsl(265 85% 55% / 0.06) 40%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
    {/* Inner purple core */}
    <motion.div
      className="absolute inset-[15%]"
      animate={{
        scale: [1.1, 0.9, 1.15, 0.95, 1.1],
        borderRadius: ["55% 45% 40% 60%", "40% 60% 55% 45%", "60% 40% 45% 55%", "45% 55% 60% 40%", "55% 45% 40% 60%"],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(ellipse at 60% 50%, hsl(265 85% 60% / 0.12), hsl(330 85% 60% / 0.05) 55%, transparent 75%)",
        filter: "blur(40px)",
      }}
    />
    {/* Core bright spot — pulsing */}
    <motion.div
      className="absolute inset-[30%]"
      animate={{
        opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(circle at 50% 50%, hsl(185 90% 55% / 0.15), hsl(265 85% 65% / 0.08) 40%, transparent 60%)",
        filter: "blur(30px)",
      }}
    />
  </div>
);

export default FloatingOrb;
