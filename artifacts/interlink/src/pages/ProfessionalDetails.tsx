import { useTranslation } from "@/lib/i18n";
import { useRoute } from "wouter";
import { useEffect } from "react";
import { useProfessional, usePosts } from "@/hooks/use-interlink";
import { PostCard } from "@/components/cards/PostCard";
import {
  ArrowLeft, Star, Heart, MessageSquare,
  Briefcase, GraduationCap, MapPin,
  Linkedin, Twitter, Globe, Mail, Clock, MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export function ProfessionalDetails() {
  const { t } = useTranslation();

  const [, params] = useRoute("/student/professional/:id");
  const id = params?.id || "";

  const { data: professional, isLoading } = useProfessional(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: allPosts = [] } = usePosts();

  const professionalPosts = allPosts.filter(p => p.professionalId === id);

  if (isLoading) {
    return <div className="min-h-screen pt-32 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (!professional) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold">{t("loading")}</h1>
        <Link href="/student/connect" className="text-primary mt-4 inline-block">{t("prof_back", "Back to Home")}</Link>
      </div>
    );
  }

  const handleWhatsApp = () => {
    // Remove non-numeric characters for the link, keep the + 
    const phone = professional.whatsapp.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${phone}?text=Hi ${professional.name}, I found your profile on InterLink and would love to connect!`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24">
      {/* Cover Banner */}
      <div className="h-64 md:h-80 w-full bg-gradient-to-r from-primary via-accent to-secondary relative">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32">
        <Link href="/student#professionals" className="inline-flex items-center text-white/80 hover:text-white font-medium mb-6 transition-colors drop-shadow-md group">
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" /> {t("prof_back", "Back to Home")}
        </Link>
        
        {/* Main Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-6 md:p-10 shadow-xl border border-border mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-card shadow-lg overflow-hidden bg-muted flex-shrink-0 relative -mt-16 md:-mt-20">
              {professional.avatar ? (
                <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-primary/10 text-primary">
                  {professional.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground">{professional.name}</h1>
                  <p className="text-xl text-primary font-medium mt-1">{t(`dom_${professional.domain.toLowerCase().replace(/ /g, '_')}` as any, professional.domain)}</p>
                </div>
                
                <button 
                  onClick={handleWhatsApp}
                  className="w-full md:w-auto px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <MessageCircle className="w-6 h-6" />
                  {t("prof_whatsapp", "WhatsApp Me")}
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span><strong className="text-foreground">{professional.company}</strong> • {professional.experience.replace("years", t("exp_years")).replace("year", t("exp_year"))} {t("exp_label", "Experience")}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{professional.address}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>{t("prof_timings", "Active hours")}: {professional.timings}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <span>{professional.name.toLowerCase().replace(' ', '.')}@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Posts Section */}
        <div>
          <h2 className="text-3xl font-bold font-display mb-8">{t("prof_related_posts", "Posts by")} {professional.name.split(' ')[0]}</h2>
          
          {professionalPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {professionalPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground text-lg">{t("prof_no_posts", "This professional hasn't published any posts yet.")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
