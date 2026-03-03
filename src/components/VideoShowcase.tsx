import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const categories = [
  {
    label: "素材混剪",
    tag: "REMIX",
    videos: ["/videos/lishi.mp4", "/videos/qc-showcase.mp4", "/videos/march4-showcase.mp4"],
  },
  {
    label: "AI前贴+数字人混剪",
    tag: "HUMAN_AI",
    videos: ["/videos/03-1.mp4", "/videos/march4-v2.mp4", "/videos/march4-v3.mp4"],
  },
  {
    label: "AIGC视频",
    tag: "FULL_GEN",
    videos: ["/videos/march4-v4.mp4", "/videos/march4-v5.mp4", "/videos/march4-v6.mp4"],
  },
];

const VideoCard = ({ src, index }: { src: string; index: number }) => {
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

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
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
      className="relative cursor-pointer overflow-hidden border border-accent/5 hover:border-accent/20 transition-colors duration-300"
      onClick={toggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        <video ref={videoRef} src={src} className="absolute inset-0 w-full h-full object-cover" loop playsInline preload="metadata" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(mouseX, [-0.5, 0, 0.5], [
              "linear-gradient(115deg, hsla(185,90%,50%,0.08) 0%, transparent 50%)",
              "linear-gradient(115deg, transparent 0%, transparent 100%)",
              "linear-gradient(245deg, hsla(330,85%,60%,0.08) 0%, transparent 50%)",
            ]),
          }}
        />

        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: playing
              ? "linear-gradient(to top, hsl(230 15% 4% / 0.5) 0%, transparent 30%)"
              : "linear-gradient(to top, hsl(230 15% 4% / 0.7) 0%, hsl(230 15% 4% / 0.2) 40%, transparent 100%)",
          }}
        />

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
          <div className="w-10 h-10 rounded-sm bg-foreground/5 backdrop-blur-xl flex items-center justify-center border border-accent/20">
            {playing ? <Pause className="w-3.5 h-3.5 text-foreground/80" /> : <Play className="w-3.5 h-3.5 text-foreground/80 ml-0.5" />}
          </div>
        </div>

        {playing && (
          <div className="absolute bottom-2 right-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
              <Volume2 className="w-2.5 h-2.5 text-accent/40" />
              <div className="flex items-end gap-[1.5px] h-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[1.5px] bg-accent/50 rounded-full"
                    animate={{ height: ["3px", "10px", "5px", "8px", "3px"] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
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
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-1">
          {categories.map((cat, catIdx) => (
            <div key={cat.label}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="flex items-center gap-2 px-3 py-2"
              >
                <span className="font-mono-cyber text-[10px] text-accent/50 tracking-widest">
                  {cat.tag}
                </span>
                <span className="text-[11px] text-foreground/60 tracking-wide">{cat.label}</span>
              </motion.div>

              <div className="flex flex-col gap-1">
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
