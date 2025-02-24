const WebSocket = require("ws");

let wss;

const initWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connected");
    ws.on("close", () => {
      console.log("WebSocket disconnected");
    });
  });
};

// Fungsi untuk mengirim notifikasi ke semua klien
const sendNotification = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ message }));
    }
  });
};

module.exports = { initWebSocket, sendNotification };
