import { faS } from "@fortawesome/free-solid-svg-icons";
import {insertSession, updateSessionById, insertUserDetails } from "../../../lib/db";
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os';

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}


export default async function  handler(req, res) {
     if(req.method === "POST") {
        const presentationResponse = req.body;
        // console.log(JSON.stringify(presentationResponse,null,2))
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
                    "dateOfBirth": presentationResponse.verifiedCredentialsData[0].claims.dateOfBirth,
                    "emailAddress": presentationResponse.verifiedCredentialsData[0].claims.emailAddress,
                    "domicile": presentationResponse.verifiedCredentialsData[0].claims.domicile,
                    "privilegedSigner": presentationResponse.verifiedCredentialsData[0].claims.privilegedSigner
                }
                // console.log(`payload : ${payload}`)
                // faS.writeFileSync(path.resolve(__dirname, "./assets/"))
                const photopath =  os.type().indexOf("Windows") !== -1? path.join(process.cwd(), "/public") : "/home/site/wwwroot/public"
                let buff = Buffer.from(presentationResponse.verifiedCredentialsData[0].claims.photo, 'base64')
                await fs.writeFile(path.join(photopath, `/${presentationResponse.state}.jpg`), buff)
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
