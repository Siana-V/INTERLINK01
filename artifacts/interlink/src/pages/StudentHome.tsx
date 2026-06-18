import { useTranslation } from "@/lib/i18n";
import { Link, useLocation } from "wouter";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { PostCard } from "@/components/cards/PostCard";
import { useProfessionals, usePosts } from "@/hooks/use-interlink";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import { Star, ChevronRight, Globe } from "lucide-react";
import { WhyChooseInterLink } from "@/components/sections/WhyChooseInterLink";

function HeroVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = [
    "/videos/hero-1.mp4",
    "/videos/hero-2.mp4"
  ];

  const handleVideoEnd = () => {
    setCurrentIndex((prev: number) => (prev + 1) % videos.length);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted">
      <AnimatePresence mode="wait">
        <motion.video
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={videos[currentIndex]}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover rounded-2xl"
          playsInline
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {videos.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-primary w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white/90 p-6 rounded-2xl border border-primary/10 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-300 group h-full select-none">
      <div className="flex gap-1 mb-4 text-primary">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="w-4 h-4" fill={j < review.rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="text-foreground text-sm mb-6 leading-relaxed font-medium">"{review.text}"</p>
      <div className="mt-auto">
        <p className="font-bold text-sm text-foreground">{review.name}</p>
        <p className="text-xs text-muted-foreground">{review.role}</p>
      </div>
    </div>
  );
}

function PurpleReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-violet-100/80 p-6 rounded-2xl border border-violet-200 shadow-sm backdrop-blur-[2px] hover:bg-violet-100 transition-all duration-300 group h-full select-none">
      <div className="flex gap-1 mb-4 text-violet-500">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="w-4 h-4" fill={j < review.rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="text-foreground/80 text-sm mb-6 leading-relaxed font-medium">"{review.text}"</p>
      <div className="mt-auto">
        <p className="font-bold text-sm text-foreground/80">{review.name}</p>
        <p className="text-xs text-violet-400">{review.role}</p>
      </div>
    </div>
  );
}

export function StudentHome() {
  const { t } = useTranslation();

  const { data: professionals = [] } = useProfessionals();
  const { data: posts = [] } = usePosts();
  const [, setLocation] = useLocation();
  
  const containerRef = useRef(null);
  const reviewsRef = useRef(null);
  const { scrollYProgress: reviewsScroll } = useScroll({
    target: reviewsRef,
    offset: ["start end", "center center"]
  });

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const heroY = useTransform(scrollY, [0, 200], [0, -50]);

  // Navigate to top of page then route
  const navigateTo = useCallback((path: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setLocation(path), 300);
  }, [setLocation]);

  // ANIMATIONS FOR 7 CARDS (4 White, 3 Purple)
  const cardOpacity = useTransform(reviewsScroll, [0, 0.4, 1], [0, 0.5, 1]);
  const cardScale = useTransform(reviewsScroll, [0, 1], [0.8, 1]);

  // White card animations - coming from different directions
  const cardTopY = useTransform(reviewsScroll, [0, 1], [-200, 0]);
  const cardBottomY = useTransform(reviewsScroll, [0, 1], [200, 0]);
  const cardLeftX = useTransform(reviewsScroll, [0, 1], [-200, 0]);
  const cardRightX = useTransform(reviewsScroll, [0, 1], [200, 0]);

  // Purple card animations - coming from corners
  const purpleTopLeftX = useTransform(reviewsScroll, [0, 1], [-280, 0]);
  const purpleTopLeftY = useTransform(reviewsScroll, [0, 1], [-180, 0]);
  const purpleTopRightX = useTransform(reviewsScroll, [0, 1], [280, 0]);
  const purpleTopRightY = useTransform(reviewsScroll, [0, 1], [-120, 0]);
  const purpleBottomX = useTransform(reviewsScroll, [0, 1], [-200, 0]);
  const purpleBottomY = useTransform(reviewsScroll, [0, 1], [220, 0]);

  const reviews = [
    { name: "Jessica T.", role: t("rev_jessica_role"), text: t("rev_jessica_text"), rating: 5 },
    { name: "Michael B.", role: t("rev_michael_role"), text: t("rev_michael_text"), rating: 5 },
    { name: "Aisha M.", role: t("rev_aisha_role"), text: t("rev_aisha_text"), rating: 4 },
    { name: "David L.", role: t("rev_david_role"), text: t("rev_david_text"), rating: 5 },
  ];

  const purpleReviews = [
    { name: "Anita S.", role: t("rev_anita_role"), text: t("rev_anita_text"), rating: 5 },
    { name: "Rohan D.", role: t("rev_rohan_role"), text: t("rev_rohan_text"), rating: 5 },
    { name: "Kavya P.", role: t("rev_kavya_role"), text: t("rev_kavya_text"), rating: 4 },
  ];

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden">
        <FloatingBlobs />
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 backdrop-blur-sm">
                {t("hero_badge")}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
                {t("hero_title_1", "Connect with Professionals")} <br />
                <span className="text-gradient">{t("hero_title_2", "Start Your Career")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {t("hero_subtitle", "Break into the industry with guidance from people who are already where you want to be. Read insights, ask questions, and build your network.")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/student/connect" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                  {t("hero_cta_mentor")}
                </Link>
                <Link href="/student/posts" className="px-8 py-4 rounded-full bg-card text-foreground font-bold text-lg border border-border hover:bg-muted transition-all duration-300 shadow-sm">
                  {t("hero_cta_insights")}
                </Link>
              </div>
            </motion.div>
            
            <div className="relative hidden lg:block">
              {/* hero illustration beautiful vibrant tech graphic with video carousel */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-square glass-panel p-2">
                <HeroVideoCarousel />
              </div>
            </div>
          </div>
        </motion.div>
      </section>


      {/* WHY CHOOSE INTERLINK (Laptop Carousel) */}
      <WhyChooseInterLink />

      {/* TOP PROFESSIONALS SECTION */}
      <section id="professionals" className="py-24 bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">{t("professionals_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("professionals_subtitle")}</p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {professionals.length > 0 && professionals.slice(0, 3).map((prof) => (
              <motion.div 
                key={prof.id}
                variants={{
                  hidden: { opacity: 0, y: 100, scale: 0.3, rotate: -10 },
                  show: { opacity: 1, y: 0, scale: 1, rotate: 0 }
                }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                className="h-full"
              >
                <ProfessionalCard professional={prof} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <button onClick={() => navigateTo("/student/connect")} className="inline-flex items-center px-6 py-3 rounded-full bg-secondary/10 text-secondary font-bold hover:bg-secondary hover:text-white transition-colors">
              {t("nav_professionals", "Browse All Professionals")} <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION (Success Stories) - 7 Cards Matching Screenshot Layout */}
      <section id="reviews" className="py-32 bg-background overflow-hidden relative" ref={reviewsRef}>
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-violet-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-6">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold font-display mb-3">{t("rev_mobile_title")}</h2>
              <p className="text-lg text-muted-foreground">{t("reviews_success_subtitle", "Direct impacts from industry mentorship.")}</p>
            </div>
            {[...reviews, ...purpleReviews].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className={i >= 4 ? "bg-violet-100/80 p-6 rounded-2xl border border-violet-200 shadow-sm" : "bg-card p-6 rounded-2xl border border-border shadow-sm"}
              >
                <div className={`flex gap-1 mb-3 ${i >= 4 ? "text-violet-500" : "text-primary"}`}>
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4" fill={j < review.rating ? "currentColor" : "none"} />)}
                </div>
                <p className="text-foreground mb-3 text-sm">"{review.text}"</p>
                <p className="font-bold text-xs">{review.name} • <span className="text-primary">{review.role}</span></p>
              </motion.div>
            ))}
          </div>

          {/* Desktop 7-Card Layout: 3 columns × 3 rows, purple cards in corners + edge, white in cross */}
          <div className="hidden md:block relative" style={{ minHeight: '900px' }}>

            {/* ── ROW 1 ── */}
            {/* Purple Card – top-left (large) */}
            <motion.div
              className="absolute top-0 left-0 w-72 z-10"
              style={{ opacity: cardOpacity, x: purpleTopLeftX, y: purpleTopLeftY, scale: cardScale }}
            >
              <PurpleReviewCard review={purpleReviews[0]} />
            </motion.div>

            {/* White Card – top-center */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-64 z-10"
              style={{ opacity: cardOpacity, y: cardTopY, scale: cardScale }}
            >
              <ReviewCard review={reviews[0]} />
            </motion.div>

            {/* Purple Card – top-right (smaller) */}
            <motion.div
              className="absolute top-12 right-0 w-56 z-10"
              style={{ opacity: cardOpacity, x: purpleTopRightX, y: purpleTopRightY, scale: cardScale }}
            >
              <PurpleReviewCard review={purpleReviews[1]} />
            </motion.div>

            {/* ── ROW 2 (middle) ── */}
            {/* White Card – middle-left */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 w-64 z-10"
              style={{ opacity: cardOpacity, x: cardLeftX, scale: cardScale }}
            >
              <ReviewCard review={reviews[1]} />
            </motion.div>

            {/* CENTER HEADING */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 p-6 lg:p-10 bg-background/60 backdrop-blur-sm rounded-3xl w-72"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold font-display mb-3 tracking-tight">{t("reviews_success_title", "Success Stories")}</h2>
              <p className="text-base text-muted-foreground mb-5">{t("reviews_success_subtitle", "Direct impacts from industry mentorship.")}</p>
              <button
                onClick={() => navigateTo("/student/reviews")}
                className="inline-flex items-center text-primary font-bold hover:underline group"
              >
                {t("see_all")} <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* White Card – middle-right */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-0 w-64 z-10"
              style={{ opacity: cardOpacity, x: cardRightX, scale: cardScale }}
            >
              <ReviewCard review={reviews[2]} />
            </motion.div>

            {/* ── ROW 3 ── */}
            {/* Purple Card – bottom-left (small) */}
            <motion.div
              className="absolute bottom-16 left-32 w-52 z-10"
              style={{ opacity: cardOpacity, x: purpleBottomX, y: purpleBottomY, scale: cardScale }}
            >
              <PurpleReviewCard review={purpleReviews[2]} />
            </motion.div>

            {/* White Card – bottom-center */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 z-10"
              style={{ opacity: cardOpacity, y: cardBottomY, scale: cardScale }}
            >
              <ReviewCard review={reviews[3]} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* RECENT POSTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display mb-4">{t("posts_title")}</h2>
            <p className="text-lg text-muted-foreground">{t("posts_subtitle")}</p>
          </div>
          <button onClick={() => navigateTo("/student/posts")} className="hidden md:flex items-center text-primary font-bold hover:underline">
            {t("nav_feed")} <ChevronRight className="w-4 h-4 ml-1" />
          </button>
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
