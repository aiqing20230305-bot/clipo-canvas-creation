import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const categories = [
  {
    label: "素材混剪",
    videos: [
      "/videos/lishi.mp4",
      "/videos/qc-showcase.mp4",
      "/videos/march4-showcase.mp4",
    ],
  },
  {
    label: "AI前贴+数字人混剪",
    videos: [
      "/videos/03-1.mp4",
      "/videos/march4-v2.mp4",
      "/videos/march4-v3.mp4",
    ],
  },
  {
    label: "AIGC视频",
    videos: [
      "/videos/march4-v4.mp4",
      "/videos/march4-v5.mp4",
      "/videos/march4-v6.mp4",
    ],
  },
];

const VideoCard = ({ src, index }: { src: string; index: number }) => {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
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

      <div className="relative rounded-2xl overflow-hidden h-full bg-card border border-border/30">
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loop
          playsInline
          preload="metadata"
        />

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: playing
              ? "linear-gradient(to top, hsl(240 5% 3% / 0.6) 0%, transparent 40%)"
              : "linear-gradient(to top, hsl(240 5% 3% / 0.8) 0%, hsl(240 5% 3% / 0.3) 50%, hsl(240 5% 3% / 0.15) 100%)",
          }}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-foreground/5 backdrop-blur-xl flex items-center justify-center border border-foreground/10 shadow-2xl"
          >
            {playing ? (
              <Pause className="w-4 h-4 text-foreground/90" />
            ) : (
              <Play className="w-4 h-4 text-foreground/90 ml-0.5" />
            )}
          </motion.div>
        </div>

        {/* Bottom audio indicator */}
        {playing && (
          <div className="absolute bottom-3 right-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1"
            >
              <Volume2 className="w-3 h-3 text-foreground/50" />
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
          </div>
        )}
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
            AI驱动的内容作品，点击播放查看效果
          </p>
        </motion.div>

        {/* Horizontal row: 3 categories side by side */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category label */}
              <div className="mb-4 flex items-center gap-3">
                <span className="font-display text-xs text-primary tracking-widest uppercase font-medium">
                  {String(catIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              {/* Videos stack */}
              <div className="space-y-3">
                {cat.videos.map((src, i) => (
                  <VideoCard key={src} src={src} index={catIdx * 3 + i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
