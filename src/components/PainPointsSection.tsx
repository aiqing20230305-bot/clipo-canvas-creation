import { motion } from "framer-motion";
import { Layers, Zap, Scale } from "lucide-react";
import IridescentCard from "./IridescentCard";

const painPoints = [
  {
    icon: Layers,
    title: "素材拍完即废",
    subtitle: "Asset Waste",
    description: "花大价钱拍的TVC，发完就躺进硬盘。百万级素材资产正在贬值，你却还在为下一条视频发愁。",
  },
  {
    icon: Zap,
    title: "产能跟不上算法",
    subtitle: "Speed Gap",
    description: "平台要日更、要矩阵、要千人千面。靠人剪？一周能出几条？竞品已经日产百条碾压你的流量。",
  },
  {
    icon: Scale,
    title: "爆款≠合规，合规≠流量",
    subtitle: "The Impossible Triangle",
    description: "想要爆量就踩线，想要合规就没量。在平台规则和转化之间反复拉扯，ROI始终上不去。",
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
            你的内容团队，正在被算法淘汰
          </h2>
          <p className="text-muted-foreground text-lg">这些痛，每个品牌都经历过</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <IridescentCard
              key={point.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="p-8 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{point.title}</h3>
              <p className="text-xs text-primary mb-3 font-medium">{point.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </IridescentCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
