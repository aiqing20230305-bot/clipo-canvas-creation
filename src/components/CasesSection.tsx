import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import casesHero from "@/assets/cases-hero.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

function parseStat(value: string) {
  const match = value.match(/^([^\d]*?)([\d.]+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function formatNum(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
}

const AnimatedStat = ({ value, compact }: { value: string; compact?: boolean }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(value);
  const parsed = parseStat(value);

  useEffect(() => {
    if (!isInView || !parsed) return;
    const { prefix, num, suffix } = parsed;
    const decimals = (value.match(/\.(\d+)/) || [])[1]?.length || 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(`${prefix}${formatNum(current, decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <p ref={ref} className={`font-display font-bold text-gradient-purple mb-0.5 ${compact ? "text-xl" : "text-2xl md:text-3xl mb-1"}`}>
      {display}
    </p>
  );
};

const cases = [
  {
    brand: "某知名医药品牌",
    tag: "医药",
    stats: [
      { value: "1000+", label: "门店账号" },
      { value: "444", label: "条发布" },
      { value: "14.3w+", label: "总曝光" },
    ],
    description: "结合线下促销，精准触达消费群体",
    insight: "通过AI混剪引擎，将促销物料快速裂变为千店千面的短视频内容，实现线下流量到线上曝光的高效转化。",
  },
  {
    brand: "某知名电动车品牌",
    tag: "电动车",
    stats: [
      { value: "8k+", label: "经销商账号" },
      { value: "100w+", label: "总发布" },
      { value: "10w+", label: "Top播放" },
    ],
    description: "结合新国标政策科普，植入车型卖点",
    insight: "借政策热点构建内容矩阵，通过经销商账号矩阵分发，单条视频最高播放超10万。",
  },
  {
    brand: "某知名美妆品牌",
    tag: "美妆",
    stats: [
      { value: "2.03↑", label: "ROI" },
      { value: "130条/周", label: "产出量" },
    ],
    description: "梳理卖点与人群，字幕花字与品牌色强相关",
    insight: "精准匹配目标人群画像，品牌视觉与内容深度绑定，ROI稳定提升至2倍以上。",
  },
  {
    brand: "某知名家电品牌",
    tag: "家电",
    stats: [
      { value: "4.76↑", label: "ROI" },
      { value: "500条/周", label: "产出量" },
    ],
    description: "借助国补政策，A/B test细分人群",
    insight: "结合国补政策窗口期，通过A/B测试持续优化素材，实现行业领先的4.76倍投产比。",
  },
];

/* ── Mobile Card Carousel ── */
const MobileCarousel = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      {/* Card container - fixed height for one screen */}
      <div className="relative overflow-hidden rounded-2xl" style={{ height: "calc(100svh - 220px)", minHeight: "360px", maxHeight: "480px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-card border border-border/30 rounded-2xl p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <span className="font-display text-base font-semibold text-foreground">{cases[active].brand}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground tracking-wider uppercase">{cases[active].tag}</span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {cases[active].stats.map((s) => (
                <div key={s.label} className="bg-secondary/30 rounded-xl p-3 text-center">
                  <AnimatedStat value={s.value} compact />
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-foreground/90 font-medium mb-3">{cases[active].description}</p>

            {/* Insight */}
            <div className="flex-1 flex items-start">
              <div className="bg-secondary/20 rounded-xl p-4 border border-border/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  💡 {cases[active].insight}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center text-foreground/60 disabled:opacity-30 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActive((a) => Math.min(cases.length - 1, a + 1))}
          disabled={active === cases.length - 1}
          className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center text-foreground/60 disabled:opacity-30 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ── Desktop Grid ── */
const DesktopGrid = ({ expanded, setExpanded }: { expanded: number | null; setExpanded: (v: number | null) => void }) => (
  <div className="grid md:grid-cols-2 gap-px bg-border/50 rounded-2xl overflow-hidden">
    {cases.map((c, i) => {
      const isOpen = expanded === i;
      return (
        <motion.div
          key={c.brand}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card p-10 group hover:bg-secondary/50 transition-colors duration-500 cursor-pointer select-none"
          onClick={() => setExpanded(isOpen ? null : i)}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-semibold text-foreground">{c.brand}</span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground tracking-wider uppercase">{c.tag}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>

          <div className="flex gap-6 mb-6">
            {c.stats.map((s) => (
              <div key={s.label}>
                <AnimatedStat value={s.value} />
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-border/50">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-sm text-foreground/80 leading-relaxed"
                  >
                    💡 {c.insight}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    })}
  </div>
);

const CasesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const isMobile = useIsMobile();
  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["-5%", "5%"] : ["-15%", "15%"]);

  return (
    <section id="cases" className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Case Studies</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            不是PPT
            <br />
            <span className="text-muted-foreground">是真金白银的结果</span>
          </h2>
        </motion.div>

        {/* Section illustration with parallax - desktop only */}
        <motion.div
          ref={parallaxRef}
          className="mb-10 rounded-2xl overflow-hidden relative h-28 md:h-48 hidden md:block"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img src={casesHero} alt="案例数据" className="absolute inset-0 w-full h-[130%] object-cover opacity-60" style={{ y: imgY }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-background/20" />
        </motion.div>

        {/* Mobile: swipeable card carousel | Desktop: grid */}
        {isMobile ? <MobileCarousel /> : <DesktopGrid expanded={expanded} setExpanded={setExpanded} />}
      </div>
    </section>
  );
};

export default CasesSection;
