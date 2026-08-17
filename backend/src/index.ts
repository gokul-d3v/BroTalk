import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { PostService } from "./services/post.service";
import { CommentService } from "./services/comment.service";
import { VoteService } from "./services/vote.service";

const app = new Elysia()
  .onRequest(({ request, set }) => {
    set.headers['Access-Control-Allow-Origin'] = '*';
    set.headers['Access-Control-Allow-Methods'] = '*';
    set.headers['Access-Control-Allow-Headers'] = '*';
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: set.headers as any });
    }
  })
  .onAfterHandle(({ set }) => {
    set.headers['Access-Control-Allow-Origin'] = '*';
    set.headers['Access-Control-Allow-Methods'] = '*';
    set.headers['Access-Control-Allow-Headers'] = '*';
  })
  .onError(({ set }) => {
    set.headers['Access-Control-Allow-Origin'] = '*';
    set.headers['Access-Control-Allow-Methods'] = '*';
    set.headers['Access-Control-Allow-Headers'] = '*';
  })
  .ws("/ws", {
    open(ws) {
      ws.subscribe("reddit-clone");
      console.log("Client connected via WebSocket");
    },
    close(ws) {
      console.log("Client disconnected");
    },
  })
  .get("/", () => "Brotalk Elysia Backend API is running.")
  .get("/posts", async () => {
    return await PostService.getAllPosts();
  })
  .post("/posts", async ({ body, server }) => {
    const { title, content, community_id } = body as any;
    const post = await PostService.createPost(title, content, community_id);
    server?.publish("reddit-clone", JSON.stringify({ type: "NEW_POST", data: post }));
    return post;
  })
  .post("/comments", async ({ body, server }) => {
    const { post_id, parent_id, content } = body as any;
    const comment = await CommentService.createComment(post_id, parent_id, content);
    server?.publish("reddit-clone", JSON.stringify({ type: "NEW_COMMENT", data: comment }));
    return comment;
  })
  .post("/votes", async ({ body, server }) => {
    const { client_id, post_id, comment_id, vote_type } = body as any;
    const vote = await VoteService.castVote(client_id, post_id, comment_id, vote_type);
    server?.publish("reddit-clone", JSON.stringify({ type: "NEW_VOTE", data: vote }));
    return vote;
  })
  .listen(process.env.PORT || 8080);

console.log(`Elysia Server listening on ${app.server?.url}`);
