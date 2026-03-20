import { useState } from "react";
import { usePosts } from "@/hooks/use-interlink";
import { PostCard } from "@/components/cards/PostCard";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";

export function StudentPosts() {
  const { data: posts = [], isLoading } = usePosts();
  const [domainFilter, setDomainFilter] = useState("");

  const domains = Array.from(new Set(posts.map(p => p.domain)));

  const filteredPosts = domainFilter 
    ? posts.filter(p => p.domain === domainFilter)
    : posts;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Industry <span className="text-gradient-primary">Feed</span></h1>
            <p className="text-lg text-muted-foreground">Read insights, advice, and stories from professionals.</p>
          </div>
          
          <select 
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-6 py-3 rounded-xl bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer w-full md:w-64"
          >
            <option value="">All Domains</option>
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border animate-pulse h-48"></div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="flex flex-col gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-2">No posts found</h3>
            <p className="text-muted-foreground">Try clearing your domain filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
