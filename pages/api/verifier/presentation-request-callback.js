import {insertSession, updateSessionById } from "../../../lib/db"

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}


export default async function  handler(req, res) {
     if(req.method === "POST") {
        const presentationResponse = req.body;
        console.log(JSON.stringify(presentationResponse,null,2))
            if ( presentationResponse.requestStatus == "request_retrieved" ) {
                let message = "QR Code is scanned.";
                console.log(message);
                const result = await insertSession(presentationResponse.state, message)
                console.log(result);
                return res.end();
            }

            if ( presentationResponse.requestStatus == "presentation_verified" ) {
                console.log("Verification complete")
                const payload = {
                    "status": presentationResponse.requestStatus,
                    "message": "Presentation received",
                    "payload": presentationResponse.verifiedCredentialsData,
                    "subject": presentationResponse.subject,
                    "firstName": presentationResponse.verifiedCredentialsData[0].claims.firstName,
                    "lastName": presentationResponse.verifiedCredentialsData[0].claims.lastName,
                    "presentationResponse": presentationResponse,
                    "status": "Validation Complete"
                }
                console.log(`payload : ${payload}`)
                let message = "Verification complete"
                console.log(message)
                const result = await updateSessionById(presentationResponse.state, message)
                console.log(result);
                return res.end();
            }
        // })
     }

}
