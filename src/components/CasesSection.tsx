import { motion } from "framer-motion";

const cases = [
  {
    brand: "999°",
    industry: "品牌",
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
    industry: "电动车",
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
    industry: "美妆行业",
    title: "ROI 稳定增长",
    stats: [
      { value: "2.03↑", label: "ROI" },
      { value: "130条/周", label: "产出量" },
    ],
    description: "提前梳理卖点与人群；字幕/花字与品牌色强相关。",
  },
  {
    brand: "BRITA",
    industry: "家电行业",
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
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            成功案例
          </h2>
          <p className="text-muted-foreground text-lg">
            跨行业实现 ROI 稳定增长
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gradient-gold">{c.brand}</span>
                  <span className="text-muted-foreground text-sm ml-3">{c.industry}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{c.title}</h3>
              <div className="flex gap-6 mb-4">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
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
