import { supabase } from "../config/supabase";

export class VoteService {
  static async castVote(client_id: string, post_id: string | null, comment_id: string | null, vote_type: number) {
    const conflictConstraint = post_id ? "client_id,post_id" : "client_id,comment_id";
    const { data, error } = await supabase
      .from("votes")
      .upsert([{ client_id, post_id, comment_id, vote_type }], { onConflict: conflictConstraint })
      .select();
    if (error) throw error;
    return data[0];
  }
}
