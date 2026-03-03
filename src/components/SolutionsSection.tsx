import { motion } from "framer-motion";
import { Film, Bot, Sparkles } from "lucide-react";

const solutions = [
  {
    number: "01",
    icon: Film,
    title: "素材混剪引擎",
    subtitle: "深度理解平台内容规则，一条TVC裂变千条投放素材",
    details: [
      "AI拆解脚本逻辑，按各平台调性自动重组镜头与节奏",
      "存量素材持续产出新内容，适配抖音/快手/小红书/TikTok等平台规范",
      "基于平台算法特征优化内容结构，提升自然推荐率",
    ],
  },
  {
    number: "02",
    icon: Bot,
    title: "AI前贴 & 数字人",
    subtitle: "结合运营数据，黄金3秒锁住用户",
    details: [
      "AI生成高完播率片头，第一帧就抓住注意力",
      "数字人口播替代真人，匹配不同平台的用户偏好",
      "A/B测试驱动迭代，持续优化内容表现",
    ],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "纯AI视频生成",
    subtitle: "从内容策略到成片，全链路AI交付",
    details: [
      "Sora/Runway级文生视频，品牌故事、产品演示一键生成",
      "内置各平台内容合规审核，发布即合规",
      "从brief到成片最快30分钟，支持多语言本地化输出",
    ],
  },
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Solutions</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            AI × 内容运营
            <br />
            <span className="text-gradient-purple">三层引擎拉满全域产能</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 md:p-10 hover:bg-secondary/50 transition-colors duration-500 border border-border/50">
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                  {/* Left: number + icon */}
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <span className="font-display text-4xl font-bold text-foreground/10">{sol.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
                      <sol.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Middle: title + subtitle */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">{sol.title}</h3>
                    <p className="text-sm text-primary mb-4">{sol.subtitle}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {sol.details.map((d, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                          <span className="text-primary/60 mt-0.5 shrink-0">—</span>
                          {d}
                        </p>
                      ))}
                    </div>
                  </div>
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
