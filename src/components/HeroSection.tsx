import { motion } from "framer-motion";
import { DouyinIcon, KuaishouIcon, XiaohongshuIcon, ShipinHaoIcon, BilibiliIcon, TikTokIcon, InstagramIcon, YouTubeIcon, FacebookIcon, XTwitterIcon } from "./PlatformIcons";
import { ReactNode } from "react";

const platforms: { name: string; icon: ReactNode }[] = [
  { name: "抖音", icon: <DouyinIcon /> },
  { name: "快手", icon: <KuaishouIcon /> },
  { name: "小红书", icon: <XiaohongshuIcon /> },
  { name: "视频号", icon: <ShipinHaoIcon /> },
  { name: "B站", icon: <BilibiliIcon /> },
  { name: "TikTok", icon: <TikTokIcon /> },
  { name: "Instagram", icon: <InstagramIcon /> },
  { name: "YouTube", icon: <YouTubeIcon /> },
  { name: "Facebook", icon: <FacebookIcon /> },
  { name: "X / Twitter", icon: <XTwitterIcon /> },
];

// Duplicate for seamless loop
const doubledPlatforms = [...platforms, ...platforms];

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-end pb-16 pt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            className="text-xs md:text-sm text-muted-foreground font-medium tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Content Production · Operations · Distribution
          </motion.p>

          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] mb-8">
            <motion.span
              className="text-foreground block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              懂内容，更懂平台
            </motion.span>
            <motion.span
              className="text-gradient-purple block mt-2 relative"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              AI驱动全域增长
              <span
                className="absolute inset-0 bg-clip-text text-transparent animate-shimmer pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, transparent 25%, hsla(270,90%,80%,0.35) 37%, hsla(200,80%,70%,0.35) 50%, transparent 62%)",
                  backgroundSize: "250% 100%",
                }}
                aria-hidden="true"
              >
                AI驱动全域增长
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            深耕<span className="text-foreground">内容生产 × 运营策略 × 社媒平台规则</span>，
            <br className="hidden md:block" />
            从素材混剪到纯AI生成，一套引擎覆盖全平台。
            <br className="hidden md:block" />
            ROI 最高提升 4.76%，周产上万条内容。
          </motion.p>

          <motion.div
            className="flex gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#solutions"
              className="relative px-8 py-3.5 rounded-full bg-gradient-purple text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity overflow-hidden group"
            >
              <span className="relative z-10">了解更多</span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 20%, hsla(200,80%,80%,0.3) 40%, hsla(320,80%,70%,0.2) 60%, transparent 80%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            </a>
            <a
              href="#pricing"
              className="px-8 py-3.5 rounded-full border border-border text-sm text-foreground font-medium hover:bg-secondary transition-colors iridescent-border"
            >
              查看报价
            </a>
          </motion.div>

          {/* Platform logo ticker */}
          <motion.div
            className="mt-14 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <p className="text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase mb-4">
              覆盖全球主流内容平台
            </p>
            <div className="relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex animate-marquee gap-8">
                {doubledPlatforms.map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="flex items-center gap-3 px-5 py-3 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm shrink-0 hover:border-primary/50 hover:bg-primary/5 hover:scale-110 transition-all duration-300 cursor-default group"
                  >
                    <span className="text-foreground/70 group-hover:text-primary transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5">{p.icon}</span>
                    <span className="text-sm text-foreground/60 group-hover:text-foreground/90 whitespace-nowrap transition-colors duration-300">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
};

export default HeroSection;
