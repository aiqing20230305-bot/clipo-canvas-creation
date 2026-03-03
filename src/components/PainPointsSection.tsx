import { motion } from "framer-motion";
import { Layers, Zap, Scale } from "lucide-react";

const painPoints = [
  {
    icon: Layers,
    title: "素材拍完即废",
    description: "花大价钱拍的TVC，发完就躺进硬盘。百万级素材资产正在贬值。",
  },
  {
    icon: Zap,
    title: "产能跟不上算法",
    description: "平台要日更、要矩阵、要千人千面。靠人剪？竞品已经日产百条碾压你的流量。",
  },
  {
    icon: Scale,
    title: "合规与流量的悖论",
    description: "想要爆量就踩线，想要合规就没量。ROI始终上不去。",
  },
];

const PainPointsSection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Pain Points</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            你的内容团队
            <br />
            <span className="text-muted-foreground">正在被算法淘汰</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card p-10 group hover:bg-secondary/50 transition-colors duration-500"
            >
              <point.icon className="w-5 h-5 text-primary mb-8" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
