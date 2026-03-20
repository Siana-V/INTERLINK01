import { Link } from "wouter";
import { MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";
import type { Professional } from "@/hooks/use-interlink";

export function ProfessionalCard({ professional }: { professional: Professional }) {
  return (
    <div className="group bg-card rounded-3xl p-6 border border-border hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
      
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted border-2 border-background shadow-sm flex-shrink-0">
          {professional.avatar ? (
            <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-primary/10 text-primary">
              {professional.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{professional.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{professional.domain}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-secondary font-medium">
            <MapPin className="w-3 h-3" />
            {professional.region}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="truncate">{professional.company} • {professional.experience}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <span className="truncate">{professional.timings}</span>
        </div>
      </div>

      <Link 
        href={`/student/professional/${professional.id}`}
        className="w-full py-3 rounded-xl bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 cursor-pointer"
      >
        Connect Now
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
