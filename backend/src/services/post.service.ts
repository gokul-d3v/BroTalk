import sql from "../config/db";

export class PostService {
  static async getAllPosts() {
    const data = await sql`
      SELECT * FROM posts 
      ORDER BY created_at DESC
    `;
    return data;
  }

  static async createPost(title: string, content: string, community_id?: string) {
    const data = await sql`
      INSERT INTO posts (title, content, community_id)
      VALUES (${title}, ${content}, ${community_id || null})
      RETURNING *
    `;
    return data[0];
  }
}
