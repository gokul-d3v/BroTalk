import { CommentService } from "../services/comment.service";
import type { Server } from "bun";

export class CommentController {
  static async createComment(req: Request, server: Server) {
    try {
      const body = await req.json();
      const { post_id, parent_id, content } = body;
      const comment = await CommentService.createComment(post_id, parent_id, content);
      
      server.publish("reddit-clone", JSON.stringify({ type: "NEW_COMMENT", data: comment }));
      return new Response(JSON.stringify(comment), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
