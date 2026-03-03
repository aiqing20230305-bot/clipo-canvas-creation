import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="relative overflow-hidden rounded-sm p-12 md:p-20 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated cyber border */}
          <div className="absolute inset-0 rounded-sm p-px overflow-hidden">
            <motion.div
              className="absolute inset-[-200%] rounded-sm"
              style={{
                background: "conic-gradient(from 0deg, hsl(185 90% 50% / 0.5), transparent 25%, hsl(265 85% 65% / 0.4), transparent 50%, hsl(330 85% 60% / 0.5), transparent 75%, hsl(185 90% 50% / 0.5))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-px rounded-[calc(0.125rem-1px)] bg-card" />
          </div>

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, hsl(185 90% 50% / 0.08), transparent 60%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-accent/20 bg-accent/5 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono-cyber text-xs text-accent font-medium tracking-[0.2em] uppercase">INITIALIZE</span>
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight tracking-wide">
              还在犹豫？
              <br />
              <span className="text-gradient-cyber">你的竞品已经开始了</span>
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto">
              立即开启AI内容引擎，抢在流量红利消失之前
            </p>
            <motion.a
              href="https://asset.clipo.cc/video-agent/signup"
              className="relative inline-flex px-10 py-4 rounded-sm bg-gradient-purple text-primary-foreground font-medium text-sm overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(185 90% 50% / 0.3), 0 0 60px hsl(265 85% 65% / 0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 font-mono-cyber tracking-[0.15em]">立即体验</span>
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(110deg, transparent 20%, hsla(185,90%,60%,0.25) 40%, hsla(330,80%,65%,0.15) 60%, transparent 80%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
