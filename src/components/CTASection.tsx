import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl p-px overflow-hidden">
            <motion.div
              className="absolute inset-[-200%] rounded-3xl"
              style={{
                background: "conic-gradient(from 0deg, hsl(265 85% 65% / 0.5), transparent 30%, hsl(220 80% 65% / 0.3), transparent 60%, hsl(280 90% 60% / 0.5), transparent 90%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-px rounded-[calc(1.5rem-1px)] bg-card" />
          </div>

          {/* Radial gradient ambiance */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, hsl(265 85% 65% / 0.12), transparent 60%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 20% 80%, hsl(220 80% 60% / 0.06), transparent 50%), radial-gradient(ellipse at 80% 80%, hsl(280 80% 60% / 0.06), transparent 50%)",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-primary font-medium tracking-wider uppercase">New World Awaits</span>
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              新世界已在前方
              <br />
              <span className="text-gradient-purple">你准备好启航了吗？</span>
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto">
              立即开启AI内容引擎，驶向流量增长的新大陆
            </p>
            <motion.a
              href="https://asset.clipo.cc/video-agent/signup"
              className="relative inline-flex px-10 py-4 rounded-full bg-gradient-purple text-primary-foreground font-medium text-sm overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(265 85% 65% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 tracking-wide">立即体验</span>
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(110deg, transparent 20%, hsla(200,80%,80%,0.25) 40%, hsla(320,80%,70%,0.15) 60%, transparent 80%)",
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
