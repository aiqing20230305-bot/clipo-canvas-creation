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
          <p className="text-sm md:text-base text-primary font-medium tracking-widest uppercase mb-4">
            AI-Powered Content Engine
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">别人还在剪片，</span>
            <br />
            <span className="text-gradient-purple relative">
              你已经日产千条
              <span
                className="absolute inset-0 bg-clip-text text-transparent animate-shimmer pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, transparent 25%, hsla(270,90%,80%,0.4) 37%, hsla(200,80%,70%,0.4) 50%, transparent 62%)",
                  backgroundSize: "250% 100%",
                }}
                aria-hidden="true"
              >
                你已经日产千条
              </span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            从素材混剪到纯 AI 生成，<span className="text-foreground font-medium">一套引擎取代整支团队</span>。
            <br className="hidden md:block" />
            ROI 最高提升 4.76×，周产 500+ 条，已服务头部品牌验证。
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
