import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function parseStat(value: string) {
  const match = value.match(/^([^\d]*?)([\d.]+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function formatNum(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
}

const AnimatedStat = ({ value }: { value: string }) => {
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
    <p ref={ref} className="font-display text-2xl md:text-3xl font-bold text-gradient-cyber mb-1 tracking-wide">
      {display}
    </p>
  );
};

const cases = [
  {
    brand: "某知名医药品牌",
    tag: "PHARMA",
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
    tag: "EV_AUTO",
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
    tag: "BEAUTY",
    stats: [
      { value: "2.03↑", label: "ROI" },
      { value: "130条/周", label: "产出量" },
    ],
    description: "梳理卖点与人群，字幕花字与品牌色强相关",
    insight: "精准匹配目标人群画像，品牌视觉与内容深度绑定，ROI稳定提升至2倍以上。",
  },
  {
    brand: "某知名家电品牌",
    tag: "HOME_TECH",
    stats: [
      { value: "4.76↑", label: "ROI" },
      { value: "500条/周", label: "产出量" },
    ],
    description: "借助国补政策，A/B test细分人群",
    insight: "结合国补政策窗口期，通过A/B测试持续优化素材，实现行业领先的4.76倍投产比。",
  },
];

const CasesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

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
          <p className="font-mono-cyber text-xs text-accent/60 tracking-[0.3em] uppercase mb-4">
            // CASE_DATA
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-wide">
            不是PPT
            <br />
            <span className="text-muted-foreground">是真金白银的结果</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-accent/5 rounded-sm overflow-hidden">
          {cases.map((c, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={c.brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card p-8 md:p-10 group hover:bg-secondary/30 transition-colors duration-500 cursor-pointer select-none border-accent/5"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-base font-semibold text-foreground tracking-wide">{c.brand}</span>
                    <span className="font-mono-cyber text-[10px] px-2.5 py-1 rounded-sm bg-accent/10 text-accent/70 tracking-wider border border-accent/10">{c.tag}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <ChevronDown className="w-4 h-4 text-accent/40" />
                  </motion.div>
                </div>

                <div className="flex gap-6 mb-6">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <AnimatedStat value={s.value} />
                      <p className="text-xs text-muted-foreground font-mono-cyber tracking-wider">{s.label}</p>
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
                      <div className="pt-5 mt-5 border-t border-accent/10">
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-accent font-mono-cyber text-[10px] mt-0.5 shrink-0">▹</span>
                          {c.insight}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
