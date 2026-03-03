import clipoLogo from "@/assets/clipo-logo.webp";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-accent/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <a href="https://clipo.cc" className="inline-block mb-4">
              <img src={clipoLogo} alt="Clipo" className="h-6 opacity-70" />
            </a>
            <p className="font-mono-cyber text-xs text-accent/40">
              clipo.support@tezign.com
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="font-mono-cyber text-[10px] text-accent/40 tracking-[0.2em] uppercase mb-3">// LINKS</p>
              <div className="flex flex-col gap-2">
                <a href="#solutions" className="text-xs text-muted-foreground hover:text-accent transition-colors">解决方案</a>
                <a href="#pricing" className="text-xs text-muted-foreground hover:text-accent transition-colors">报价</a>
              </div>
            </div>
            <div>
              <p className="font-mono-cyber text-[10px] text-accent/40 tracking-[0.2em] uppercase mb-3">// LEGAL</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">用户协议</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">隐私条款</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-accent/5 text-center">
          <p className="font-mono-cyber text-[10px] text-muted-foreground/40 tracking-[0.15em]">
            © 特赞（上海）信息科技有限公司 — SYS.v2.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
