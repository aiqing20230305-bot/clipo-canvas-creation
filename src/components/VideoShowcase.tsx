import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const videos = [
  { src: "/videos/lishi.mp4", title: "力士 · 品牌混剪" },
  { src: "/videos/qc-showcase.mp4", title: "品牌 · 创意混剪" },
  { src: "/videos/march4-showcase.mp4", title: "创意 · 混剪作品" },
  { src: "/videos/03-1.mp4", title: "品牌 · 视觉混剪" },
  { src: "/videos/march4-v2.mp4", title: "创意 · 风格混剪" },
  { src: "/videos/march4-v3.mp4", title: "品牌 · 精选混剪" },
  { src: "/videos/march4-v4.mp4", title: "创意 · 动感混剪" },
  { src: "/videos/march4-v5.mp4", title: "品牌 · 质感混剪" },
  { src: "/videos/march4-v6.mp4", title: "创意 · 灵感混剪" },
];

const VideoCard = ({ src, title, index }: { src: string; title: string; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer"
      style={{ aspectRatio: "9 / 16" }}
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-px rounded-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: "conic-gradient(from 180deg, hsl(280 90% 72% / 0.2), hsl(200 80% 65% / 0.15), hsl(320 70% 60% / 0.2), hsl(280 90% 72% / 0.2))",
          filter: "blur(1px)",
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden h-full bg-card border border-border/30">
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loop
          playsInline
          preload="metadata"
        />

        {/* Dark gradient overlay — always visible, adjusts on play */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: playing
              ? "linear-gradient(to top, hsl(240 5% 3% / 0.6) 0%, transparent 40%)"
              : "linear-gradient(to top, hsl(240 5% 3% / 0.8) 0%, hsl(240 5% 3% / 0.3) 50%, hsl(240 5% 3% / 0.15) 100%)",
          }}
        />

        {/* Center play/pause */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-foreground/5 backdrop-blur-xl flex items-center justify-center border border-foreground/10 shadow-2xl"
          >
            {playing ? (
              <Pause className="w-5 h-5 text-foreground/90" />
            ) : (
              <Play className="w-5 h-5 text-foreground/90 ml-0.5" />
            )}
          </motion.div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] text-foreground/90 font-medium tracking-wide">{title}</p>
            </div>
            {playing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3 text-foreground/50" />
                {/* Audio bars animation */}
                <div className="flex items-end gap-[2px] h-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] bg-primary/60 rounded-full"
                      animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Top index number */}
        <div className="absolute top-4 left-5">
          <span className="font-display text-[10px] text-foreground/20 tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const VideoShowcase = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Showcase</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              作品展示
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            AI驱动的纯混剪作品，点击播放查看效果
          </p>
        </motion.div>

        {/* Masonry-like staggered grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {videos.map((v, i) => (
            <div
              key={v.src}
              className={i % 3 === 1 ? "md:mt-8" : i % 3 === 2 ? "md:mt-16" : ""}
            >
              <VideoCard src={v.src} title={v.title} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
