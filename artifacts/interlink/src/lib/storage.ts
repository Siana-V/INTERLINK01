// Initial Seed Data
const SEED_PROFESSIONALS = [
  { id: "p1", name: "Sarah Chen", domain: "Software Engineering", region: "North America", company: "TechCorp", experience: "8 years", whatsapp: "+1-555-0101", address: "123 Tech St, San Francisco, CA", timings: "Mon-Fri 9AM-5PM PST", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" },
  { id: "p2", name: "Rahul Sharma", domain: "Data Science", region: "Asia", company: "DataWave", experience: "5 years", whatsapp: "+91-98765-43210", address: "456 Data Lane, Bangalore, India", timings: "Mon-Fri 10AM-6PM IST", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces" },
  { id: "p3", name: "Ananya Iyer", domain: "Cloud Architecture", region: "Asia", company: "SkySystems", experience: "9 years", whatsapp: "+91-99887-76655", address: "OMR Road, Chennai, India", timings: "Mon-Fri 9AM-5PM IST", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces" },
  { id: "p4", name: "Vikram Reddy", domain: "Cybersecurity", region: "Asia", company: "SecureNodes", experience: "6 years", whatsapp: "+91-91234-56789", address: "Hitech City, Hyderabad, India", timings: "Mon-Fri 10AM-7PM IST", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" },
  { id: "p5", name: "Emily Rodriguez", domain: "Product Management", region: "Europe", company: "ProductFirst", experience: "7 years", whatsapp: "+44-7700-900123", address: "789 PM Road, London, UK", timings: "Mon-Fri 9AM-5PM GMT", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces" },
  { id: "p6", name: "Siddharth Menon", domain: "AI Research", region: "Asia", company: "NeuralNet", experience: "4 years", whatsapp: "+91-95555-44444", address: "Infopark, Kochi, India", timings: "Mon-Fri 9AM-6PM IST", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces" },
  { id: "p7", name: "Priya Lakshmi", domain: "App Development", region: "Asia", company: "MobileCraft", experience: "5 years", whatsapp: "+91-93333-22222", address: "Tidel Park, Chennai, India", timings: "Mon-Fri 10AM-6PM IST", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces" },
  { id: "p8", name: "James Okafor", domain: "UX Design", region: "Africa", company: "DesignHub", experience: "4 years", whatsapp: "+234-80-1234-5678", address: "101 Design Ave, Lagos, Nigeria", timings: "Mon-Fri 8AM-4PM WAT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" }
];

const SEED_POSTS = [
  { id: "post1", professionalId: "p1", author: "Sarah Chen", domain: "Software Engineering", title: "5 Tips for Your First Tech Interview", content: "Breaking into tech can be daunting, but here are 5 tips that helped my mentees land their first roles. First, focus on fundamentals rather than syntax. Second, communicate your thought process aloud...", date: "2026-03-15", likes: 24, likedByStudents: ["s1", "s2"] },
  { id: "post2", professionalId: "p2", author: "Rahul Sharma", domain: "Data Science", title: "Python vs R: Which to Learn First?", content: "The age-old debate continues, but my recommendation for beginners in 2026 is Python. Its versatility across domains and massive community support make it the undisputed king for general data science tasks...", date: "2026-03-14", likes: 18, likedByStudents: [] },
  { id: "post3", professionalId: "p3", author: "Ananya Iyer", domain: "Cloud Architecture", title: "The Future of Serverless in 2026", content: "Serverless isn't just a trend; it's a paradigm shift. For students, understanding event-driven architectures is now more important than managing virtual machines. Start with AWS Lambda or Google Cloud Functions...", date: "2026-03-15", likes: 35, likedByStudents: ["s1"] },
  { id: "post4", professionalId: "p4", author: "Vikram Reddy", domain: "Cybersecurity", title: "Securing Your First Web Application", content: "Most beginners overlook security until it's too late. Always sanitize your inputs, use secure headers, and never store passwords in plain text. A small mistake can lead to a massive data breach...", date: "2026-03-15", likes: 29, likedByStudents: ["s2"] },
  { id: "post5", professionalId: "p5", author: "Emily Rodriguez", domain: "Product Management", title: "How to Build Your First Product Roadmap", content: "A product roadmap is more than a timeline — it's a strategic communication tool. Start by aligning with your core business objectives, then work backward to define key themes and epics before assigning dates...", date: "2026-03-13", likes: 42, likedByStudents: ["s1"] },
  { id: "post6", professionalId: "p6", author: "Siddharth Menon", domain: "AI Research", title: "Introduction to Transformers for Students", content: "Transformers have revolutionized NLP. If you're interested in AI research, understanding the attention mechanism is fundamental. Don't just use pre-trained models; try to implement a simple one from scratch...", date: "2026-03-14", likes: 51, likedByStudents: ["s3"] },
  { id: "post7", professionalId: "p7", author: "Priya Lakshmi", domain: "App Development", title: "React Native vs Flutter in 2026", content: "Both frameworks have matured significantly. React Native is great if you already know JavaScript, while Flutter offers unmatched consistency across platforms. My advice: pick one and master its state management...", date: "2026-03-14", likes: 44, likedByStudents: ["s1", "s2"] },
  { id: "post8", professionalId: "p8", author: "James Okafor", domain: "UX Design", title: "The UX Portfolio That Got Me Hired", content: "After 50+ applications, I discovered the key elements recruiters look for in a UX portfolio. It's not just about pretty UI; it's about explaining the problem, the constraints, and your specific contribution to the solution...", date: "2026-03-12", likes: 56, likedByStudents: ["s3"] }
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
