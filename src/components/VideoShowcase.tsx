import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

const allVideos = categories.flatMap((cat, catIdx) =>
  cat.videos.map((src) => ({ src, category: cat.label, catIdx }))
);

const VideoCard = ({ src, index, className = "" }: { src: string; index: number; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative cursor-pointer overflow-hidden ${className}`}
      onClick={toggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full" style={{ aspectRatio: "9 / 16" }}>
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              mouseX,
              [-0.5, 0, 0.5],
              [
                "linear-gradient(115deg, hsla(270,80%,70%,0.08) 0%, transparent 50%)",
                "linear-gradient(115deg, transparent 0%, transparent 100%)",
                "linear-gradient(245deg, hsla(200,80%,70%,0.08) 0%, transparent 50%)",
              ]
            ),
          }}
        />

        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: playing
              ? "linear-gradient(to top, hsl(240 5% 3% / 0.5) 0%, transparent 30%)"
              : "linear-gradient(to top, hsl(240 5% 3% / 0.7) 0%, hsl(240 5% 3% / 0.2) 40%, transparent 100%)",
          }}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-foreground/5 backdrop-blur-xl flex items-center justify-center border border-foreground/10">
            {playing ? (
              <Pause className="w-4 h-4 md:w-3.5 md:h-3.5 text-foreground/80" />
            ) : (
              <Play className="w-4 h-4 md:w-3.5 md:h-3.5 text-foreground/80 ml-0.5" />
            )}
          </div>
        </div>

        {playing && (
          <div className="absolute bottom-3 right-3 md:bottom-2 md:right-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1"
            >
              <Volume2 className="w-3 h-3 md:w-2.5 md:h-2.5 text-foreground/40" />
              <div className="flex items-end gap-[1.5px] h-3 md:h-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[1.5px] bg-primary/50 rounded-full"
                    animate={{ height: ["3px", "10px", "5px", "8px", "3px"] }}
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

const MobileVideoShowcase = () => {
  const [active, setActive] = useState(0);
  const total = allVideos.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const current = allVideos[active];

  return (
    <section className="py-8">
      <div className="px-4">
        {/* Category label */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-primary/60 font-mono tracking-widest">
              {String(current.catIdx + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-foreground/60 tracking-wide">{current.category}</span>
          </div>
          <span className="text-[10px] text-foreground/30 font-mono">
            {active + 1} / {total}
          </span>
        </div>

        {/* Video card - full width, one per screen */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ height: "calc(100svh - 200px)", maxHeight: "600px", minHeight: "400px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <VideoCard src={current.src} index={0} className="h-full rounded-2xl" />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center border border-foreground/10"
          >
            <ChevronLeft className="w-4 h-4 text-foreground/70" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center border border-foreground/10"
          >
            <ChevronRight className="w-4 h-4 text-foreground/70" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {allVideos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-5 h-1.5 bg-primary/70"
                  : "w-1.5 h-1.5 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoShowcase = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileVideoShowcase />;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-0">
          {categories.map((cat, catIdx) => (
            <div key={cat.label}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="flex items-center gap-2 px-3 py-2"
              >
                <span className="text-[10px] text-primary/60 font-mono tracking-widest">
                  {String(catIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-foreground/60 tracking-wide">{cat.label}</span>
              </motion.div>
              <div className="flex flex-col gap-0">
                {cat.videos.map((src, i) => (
                  <VideoCard key={src} src={src} index={catIdx * 3 + i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
