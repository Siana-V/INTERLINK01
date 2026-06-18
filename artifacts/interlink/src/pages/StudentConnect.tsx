import { useTranslation } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { useProfessionals } from "@/hooks/use-interlink";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Link } from "wouter";

export function StudentConnect() {
  const { t } = useTranslation();

  const { data: professionals = [], isLoading } = useProfessionals();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All Domains");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [regionFilter, setRegionFilter] = useState("");

  const domains = Array.from(new Set(professionals.map(p => p.domain)));
  const regions = Array.from(new Set(professionals.map(p => p.region)));

  const filteredProfessionals = professionals.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain !== t("connect_all_domains", "All Domains") ? p.domain === selectedDomain : true;
    const matchesRegion = regionFilter ? p.region === regionFilter : true;
    return matchesSearch && matchesDomain && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/student#professionals" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          {t("prof_back", "Back to Home")}
        </Link>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Connect with <span className="text-gradient-primary">Professionals</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("connect_subtitle", "Find your next mentor, ask for a portfolio review, or just get advice about the industry.")}</p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-12 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder={t("connect_search", "Search by name or company...")} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
            <select 
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-4 py-3 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer"
          >
            <option value={t("connect_all_domains", "All Domains")}>All Domains</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
          
          <select 
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer"
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-3xl p-6 border border-border animate-pulse h-64"></div>
            ))}
          </div>
        ) : filteredProfessionals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfessionals.map((prof) => (
              <ProfessionalCard key={prof.id} professional={prof} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("connect_no_results", "No professionals found")}</h3>
            <p className="text-muted-foreground">{t("connect_no_results_desc", "Try adjusting your filters to find more people.")}</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedDomain(t("connect_all_domains", "All Domains")); setRegionFilter(""); }}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              {t("connect_clear", "Clear Filters")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
