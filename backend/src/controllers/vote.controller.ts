import { VoteService } from "../services/vote.service";
import type { Server } from "bun";

export class VoteController {
  static async castVote(req: Request, server: Server) {
    try {
      const body = await req.json();
      const { client_id, post_id, comment_id, vote_type } = body;
      const vote = await VoteService.castVote(client_id, post_id, comment_id, vote_type);
      
      server.publish("reddit-clone", JSON.stringify({ type: "NEW_VOTE", data: vote }));
      return new Response(JSON.stringify(vote), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
