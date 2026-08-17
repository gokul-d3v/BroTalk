import { serve } from "bun";
import { handleRequest } from "./routes";
import { websocketHandler } from "./websockets";

const server = serve({
  port: process.env.PORT || 8080,
  fetch(req, server) {
    return handleRequest(req, server);
  },
  websocket: websocketHandler,
});

console.log(`Layered Architecture Server listening on http://localhost:${server.port}`);
