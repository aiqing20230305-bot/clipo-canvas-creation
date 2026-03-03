import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DouyinIcon, KuaishouIcon, XiaohongshuIcon, ShipinHaoIcon, BilibiliIcon, TikTokIcon, InstagramIcon, YouTubeIcon, FacebookIcon, XTwitterIcon } from "./PlatformIcons";
import { ReactNode, useRef, useState, useCallback } from "react";
import FloatingOrb from "./FloatingOrb";

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

const doubledPlatforms = [...platforms, ...platforms];

/* ── Magnetic Platform Badge ── */
const PlatformBadge = ({ icon, name }: { icon: ReactNode; name: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="relative flex items-center gap-3 px-5 py-3 rounded-sm border border-accent/20 bg-card/50 backdrop-blur-sm shrink-0 cursor-default group select-none hud-corners"
      whileHover={{ scale: 1.08, borderColor: "hsl(185 90% 50% / 0.4)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="text-foreground/70 group-hover:text-accent transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5 relative z-10">{icon}</span>
      <span className="text-sm text-foreground/60 group-hover:text-foreground whitespace-nowrap transition-colors duration-300 relative z-10">{name}</span>
    </motion.div>
  );
};

/* ── Glitch text effect ── */
const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <span
      className="absolute inset-0 text-cyber-cyan opacity-0 hover:opacity-70 transition-opacity duration-200"
      style={{ animation: "glitch-1 3s infinite linear", animationDelay: "0s" }}
      aria-hidden="true"
    >
      {children}
    </span>
    <span
      className="absolute inset-0 text-cyber-pink opacity-0 hover:opacity-70 transition-opacity duration-200"
      style={{ animation: "glitch-2 3s infinite linear", animationDelay: "0.1s" }}
      aria-hidden="true"
    >
      {children}
    </span>
  </span>
);

/* ── Staggered text reveal line ── */
const RevealLine = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "110%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden scanlines">
      {/* Perspective circuit grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(hsl(185 90% 50% / 0.04) 1px, transparent 1px),
          linear-gradient(90deg, hsl(185 90% 50% / 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Vertical data streams */}
      {[15, 35, 65, 85].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px pointer-events-none"
          style={{
            left: `${left}%`,
            height: '100%',
            background: `linear-gradient(to bottom, transparent 0%, hsl(185 90% 50% / 0.15) 50%, transparent 100%)`,
          }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
        />
      ))}

      {/* Floating morphing orb */}
      <FloatingOrb />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Terminal-style label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono-cyber text-xs text-accent/80 tracking-[0.3em] uppercase">
              HUMAN × AI — Content Engine Online
            </span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 tracking-wide">
            <RevealLine delay={0.3}>
              <span className="text-foreground">懂内容，更懂平台</span>
            </RevealLine>
            <RevealLine delay={0.5} className="mt-3">
              <span className="text-gradient-cyber relative">
                <GlitchText>AI驱动全域增长</GlitchText>
                <motion.span
                  className="absolute inset-0 bg-clip-text text-transparent pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, transparent 25%, hsla(185,90%,60%,0.4) 37%, hsla(330,80%,65%,0.3) 50%, transparent 62%)",
                    backgroundSize: "250% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  AI驱动全域增长
                </motion.span>
              </span>
            </RevealLine>
          </h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            深耕<span className="text-accent">内容生产 × 运营策略 × 社媒平台规则</span>，
            <br className="hidden md:block" />
            从素材混剪到纯AI生成，一套引擎覆盖全平台。
            <br className="hidden md:block" />
            ROI 最高提升 <span className="text-cyber-pink font-semibold">4.76%</span>，周产上万条内容。
          </motion.p>

          <motion.div
            className="flex gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="#solutions"
              className="relative px-8 py-3.5 rounded-sm bg-gradient-purple text-primary-foreground text-sm font-medium overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(185 90% 50% / 0.3), 0 0 60px hsl(265 85% 65% / 0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 font-mono-cyber tracking-wider">了解更多</span>
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 20%, hsla(185,90%,60%,0.3) 40%, hsla(330,80%,65%,0.2) 60%, transparent 80%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            </motion.a>
            <motion.a
              href="#pricing"
              className="px-8 py-3.5 rounded-sm border border-accent/30 text-sm text-foreground font-mono-cyber tracking-wider hover:border-accent/60 hover:bg-accent/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              查看报价
            </motion.a>
          </motion.div>

          {/* Platform logo ticker */}
          <motion.div
            className="mt-14 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <p className="font-mono-cyber text-[10px] text-accent/40 tracking-[0.3em] uppercase mb-4">
              ── CONNECTED PLATFORMS ──
            </p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex animate-marquee gap-6 w-max">
                {doubledPlatforms.map((p, i) => (
                  <PlatformBadge key={`${p.name}-${i}`} icon={p.icon} name={p.name} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom neon line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(185 90% 50% / 0.4), hsl(265 85% 65% / 0.3), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
};

export default HeroSection;
