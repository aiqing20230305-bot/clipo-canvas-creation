import clipoLogo from "@/assets/clipo-logo.webp";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="https://clipo.cc" className="flex items-center gap-2">
          <img src={clipoLogo} alt="Clipo" className="h-7" />
        </a>
        <div className="flex items-center gap-6">
          <a href="#solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            解决方案
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            报价
          </a>
          <a
            href="https://asset.clipo.cc/video-agent/signup"
            className="px-5 py-2 rounded-full bg-gradient-purple text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            立即体验
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
