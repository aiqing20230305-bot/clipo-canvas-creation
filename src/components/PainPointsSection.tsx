import { motion } from "framer-motion";
import { Layers, Zap, Scale } from "lucide-react";

const painPoints = [
  {
    icon: Layers,
    title: "素材拍完即废",
    description: "花大价钱拍的TVC，发完就躺进硬盘。缺乏内容运营思维，百万级素材资产正在贬值。",
  },
  {
    icon: Zap,
    title: "产能跟不上平台节奏",
    description: "抖音要日更、快手要矩阵、小红书要种草、TikTok要本地化。每个平台规则不同，靠人剪根本跟不上。",
  },
  {
    icon: Scale,
    title: "不懂平台就没有流量",
    description: "内容好不等于有量。不了解各平台推荐算法、内容合规和运营节奏，再好的素材也是白费。",
  },
];

const PainPointsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Pain Points</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            没有内容运营能力
            <br />
            <span className="text-muted-foreground">再好的AI也是空转</span>
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
