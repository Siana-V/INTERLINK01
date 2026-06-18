import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "@/hooks/use-interlink";
import { useToggleLike, useStudentLikes, useRole } from "@/hooks/use-interlink";
import { useToast } from "@/hooks/use-toast";

export function PostCard({ post, isExpanded = false }: { post: Post; isExpanded?: boolean }) {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(isExpanded);
  const { data: likes = {} } = useStudentLikes();
  const toggleLike = useToggleLike();
  const { role } = useRole();
  const { toast } = useToast();
  
  const isLiked = !!likes[post.id];
  const dateFormatted = post.date ? format(parseISO(post.date), 'MMM d, yyyy') : '';

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (role === "student") {
      toggleLike.mutate(post.id);
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 ${!expanded ? 'hover:shadow-md cursor-pointer group' : 'shadow-lg'}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-foreground leading-none">{post.author}</h4>
              <p className="text-xs text-muted-foreground mt-1">{t(`dom_${post.domain.toLowerCase().replace(/ /g, '_')}` as any, post.domain)} • {dateFormatted}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
        
        <div className={`text-muted-foreground text-sm leading-relaxed ${!expanded && 'line-clamp-3'}`}>
          {post.content}
        </div>
        
        {!expanded && post.content.length > 150 && (
          <button className="text-primary text-sm font-semibold mt-2 hover:underline">{t("rev_read_more", "Read more")}</button>
        )}
      </div>

      <div className="px-5 py-3 border-t border-border/50 bg-muted/30 flex items-center gap-6">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${isLiked && role === 'student' ? 'text-secondary' : 'text-muted-foreground hover:text-secondary'}`}
          disabled={role !== "student"}
          title={role !== "student" ? t("rev_student_only_like", "Only students can like posts") : ""}
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-5 h-5 ${isLiked && role === 'student' ? 'fill-current' : ''}`} />
          </motion.div>
          <span>{post.likes}</span>
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (!expanded) {
              setExpanded(true);
            } else {
              toast({
                title: t("rev_coming_soon", "Coming Soon"),
                description: t("rev_discuss_desc", "The comments and discussion feature is under development."),
              });
            }
          }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{t("rev_click_discuss", "Discuss")}</span>
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: t("rev_link_copied", "Link Copied"),
              description: t("rev_copied_desc", "Link copied to clipboard!"),
            });
          }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors ml-auto"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Modal for expanded view if it was opened from card click */}
      <AnimatePresence>
        {expanded && !isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl border border-border z-10 p-1 cursor-default"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 right-0 flex justify-end p-2 z-20">
                 <button 
                  onClick={() => setExpanded(false)}
                  className="bg-muted hover:bg-muted-foreground/20 text-foreground p-2 rounded-full transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 rotate-45" /> {/* Use X icon ideally, but sticking to imports */}
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="p-6 pt-0">
                <PostCard post={post} isExpanded={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
