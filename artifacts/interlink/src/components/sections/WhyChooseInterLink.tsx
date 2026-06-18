import { useTranslation } from "@/lib/i18n";
import { LaptopMockup } from "@/components/ui/LaptopMockup";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const features = [
  {
    title: "1-on-1 Mentorship",
    image: "/images/mentorship.png",
  },
  {
    title: "Industry Insights",
    image: "/images/insights.png",
  },
  {
    title: "Networking Events",
    image: "/images/events.png",
  },
  {
    title: "Career Growth",
    image: "/images/career.png",
  },
  {
    title: "Portfolio Reviews",
    image: "/images/portfolio.png",
  },
  {
    title: "Skill Verification",
    image: "/images/skills.png",
  },
];

export function WhyChooseInterLink() {
  const { t } = useTranslation();

  const [radius, setRadius] = useState(450);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(250);
      } else if (window.innerWidth < 1024) {
        setRadius(350);
      } else {
        setRadius(450);
      }
    };
    
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <section className="py-24 overflow-hidden relative bg-slate-50/50">
      <style>{`
        @keyframes orbitY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        .carousel-3d-container {
          perspective: 1500px;
        }
        .carousel-3d-spinner {
          transform-style: preserve-3d;
          animation: orbitY 40s linear infinite;
        }
        .carousel-3d-spinner:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 mb-4 md:mb-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-display tracking-tight text-foreground mb-4"
        >
          {t("why_title").includes("InterLink") ? <>{t("why_title").replace("InterLink", "")} Inter<span className="text-gradient">Link</span>?</> : t("why_title")}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {t("why_subtitle")}
        </motion.p>
      </div>

      <div className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center carousel-3d-container py-10 mt-0 md:mt-2">
        <div className="relative w-[280px] sm:w-[320px] md:w-[400px] h-[300px] carousel-3d-spinner">
          {features.map((feature, idx) => {
            const angle = (360 / features.length) * idx;
            return (
              <div 
                key={idx}
                className="absolute top-0 left-0 w-full flex justify-center"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                }}
              >
                <LaptopMockup 
                  title={feature.title} 
                  imageSrc={feature.image} 
                  altText={feature.title} 
                  showLabelBelow
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
