import { motion } from "framer-motion";
import { Film, Bot, Sparkles } from "lucide-react";
import IridescentCard from "./IridescentCard";

const solutions = [
  {
    number: "01",
    icon: Film,
    title: "素材混剪引擎",
    subtitle: "一条TVC裂变出1000条投放素材",
    details: [
      "AI拆解脚本逻辑，自动重组镜头顺序与节奏",
      "存量素材不再一次性消耗，持续产出新内容",
      "抖音/快手/TikTok矩阵铺量，日产百条起步",
    ],
  },
  {
    number: "02",
    icon: Bot,
    title: "AI前贴 & 数字人",
    subtitle: "黄金3秒锁住用户，划走率直降40%",
    details: [
      "AI生成视觉炸裂的片头，第一帧就抓住注意力",
      "数字人口播替代真人拍摄，成本降低80%",
      "7×24小时内容产出，不请假、不NG、不加钱",
    ],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "纯AI视频生成",
    subtitle: "没素材？AI从零造出大片级视频",
    details: [
      "Sora/Runway级文生视频能力，创意不再受拍摄限制",
      "品牌故事、产品演示、概念广告一键生成",
      "从brief到成片，最快30分钟交付",
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
            三层火箭，把内容产能拉满
          </h2>
          <p className="text-muted-foreground text-lg">从"人剪"到"AI造"，每一层都在颠覆效率天花板</p>
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
