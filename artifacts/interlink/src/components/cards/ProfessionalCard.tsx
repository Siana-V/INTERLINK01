import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";
import { MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";
import type { Professional } from "@/hooks/use-interlink";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ProfessionalCard({ professional, featured = false }: { professional: Professional, featured?: boolean }) {
  const { t } = useTranslation();

  return (
    <div className={cn(
      "group bg-card hover:bg-primary/[0.03] rounded-3xl p-6 border border-border hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full flex flex-col",
      featured && "p-8 md:p-12 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-md"
    )}>
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110",
        featured && "w-64 h-64 bg-primary/10"
      )}></div>
      
      <div className="flex items-start gap-4 mb-6">
        <div className={cn(
          "w-16 h-16 rounded-2xl overflow-hidden bg-muted border-2 border-background shadow-sm flex-shrink-0",
          featured && "w-24 h-24 rounded-3xl border-4"
        )}>
          {professional.avatar ? (
            <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-primary/10 text-primary">
              {professional.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className={cn("text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors", featured && "text-3xl mb-1")}>{professional.name}</h3>
          <p className={cn("text-sm text-muted-foreground font-medium", featured && "text-lg")}>{t(`dom_${professional.domain.toLowerCase().replace(/ /g, '_')}` as any, professional.domain)}</p>
          <div className={cn("flex items-center gap-1 mt-1 text-xs text-secondary font-medium", featured && "text-sm mt-2")}>
            <MapPin className={cn("w-3 h-3", featured && "w-4 h-4")} />
            {t(`reg_${professional.region.toLowerCase().replace(/ /g, '_')}` as any, professional.region)}
          </div>
        </div>
      </div>

      <div className={cn("space-y-3 mb-6 flex-grow", featured && "space-y-5 mb-10")}>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className={cn("w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0", featured && "w-10 h-10")}>
            <Briefcase className={cn("w-4 h-4", featured && "w-5 h-5")} />
          </div>
          <span className={cn("truncate", featured && "text-base")}>{professional.company} • {professional.experience.replace("years", t("exp_years")).replace("year", t("exp_year"))}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className={cn("w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0", featured && "w-10 h-10")}>
            <Clock className={cn("w-4 h-4", featured && "w-5 h-5")} />
          </div>
          <span className={cn("truncate", featured && "text-base")}>{professional.timings}</span>
        </div>
      </div>

      <Link 
        href={`/student/professional/${professional.id}`}
        className={cn(
          "w-full py-3 rounded-xl bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 cursor-pointer mt-auto",
          featured && "py-4 text-lg rounded-2xl"
        )}
      >
        {t("connect_now", "Connect Now")}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
