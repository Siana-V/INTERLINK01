import { useState } from "react";
import { usePosts, useCurrentUser, useCreatePost, useUpdatePost, useDeletePost } from "@/hooks/use-interlink";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";
import { Plus, Edit2, Trash2, Heart, Users, X, Send } from "lucide-react";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export function IndustryPosts() {
  const { data: currentUser } = useCurrentUser();
  const { data: allPosts = [] } = usePosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const myPosts = allPosts.filter(p => p.professionalId === "current");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ title: "", content: "" });

  const openForm = (post: any = null) => {
    if (post) {
      setEditingId(post.id);
      setFormData({ title: post.title, content: post.content });
    } else {
      setEditingId(null);
      setFormData({ title: "", content: "" });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (editingId) {
      updatePost.mutate({ id: editingId, updates: formData }, {
        onSuccess: () => setIsFormOpen(false)
      });
    } else {
      createPost.mutate({
        title: formData.title,
        content: formData.content,
        author: currentUser.name,
        domain: currentUser.domain,
        professionalId: "current"
      }, {
        onSuccess: () => setIsFormOpen(false)
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative">
      <FloatingBlobs />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Manage <span className="text-gradient">Posts</span></h1>
            <p className="text-lg text-muted-foreground">Share your knowledge with students.</p>
          </div>
          
          <button 
            onClick={() => openForm()}
            className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> New Post
          </button>
        </div>

        {/* Modal Form */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsFormOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card w-full max-w-2xl rounded-3xl shadow-2xl border border-border p-8 relative z-10"
              >
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                  <h2 className="text-2xl font-bold font-display">{editingId ? 'Edit Post' : 'Create New Post'}</h2>
                  <button onClick={() => setIsFormOpen(false)} className="p-2 bg-muted rounded-full hover:bg-muted-foreground/20 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Post Title</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-lg"
                      placeholder="e.g., How to ace your first interview"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Content</label>
                    <textarea 
                      required
                      rows={8}
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                      placeholder="Share your thoughts..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      disabled={createPost.isPending || updatePost.isPending}
                      className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      {(createPost.isPending || updatePost.isPending) ? "Saving..." : (
                        <><Send className="w-4 h-4" /> Publish</>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Posts List */}
        <div className="space-y-6">
          <AnimatePresence>
            {myPosts.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-3xl border border-border">
                <p className="text-muted-foreground text-lg">You haven't created any posts yet.</p>
              </div>
            ) : (
              myPosts.map(post => (
                <motion.div 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold px-3 py-1 bg-muted rounded-full">{post.date ? format(parseISO(post.date), 'MMM d, yyyy') : ''}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{post.content}</p>
                    
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <div className="flex items-center gap-2 text-secondary">
                        <Heart className="w-5 h-5 fill-current" /> {post.likes} Likes
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <Users className="w-5 h-5" /> {post.likedByStudents?.length || 0} Students Reached
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-3 justify-end border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                    <button 
                      onClick={() => openForm(post)}
                      className="flex-1 md:flex-none px-4 py-2 bg-muted text-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-destructive/10 text-destructive font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-destructive hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
