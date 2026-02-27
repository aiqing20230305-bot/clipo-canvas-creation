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
            <span className="text-gradient-purple">2026 内容生产</span>
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
            className="px-7 py-3 rounded-full bg-gradient-purple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            了解更多
          </a>
          <a
            href="#pricing"
            className="px-7 py-3 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            查看报价
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
