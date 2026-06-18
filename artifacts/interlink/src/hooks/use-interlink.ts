import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generateId } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export type Role = "student" | "industry" | null;

export interface Professional {
  id: string;
  name: string;
  domain: string;
  region: string;
  company: string;
  experience: string;
  whatsapp: string;
  address: string;
  timings: string;
  avatar: string | null;
}

export interface Post {
  id: string;
  professionalId: string;
  author: string;
  domain: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  likedByStudents: string[];
}

export function useRole() {
  const queryClient = useQueryClient();
  
  const { data: role } = useQuery({
    queryKey: ["role"],
    queryFn: () => (localStorage.getItem("interlink_role") as Role) || null,
  });

  const setRole = useMutation({
    mutationFn: async (newRole: Role) => {
      if (newRole) {
        localStorage.setItem("interlink_role", newRole);
      } else {
        localStorage.removeItem("interlink_role");
      }
      return newRole;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
    },
  });

  return { role, setRole: setRole.mutate };
}

export function useProfessionals() {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: async (): Promise<Professional[]> => {
      const data = localStorage.getItem("interlink_professionals");
      return data ? JSON.parse(data) : [];
    },
  });
}

export function useProfessional(id: string) {
  return useQuery({
    queryKey: ["professionals", id],
    queryFn: async (): Promise<Professional | null> => {
      // Special case for 'current' industry user profile viewing
      if (id === "current") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          return {
            id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Professional",
            domain: user.user_metadata?.domain || "Technology",
            region: "San Francisco, CA",
            company: "Tech Corp",
            experience: "5+ years",
            whatsapp: "+1234567890",
            address: "123 Innovation Dr",
            timings: "9 AM - 5 PM",
            avatar: null
          };
        }
        const data = localStorage.getItem("interlink_current_user");
        return data ? JSON.parse(data) : null;
      }
      
      const data = localStorage.getItem("interlink_professionals");
      if (!data) return null;
      const professionals: Professional[] = JSON.parse(data);
      return professionals.find(p => p.id === id) || null;
    },
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Post[]> => {
      const data = localStorage.getItem("interlink_posts");
      return data ? JSON.parse(data) : [];
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current_user"],
    queryFn: async (): Promise<Professional | null> => {
      // 1. Fetch real session user from Supabase if available
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        return {
          id: user.id,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Professional",
          domain: user.user_metadata?.domain || "Technology",
          region: "San Francisco, CA", // Fallbacks for uncollected attributes
          company: "Tech Corp",
          experience: "5+ years",
          whatsapp: "+1234567890",
          address: "123 Innovation Dr",
          timings: "9 AM - 5 PM",
          avatar: null
        };
      }

      // 2. Fallback to local mock data (e.g. 'Alex') if no real session exists
      const data = localStorage.getItem("interlink_current_user");
      return data ? JSON.parse(data) : null;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<Professional>) => {
      const data = localStorage.getItem("interlink_current_user");
      const current = data ? JSON.parse(data) : {};
      const updated = { ...current, ...updates };
      localStorage.setItem("interlink_current_user", JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current_user"] });
      queryClient.invalidateQueries({ queryKey: ["professionals", "current"] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: Omit<Post, "id" | "date" | "likes" | "likedByStudents">) => {
      const data = localStorage.getItem("interlink_posts");
      const posts: Post[] = data ? JSON.parse(data) : [];
      
      const newPost: Post = {
        ...post,
        id: `post_${generateId()}`,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        likedByStudents: [],
      };
      
      localStorage.setItem("interlink_posts", JSON.stringify([newPost, ...posts]));
      return newPost;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Post> }) => {
      const data = localStorage.getItem("interlink_posts");
      if (!data) return;
      let posts: Post[] = JSON.parse(data);
      posts = posts.map(p => p.id === id ? { ...p, ...updates } : p);
      localStorage.setItem("interlink_posts", JSON.stringify(posts));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = localStorage.getItem("interlink_posts");
      if (!data) return;
      let posts: Post[] = JSON.parse(data);
      posts = posts.filter(p => p.id !== id);
      localStorage.setItem("interlink_posts", JSON.stringify(posts));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useStudentLikes() {
  return useQuery({
    queryKey: ["student_likes"],
    queryFn: async (): Promise<Record<string, boolean>> => {
      const data = localStorage.getItem("interlink_student_likes");
      return data ? JSON.parse(data) : {};
    },
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      // 1. Update student's personal like map
      const likesData = localStorage.getItem("interlink_student_likes");
      const likes: Record<string, boolean> = likesData ? JSON.parse(likesData) : {};
      const isCurrentlyLiked = !!likes[postId];
      likes[postId] = !isCurrentlyLiked;
      localStorage.setItem("interlink_student_likes", JSON.stringify(likes));

      // 2. Update post's global like count
      const postsData = localStorage.getItem("interlink_posts");
      if (postsData) {
        let posts: Post[] = JSON.parse(postsData);
        posts = posts.map(p => {
          if (p.id === postId) {
            const studentId = "student_user"; // Mock current student ID
            let likedBy = [...(p.likedByStudents || [])];
            
            if (!isCurrentlyLiked && !likedBy.includes(studentId)) {
              likedBy.push(studentId);
            } else if (isCurrentlyLiked) {
              likedBy = likedBy.filter(id => id !== studentId);
            }
            
            return { 
              ...p, 
              likes: isCurrentlyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
              likedByStudents: likedBy
            };
          }
          return p;
        });
        localStorage.setItem("interlink_posts", JSON.stringify(posts));
      }
      
      return { postId, liked: !isCurrentlyLiked };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student_likes"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
