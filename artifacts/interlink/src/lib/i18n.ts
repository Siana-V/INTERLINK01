import { useState } from "react";

export type Language = "en" | "hi" | "ta" | "te" | "kn" | "ml" | "bn" | "mr" | "gu" | "pa";

export const LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "Hindi" },
  { code: "ta", name: "Tamil", nativeName: "Tamil" },
  { code: "te", name: "Telugu", nativeName: "Telugu" },
  { code: "kn", name: "Kannada", nativeName: "Kannada" },
  { code: "ml", name: "Malayalam", nativeName: "Malayalam" },
  { code: "bn", name: "Bengali", nativeName: "Bengali" },
  { code: "mr", name: "Marathi", nativeName: "Marathi" },
  { code: "gu", name: "Gujarati", nativeName: "Gujarati" },
  { code: "pa", name: "Punjabi", nativeName: "Punjabi" },
];

const t = {
  en: {
    nav_home: "Home", nav_connect: "Connect", nav_feed: "Industry Feed", nav_reviews: "Success Stories",
    nav_contact: "Contact", nav_dashboard: "Dashboard", nav_manage_posts: "Manage Posts",
    nav_my_profile: "My Profile", nav_sign_out: "Sign Out", nav_signed_in_as: "Signed in as",
    nav_ai: "AI Assistant", nav_professionals: "Browse All Professionals",
    nav_back_roles: "Back to Role Selection",
    role_welcome: "Welcome to InterLink",
    role_subtitle: "Bridge the gap between campus and career. Choose your path.",
    role_student: "I'm a Student", role_student_desc: "Find mentors, read insights, and prepare for your career.",
    role_join_student: "Join as Student", role_professional: "I'm a Professional",
    role_professional_desc: "Share your knowledge and guide the next generation of talent.",
    role_join_professional: "Join as Professional",
    hero_badge: "Empowering the Next Generation",
    hero_title_1: "Connect with Professionals", hero_title_2: "Start Your Career",
    hero_subtitle: "Break into the industry with guidance from people already where you want to be.",
    hero_cta_mentor: "Find a Mentor", hero_cta_insights: "Read Insights",
    why_title: "Why Choose InterLink?", why_subtitle: "Everything you need to accelerate your career",
    why_card1_title: "Expert Mentorship", why_card1_desc: "Connect with seasoned professionals across every domain.",
    why_card2_title: "Real Insights", why_card2_desc: "Read authentic posts from industry leaders.",
    why_card3_title: "Global Network", why_card3_desc: "Access professionals from South India and beyond.",
    reviews_title: "What Students Say", reviews_subtitle: "Thousands have jumpstarted their careers with InterLink",
    professionals_title: "Industry Professionals", professionals_subtitle: "Browse our network and find your mentor",
    posts_title: "Latest from Professionals", posts_subtitle: "Insights, tips and stories from the field",
    contact_title: "Get in Touch", contact_subtitle: "Have questions? We'd love to hear from you.",
    contact_name: "Your Name", contact_email: "Email Address", contact_message: "Message",
    contact_send: "Send Message", contact_success: "Message sent!",
    contact_success_title: "Message Sent!", contact_success_desc: "We'll get back to you as soon as possible.",
    connect_title: "Connect with Professionals", connect_subtitle: "Find your next mentor or get industry advice.",
    connect_search: "Search by name or company...", connect_all_domains: "All Domains",
    connect_all_regions: "All Regions", connect_no_results: "No professionals found",
    connect_no_results_desc: "Try adjusting your filters.", connect_clear: "Clear Filters",
    connect_now: "Connect Now",
    prof_whatsapp: "WhatsApp", prof_address: "Office Address", prof_timings: "Business Hours",
    prof_domain: "Domain", prof_experience: "Experience", prof_experience_label: "Experience", prof_send_whatsapp: "Send WhatsApp Message",
    prof_related_posts: "Posts by", prof_back: "Back to Home", prof_no_posts: "This professional hasn't published any posts yet.",
    posts_page_title: "Industry Feed", posts_page_subtitle: "Read insights, advice, and stories from professionals.",
    posts_no_results: "No posts found", posts_no_results_desc: "Try clearing your domain filter.",
    posts_filter_all: "All Domains", posts_like: "Like", posts_liked: "Liked", posts_read_more: "Read More",
    ind_hero_title_1: "Share Knowledge", ind_hero_title_2: "Grow Your Network",
    ind_hero_subtitle: "You're helping shape the next generation of talent.",
    ind_stats_posts: "Published Posts", ind_stats_likes: "Total Likes", ind_stats_students: "Students Reached",
    ind_quick_post: "Create a Post", ind_quick_profile: "Edit Profile",
    ind_my_posts: "My Recent Posts", ind_no_posts: "No posts yet",
    ind_no_posts_desc: "Share your first insight with students!",
    ind_recent_title: "Recent Posts", ind_share_advice: "Share your first piece of advice with students.",
    ind_create_post: "Create Post",
    ind_posts_title: "Manage Your Posts", ind_posts_new: "New Post",
    ind_posts_publish: "Publish Post", ind_posts_update: "Update Post", ind_posts_cancel: "Cancel",
    ind_posts_title_label: "Post Title", ind_posts_content_label: "Content",
    ind_posts_create_title: "Create New Post", ind_posts_edit_title: "Edit Post",
    ind_posts_empty: "You haven't created any posts yet.",
    ind_posts_manage_title: "Manage Posts", ind_posts_manage_subtitle: "Share your knowledge with students.",
    ind_posts_new_btn: "New Post",
    ind_title_share: "Share Knowledge", ind_title_grow: "Grow Your Network",
    ind_welcome_back: "Welcome back, ", ind_welcome_desc: ". You're helping shape the next generation of tech talent.",
    ind_actions_title: "Quick Actions", ind_action_write: "Write a Post", ind_action_profile: "Update Profile",
    ind_posts_recent_title: "Your Recent Posts",
    ind_posts_title_ph: "What would you like to share?",
    ind_posts_content_ph: "Write your insights, advice or experiences...",
    ind_posts_likes: "likes", ind_posts_students: "students",
    ind_posts_edit: "Edit", ind_posts_delete: "Delete",
    ind_posts_delete_confirm: "Are you sure you want to delete this post?",
    ind_profile_title: "Edit Profile", ind_profile_name: "Full Name", ind_profile_company: "Company",
    ind_profile_domain: "Domain", ind_profile_experience: "Years of Experience",
    ind_profile_address: "Office Address", ind_profile_timings: "Business Hours",
    ind_profile_whatsapp: "WhatsApp Number", ind_profile_save: "Save Changes",
    ind_profile_saved: "Profile updated!",
    ind_login_email: "Email", ind_login_password: "Password",
    ind_login_submit: "Sign In", ind_login_create: "Create Account",
    ind_login_title: "Welcome Back", ind_login_subtitle: "Sign in to your professional account",
    rev_title: "Student Success Stories", rev_subtitle: "Real stories from students who found their path",
    reviews_success_title: "Success Stories", reviews_success_subtitle: "Direct impacts from industry mentorship.",
    ai_title: "AI Assistant", ai_subtitle: "Chat with Peach",
    ai_placeholder: "Type your message...", ai_send: "Send",
    ai_greeting: "Hi! I'm Peach, your AI assistant. How can I help you today?",
    loading: "Loading...", by: "by", see_all: "See All",
    dom_software_engineering: "Software Engineering", dom_data_science: "Data Science", dom_cloud_architecture: "Cloud Architecture",
    dom_cybersecurity: "Cybersecurity", dom_product_management: "Product Management", dom_ai_research: "AI Research",
    dom_app_development: "App Development", dom_ux_design: "UX Design",
    reg_north_america: "North America", reg_asia: "Asia", reg_europe: "Europe", reg_africa: "Africa",
    exp_year: "year", exp_years: "years", exp_label: "Experience",
    rev_mobile_title: "Success Stories",
    rev_click_discuss: "Discuss", rev_link_copied: "Link Copied", rev_copied_desc: "Link copied to clipboard!",
    rev_read_more: "Read More", rev_coming_soon: "Coming Soon", rev_discuss_desc: "The comments and discussion feature is under development.",
    rev_student_only_like: "Only students can like posts",
    rev_jessica_role: "CS Intern", rev_jessica_text: "Connected with a Senior Engineer who helped me prep for my FAANG interview. I got the offer!",
    rev_michael_role: "Design Student", rev_michael_text: "The portfolio reviews from industry pros completely changed how I present my work.",
    rev_aisha_role: "Data Science Grad", rev_aisha_text: "Reading real-world posts from data scientists gave me direction when I felt lost.",
    rev_david_role: "Product Management", rev_david_text: "Found a mentor here who meets with me monthly. Best career investment ever.",
    rev_anita_role: "Backend Engineer", rev_anita_text: "The mock interviews were a game changer. Landing my dream job felt effortless.",
    rev_rohan_role: "ML Engineer", rev_rohan_text: "Found a mentor who helped me navigate my research paper and publish it successfully.",
    rev_kavya_role: "Cybersecurity Analyst", rev_kavya_text: "The industry insights keep me updated on the latest threats and best practices.",
    rev_elena_role: "Marketing Intern", rev_elena_text: "InterLink helped me understand what modern digital marketing actually looks like outside of textbooks.",
    rev_sam_role: "Frontend Dev", rev_sam_text: "The advice on open source contributions I read on here helped me land my first real gig.",
  }
};

export function useTranslation() {
  const [language] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    // No-op as Google Translate handles language switching
  };

  const translate = (key: keyof typeof t.en, fallback?: string) => {
    return (t.en as any)?.[key] || (fallback !== undefined ? fallback : key) || key;
  };

  return { language, setLanguage, t: translate };
}
