import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
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
const PlatformBadge = ({ icon, name, index }: { icon: ReactNode; name: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const glow = useSpring(0, { stiffness: 200, damping: 25 });
  const glowOpacity = useTransform(glow, [0, 1], [0, 0.6]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleEnter = () => { setHovered(true); glow.set(1); };
  const handleLeave = () => { setHovered(false); x.set(0); y.set(0); glow.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="relative flex items-center gap-3 px-5 py-3 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm shrink-0 cursor-default group select-none"
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          opacity: glowOpacity,
          boxShadow: `0 0 20px hsl(265 85% 65% / 0.4), inset 0 0 12px hsl(265 85% 65% / 0.15)`,
          border: '1px solid hsl(265 85% 65% / 0.35)',
        }}
      />
      <span className="text-foreground/70 group-hover:text-primary transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5 relative z-10">{icon}</span>
      <span className="text-sm text-foreground/60 group-hover:text-foreground whitespace-nowrap transition-colors duration-300 relative z-10">{name}</span>
    </motion.div>
  );
};

/* ── Staggered text reveal line ── */
const RevealLine = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "110%", rotateX: -30 }}
      animate={{ y: "0%", rotateX: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Ambient grid lines */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: `
          linear-gradient(hsl(265 85% 65% / 0.03) 1px, transparent 1px),
          linear-gradient(90deg, hsl(265 85% 65% / 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Floating morphing orb — right side */}
      <FloatingOrb />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >



          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] mb-8" style={{ perspective: "600px" }}>
            <RevealLine delay={0.3}>
              <span className="text-foreground">懂内容，更懂平台</span>
            </RevealLine>
            <RevealLine delay={0.5} className="mt-2">
              <span className="text-gradient-purple relative">
                AI驱动全域增长
                <motion.span
                  className="absolute inset-0 bg-clip-text text-transparent pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, transparent 25%, hsla(270,90%,80%,0.4) 37%, hsla(200,80%,70%,0.4) 50%, transparent 62%)",
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
            <motion.a
              href="#solutions"
              className="relative px-8 py-3.5 rounded-full bg-gradient-purple text-primary-foreground text-sm font-medium overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(265 85% 65% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">了解更多</span>
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 20%, hsla(200,80%,80%,0.3) 40%, hsla(320,80%,70%,0.2) 60%, transparent 80%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            </motion.a>
            <motion.a
              href="#pricing"
              className="px-8 py-3.5 rounded-full border border-border text-sm text-foreground font-medium iridescent-border"
              whileHover={{ scale: 1.05, backgroundColor: "hsl(240 4% 10%)" }}
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
            <p className="text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase mb-4">
              覆盖全球主流内容平台
            </p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex animate-marquee gap-8 w-max">
                {doubledPlatforms.map((p, i) => (
                  <PlatformBadge key={`${p.name}-${i}`} icon={p.icon} name={p.name} index={i} />
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
