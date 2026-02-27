const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              联系我们：clipo.support@tezign.com
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">快速链接</p>
              <div className="flex flex-col gap-1">
                <a href="#solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">解决方案</a>
                <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">报价</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">法律信息</p>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">用户协议</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">隐私条款</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">© 特赞（上海）信息科技有限公司</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
