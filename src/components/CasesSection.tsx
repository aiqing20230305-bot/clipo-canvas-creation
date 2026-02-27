import { motion } from "framer-motion";

const cases = [
  {
    brand: "999°",
    tag: "品牌",
    title: "引流线下门店",
    stats: [
      { value: "1000+", label: "门店账号" },
      { value: "444", label: "条发布" },
      { value: "14.3w+", label: "总曝光" },
    ],
    description: "结合线下促销，精准触达消费群体。",
  },
  {
    brand: "爱玛",
    tag: "电动车",
    title: "线下门店赋能",
    stats: [
      { value: "8k+", label: "经销商账号" },
      { value: "100w+", label: "总发布" },
      { value: "10w+", label: "Top播放量" },
    ],
    description: "结合电动车新国标政策科普，植入车型卖点。",
  },
  {
    brand: "AHC",
    tag: "美妆",
    title: "ROI 稳定增长",
    stats: [
      { value: "2.03↑", label: "ROI" },
      { value: "130条/周", label: "产出量" },
    ],
    description: "提前梳理卖点与人群；字幕/花字与品牌色强相关。",
  },
  {
    brand: "BRITA 碧然德",
    tag: "家电",
    title: "ROI 高效提升",
    stats: [
      { value: "4.76↑", label: "ROI" },
      { value: "500条/周", label: "产出量" },
    ],
    description: "借助国补政策；A/B test细分人群，特写过滤场景。",
  },
];

const CasesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            成功案例
          </h2>
          <p className="text-muted-foreground text-lg">跨行业实现 ROI 稳定增长</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.brand}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-foreground">{c.brand}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{c.tag}</span>
              </div>
              <h3 className="text-base font-medium text-foreground mb-5">{c.title}</h3>
              <div className="flex gap-8 mb-5">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-gradient-purple">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
