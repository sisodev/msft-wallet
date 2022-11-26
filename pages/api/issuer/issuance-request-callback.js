import { Server } from "socket.io";

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}



export default async function  handler(req, res) {
    const io = new Server(res.socket.server);
    if(req.method === "GET") {
          res.socket.server.io = io;
          io.on("connection", (socket) => {
            console.log(`number of sockets connected::: ${io.engine.clientsCount}`)
            console.log(`make a private connection to ${socket.id}`)
            io.to(socket.id).emit('new_issuance_activity', "Pls ignore");
            socket.on('disconnect', () => {
                console.log('Disconnected');
            });
          });
          res.end()
          return
     }else if(req.method === "POST") {
            res.socket.server.io = io;
            const issuanceResponse = req.body;
            io.on("connection", (socket) => {
                if ( issuanceResponse.requestStatus == "request_retrieved" ) {
                    console.log(`number of sockets connected::: ${io.engine.clientsCount}`)
                    let message = "QR Code is scanned. Waiting for issuance to complete...";
                    console.log(message);
                    io.to(socket.id).emit('new_issuance_activity', message);
                }
                if ( issuanceResponse.requestStatus == "issuance_successful" ) {
                    console.log(`number of sockets connected::: ${io.engine.clientsCount}`)
                    let message = "Credential successfully issued";
                    console.log(message);
                    io.to(socket.id).emit('issuance_complete', message);
                }
                if ( issuanceResponse.requestStatus == "issuance_error" ) {
                    let message = "Credential  failed to issue";
                    console.log(message);
                    io.to(socket.id).emit('new_issuance_activity', message);
                }
            })
        }
}

