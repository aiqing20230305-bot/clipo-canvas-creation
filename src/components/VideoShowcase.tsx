import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const videos = [
  { src: "/videos/lishi.mp4", title: "力士 · 品牌混剪" },
  { src: "/videos/qc-showcase.mp4", title: "品牌 · 创意混剪" },
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
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: index * 0.15 }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden iridescent-border bg-card"
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-[9/16] object-cover"
        loop
        muted
        playsInline
        preload="metadata"
      />
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-background/40 flex items-center justify-center transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center glow-purple">
          {playing ? (
            <Pause className="w-7 h-7 text-primary-foreground" />
          ) : (
            <Play className="w-7 h-7 text-primary-foreground ml-1" />
          )}
        </div>
      </div>
      {/* Title bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
    </motion.div>
  );
};

const VideoShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            视频展示
          </h2>
          <p className="text-muted-foreground text-lg">AI 驱动的纯混剪作品，高效产出优质内容</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {videos.map((v, i) => (
            <VideoCard key={v.src} src={v.src} title={v.title} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
