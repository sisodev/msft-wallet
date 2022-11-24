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
            socket.emit('new_issuance_activity', "Pls ignore");
          });
          res.end()
          return
     }else if(req.method === "POST") {
            res.socket.server.io = io;
            const issuanceResponse = req.body;
            io.on("connection", (socket) => {
                if ( issuanceResponse.requestStatus == "request_retrieved" ) {
                    let message = "QR Code is scanned. Waiting for issuance to complete...";
                    console.log(message);
                    socket.emit('new_issuance_activity', message);
                    res.status(200).json(issuanceResponse)
                    return;
                }
                if ( issuanceResponse.requestStatus == "issuance_successful" ) {
                    let message = "Credential successfully issued";
                    console.log(message);
                    socket.emit('new_issuance_activity', message);
                    res.status(200).json(issuanceResponse)
                    return;
                }
                if ( issuanceResponse.requestStatus == "issuance_error" ) {
                    let message = "Credential  failed to issue";
                    console.log(message);
                    socket.emit('new_issuance_activity', message);
                    res.status(200).json(issuanceResponse)
                    return;
                }
            })
        }
}

