import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "入门级",
    volume: "< 5,000条",
    price: "25",
    unit: "元/条",
    features: ["基础素材混剪", "AI脚本拆解", "基础报价"],
    highlight: false,
  },
  {
    name: "标准级",
    volume: "5,000 - 10,000条",
    price: "15",
    unit: "元/条",
    extra: "+12,000元/月（运营人员成本）",
    features: ["素材混剪", "AI脚本拆解", "运营人员配置", "价格可按复杂度调整"],
    highlight: false,
  },
  {
    name: "专业级",
    volume: "10,000 - 50,000条",
    price: "10",
    unit: "元/条",
    extra: "+12,000元/月（运营人员成本）",
    features: ["全量素材混剪", "AI脚本拆解", "运营团队支持", "5,000条以上必加运营成本"],
    highlight: true,
  },
  {
    name: "企业级",
    volume: "> 50,000条",
    price: "5",
    unit: "元/条",
    extra: "+12,000元/月 + 额外人员成本",
    features: ["大规模生产", "专属运营团队", "定制化服务", "按实际情况调整"],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            报价方案
          </h2>
          <p className="text-muted-foreground text-lg">
            按量阶梯计费，量越大越划算
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-xl p-6 border transition-all relative overflow-hidden ${
                tier.highlight
                  ? "bg-card border-primary/50 glow-gold"
                  : "bg-card border-border hover:border-primary/20"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold" />
              )}
              <div className="bg-secondary rounded-lg px-3 py-2 text-center mb-6">
                <p className="text-sm font-semibold text-foreground">{tier.name}</p>
                <p className="text-xs text-muted-foreground">{tier.volume}</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gradient-gold">{tier.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{tier.unit}</span>
              </div>
              {tier.extra && (
                <p className="text-xs text-muted-foreground text-center mb-4 bg-muted rounded-md px-2 py-1.5">
                  {tier.extra}
                </p>
              )}
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          说明：价格按视频复杂度和实际生产难度可做调整。包含基础素材混剪。
          内容类型升级（AI前贴3秒+混剪、数字人视频）对应基础报价上每条加10元。
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
