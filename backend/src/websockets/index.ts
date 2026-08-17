import type { Server, ServerWebSocket } from "bun";

export const websocketHandler = {
  open(ws: ServerWebSocket) {
    console.log("Client connected via WebSocket");
    ws.subscribe("reddit-clone");
  },
  message(ws: ServerWebSocket, message: string | Buffer) {
    console.log(`Received WS message: ${message}`);
  },
  close(ws: ServerWebSocket, code: number, message: string) {
    console.log("Client disconnected");
  },
};
