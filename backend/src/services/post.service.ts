import { supabase } from "../config/supabase";

export class PostService {
  static async getAllPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }

  static async createPost(title: string, content: string, community_id?: string) {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, community_id }])
      .select();
    if (error) throw error;
    return data[0];
  }
}
