import { Server } from "socket.io";


export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  console.log(req.nextUrl)
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

//   const onConnection = (socket) => {
//     messageHandler(io, socket);
//   };

  // Define actions inside
  io.on("connection", (socket) => {
    // console.log(socket)
    socket.emit('news', { hello: 'world' });
  });

  console.log("Setting up socket");
  res.end();
}
