import { Server } from "socket.io";

function runServer(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Usuario conectado");
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });
};

export default runServer;
