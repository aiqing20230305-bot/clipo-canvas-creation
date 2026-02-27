import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Film, Eye, ShoppingCart, Sparkles, ChevronRight } from "lucide-react";

// ── 数据层 ──────────────────────────────────────────────────
const VOLUME_TIERS = [
  { label: "< 5,000 条", value: 2500, price: 25, ops: 0 },
  { label: "5,000 – 10,000 条", value: 7500, price: 15, ops: 12000 },
  { label: "10,000 – 50,000 条", value: 30000, price: 10, ops: 12000 },
  { label: "> 50,000 条", value: 60000, price: 5, ops: 12000 },
];

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
  const [tierIndex, setTierIndex] = useState(0);
  const [upgradeContent, setUpgradeContent] = useState(false);
  const [ecommerce, setEcommerce] = useState(false);

  const tiers = billing === "volume" ? VOLUME_TIERS : CPM_TIERS;
  const currentTier = tiers[tierIndex];

  // 保证切换模式时 index 合法
  const safeTierIndex = Math.min(tierIndex, tiers.length - 1);

  const estimate = useMemo(() => {
    const idx = Math.min(tierIndex, tiers.length - 1);
    const tier = tiers[idx];

    if (billing === "volume") {
      const t = tier as (typeof VOLUME_TIERS)[number];
      let unitPrice = t.price;
      if (upgradeContent) unitPrice += 10;
      const productionCost = t.value * unitPrice;
      const opsCost = t.ops;
      const ecommerceCost = ecommerce ? t.value * 80 : 0;
      return {
        unitPrice,
        productionCost,
        opsCost,
        ecommerceCost,
        total: productionCost + opsCost + ecommerceCost,
      };
    } else {
      const t = tier as (typeof CPM_TIERS)[number];
      const baseCost = t.total;
      const opsCost = t.ops;
      return {
        unitPrice: t.cpm,
        productionCost: baseCost,
        opsCost,
        ecommerceCost: 0,
        total: baseCost + opsCost,
      };
    }
  }, [tierIndex, billing, upgradeContent, ecommerce, tiers]);

  const regionLabel = region === "domestic" ? "国内" : "海外";
  const billingLabel = billing === "volume" ? "按条计费" : "按曝光计费";

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        {/* 标题 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            智能<span className="text-gradient-purple">报价计算器</span>
          </h2>
          <p className="text-muted-foreground text-lg">拖动档位，实时查看您的专属报价</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl border border-border overflow-hidden">
            {/* ── 顶部控制栏 ── */}
            <div className="p-6 md:p-8 border-b border-border">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* 区域切换 */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-2 block">业务区域</label>
                  <div className="flex bg-secondary rounded-xl p-1">
                    {[
                      { key: "domestic" as const, label: "国内短视频", icon: MapPin },
                      { key: "overseas" as const, label: "海外短视频", icon: Globe },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => { setRegion(opt.key); setTierIndex(0); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
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

                {/* 计费模式切换 */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-2 block">计费模式</label>
                  <div className="flex bg-secondary rounded-xl p-1">
                    {[
                      { key: "volume" as const, label: "按条计费", icon: Film },
                      { key: "cpm" as const, label: "按曝光 CPM", icon: Eye },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => { setBilling(opt.key); setTierIndex(0); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
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

            {/* ── 档位滑块 ── */}
            <div className="p-6 md:p-8 border-b border-border">
              <label className="text-xs text-muted-foreground mb-4 block">
                {billing === "volume" ? "产量档位" : "曝光档位"}
              </label>

              {/* 滑块 */}
              <div className="relative mb-4">
                <input
                  type="range"
                  min={0}
                  max={tiers.length - 1}
                  step={1}
                  value={safeTierIndex}
                  onChange={(e) => setTierIndex(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer
                    bg-secondary
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-gradient-purple
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:glow-purple
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-primary-foreground
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-moz-range-thumb]:w-6
                    [&::-moz-range-thumb]:h-6
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-gradient-purple
                    [&::-moz-range-thumb]:border-2
                    [&::-moz-range-thumb]:border-primary-foreground
                  "
                  style={{
                    background: `linear-gradient(to right, hsl(270 80% 60%) 0%, hsl(270 80% 60%) ${(safeTierIndex / (tiers.length - 1)) * 100}%, hsl(0 0% 12%) ${(safeTierIndex / (tiers.length - 1)) * 100}%, hsl(0 0% 12%) 100%)`,
                  }}
                />
              </div>

              {/* 档位标签 */}
              <div className="flex justify-between">
                {tiers.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTierIndex(i)}
                    className={`text-xs transition-colors ${
                      i === safeTierIndex
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── 增值选项 ── */}
            <div className="p-6 md:p-8 border-b border-border">
              <label className="text-xs text-muted-foreground mb-4 block">增值服务</label>
              <div className="flex flex-wrap gap-3">
                <ToggleChip
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  label="内容类型升级 (+10元/条)"
                  active={upgradeContent}
                  onClick={() => setUpgradeContent(!upgradeContent)}
                  disabled={billing === "cpm"}
                />
                <ToggleChip
                  icon={<ShoppingCart className="w-3.5 h-3.5" />}
                  label="电商投流转化 (80元/条)"
                  active={ecommerce}
                  onClick={() => setEcommerce(!ecommerce)}
                  disabled={billing === "cpm"}
                />
              </div>

              {/* 分发费用参考 */}
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  分发费用参考（{regionLabel}）
                </p>
                <div className="flex flex-wrap gap-2">
                  {(region === "domestic" ? DISTRIBUTION_DOMESTIC : DISTRIBUTION_OVERSEAS).map(
                    (d) => (
                      <span
                        key={d.label}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {d.label}：{d.price} {d.unit}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* ── 报价结果 ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${billing}-${safeTierIndex}-${upgradeContent}-${ecommerce}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-6 md:p-8 bg-secondary/30"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {regionLabel} · {billingLabel} · {tiers[safeTierIndex].label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gradient-purple">
                        ¥{estimate.total.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">/月预估</span>
                    </div>

                    {/* 明细 */}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span>
                        {billing === "volume"
                          ? `单价 ¥${estimate.unitPrice}/条`
                          : `CPM ¥${estimate.unitPrice}`}
                      </span>
                      <span>内容生产 ¥{estimate.productionCost.toLocaleString()}</span>
                      {estimate.opsCost > 0 && (
                        <span>运营成本 ¥{estimate.opsCost.toLocaleString()}/月</span>
                      )}
                      {estimate.ecommerceCost > 0 && (
                        <span>电商投流 ¥{estimate.ecommerceCost.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  <a
                    href="https://asset.clipo.cc/video-agent/signup"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-purple text-primary-foreground font-medium hover:opacity-90 transition-opacity shrink-0"
                  >
                    获取精确报价
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 底部说明 */}
          <motion.p
            className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            内容类型升级（AI前贴3秒+混剪、数字人视频）：对应基础报价上每条加10元。纯AI生产视频（国内/海外通用）：100–2,000元/条，按复杂度调整。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// ── 小组件：可切换标签 ──
const ToggleChip = ({
  icon,
  label,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
      disabled
        ? "opacity-40 cursor-not-allowed border-border text-muted-foreground"
        : active
        ? "bg-gradient-purple text-primary-foreground border-transparent shadow-md"
        : "bg-secondary border-border text-secondary-foreground hover:border-primary/30"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default PricingCalculator;
