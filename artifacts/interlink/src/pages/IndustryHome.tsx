import { Link } from "wouter";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { usePosts, useCurrentUser } from "@/hooks/use-interlink";
import { PostCard } from "@/components/cards/PostCard";
import { Edit3, FileText, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

export function IndustryHome() {
  const { data: currentUser } = useCurrentUser();
  const { data: allPosts = [] } = usePosts();
  
  const myPosts = allPosts.filter(p => p.professionalId === "current");
  const totalLikes = myPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalStudentsReached = new Set(myPosts.flatMap(p => p.likedByStudents || [])).size;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingBlobs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-card border-4 border-white shadow-xl overflow-hidden mb-6">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-secondary/20 text-secondary">
                  {currentUser?.name.charAt(0)}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Share Knowledge <br />
              <span className="text-gradient-primary">Grow Your Network</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome back, {currentUser?.name.split(' ')[0]}. You're helping shape the next generation of tech talent.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 -mt-8 relative z-20">
          <div className="glass-panel p-8 rounded-3xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{myPosts.length}</p>
              <p className="text-muted-foreground font-medium">Published Posts</p>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-3xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalLikes}</p>
              <p className="text-muted-foreground font-medium">Total Likes</p>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-3xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalStudentsReached}</p>
              <p className="text-muted-foreground font-medium">Students Reached</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS & RECENT */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
              <h3 className="text-xl font-bold mb-4 font-display">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/industry/posts" className="w-full flex items-center justify-between p-4 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary font-semibold transition-colors">
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-5 h-5" /> Write a Post
                  </div>
                </Link>
                <Link href="/industry/profile" className="w-full flex items-center justify-between p-4 rounded-xl bg-muted hover:bg-muted-foreground/10 text-foreground font-semibold transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" /> Update Profile
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold font-display">Recent Posts</h3>
              <Link href="/industry/posts" className="text-primary font-bold hover:underline">View All</Link>
            </div>
            
            {myPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {myPosts.slice(0, 2).map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-card border border-dashed border-border rounded-3xl p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-bold mb-2">No posts yet</h4>
                <p className="text-muted-foreground mb-6">Share your first piece of advice with students.</p>
                <Link href="/industry/posts" className="px-6 py-3 bg-primary text-white rounded-full font-bold inline-block">
                  Create Post
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
