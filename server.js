// server.js
// A simple relay: browser sends JSON, TD receives JSON.
const WebSocket = require("ws");

const PORT = 7001;
const wss = new WebSocket.Server({ port: PORT });

console.log("WebSocket relay running on ws://localhost:" + PORT);

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    // relay to everyone else (including TD)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(msg.toString());
    });
  });
});