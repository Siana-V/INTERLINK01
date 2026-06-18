import { useTranslation } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { useCurrentUser, useUpdateProfile } from "@/hooks/use-interlink";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Save, User, Briefcase, MapPin, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function IndustryProfile() {
  const { t } = useTranslation();

  const { data: currentUser, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    domain: "",
    experience: "",
    address: "",
    timings: "",
    whatsapp: ""
  });
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        company: currentUser.company || "",
        domain: currentUser.domain || "",
        experience: currentUser.experience || "",
        address: currentUser.address || "",
        timings: currentUser.timings || "",
        whatsapp: currentUser.whatsapp || ""
      });
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Edit <span className="text-gradient">Profile</span></h1>
          <p className="text-lg text-muted-foreground">Manage your public information shown to students.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden"
        >
          <div className="h-32 bg-gradient-to-r from-primary/80 to-accent/80 relative">
            <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-2xl border-4 border-card bg-muted shadow-md flex items-center justify-center text-2xl font-bold text-foreground overflow-hidden">
               {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                currentUser?.name?.charAt(0) || "U"
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 pt-16 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="font-bold flex items-center gap-2 text-lg border-b border-border pb-2">
                  <User className="w-5 h-5 text-primary" /> Personal
                </h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">{t("ind_profile_name", "Full Name")}</label>
                  <input 
                    required type="text" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">{t("ind_profile_whatsapp", "WhatsApp Number")}</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      required type="text" 
                      value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Students will use this to connect with you.</p>
                </div>
              </div>

              {/* Professional Info */}
              <div className="space-y-6">
                <h3 className="font-bold flex items-center gap-2 text-lg border-b border-border pb-2">
                  <Briefcase className="w-5 h-5 text-accent" /> Professional
                </h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">{t("ind_profile_company", "Company")}</label>
                  <input 
                    required type="text" 
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">{t("ind_profile_domain", "Domain")}</label>
                    <input 
                      required type="text" 
                      value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground">{t("prof_experience", "Experience")}</label>
                    <input 
                      required type="text" 
                      value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g. 5 years"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Info */}
            <div className="space-y-6 pt-4 border-t border-border">
              <h3 className="font-bold flex items-center gap-2 text-lg border-b border-border pb-2">
                <MapPin className="w-5 h-5 text-orange-400" /> Availability & Location
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                     {t("ind_profile_address", "Office Address")}
                  </label>
                  <input 
                    required type="text" 
                    value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Available Timings
                  </label>
                  <input 
                    required type="text" 
                    value={formData.timings} onChange={e => setFormData({...formData, timings: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. Mon-Fri 9AM-5PM"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-between items-center">
              <div>
                {saved && <span className="text-green-500 font-bold animate-pulse">{t("ind_profile_saved", "Changes saved successfully!")}</span>}
              </div>
              <button 
                type="submit"
                disabled={updateProfile.isPending}
                className="px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70"
              >
                <Save className="w-5 h-5" />
                {updateProfile.isPending ? t("loading", "Saving...") : t("ind_profile_save", "Save Profile")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
