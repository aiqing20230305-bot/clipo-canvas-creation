import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-card border border-border/50 p-12 md:p-20 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle gradient bg */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, hsl(265 85% 65% / 0.15), transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-6">Get Started</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              还在犹豫？
              <br />
              <span className="text-gradient-purple">你的竞品已经开始了</span>
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto">
              立即开启AI内容引擎，抢在流量红利消失之前
            </p>
            <a
              href="https://asset.clipo.cc/video-agent/signup"
              className="inline-flex px-10 py-4 rounded-full bg-gradient-purple text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity tracking-wide"
            >
              立即体验
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
