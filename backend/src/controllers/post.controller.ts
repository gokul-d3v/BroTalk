import { PostService } from "../services/post.service";
import type { Server } from "bun";

export class PostController {
  static async getPosts(req: Request) {
    try {
      const posts = await PostService.getAllPosts();
      return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  static async createPost(req: Request, server: Server) {
    try {
      const body = await req.json();
      const { title, content, community_id } = body;
      const post = await PostService.createPost(title, content, community_id);
      
      server.publish("reddit-clone", JSON.stringify({ type: "NEW_POST", data: post }));
      return new Response(JSON.stringify(post), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
