import { PostController } from "../controllers/post.controller";
import { CommentController } from "../controllers/comment.controller";
import { VoteController } from "../controllers/vote.controller";
import type { Server } from "bun";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const handleRequest = async (req: Request, server: Server) => {
  const url = new URL(req.url);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("OK", { headers: CORS_HEADERS });
  }

  // Upgrade WebSocket connection
  if (url.pathname === "/ws") {
    if (server.upgrade(req)) return;
    return new Response("Upgrade failed", { status: 500 });
  }

  try {
    let response: Response;

    // Routes
    if (req.method === "GET" && url.pathname === "/posts") {
      response = await PostController.getPosts(req);
    } else if (req.method === "POST" && url.pathname === "/posts") {
      response = await PostController.createPost(req, server);
    } else if (req.method === "POST" && url.pathname === "/comments") {
      response = await CommentController.createComment(req, server);
    } else if (req.method === "POST" && url.pathname === "/votes") {
      response = await VoteController.castVote(req, server);
    } else {
      response = new Response("Bun Reddit Clone Backend API is running.", { status: 200 });
    }

    // Append CORS headers to the response
    const newHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      newHeaders.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: CORS_HEADERS });
  }
};
