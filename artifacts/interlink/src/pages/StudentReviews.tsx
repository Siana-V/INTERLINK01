import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function StudentReviews() {
  const reviews = [
    { name: "Jessica T.", role: "CS Intern", text: "Connected with a Senior Engineer who helped me prep for my FAANG interview. I got the offer! The advice was incredibly specific and actionable.", rating: 5 },
    { name: "Michael B.", role: "Design Student", text: "The portfolio reviews from industry pros completely changed how I present my work. I learned to focus on the problem statement before the UI.", rating: 5 },
    { name: "Aisha M.", role: "Data Science Grad", text: "Reading real-world posts from data scientists gave me direction when I felt lost. The community here is so supportive.", rating: 4 },
    { name: "David L.", role: "Product Management", text: "Found a mentor here who meets with me monthly. Best career investment ever. It's rare to find PMs willing to give up their time.", rating: 5 },
    { name: "Elena R.", role: "Marketing Intern", text: "InterLink helped me understand what modern digital marketing actually looks like outside of textbooks.", rating: 5 },
    { name: "Sam K.", role: "Frontend Dev", text: "The advice on open source contributions I read on here helped me land my first real gig.", rating: 4 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Student <span className="text-gradient">Success Stories</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">See how InterLink is helping students bridge the gap between education and industry.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5" fill={j < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-foreground text-lg mb-8 leading-relaxed italic">"{review.text}"</p>
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-primary font-medium">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
