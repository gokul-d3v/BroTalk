import { supabase } from "../config/supabase";

export class CommentService {
  static async createComment(post_id: string, parent_id: string | null, content: string) {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id, parent_id, content }])
      .select();
    if (error) throw error;
    return data[0];
  }
}
