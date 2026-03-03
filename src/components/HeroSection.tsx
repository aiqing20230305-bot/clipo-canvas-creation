import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { DouyinIcon, KuaishouIcon, XiaohongshuIcon, ShipinHaoIcon, BilibiliIcon, TikTokIcon, InstagramIcon, YouTubeIcon, FacebookIcon, XTwitterIcon } from "./PlatformIcons";
import { ReactNode, useRef, useState, useCallback, useEffect } from "react";
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

/* Constellation positions for artistic scatter layout */
const constellationPositions = [
  { x: "0%", y: "0%", scale: 1, delay: 0 },
  { x: "22%", y: "-12%", scale: 0.9, delay: 0.06 },
  { x: "48%", y: "5%", scale: 1.05, delay: 0.12 },
  { x: "70%", y: "-8%", scale: 0.85, delay: 0.18 },
  { x: "88%", y: "10%", scale: 0.95, delay: 0.24 },
  { x: "5%", y: "55%", scale: 0.88, delay: 0.3 },
  { x: "28%", y: "48%", scale: 1.1, delay: 0.36 },
  { x: "52%", y: "58%", scale: 0.92, delay: 0.42 },
  { x: "75%", y: "45%", scale: 1, delay: 0.48 },
  { x: "95%", y: "55%", scale: 0.87, delay: 0.54 },
];




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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0.8);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration) {
        const progress = video.currentTime / video.duration;
        setVideoOpacity(0.8 - progress * 0.5); // 0.8 → 0.3
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: videoOpacity }}
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
              <span className="text-foreground">通往新世界</span>
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
            深耕<span className="text-foreground">内容生产 × 运营策略 × 平台规则</span>，
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

          {/* Platform constellation */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <p className="text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase mb-6">
              覆盖全球主流内容平台
            </p>
            <div className="relative h-[120px] w-full max-w-2xl">
              {platforms.map((p, i) => {
                const pos = constellationPositions[i];
                return (
                  <motion.div
                    key={p.name}
                    className="absolute"
                    style={{ left: pos.x, top: pos.y }}
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: pos.scale, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.8,
                      delay: 1.4 + pos.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/40 backdrop-blur-sm cursor-default group"
                      whileHover={{
                        scale: 1.15,
                        borderColor: "hsl(265 85% 65% / 0.5)",
                        boxShadow: "0 0 20px hsl(265 85% 65% / 0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      animate={{
                        y: [0, i % 2 === 0 ? -4 : 4, 0],
                      }}
                      // @ts-ignore
                      transition={{
                        y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                        scale: { type: "spring", stiffness: 400, damping: 17 },
                      }}
                    >
                      <span className="text-foreground/60 group-hover:text-primary transition-colors duration-300 [&>svg]:w-4 [&>svg]:h-4">
                        {p.icon}
                      </span>
                      <span className="text-xs text-foreground/50 group-hover:text-foreground whitespace-nowrap transition-colors duration-300">
                        {p.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Connecting lines between some nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
                <motion.line x1="8%" y1="15%" x2="25%" y2="8%" stroke="hsl(265 85% 65%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2 }} />
                <motion.line x1="25%" y1="8%" x2="52%" y2="20%" stroke="hsl(265 85% 65%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.2 }} />
                <motion.line x1="52%" y1="20%" x2="73%" y2="10%" stroke="hsl(265 85% 65%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.4 }} />
                <motion.line x1="10%" y1="70%" x2="32%" y2="62%" stroke="hsl(185 90% 50%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.6 }} />
                <motion.line x1="32%" y1="62%" x2="56%" y2="72%" stroke="hsl(185 90% 50%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.8 }} />
              </svg>
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
