import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-secondary to-card rounded-2xl p-12 md:p-16 border border-border relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-accent rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              准备好启动 AI 内容引擎了吗？
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              立即联系我们，获取专属内容生产解决方案
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-gold text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity glow-gold"
            >
              立即咨询
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
