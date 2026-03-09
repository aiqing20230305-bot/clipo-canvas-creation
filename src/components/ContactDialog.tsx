import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Mail } from "lucide-react";
import { useState, createContext, useContext, useCallback } from "react";

const EMAIL = "clipo.support@tezign.com";

type ContactContextType = {
  open: () => void;
};

const ContactContext = createContext<ContactContextType>({ open: () => {} });

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ContactContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Dialog */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
             <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="relative rounded-2xl border border-border/50 bg-card p-8 shadow-2xl overflow-hidden">
                {/* Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, hsl(265 85% 65% / 0.1), transparent 60%)",
                  }}
                />

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    联系我们
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    发送邮件至以下地址，我们会在24小时内回复
                  </p>

                  {/* Email display + copy */}
                  <div className="flex items-center gap-2 bg-secondary/50 rounded-xl p-3 border border-border/30 mb-6">
                    <span className="flex-1 text-sm font-mono text-foreground tracking-wide">
                      {EMAIL}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          复制
                        </>
                      )}
                    </button>
                  </div>

                  {/* Alternative: open mail client */}
                  <a
                    href={`mailto:${EMAIL}?subject=Clipo%20体验申请&body=您好，我希望了解并体验Clipo的AI视频内容服务，请与我联系。`}
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    或直接打开邮件客户端
                  </a>
                </div>
              </div>
             </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  );
};
