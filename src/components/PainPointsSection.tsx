import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Layers, Zap, Scale, ChevronDown } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import painpointsHero from "@/assets/painpoints-hero.jpg";

const painPoints = [
  {
    icon: Layers,
    title: "素材拍完即废",
    summary: "百万级素材资产正在贬值",
    description: "花大价钱拍的TVC，发完就躺进硬盘。缺乏内容运营思维，百万级素材资产正在贬值。",
    details: ["内容复用率不足5%", "缺乏多平台适配能力", "拍摄成本无法被摊薄"],
  },
  {
    icon: Zap,
    title: "产能跟不上平台节奏",
    summary: "靠人剪根本跟不上",
    description: "抖音要日更、快手要矩阵、小红书要种草、TikTok要本地化。每个平台规则不同，靠人剪根本跟不上。",
    details: ["多平台规则差异大", "人工剪辑效率低下", "内容更新频率不达标"],
  },
  {
    icon: Scale,
    title: "不懂平台就没有流量",
    summary: "再好的素材也是白费",
    description: "内容好不等于有量。不了解各平台推荐算法、内容合规和运营节奏，再好的素材也是白费。",
    details: ["算法规则持续变化", "合规审核标准不一", "缺乏数据驱动迭代"],
  },
];

/* ── Spotlight hover card ── */
const SpotlightPainCard = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 25 });

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
      onClick={onClick}
      className="relative bg-card p-10 group cursor-pointer select-none overflow-hidden"
      data-cursor="expand"
      whileHover={{ backgroundColor: "hsl(240 4% 9%)" }}
      transition={{ duration: 0.4 }}
    >
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, hsl(265 85% 60% / 0.08), transparent 60%)`
          ),
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const PainPointsSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["-5%", "5%"] : ["-15%", "15%"]);
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12"
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

        {/* Section illustration with parallax */}
        <motion.div
          ref={parallaxRef}
          className="mb-10 rounded-2xl overflow-hidden relative h-36 md:h-48"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img src={painpointsHero} alt="内容运营痛点" className="absolute inset-0 w-full h-[130%] object-cover opacity-60" style={{ y: imgY }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-background/20" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden">
          {painPoints.map((point, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightPainCard onClick={() => setExpanded(isOpen ? null : i)}>
                  <div className="flex items-center justify-between mb-8">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(265 85% 65% / 0.2)" }}
                    >
                      <point.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-0">
                    {isOpen ? point.description : point.summary}
                  </p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-5 border-t border-border/50 space-y-2">
                          {point.details.map((d, idx) => (
                            <motion.p
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.08, duration: 0.3 }}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                              {d}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpotlightPainCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
