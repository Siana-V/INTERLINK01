// Initial Seed Data
const SEED_PROFESSIONALS = [
  { id: "p1", name: "Sarah Chen", domain: "Software Engineering", region: "North America", company: "TechCorp", experience: "8 years", whatsapp: "+1-555-0101", address: "123 Tech St, San Francisco, CA", timings: "Mon-Fri 9AM-5PM PST", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" },
  { id: "p2", name: "Rahul Sharma", domain: "Data Science", region: "Asia", company: "DataWave", experience: "5 years", whatsapp: "+91-98765-43210", address: "456 Data Lane, Bangalore, India", timings: "Mon-Fri 10AM-6PM IST", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces" },
  { id: "p3", name: "Emily Rodriguez", domain: "Product Management", region: "Europe", company: "ProductFirst", experience: "7 years", whatsapp: "+44-7700-900123", address: "789 PM Road, London, UK", timings: "Mon-Fri 9AM-5PM GMT", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces" },
  { id: "p4", name: "James Okafor", domain: "UX Design", region: "Africa", company: "DesignHub", experience: "4 years", whatsapp: "+234-80-1234-5678", address: "101 Design Ave, Lagos, Nigeria", timings: "Mon-Fri 8AM-4PM WAT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" },
  { id: "p5", name: "Mei Zhang", domain: "Finance", region: "Asia", company: "FinTech Global", experience: "10 years", whatsapp: "+86-139-1234-5678", address: "202 Finance Blvd, Shanghai, China", timings: "Mon-Fri 9AM-6PM CST", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces" },
  { id: "p6", name: "Carlos Mendez", domain: "Marketing", region: "South America", company: "GrowthLab", experience: "6 years", whatsapp: "+55-11-9876-5432", address: "303 Marketing St, São Paulo, Brazil", timings: "Mon-Fri 9AM-5PM BRT", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" }
];

const SEED_POSTS = [
  { id: "post1", professionalId: "p1", author: "Sarah Chen", domain: "Software Engineering", title: "5 Tips for Your First Tech Interview", content: "Breaking into tech can be daunting, but here are 5 tips that helped my mentees land their first roles. First, focus on fundamentals rather than syntax. Second, communicate your thought process aloud...", date: "2026-03-15", likes: 24, likedByStudents: ["s1", "s2"] },
  { id: "post2", professionalId: "p2", author: "Rahul Sharma", domain: "Data Science", title: "Python vs R: Which to Learn First?", content: "The age-old debate continues, but my recommendation for beginners in 2026 is Python. Its versatility across domains and massive community support make it the undisputed king for general data science tasks...", date: "2026-03-14", likes: 18, likedByStudents: [] },
  { id: "post3", professionalId: "p3", author: "Emily Rodriguez", domain: "Product Management", title: "How to Build Your First Product Roadmap", content: "A product roadmap is more than a timeline — it's a strategic communication tool. Start by aligning with your core business objectives, then work backward to define key themes and epics before assigning dates...", date: "2026-03-13", likes: 42, likedByStudents: ["s1"] },
  { id: "post4", professionalId: "p4", author: "James Okafor", domain: "UX Design", title: "The UX Portfolio That Got Me Hired", content: "After 50+ applications, I discovered the key elements recruiters look for in a UX portfolio. It's not just about pretty UI; it's about explaining the problem, the constraints, and your specific contribution to the solution...", date: "2026-03-12", likes: 56, likedByStudents: ["s3"] },
  { id: "post5", professionalId: "p5", author: "Mei Zhang", domain: "Finance", title: "Understanding Stock Market Basics for Interns", content: "As a finance intern, understanding markets gives you a huge edge. Don't just look at the numbers; try to understand the macro-economic factors driving those numbers...", date: "2026-03-11", likes: 12, likedByStudents: [] },
  { id: "post6", professionalId: "p6", author: "Carlos Mendez", domain: "Marketing", title: "Digital Marketing Skills Every Intern Needs", content: "The marketing landscape has changed dramatically. Here are the must-have skills: understanding data analytics, basic SEO principles, and knowing how to write prompt-engineered copy for AI tools...", date: "2026-03-10", likes: 31, likedByStudents: ["s2", "s3"] },
  { id: "post7", professionalId: "p1", author: "Sarah Chen", domain: "Software Engineering", title: "Open Source Contributions: A Beginner's Guide", content: "Contributing to open source is one of the best ways to build your portfolio. Start by looking for 'good first issue' tags on GitHub repositories of tools you already use...", date: "2026-03-09", likes: 88, likedByStudents: ["s1", "s2", "s3"] },
  { id: "post8", professionalId: "p2", author: "Rahul Sharma", domain: "Data Science", title: "Your First Data Science Project: A Complete Walkthrough", content: "From data collection to deployment, here's how to structure your first end-to-end project. Pick a dataset you're genuinely interested in—it will keep you motivated when you hit the inevitable roadblocks...", date: "2026-03-08", likes: 27, likedByStudents: [] }
];

const DEFAULT_CURRENT_USER = {
  id: "current",
  name: "Alex Johnson",
  company: "InnovateTech",
  domain: "Software Engineering",
  experience: "12 years",
  address: "500 Innovation Dr, Austin TX",
  timings: "Mon-Fri 9AM-6PM CST",
  whatsapp: "+1-555-0200",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces"
};

// Initialize localStorage on app start
export function initializeStorage() {
  if (!localStorage.getItem("interlink_professionals")) {
    localStorage.setItem("interlink_professionals", JSON.stringify(SEED_PROFESSIONALS));
  }
  if (!localStorage.getItem("interlink_posts")) {
    localStorage.setItem("interlink_posts", JSON.stringify(SEED_POSTS));
  }
  if (!localStorage.getItem("interlink_current_user")) {
    localStorage.setItem("interlink_current_user", JSON.stringify(DEFAULT_CURRENT_USER));
  }
  // Initialize student 'likes' tracking map
  if (!localStorage.getItem("interlink_student_likes")) {
    localStorage.setItem("interlink_student_likes", JSON.stringify({}));
  }
}
