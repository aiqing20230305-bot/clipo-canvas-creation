import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

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
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border/50"
      style={{ aspectRatio: "9 / 16" }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
      />
      <div
        className={`absolute inset-0 bg-background/30 flex items-center justify-center transition-opacity duration-500 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center border border-foreground/10">
          {playing ? (
            <Pause className="w-5 h-5 text-foreground" />
          ) : (
            <Play className="w-5 h-5 text-foreground ml-0.5" />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
        <p className="text-xs font-medium text-foreground/80">{title}</p>
      </div>
    </motion.div>
  );
};

const VideoShowcase = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4">Showcase</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            作品展示
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {videos.map((v, i) => (
            <VideoCard key={v.src} src={v.src} title={v.title} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
