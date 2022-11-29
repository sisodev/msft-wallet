import {insertSession, updateSessionById, insertUserDetails } from "../../../lib/db"

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
                    "state": presentationResponse.state,
                    "firstName": presentationResponse.verifiedCredentialsData[0].claims.name,
                    "cooperateTitle": presentationResponse.verifiedCredentialsData[0].claims.cooperateTitle,
                    "dateOfBirth": presentationResponse.verifiedCredentialsData[0].claims.dateOfBirth,
                    "emailAddress": presentationResponse.verifiedCredentialsData[0].claims.emailAddress,
                    "phoneNumber": presentationResponse.verifiedCredentialsData[0].claims.phoneNumber,
                    "domicile": presentationResponse.verifiedCredentialsData[0].claims.domicile,
                    "privilegedSigner": presentationResponse.verifiedCredentialsData[0].claims.privilegedSigner
                }
                console.log(`payload : ${payload}`)
                let message = "Verification complete"
                console.log(message)
                const result = await updateSessionById(presentationResponse.state, message)
                if(result) {
                    const insert_res = await insertUserDetails(payload)
                    if(insert_res) {
                         console.log("User details inserted successfully")
                         console.log(insert_res)
                    }
                }
                console.log(result);
                return res.end();
            }
        // })
     }

}
