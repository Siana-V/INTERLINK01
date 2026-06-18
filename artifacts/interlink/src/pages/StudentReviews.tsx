import { useTranslation } from "@/lib/i18n";
import { useEffect } from "react";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Star, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export function StudentReviews() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reviews = [
    { name: "Jessica T.", role: t("rev_jessica_role"), text: t("rev_jessica_text"), rating: 5 },
    { name: "Michael B.", role: t("rev_michael_role"), text: t("rev_michael_text"), rating: 5 },
    { name: "Aisha M.", role: t("rev_aisha_role"), text: t("rev_aisha_text"), rating: 4 },
    { name: "David L.", role: t("rev_david_role"), text: t("rev_david_text"), rating: 5 },
    { name: "Elena R.", role: t("rev_elena_role"), text: t("rev_elena_text"), rating: 5 },
    { name: "Sam K.", role: t("rev_sam_role"), text: t("rev_sam_text"), rating: 4 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/student#reviews" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group focus:outline-none">
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          {t("prof_back", "Back to Home")}
        </Link>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{t("rev_title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("rev_subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5" fill={j < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-foreground text-lg mb-8 leading-relaxed italic">"{review.text}"</p>
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-primary font-medium">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
