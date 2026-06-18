import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Send, CheckCircle2 } from "lucide-react";

export function StudentContact() {
  const { t } = useTranslation();

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative flex items-center">
      <FloatingBlobs />
      
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Get in <span className="text-gradient">Touch</span></h1>
          <p className="text-lg text-muted-foreground">Have questions about InterLink? Send us a message.</p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-2">{t("contact_success_title", "Message Sent!")}</h2>
              <p className="text-muted-foreground text-lg">{t("contact_success_desc", "We'll get back to you as soon as possible.")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">{t("contact_name", "Your Name")}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">{t("contact_email", "Email Address")}</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">{t("contact_message", "Message")}</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? t("loading", "Sending...") : t("contact_send", "Send Message")}
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
