import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Film, Bot, Sparkles, ChevronRight } from "lucide-react";
import { useState, useRef, useCallback, ReactNode } from "react";
import solutionRemix from "@/assets/solution-remix.jpg";
import solutionAvatar from "@/assets/solution-avatar.jpg";
import solutionAigc from "@/assets/solution-aigc.jpg";

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

/* ── Spotlight Card with mouse-tracking glow ── */
const SpotlightCard = ({ children, isOpen, onClick }: { children: ReactNode; isOpen: boolean; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);
  const springOpacity = useSpring(rawOpacity, { stiffness: 200, damping: 25 });
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => rawOpacity.set(1)}
      onMouseLeave={() => rawOpacity.set(0)}
      className="relative bg-card rounded-2xl border border-border/50 overflow-hidden cursor-pointer select-none"
      data-cursor="expand"
      onClick={onClick}
      whileHover={{ borderColor: "hsl(265 85% 65% / 0.35)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Primary spotlight — soft, large, follows with spring lag */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl z-0"
        style={{
          opacity: springOpacity,
          background: useTransform(
            [springX, springY],
            ([x, y]) =>
              `radial-gradient(500px circle at ${x}px ${y}px, hsl(265 85% 60% / 0.12), hsl(280 70% 55% / 0.06) 35%, transparent 65%)`
          ),
        }}
      />
      {/* Secondary tight glow — smaller, snappier, more vivid */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl z-0"
        style={{
          opacity: springOpacity,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(250px circle at ${x}px ${y}px, hsl(265 90% 70% / 0.18), transparent 55%)`
          ),
        }}
      />
      {/* Border glow overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl z-0"
        style={{
          opacity: springOpacity,
          background: useTransform(
            [springX, springY],
            ([x, y]) =>
              `radial-gradient(350px circle at ${x}px ${y}px, hsl(265 85% 65% / 0.25), transparent 55%)`
          ),
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const SolutionsSection = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

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
          {solutions.map((sol, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={sol.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <SpotlightCard isOpen={isOpen} onClick={() => setExpanded(isOpen ? null : i)}>
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                      <div className="flex items-center gap-4 shrink-0">
                        <motion.div
                          className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center"
                          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.1 : 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <sol.icon className="w-5 h-5 text-primary-foreground" />
                        </motion.div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">{sol.title}</h3>
                        <p className="text-sm text-primary">{sol.subtitle}</p>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="hidden md:block"
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 250, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-0">
                          <div className="border-t border-border/50 pt-6">
                            <div className="grid md:grid-cols-3 gap-4">
                              {sol.details.map((d, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="bg-secondary/50 rounded-xl p-4 border border-border/30"
                                >
                                  <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                                    <span className="text-primary/60 mt-0.5 shrink-0">—</span>
                                    {d}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
