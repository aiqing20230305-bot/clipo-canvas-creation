import { motion } from "framer-motion";
import { Film, Bot, Sparkles } from "lucide-react";

const solutions = [
  {
    number: "01",
    icon: Film,
    title: "素材混剪视频",
    description: "极致性价比，存量素材规模化复用",
    details: [
      "基于客户提供的素材（TVC、生拍素材、图片等）",
      "通过AI脚本拆解与重新组合",
      "通过普通剪辑手段实现视频的裂变",
    ],
    useCase: "抖音/TikTok/快手矩阵帐号铺量、电商引流、新品测试",
    color: "from-blue-accent/20 to-secondary",
  },
  {
    number: "02",
    icon: Bot,
    title: "AI前贴与数字人",
    description: "黄金3秒法则，提升留存与转化",
    details: [
      "AI前贴：生成视觉冲击力的片头，解决划走率高的问题",
      "数字人视频：虚拟主播口播，高密度信息输出",
      "无需真人拍摄成本，建立信任感",
    ],
    useCase: "内容升级加价，在基础混剪报价上每条增加10元",
    color: "from-primary/20 to-secondary",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "纯AI生产视频",
    description: "AIGC全生成，突破创意与拍摄限制",
    details: [
      "Text-to-Video & Image-to-Video 技术核心",
      "Prompt工程 → 风格一致性调优 → 视频生成",
      "适用于抽象概念、品牌故事片、无存量素材的情况",
    ],
    useCase: "报价100-2000元/条，按视频复杂度、画质要求调整",
    color: "from-gold/20 to-secondary",
  },
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            全链路智能内容工厂
          </h2>
          <p className="text-muted-foreground text-lg">三层产品架构，覆盖全场景内容需求</p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`bg-gradient-to-r ${sol.color} rounded-2xl p-8 md:p-10 border border-border relative overflow-hidden`}
            >
              <div className="absolute top-6 right-8 text-8xl font-bold text-foreground/5 font-display">
                {sol.number}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <sol.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{sol.title}</h3>
                    <p className="text-primary text-sm">{sol.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4 ml-1">
                  {sol.details.map((d, idx) => (
                    <li key={idx} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1.5 text-xs">●</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="bg-card/50 rounded-lg px-4 py-3 inline-block">
                  <p className="text-sm text-foreground/80">
                    <span className="text-primary font-medium">适用场景：</span>
                    {sol.useCase}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
