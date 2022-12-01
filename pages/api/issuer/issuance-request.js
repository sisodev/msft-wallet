import { config as cfg, msalConfig, cca, msalClientCredentialRequest, issuer_api_request_endpoint } from "../../../configs/config";
import { issuanceConfig } from "../../../configs/issuance_request_config";
import { v4 as uuidv4 } from 'uuid';



export const config = {
    api: {
      bodyParser: true,
      externalResolver: true
    },
}


export default async function  handler(req, res) {
    if(req.method === 'GET') {
        res.status(200).json({"name": "Get Issuancce"})
    }else if(req.method === 'POST') {
        const {claims,hostname,selectedImage} = req.body
        console.log(`the claims received at the backend are:: ${JSON.stringify(claims,null,2)}`)
        const result  = await cca.acquireTokenByClientCredential(msalClientCredentialRequest)
        if(result) {
            const {accessToken} = result;
            issuanceConfig.registration.clientName = "Microsoft Treasury";
            issuanceConfig.authority = cfg.IssuerAuthority;
            issuanceConfig.manifest = cfg.CredentialManifest;
            issuanceConfig.callback.url = `https://${hostname}/api/issuer/issuance-request-callback`;
            issuanceConfig.callback.state = uuidv4();
            console.log(`in the request ${issuanceConfig.callback.state}`)
            const apiKey = uuidv4();
            issuanceConfig.callback.headers['api-key'] = apiKey;
            issuanceConfig.pin.value = generatePin( issuanceConfig.pin.length );
            issuanceConfig.claims.given_name = claims.fname;
            issuanceConfig.claims.dateOfBirth = claims.dateOfBirth;
            issuanceConfig.claims.emailAddress =claims.emailaddress;
            issuanceConfig.claims.domicile = claims.domicile;
            issuanceConfig.claims.privilegedSigner=claims.psignr;
            issuanceConfig.claims.photo = selectedImage;
            const payload = JSON.stringify(issuanceConfig);
            const option = {
                method: 'POST',
                body: payload,
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': payload.length.toString(),
                  'Authorization': `Bearer ${accessToken}`
                }
              };
            const response = await fetch(issuer_api_request_endpoint, option);
            const resp = await response.json()
            resp.pin = issuanceConfig.pin.value
            resp.state = issuanceConfig.callback.state
            if ( response.status > 299 ) {
                res.status(400).json( resp.error );  
            } else {
                res.status(200).json( resp );       
            }
        }
    }
   
}


function generatePin( digits ) {
    var add = 1, max = 12 - add;
    max        = Math.pow(10, digits+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ("" + number).substring(add); 
}