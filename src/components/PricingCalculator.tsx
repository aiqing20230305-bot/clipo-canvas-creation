import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Film, Eye, ShoppingCart, Sparkles, ChevronRight } from "lucide-react";

// ── 数据层 ──────────────────────────────────────────────────
// 按条计费：根据数量匹配单价档位
const VOLUME_PRICE_TIERS = [
  { min: 0, max: 4999, price: 25, ops: 0, label: "< 5,000 条" },
  { min: 5000, max: 9999, price: 15, ops: 12000, label: "5,000 – 10,000 条" },
  { min: 10000, max: 49999, price: 10, ops: 12000, label: "10,000 – 50,000 条" },
  { min: 50000, max: Infinity, price: 5, ops: 12000, label: "≥ 50,000 条" },
];

const getVolumeTier = (qty: number) =>
  VOLUME_PRICE_TIERS.find((t) => qty >= t.min && qty <= t.max) ?? VOLUME_PRICE_TIERS[0];

const CPM_TIERS = [
  { label: "100w 曝光", cpm: 12, total: 12000, ops: 0 },
  { label: "500w 曝光", cpm: 10, total: 50000, ops: 12000 },
  { label: "1000w 曝光", cpm: 8, total: 80000, ops: 12000 },
  { label: "1 亿曝光", cpm: 5, total: 500000, ops: 12000 },
];

const DISTRIBUTION_DOMESTIC = [
  { label: "抖音", price: 6, unit: "元/条" },
  { label: "快手", price: 6, unit: "元/条" },
  { label: "小红书", price: 10, unit: "元/条" },
];

const DISTRIBUTION_OVERSEAS = [
  { label: "TikTok / Ins 租号", price: 600, unit: "元/个/月" },
  { label: "分发运营费", price: 8000, unit: "元/月起" },
];

// ── 组件 ──────────────────────────────────────────────────
const PricingCalculator = () => {
  const [region, setRegion] = useState<"domestic" | "overseas">("domestic");
  const [billing, setBilling] = useState<"volume" | "cpm">("volume");
  const [volumeQty, setVolumeQty] = useState(1000);
  const [cpmTierIndex, setCpmTierIndex] = useState(0);
  const [upgradeContent, setUpgradeContent] = useState(false);
  const [ecommerce, setEcommerce] = useState(false);
  const [months, setMonths] = useState(1);

  const safeCpmIndex = Math.min(cpmTierIndex, CPM_TIERS.length - 1);

  const estimate = useMemo(() => {
    const m = Math.max(1, months);
    if (billing === "volume") {
      const qty = Math.max(1, volumeQty);
      const tier = getVolumeTier(qty);
      let unitPrice = tier.price;
      if (upgradeContent) unitPrice += 10;
      const productionCost = qty * unitPrice;
      const opsCost = tier.ops;
      const ecommerceCost = ecommerce ? qty * 80 : 0;
      const monthlyTotal = productionCost + opsCost + ecommerceCost;
      return { tierLabel: tier.label, unitPrice, productionCost, opsCost, ecommerceCost, monthly: monthlyTotal, total: monthlyTotal * m };
    } else {
      const t = CPM_TIERS[safeCpmIndex];
      const monthlyTotal = t.total + t.ops;
      return { tierLabel: t.label, unitPrice: t.cpm, productionCost: t.total, opsCost: t.ops, ecommerceCost: 0, monthly: monthlyTotal, total: monthlyTotal * m };
    }
  }, [billing, volumeQty, safeCpmIndex, upgradeContent, ecommerce, months]);

  const regionLabel = region === "domestic" ? "国内" : "海外";
  const billingLabel = billing === "volume" ? "按条计费" : "按曝光计费";

  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-cyber text-xs text-accent/60 tracking-[0.3em] uppercase mb-4">// PRICING_CALC</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-wide">
            智能<span className="text-gradient-cyber">报价计算器</span>
          </h2>
          <p className="text-muted-foreground text-base mt-3">输入数量，实时查看您的专属报价</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="w-full mx-auto"
        >
          <div className="bg-card rounded-sm border border-accent/10 overflow-hidden cyber-card">
            {/* Controls */}
            <div className="p-6 md:p-8 border-b border-accent/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="font-mono-cyber text-[10px] text-accent/50 mb-2 block tracking-wider">REGION</label>
                  <div className="flex bg-secondary rounded-sm p-1">
                    {[
                      { key: "domestic" as const, label: "国内短视频", icon: MapPin },
                      { key: "overseas" as const, label: "海外短视频", icon: Globe },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setRegion(opt.key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm text-sm font-medium transition-all ${
                          region === opt.key
                            ? "bg-gradient-purple text-primary-foreground shadow-lg"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <opt.icon className="w-4 h-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <label className="font-mono-cyber text-[10px] text-accent/50 mb-2 block tracking-wider">BILLING</label>
                  <div className="flex bg-secondary rounded-sm p-1">
                    {[
                      { key: "volume" as const, label: "按条计费", icon: Film },
                      { key: "cpm" as const, label: "按曝光 CPM", icon: Eye },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => { setBilling(opt.key); setCpmTierIndex(0); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm text-sm font-medium transition-all ${
                          billing === opt.key
                            ? "bg-gradient-purple text-primary-foreground shadow-lg"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <opt.icon className="w-4 h-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="p-6 md:p-8 border-b border-accent/10">
              {billing === "volume" ? (
                <>
                  <label className="font-mono-cyber text-[10px] text-accent/50 mb-4 block tracking-wider">VOLUME / MONTH</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      value={volumeQty}
                      onChange={(e) => setVolumeQty(Math.max(1, Number(e.target.value) || 1))}
                      className="w-40 bg-secondary border border-accent/10 rounded-sm px-4 py-3 text-2xl font-bold text-foreground text-center focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all font-display tracking-wide"
                    />
                    <span className="text-muted-foreground text-sm">条/月</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[1000, 5000, 10000, 30000, 50000, 100000].map((q) => (
                      <button
                        key={q}
                        onClick={() => setVolumeQty(q)}
                        className={`font-mono-cyber text-xs px-3 py-1.5 rounded-sm border transition-all ${
                          volumeQty === q
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-secondary border-accent/10 text-muted-foreground hover:border-accent/30"
                        }`}
                      >
                        {q.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <p className="font-mono-cyber text-xs text-muted-foreground mt-3">
                    TIER: <span className="text-accent font-medium">{estimate.tierLabel}</span>
                    {" "}— UNIT: <span className="text-accent font-medium">¥{getVolumeTier(Math.max(1, volumeQty)).price}</span>
                  </p>
                </>
              ) : (
                <>
                  <label className="font-mono-cyber text-[10px] text-accent/50 mb-4 block tracking-wider">EXPOSURE_TIER</label>
                  <div className="flex flex-wrap gap-2">
                    {CPM_TIERS.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setCpmTierIndex(i)}
                        className={`px-4 py-2.5 rounded-sm text-sm font-medium border transition-all ${
                          i === safeCpmIndex
                            ? "bg-accent text-accent-foreground border-accent shadow-md"
                            : "bg-secondary border-accent/10 text-muted-foreground hover:border-accent/30"
                        }`}
                      >
                        {t.label}（¥{t.cpm}/CPM）
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Addons */}
            <div className="p-6 md:p-8 border-b border-accent/10">
              <label className="font-mono-cyber text-[10px] text-accent/50 mb-4 block tracking-wider">ADDONS</label>
              <div className="flex flex-wrap gap-3">
                <ToggleChip icon={<Sparkles className="w-3.5 h-3.5" />} label="内容升级 (+10元/条)" active={upgradeContent} onClick={() => setUpgradeContent(!upgradeContent)} disabled={billing === "cpm"} />
                <ToggleChip icon={<ShoppingCart className="w-3.5 h-3.5" />} label="电商投流 (80元/条)" active={ecommerce} onClick={() => setEcommerce(!ecommerce)} disabled={billing === "cpm"} />
              </div>

              <div className="mt-5 pt-4 border-t border-accent/10">
                <p className="font-mono-cyber text-[10px] text-accent/40 mb-2 tracking-wider">DISTRIBUTION_REF ({regionLabel})</p>
                <div className="flex flex-wrap gap-2">
                  {(region === "domestic" ? DISTRIBUTION_DOMESTIC : DISTRIBUTION_OVERSEAS).map((d) => (
                    <span key={d.label} className="font-mono-cyber text-xs px-3 py-1.5 rounded-sm bg-secondary text-secondary-foreground border border-accent/5">
                      {d.label}：{d.price} {d.unit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="p-6 md:p-8 border-b border-accent/10">
              <label className="font-mono-cyber text-[10px] text-accent/50 mb-4 block tracking-wider">DURATION</label>
              <div className="flex items-center gap-3">
                {[1, 3, 6, 12].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                      months === m
                        ? "bg-accent text-accent-foreground border-accent shadow-md"
                        : "bg-secondary border-accent/10 text-muted-foreground hover:border-accent/30"
                    }`}
                  >
                    {m} 个月
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={36}
                  value={months}
                  onChange={(e) => setMonths(Math.max(1, Math.min(36, Number(e.target.value) || 1)))}
                  className="w-20 bg-secondary border border-accent/10 rounded-sm px-3 py-2 text-sm text-foreground text-center focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>
            </div>

            {/* Result */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${billing}-${volumeQty}-${safeCpmIndex}-${upgradeContent}-${ecommerce}-${months}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-6 md:p-8 bg-accent/5"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="font-mono-cyber text-[10px] text-accent/50 mb-1 tracking-wider">
                      {regionLabel} · {billingLabel} · {estimate.tierLabel}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gradient-cyber font-display tracking-wide">
                        ¥{estimate.total.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        / {months > 1 ? `${months}个月合计` : "月预估"}
                      </span>
                    </div>
                    {months > 1 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        月均 ¥{estimate.monthly.toLocaleString()}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono-cyber text-xs text-muted-foreground">
                      <span>{billing === "volume" ? `UNIT ¥${estimate.unitPrice}` : `CPM ¥${estimate.unitPrice}`}</span>
                      <span>PROD ¥{estimate.productionCost.toLocaleString()}</span>
                      {estimate.opsCost > 0 && <span>OPS ¥{estimate.opsCost.toLocaleString()}/mo</span>}
                      {estimate.ecommerceCost > 0 && <span>ECOM ¥{estimate.ecommerceCost.toLocaleString()}</span>}
                    </div>
                  </div>

                  <a
                    href="https://asset.clipo.cc/video-agent/signup"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-gradient-purple text-primary-foreground font-medium hover:opacity-90 transition-opacity shrink-0 font-mono-cyber tracking-wider"
                  >
                    获取精确报价
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            内容升级说明：在基础素材混剪基础上加入 AI 前贴片（3秒）及数字人视频，对应基础报价每条加10元。纯AI生产视频（国内/海外通用）：100–2,000元/条，按复杂度调整。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const ToggleChip = ({ icon, label, active, onClick, disabled }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-medium transition-all border ${
      disabled
        ? "opacity-40 cursor-not-allowed border-border text-muted-foreground"
        : active
        ? "bg-gradient-purple text-primary-foreground border-transparent shadow-md"
        : "bg-secondary border-accent/10 text-secondary-foreground hover:border-accent/30"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default PricingCalculator;
