import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            准备好开始AI创作之旅了吗？
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            现在即可联系我们，获取专属内容生产方案
          </p>
          <a
            href="https://asset.clipo.cc/video-agent/signup"
            className="inline-flex px-8 py-3 rounded-full bg-gradient-purple text-primary-foreground font-medium text-lg hover:opacity-90 transition-opacity"
          >
            立即体验
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
