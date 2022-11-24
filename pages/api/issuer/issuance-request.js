import { config as cfg, msalConfig, cca, msalClientCredentialRequest, issuer_api_request_endpoint } from "../../../configs/config";
import { issuanceConfig } from "../../../configs/issuance_request_config";


export const config = {
    api: {
      bodyParser: true,
    },
}


export default async function  handler(req, res) {
    if(req.method === 'GET') {
        res.status(200).json({"name": "Get Issuancce"})
    }else if(req.method === 'POST') {
        const {claims} = req.body
        const result  = await cca.acquireTokenByClientCredential(msalClientCredentialRequest)
        if(result) {
            const {accessToken} = result;
            issuanceConfig.registration.clientName = "Node.js SDK API Issuer";
            issuanceConfig.authority = cfg.IssuerAuthority;
            issuanceConfig.manifest = cfg.CredentialManifest;
            issuanceConfig.callback.url = `https://ms-entra-demo.azurewebsites.net/api/issuer/issuance-request-callback`;
            issuanceConfig.pin.value = generatePin( issuanceConfig.pin.length );
            issuanceConfig.claims.given_name = claims.fname;
            issuanceConfig.claims.family_name = claims.lname;
            issuanceConfig.claims.dateOfBirth = claims.dateOfBirth;
            issuanceConfig.claims.passportNumber = claims.passportNumber;
            issuanceConfig.claims.country = claims.country;
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
            if ( response.status > 299 ) {
                res.status(400).json( resp.error );  
            } else {
                res.status(200).json( resp );       
            }
           // res.status(200).json(payload)
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