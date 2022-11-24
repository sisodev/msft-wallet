import { getSession } from "../../../lib/get-session";

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}



export default async function  handler(req, res) {
    if(req.method === "GET") {
            socket_user = socket
            console.log(socket_user)
            res.status(200).json({"messsage": "socket is initialized"})
         }else if(req.method === "POST") {
            const issuanceResponse = req.body;
            const session = await getSession(req,res)

            if ( issuanceResponse.requestStatus == "request_retrieved" ) {
                let message = "QR Code is scanned. Waiting for issuance to complete...";
                const sessionData = {"status" : "request_retrieved", "message": message}
                session.sessionData = sessionData
                res.status(200).json(issuanceResponse)
            }
            if ( issuanceResponse.requestStatus == "issuance_successful" ) {
                let message = "Credential successfully issued";
                const sessionData = {"status" : "issuance_successful", "message": message}
                session.sessionData = sessionData;
                res.status(200).json(issuanceResponse)
            }
            if ( issuanceResponse.requestStatus == "issuance_error" ) {
                let message = "Credential  failed to issue";
                const sessionData = {"status" : "issuance_error","message": issuanceResponse.error.message,"payload" :issuanceResponse.error.code}
                session.sessionData = sessionData;
                res.status(200).json(issuanceResponse)
            }
        }
}

