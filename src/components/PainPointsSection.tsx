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

const PainPointsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            规模化内容生产的挑战
          </h2>
          <p className="text-muted-foreground text-lg">效率与成本的博弈</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{point.title}</h3>
              <p className="text-xs text-primary mb-3 font-medium">{point.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
