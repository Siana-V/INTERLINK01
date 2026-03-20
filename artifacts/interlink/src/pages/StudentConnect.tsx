import { useState } from "react";
import { useProfessionals } from "@/hooks/use-interlink";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { Search, Filter } from "lucide-react";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";

export function StudentConnect() {
  const { data: professionals = [], isLoading } = useProfessionals();
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const domains = Array.from(new Set(professionals.map(p => p.domain)));
  const regions = Array.from(new Set(professionals.map(p => p.region)));

  const filteredProfessionals = professionals.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter ? p.domain === domainFilter : true;
    const matchesRegion = regionFilter ? p.region === regionFilter : true;
    return matchesSearch && matchesDomain && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Connect with <span className="text-gradient-primary">Professionals</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Find your next mentor, ask for a portfolio review, or just get advice about the industry.</p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-12 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer"
            >
              <option value="">All Domains</option>
              {domains.map(d => <option key={d} value={d}>{d}</option>)}
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
            <h3 className="text-xl font-bold mb-2">No professionals found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to find more people.</p>
            <button 
              onClick={() => { setSearchTerm(""); setDomainFilter(""); setRegionFilter(""); }}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
