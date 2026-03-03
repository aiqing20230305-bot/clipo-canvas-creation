import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-gradient-purple relative">
              2026 内容生产
              <span
                className="absolute inset-0 bg-clip-text text-transparent animate-shimmer pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, transparent 25%, hsla(270,90%,80%,0.4) 37%, hsla(200,80%,70%,0.4) 50%, transparent 62%)",
                  backgroundSize: "250% 100%",
                }}
                aria-hidden="true"
              >
                2026 内容生产
              </span>
            </span>
            <br />
            <span className="text-foreground">与增长解决方案</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
            驱动生意的规模化内容引擎：从素材混剪 到 纯AI生成
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.3 }}
        >
          <a
            href="#solutions"
            className="relative px-7 py-3 rounded-full bg-gradient-purple text-primary-foreground font-medium hover:opacity-90 transition-opacity overflow-hidden group"
          >
            <span className="relative z-10">了解更多</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(110deg, transparent 20%, hsla(200,80%,80%,0.3) 40%, hsla(320,80%,70%,0.2) 60%, transparent 80%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </a>
          <a
            href="#pricing"
            className="px-7 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors iridescent-border"
          >
            查看报价
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
