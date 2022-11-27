export default (io, socket) => {
    const createMessage = (event, msg) => {
      socket.emit(event, msg);
    };
  
    socket.on("createMessage", createMessage);
};