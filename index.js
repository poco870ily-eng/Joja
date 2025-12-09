export default {
  fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade") || "";
    if (upgradeHeader.toLowerCase() !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const [client, server] = Object.values(new WebSocketPair());

    server.accept();

    server.addEventListener("message", (msg) => {
      server.send("You said: " + msg.data);
    });

    server.addEventListener("close", () => {
      console.log("Client disconnected");
    });

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }
};
