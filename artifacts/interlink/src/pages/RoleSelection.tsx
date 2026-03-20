import { Link, useLocation } from "wouter";
import { useRole } from "@/hooks/use-interlink";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function RoleSelection() {
  const { setRole } = useRole();
  const [, setLocation] = useLocation();

  const selectRole = (role: "student" | "industry") => {
    setRole(role);
    setLocation(role === "student" ? "/student" : "/industry");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50">
      <FloatingBlobs />
      
      <div className="relative z-10 w-full max-w-5xl px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-display tracking-tight text-foreground mb-6"
          >
            Welcome to Inter<span className="text-gradient">Link</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Bridge the gap between campus and career. Choose your path to get started.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="glass-panel rounded-3xl p-8 cursor-pointer group"
            onClick={() => selectRole("student")}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500">
              <GraduationCap className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4 font-display">I'm a Student</h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Find mentors, ask questions, read industry insights, and prepare for your first big role in tech, finance, or design.
            </p>
            <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
              Join as Student <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </motion.div>

          {/* Industry Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="glass-panel rounded-3xl p-8 cursor-pointer group"
            onClick={() => selectRole("industry")}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-8 group-hover:bg-secondary transition-colors duration-500">
              <Briefcase className="w-10 h-10 text-secondary group-hover:text-white transition-colors duration-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4 font-display">I'm a Professional</h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Share your knowledge, build your personal brand, and guide the next generation of talent joining your industry.
            </p>
            <div className="flex items-center text-secondary font-bold group-hover:translate-x-2 transition-transform">
              Join as Professional <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
