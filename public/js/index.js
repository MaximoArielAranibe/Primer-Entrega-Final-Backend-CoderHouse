const socket = io();

socket.emit("message", "Mensaje desde el frontend")
socket.on('message',(socket) => {
  console.log("hola", socket);
})


socket.on("message", (data) => {
  console.log(data);
});

