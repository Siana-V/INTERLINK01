import { Link } from "wouter";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { PostCard } from "@/components/cards/PostCard";
import { useProfessionals, usePosts } from "@/hooks/use-interlink";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, ChevronRight, Laptop, Users, MessageSquare } from "lucide-react";

export function StudentHome() {
  const { data: professionals = [] } = useProfessionals();
  const { data: posts = [] } = usePosts();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const reviews = [
    { name: "Jessica T.", role: "CS Intern", text: "Connected with a Senior Engineer who helped me prep for my FAANG interview. I got the offer!", rating: 5 },
    { name: "Michael B.", role: "Design Student", text: "The portfolio reviews from industry pros completely changed how I present my work.", rating: 5 },
    { name: "Aisha M.", role: "Data Science Grad", text: "Reading real-world posts from data scientists gave me direction when I felt lost.", rating: 4 },
    { name: "David L.", role: "Product Management", text: "Found a mentor here who meets with me monthly. Best career investment ever.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <FloatingBlobs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 backdrop-blur-sm">
                Empowering the Next Generation
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
                Connect with Professionals <br />
                <span className="text-gradient">Start Your Career</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Break into the industry with guidance from people who are already where you want to be. Read insights, ask questions, and build your network.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/student/connect" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                  Find a Mentor
                </Link>
                <Link href="/student/posts" className="px-8 py-4 rounded-full bg-card text-foreground font-bold text-lg border border-border hover:bg-muted transition-all duration-300 shadow-sm">
                  Read Insights
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              style={{ y }}
              className="relative hidden lg:block"
            >
              {/* hero illustration beautiful vibrant tech graphic */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-square glass-panel p-2">
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero-illustration.png`} 
                  alt="Career Growth" 
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    // Fallback to Unsplash if generation is slow/failed in sandbox
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop";
                  }}
                />
                
                {/* Floating UI elements over hero image */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-10 -left-10 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                    <Star className="w-6 h-6" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">New Connection!</p>
                    <p className="text-xs text-muted-foreground">Sarah accepted your request</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE INTERLINK (Laptop Carousel) */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">Why Choose InterLink</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to kickstart your professional journey.</p>
        </div>
        
        {/* We'll implement this as a smooth horizontal scrolling carousel of "laptops" */}
        <div className="w-full overflow-hidden py-10 relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <div className="flex w-[200%] animate-scroll">
            {/* First set */}
            <div className="flex w-1/2 justify-around px-10">
              {[
                { icon: Users, title: "Direct Access", desc: "Skip the cold emails. Connect directly with professionals who volunteered to help." },
                { icon: Laptop, title: "Real World Insights", desc: "Learn what they don't teach in class through exclusive industry posts." },
                { icon: MessageSquare, title: "Career Advice", desc: "Get portfolio reviews, interview prep, and career path guidance." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center mx-4 w-80">
                  <div className="w-full aspect-[4/3] bg-card rounded-t-xl border-t-8 border-x-8 border-slate-800 shadow-xl flex items-center justify-center p-6 mb-2 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-slate-800 rounded-t-md"></div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    </div>
                  </div>
                  <div className="w-[110%] h-4 bg-slate-300 rounded-b-xl shadow-md mb-6"></div>
                  <p className="text-center text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            {/* Duplicated set for infinite scroll */}
            <div className="flex w-1/2 justify-around px-10">
              {[
                { icon: Users, title: "Direct Access", desc: "Skip the cold emails. Connect directly with professionals who volunteered to help." },
                { icon: Laptop, title: "Real World Insights", desc: "Learn what they don't teach in class through exclusive industry posts." },
                { icon: MessageSquare, title: "Career Advice", desc: "Get portfolio reviews, interview prep, and career path guidance." }
              ].map((item, i) => (
                <div key={`dup-${i}`} className="flex flex-col items-center mx-4 w-80">
                  <div className="w-full aspect-[4/3] bg-card rounded-t-xl border-t-8 border-x-8 border-slate-800 shadow-xl flex items-center justify-center p-6 mb-2 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-slate-800 rounded-t-md"></div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    </div>
                  </div>
                  <div className="w-[110%] h-4 bg-slate-300 rounded-b-xl shadow-md mb-6"></div>
                  <p className="text-center text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION (3D Flip) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground">Hear from students who landed their dream roles.</p>
          </div>
          <Link href="/student/reviews" className="hidden md:flex items-center text-primary font-bold hover:underline">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: 90, z: -100 }}
              whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, type: "spring", bounce: 0.4 }}
              className="bg-gradient-to-b from-card to-muted/50 p-8 rounded-3xl border border-border shadow-lg"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5" fill={j < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-foreground text-lg mb-8 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-bold text-foreground">{review.name}</p>
                <p className="text-sm text-primary font-medium">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TOP PROFESSIONALS SECTION */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Top Professionals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Connect with industry leaders across the globe.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.slice(0, 3).map((prof) => (
              <ProfessionalCard key={prof.id} professional={prof} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/student/connect" className="inline-flex items-center px-6 py-3 rounded-full bg-secondary/10 text-secondary font-bold hover:bg-secondary hover:text-white transition-colors">
              Browse All Professionals <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* RECENT POSTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display mb-4">Latest Insights</h2>
            <p className="text-lg text-muted-foreground">Read advice and tips straight from the experts.</p>
          </div>
          <Link href="/student/posts" className="hidden md:flex items-center text-primary font-bold hover:underline">
            View Feed <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.slice(0, 4).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

    </div>
  );
}
