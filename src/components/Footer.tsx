import clipoLogo from "@/assets/clipo-logo.webp";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <a href="https://clipo.cc" className="inline-block mb-4">
              <img src={clipoLogo} alt="Clipo" className="h-6 opacity-70" />
            </a>
            <p className="text-xs text-muted-foreground">
              clipo.support@tezign.com
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mb-3">链接</p>
              <div className="flex flex-col gap-2">
                <a href="#solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors">解决方案</a>
                <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">报价</a>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mb-3">法律</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">用户协议</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">隐私条款</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/30 text-center">
          <p className="text-[10px] text-muted-foreground/60 tracking-wider">© 特赞（上海）信息科技有限公司</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
