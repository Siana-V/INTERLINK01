import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useRole } from "@/hooks/use-interlink";
import { Menu, X, LogOut, Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [location, setLocation] = useLocation();
  const { role, setRole } = useRole();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = role === "industry" 
    ? [
        { name: "Dashboard", path: "/industry" },
        { name: "Manage Posts", path: "/industry/posts" },
        { name: "My Profile", path: "/industry/profile" },
      ]
    : [
        { name: "Home", path: "/student" },
        { name: "Connect", path: "/student/connect" },
        { name: "Feed", path: "/student/posts" },
        { name: "Reviews", path: "/student/reviews" },
        { name: "Contact", path: "/student/contact" },
      ];

  const handleLogout = () => {
    setRole(null);
    setLocation("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0",
          isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href={role === "industry" ? "/industry" : (role === "student" ? "/student" : "/")} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              IL
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-foreground">
              Inter<span className="text-gradient">Link</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {role && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                    location === link.path ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="relative">
                <button 
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 transition-colors cursor-pointer text-sm font-semibold"
                >
                  {role === "industry" ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                  <span className="capitalize">{role}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {isRoleDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
                    >
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          )}

          {/* Mobile Toggle */}
          {role && (
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && role && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 pb-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-xl font-display">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block",
                    location === link.path ? "text-primary font-bold" : "text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-2xl mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {role === "industry" ? <Briefcase /> : <GraduationCap />}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Signed in as</p>
                  <p className="font-bold capitalize">{role}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full py-4 rounded-xl font-bold bg-destructive/10 text-destructive flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
