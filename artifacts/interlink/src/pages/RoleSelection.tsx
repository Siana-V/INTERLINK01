import { Link, useLocation } from "wouter";
import { useRole } from "@/hooks/use-interlink";
import { GraduationCap, Briefcase, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const floatingItems = [
  { emoji: "💻", endX: "35vw", endY: "-40vh", duration: 18, offset: 5 },
  { emoji: "📓", endX: "-45vw", endY: "-30vh", duration: 22, offset: 15 },
  { emoji: "📚", endX: "25vw", endY: "45vh", duration: 20, offset: 8 },
  { emoji: "📱", endX: "-35vw", endY: "35vh", duration: 25, offset: 18 },
  { emoji: "🖊️", endX: "45vw", endY: "-15vh", duration: 16, offset: 3 },
  { emoji: "✏️", endX: "-40vw", endY: "15vh", duration: 19, offset: 11 },
  { emoji: "🎓", endX: "15vw", endY: "-50vh", duration: 24, offset: 20 },
  { emoji: "☕", endX: "-20vw", endY: "50vh", duration: 21, offset: 6 },
  { emoji: "📄", endX: "50vw", endY: "25vh", duration: 23, offset: 14 },
  { emoji: "💬", endX: "-25vw", endY: "-55vh", duration: 17, offset: 9 },
];

function FloatingBackground() {
  return (
    <>
      {/* Anchor container centered in viewport for outward zoom effect */}
      <div className="absolute inset-0 z-0 pointer-events-none perspective-[1000px] flex items-center justify-center overflow-hidden">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-80 mix-blend-normal"
            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
            animate={{
              scale: [0.1, 1.5, 3.5],
              opacity: [0, 1, 0],
              x: [0, item.endX],
              y: [0, item.endY],
              rotateZ: [0, i % 2 === 0 ? 60 : -60],
              rotateX: [0, i % 3 === 0 ? 80 : -45],
              rotateY: [0, i % 2 !== 0 ? 75 : -55],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeIn",
              delay: -item.offset, // Negative delay fast-forwards the animation so they appear instantly!
            }}
          >
            {/* Using native Emojis for real 3D elements */}
            <span className="text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(3rem,5vw,5rem)] drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] block leading-none saturate-150">
              {item.emoji}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export function RoleSelection() {
  const { setRole } = useRole();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  const selectRole = (role: "student" | "industry") => {
    if (role === "industry") {
      setLocation("/industry/login");
    } else {
      setRole("student");
      setLocation("/student");
    }
    // Guarantee scroll is pushed to top after routing render cycle
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  return (
    <div className="bg-[#d7cede] min-h-screen relative font-display overflow-x-hidden selection:bg-[#342042] selection:text-white flex flex-col md:flex-row">
      
      {/* Background blobs & Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden perspective-[1000px]">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/40 blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#342042]/5 blur-[120px]" />
         <FloatingBackground />
      </div>

      {/* LAYER 1: FIXED BACKGROUND TEXT */}
      <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center w-full pt-16 md:pt-0 overflow-hidden">
         
         <div className="flex w-full items-baseline justify-center">
            
            {/* Left Side: WELCOME TO + INTER (Spans left 50% of screen) */}
            <div className="w-1/2 flex justify-end relative">
               <div className="relative">
                  <h2 className="absolute bottom-[90%] left-[1.5vw] text-black font-black text-[clamp(1.2rem,3vw,2.5rem)] tracking-[0.2em] whitespace-nowrap uppercase drop-shadow-sm mb-0">
                    Welcome To
                  </h2>
                  <h1 className="text-[13vw] sm:text-[14.5vw] md:text-[14.2vw] leading-[0.8] font-black text-white tracking-tighter drop-shadow-md select-none mix-blend-overlay whitespace-nowrap">
                    INTER
                  </h1>
               </div>
            </div>

            {/* Right Side: LINK (Spans right 50% of screen) */}
            <div className="w-1/2 flex justify-start">
               <h1 className="text-[13vw] sm:text-[14.5vw] md:text-[14.2vw] leading-[0.8] font-black text-white tracking-tighter drop-shadow-md select-none mix-blend-overlay whitespace-nowrap md:-ml-[0.2vw]">
                 LINK
               </h1>
            </div>

         </div>

      </div>

      {/* LAYER 2: SCROLLABLE CONTENT */}
      {/* 
        This container is positioned in normal document flow. 
        Only the Logo and the Cards live here, so ONLY they will move when the user scrolls!
        The left side is left empty so INTER stays perfectly visible.
      */}
      <div className="w-full flex flex-col md:flex-row relative z-20 min-h-screen pointer-events-none max-w-[1400px] mx-auto">
         
         {/* LEFT COLUMN: Empty Space reserved for 'INTER' */}
         <div className="hidden md:block w-1/2 min-h-screen"></div>

         {/* RIGHT COLUMN: Scrolls UP over 'LINK' */}
         <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-6 md:pr-16 md:pl-4 pointer-events-auto pb-32">
            
            {/* 1. The Logo */}
            {/* 
              Positioned at exactly 70vh from the top so it is "half visible" immediately on load.
              It sits right below the visual space that LINK occupies in the fixed layer behind it.
            */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="mt-[70vh] w-full max-w-xl h-[55vh] bg-[#342042] rounded-[3rem] shadow-2xl flex items-center justify-center border-[12px] border-[#d7cede] mb-16 md:mb-24 z-20"
            >
               <span className="text-white text-8xl md:text-[12rem] font-bold tracking-tighter drop-shadow-xl mix-blend-screen opacity-90">IL</span>
            </motion.div>

            {/* 2. Student Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="w-full max-w-xl bg-white/90 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-12 cursor-pointer group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-2 border-white/50 backdrop-saturate-200 mb-12"
              onClick={() => selectRole("student")}
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-[#342042]/5 flex items-center justify-center mb-8 border border-[#342042]/10 group-hover:bg-[#342042] transition-colors duration-500 shadow-inner">
                <GraduationCap className="w-10 h-10 text-[#342042] group-hover:text-white transition-colors duration-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#342042] tracking-tight">{t("role_student")}</h2>
              <p className="text-[#342042]/70 mb-8 text-lg md:text-xl leading-relaxed font-medium">
                {t("role_student_desc")}
              </p>
              <div className="flex items-center text-[#342042] font-bold text-xl group-hover:translate-x-2 transition-transform">
                {t("role_join_student")} <ArrowRight className="ml-3 w-6 h-6" />
              </div>
            </motion.div>

            {/* 3. Professional Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="w-full max-w-xl bg-white/90 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-12 cursor-pointer group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-2 border-white/50 backdrop-saturate-200"
              onClick={() => selectRole("industry")}
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-[#342042]/5 flex items-center justify-center mb-8 border border-[#342042]/10 group-hover:bg-[#342042] transition-colors duration-500 shadow-inner">
                <Briefcase className="w-10 h-10 text-[#342042] group-hover:text-white transition-colors duration-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#342042] tracking-tight">{t("role_professional")}</h2>
              <p className="text-[#342042]/70 mb-8 text-lg md:text-xl leading-relaxed font-medium">
                {t("role_professional_desc")}
              </p>
              <div className="flex items-center text-[#342042] font-bold text-xl group-hover:translate-x-2 transition-transform">
                {t("role_join_professional")} <ArrowRight className="ml-3 w-6 h-6" />
              </div>
            </motion.div>

         </div>
      </div>

    </div>
  );
}
