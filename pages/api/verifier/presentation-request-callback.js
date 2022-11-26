import { Server } from "socket.io";

import { EventEmitter } from 'node:events';

EventEmitter.defaultMaxListeners = Infinity;

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
            io.to(socket.id).emit('new_verification_activity', "");
          });
          return res.end()
          
     }else if(req.method === "POST") {
        res.socket.server.io = io;
        const presentationResponse = req.body;
        io.on("connection", (socket) => {
            if ( presentationResponse.requestStatus == "request_retrieved" ) {
                console.log(`number of sockets connected::: ${io.engine.clientsCount}`)
                let message = "QR Code is scanned. Waiting for validation to complete...";
                console.log(message);
                io.to(socket.id).emit('new_verification_activity', message);
                return;
            }

            if ( presentationResponse.requestStatus == "presentation_verified" ) {
                console.log(`number of sockets connected::: ${io.engine.clientsCount}`)
                console.log("Verification complete")
                // const message = {
                //     "status": presentationResponse.requestStatus,
                //     "message": "Presentation received",
                //     "payload": presentationResponse.verifiedCredentialsData,
                //     "subject": presentationResponse.subject,
                //     "firstName": presentationResponse.verifiedCredentialsData[0].claims.firstName,
                //     "lastName": presentationResponse.verifiedCredentialsData[0].claims.lastName,
                //     "presentationResponse": presentationResponse,
                //     "status": "Validation Complete"
                // }
                io.to(socket.id).emit('verification_complete', "Verification Complete")
                return;
            }
        })
     }

}
