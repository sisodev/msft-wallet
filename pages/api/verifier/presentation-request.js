import { config as cfg, msalConfig, cca, msalClientCredentialRequest, verifier_api_request_endpoint } from "../../../configs/config";
import { presentationConfig } from "../../../configs/presentation_request_config";

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true
    },
}

export default async function  handler(req, res) {
    
    if(req.method === 'POST') {
        const {hostname} = req.body
        const result  = await cca.acquireTokenByClientCredential(msalClientCredentialRequest)
        if(result) {
            let accessToken = result.accessToken;
            presentationConfig.registration.clientName = "Node.js SDK API Verifier";
            presentationConfig.authority = cfg["VerifierAuthority"]
            presentationConfig.requestedCredentials[0].acceptedIssuers[0] = cfg["IssuerAuthority"]
            presentationConfig.callback.url = `https://${hostname}/api/verifier/presentation-request-callback`;
            const payload = JSON.stringify(presentationConfig);
            const fetchOptions = {
                method: 'POST',
                body: payload,
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': payload.length.toString(),
                  'Authorization': `Bearer ${accessToken}`
                }
              };
            const response = await fetch(verifier_api_request_endpoint, fetchOptions);
            const resp = await response.json()
            res.status(200).json(resp)
        }
    }
}
