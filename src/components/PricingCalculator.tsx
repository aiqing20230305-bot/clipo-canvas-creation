import { motion } from "framer-motion";
import { Check, Zap, Rocket, Crown, Building2, ArrowRight } from "lucide-react";
import IridescentCard from "./IridescentCard";
import { useContact } from "@/components/ContactDialog";

const tiers = [
  {
    name: "试水计划",
    tagline: "先跑通模型，再决定加码",
    volume: "< 5,000 条/月",
    price: "25",
    unit: "条",
    icon: Zap,
    features: [
      "基础素材混剪",
      "AI 脚本自动拆解",
      "标准交付周期",
      "效果数据看板",
    ],
    highlight: false,
  },
  {
    name: "增长计划",
    tagline: "跑通了就该踩油门",
    volume: "5,000 – 10,000 条/月",
    price: "15",
    unit: "条",
    extra: "含专属运营（¥12,000/月）",
    icon: Rocket,
    features: [
      "全量素材混剪",
      "AI 脚本拆解 + 优化",
      "1对1 运营对接",
      "按复杂度灵活调价",
    ],
    highlight: false,
  },
  {
    name: "规模计划",
    tagline: "用规模碾压对手的内容成本",
    volume: "10,000 – 50,000 条/月",
    price: "10",
    unit: "条",
    extra: "含专属运营（¥12,000/月）",
    badge: "最多客户选择",
    icon: Crown,
    features: [
      "全量素材混剪",
      "AI 脚本拆解 + 热点追踪",
      "专属运营团队",
      "随时升级内容形态",
    ],
    highlight: true,
  },
  {
    name: "霸屏计划",
    tagline: "你的对手还在招人，你已经铺满全网",
    volume: "> 50,000 条/月",
    price: "5",
    unit: "条",
    extra: "运营团队按需配置",
    icon: Building2,
    features: [
      "工业化内容生产线",
      "多人专属运营团队",
      "定制化服务方案",
      "价格随量级持续下降",
    ],
    highlight: false,
  },
];

const stats = [
  { value: "5元", label: "单条最低成本" },
  { value: "10,000+", label: "条/周产能" },
  { value: "90%", label: "人力成本节省" },
];

const PricingCalculator = () => {
  const { open } = useContact();

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Pricing</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            一条视频<span className="text-gradient-purple">最低5元</span>
            <br className="hidden sm:block" />
            比实习生还便宜，比团队还高产
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-2xl mx-auto">
            别人还在纠结招不招人，你已经日产千条内容铺满全网
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex justify-center gap-8 md:gap-16 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gradient-purple">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <IridescentCard
                key={tier.name}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`relative p-6 cursor-pointer group flex flex-col ${
                  tier.highlight ? "border-primary/40 ring-1 ring-primary/20" : ""
                }`}
                glowIntensity={tier.highlight ? 1.8 : 1}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-purple text-xs text-primary-foreground font-semibold z-20 whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                {/* Icon + Name */}
                <div className="mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    tier.highlight
                      ? "bg-gradient-purple"
                      : "bg-secondary"
                  }`}>
                    <Icon className={`w-5 h-5 ${tier.highlight ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tier.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground">¥</span>
                    <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground text-sm">/{tier.unit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{tier.volume}</p>
                </div>

                {tier.extra && (
                  <p className="text-xs text-primary/80 font-medium mb-4 py-1.5 px-3 rounded-lg bg-primary/5 inline-block">
                    {tier.extra}
                  </p>
                )}

                {/* CTA */}
                <button
                  onClick={open}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all my-5 ${
                    tier.highlight
                      ? "bg-gradient-purple text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  {tier.highlight ? "立即咨询" : "了解详情"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Features */}
                <div className="mt-auto">
                  <p className="text-xs text-muted-foreground mb-3 font-medium">服务内容</p>
                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </IridescentCard>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">内容升级</span>：AI 前贴片 3秒 + 数字人视频，每条加 ¥10 ·
            <span className="text-foreground font-medium"> 纯 AI 生产</span>：¥100–2,000/条，按复杂度定价 ·
            <span className="text-foreground font-medium"> 分发代运营</span>：抖音/快手 ¥6/条，小红书 ¥10/条
          </p>
          <p className="text-xs text-muted-foreground mt-3">所有方案均支持按需定制，量大从优</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCalculator;
