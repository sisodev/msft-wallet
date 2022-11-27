import {insertSession, updateSessionById } from "../../../lib/db"

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}




export default async function  handler(req, res) {
    if(req.method === "GET") {
          res.end()
          return
     }else if(req.method === "POST") {
            const issuanceResponse = req.body;
                if ( issuanceResponse.requestStatus == "request_retrieved" ) {
                    let message = "QR Code is scanned. Waiting for issuance to complete...";
                    console.log(message)
                    const result = await insertSession(issuanceResponse.state, message)
                    console.log(result);
                    return res.end()
                }
                if ( issuanceResponse.requestStatus == "issuance_successful" ) {
                    let message = "Credential successfully issued";
                    console.log(message);
                    const result = await updateSessionById(issuanceResponse.state, message)
                    console.log(result);
                    return res.end()
                }
                if ( issuanceResponse.requestStatus == "issuance_error" ) {
                    let message = "Credential  failed to issue";
                    console.log(message);
                    return res.end()
                    
                }
        }
}

