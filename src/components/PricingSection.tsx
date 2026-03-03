import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import IridescentCard from "./IridescentCard";

const tiers = [
  {
    name: "入门级",
    volume: "< 5,000条",
    price: "25",
    unit: "元/条",
    features: [
      { text: "基础素材混剪", included: true },
      { text: "AI脚本拆解", included: true },
      { text: "基础报价", included: true },
      { text: "运营人员配置", included: false },
    ],
    highlight: false,
  },
  {
    name: "标准级",
    volume: "5,000 - 10,000条",
    price: "15",
    unit: "元/条",
    extra: "+12,000元/月（运营人员成本）",
    features: [
      { text: "素材混剪", included: true },
      { text: "AI脚本拆解", included: true },
      { text: "运营人员配置", included: true },
      { text: "价格可按复杂度调整", included: true },
    ],
    highlight: false,
  },
  {
    name: "专业级",
    volume: "10,000 - 50,000条",
    price: "10",
    unit: "元/条",
    extra: "+12,000元/月（运营人员成本）",
    badge: "推荐",
    features: [
      { text: "全量素材混剪", included: true },
      { text: "AI脚本拆解", included: true },
      { text: "运营团队支持", included: true },
      { text: "可随时升级内容类型", included: true },
    ],
    highlight: true,
  },
  {
    name: "企业级",
    volume: "> 50,000条",
    price: "5",
    unit: "元/条",
    extra: "+12,000元/月 + 额外人员成本",
    features: [
      { text: "大规模生产", included: true },
      { text: "专属运营团队", included: true },
      { text: "定制化服务", included: true },
      { text: "按实际情况调整", included: true },
    ],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-purple mb-3">
            一条视频最低5元，比实习生还便宜
          </h2>
          <p className="text-muted-foreground text-lg">量越大越划算，规模化才是正确的打法</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <IridescentCard
              key={tier.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`p-6 cursor-pointer group ${
                tier.highlight ? "border-primary/40" : ""
              }`}
              glowIntensity={tier.highlight ? 1.5 : 1}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-purple text-xs text-primary-foreground font-medium z-20">
                  {tier.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.volume}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">¥{tier.price}</span>
                <span className="text-muted-foreground text-sm">/{tier.unit.replace('元/', '')}</span>
              </div>
              {tier.extra && (
                <p className="text-xs text-muted-foreground mb-5">{tier.extra}</p>
              )}

              <a
                href="#"
                className={`block w-full text-center py-2.5 rounded-full text-sm font-medium mb-6 transition-opacity ${
                  tier.highlight
                    ? "bg-gradient-purple text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground hover:opacity-80"
                }`}
              >
                联系咨询
              </a>

              <p className="text-xs text-muted-foreground mb-3">包含以下功能</p>
              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                    )}
                    <span className={f.included ? "text-muted-foreground" : "text-muted-foreground/50"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </IridescentCard>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          内容类型升级（AI前贴3秒+混剪、数字人视频）：对应基础报价上每条加10元。纯AI生产视频：100-2000元/条。
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
