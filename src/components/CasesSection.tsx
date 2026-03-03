import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
    <p ref={ref} className="font-display text-2xl md:text-3xl font-bold text-gradient-purple mb-1">
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
  },
  {
    brand: "某知名美妆品牌",
    tag: "美妆",
    stats: [
      { value: "2.03↑", label: "ROI" },
      { value: "130条/周", label: "产出量" },
    ],
    description: "梳理卖点与人群，字幕花字与品牌色强相关",
  },
  {
    brand: "某知名家电品牌",
    tag: "家电",
    stats: [
      { value: "4.76↑", label: "ROI" },
      { value: "500条/周", label: "产出量" },
    ],
    description: "借助国补政策，A/B test细分人群",
  },
];

const CasesSection = () => {
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
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Case Studies</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            不是PPT
            <br />
            <span className="text-muted-foreground">是真金白银的结果</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border/50 rounded-2xl overflow-hidden">
          {cases.map((c, i) => (
            <motion.div
              key={c.brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card p-8 md:p-10 group hover:bg-secondary/50 transition-colors duration-500"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="font-display text-lg font-semibold text-foreground">{c.brand}</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground tracking-wider uppercase">{c.tag}</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
