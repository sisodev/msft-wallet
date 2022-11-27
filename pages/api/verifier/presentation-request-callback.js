export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}


export default async function  handler(req, res) {
     if(req.method === "POST") {
        const presentationResponse = req.body;
            if ( presentationResponse.requestStatus == "request_retrieved" ) {
                let message = "QR Code is scanned. Waiting for validation to complete...";
                session.message = message
                console.log(message);
                // io.to(socket.id).emit('new_verification_activity', message);
                return res.end();
            }

            if ( presentationResponse.requestStatus == "presentation_verified" ) {
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
                let message = "Verification complete"
                session.message = message
                return res.end();
            }
        // })
     }

}
