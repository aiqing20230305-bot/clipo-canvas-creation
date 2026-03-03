import { motion } from "framer-motion";
import { Film, Bot, Sparkles } from "lucide-react";
import IridescentCard from "./IridescentCard";

const solutions = [
  {
    number: "01",
    icon: Film,
    title: "素材混剪视频",
    subtitle: "极致性价比，存量素材规模化复用",
    details: [
      "基于客户素材（TVC、生拍素材、图片等），通过AI脚本拆解与重新组合",
      "通过普通剪辑手段实现视频的裂变",
      "适用于抖音/TikTok/快手矩阵帐号铺量、电商引流、新品测试",
    ],
  },
  {
    number: "02",
    icon: Bot,
    title: "AI前贴与数字人",
    subtitle: "黄金3秒法则，提升留存与转化",
    details: [
      "AI前贴（AI Intro）：生成视觉冲击力的片头，解决划走率高的问题",
      "数字人视频（Digital Human）：虚拟主播口播，高密度信息输出",
      "无需真人拍摄成本，建立信任感",
    ],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "纯AI生产视频",
    subtitle: "AIGC全生成，突破创意与拍摄限制",
    details: [
      "Text-to-Video & Image-to-Video（Sora/Runway级能力）",
      "Prompt工程 → 风格一致性调优 → 视频生成",
      "适用于抽象概念表达、品牌故事片、无存量素材的情况",
    ],
  },
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            全链路智能内容工厂
          </h2>
          <p className="text-muted-foreground text-lg">三层产品架构，覆盖全场景内容需求</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <IridescentCard
              key={sol.number}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.12 }}
              whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="p-8 cursor-pointer group"
              glowIntensity={1.2}
            >
              <span className="absolute top-4 right-6 text-6xl font-bold text-foreground/5">
                {sol.number}
              </span>
              <div className="w-12 h-12 rounded-xl bg-gradient-purple flex items-center justify-center mb-5">
                <sol.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{sol.title}</h3>
              <p className="text-sm text-primary mb-5">{sol.subtitle}</p>
              <ul className="space-y-3">
                {sol.details.map((d, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </IridescentCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
