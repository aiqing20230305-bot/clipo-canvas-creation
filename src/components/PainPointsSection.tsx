import { motion } from "framer-motion";
import { Layers, Zap, Scale } from "lucide-react";

const painPoints = [
  {
    icon: Layers,
    title: "素材孤岛",
    subtitle: "Asset Silos",
    description: "存量素材无法聚集，多为一次性使用，资产价值流失。",
  },
  {
    icon: Zap,
    title: "效率瓶颈",
    subtitle: "Efficiency Bottlenecks",
    description: "生产效率不高，内容产出少且曝光量低，无法满足多平台高频发布需求。",
  },
  {
    icon: Scale,
    title: "合规困局",
    subtitle: "Compliance & Conversion",
    description: "平台规则复杂，难以在合规与爆款之间取得平衡。",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PainPointsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            规模化内容生产的挑战
          </h2>
          <p className="text-muted-foreground text-lg">效率与成本的博弈</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={item}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-6 group-hover:glow-gold transition-shadow">
                <point.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{point.title}</h3>
              <p className="text-sm text-primary mb-3">{point.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;
