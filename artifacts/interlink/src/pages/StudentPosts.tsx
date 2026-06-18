import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { useEffect } from "react";
import { usePosts } from "@/hooks/use-interlink";
import { PostCard } from "@/components/cards/PostCard";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function StudentPosts() {
  const { t } = useTranslation();

  const { data: posts = [], isLoading } = usePosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [domainFilter, setDomainFilter] = useState("");

  const domains = Array.from(new Set(posts.map(p => p.domain)));

  const filteredPosts = domainFilter 
    ? posts.filter(p => p.domain === domainFilter)
    : posts;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/student#" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group focus:outline-none">
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          {t("prof_back", "Back to Home")}
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{t("posts_page_title", "Industry Feed")}</h1>
            <p className="text-lg text-muted-foreground">{t("posts_page_subtitle", "Read insights, advice, and stories from professionals.")}</p>
          </div>
          
          <select 
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-6 py-3 rounded-xl bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer w-full md:w-64"
          >
            <option value="">{t("posts_filter_all", "All Domains")}</option>
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
            <h3 className="text-xl font-bold mb-2">{t("posts_no_results", "No posts found")}</h3>
            <p className="text-muted-foreground">{t("posts_no_results_desc", "Try clearing your domain filter.")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
