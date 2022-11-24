import url from 'node:url';
import {ConfidentialClientApplication} from "@azure/msal-node";


export const config = {
    "azTenantId": "fe83c546-e3ca-4d22-9fbf-10cb709424b1",
    "azClientId": "8cd8826d-b54a-498a-9319-e6baed79eff7",
    "azClientSecret": "BA78Q~TOzURAlXi17fJrcx28i5G27ZVQ1O_6eauD",
    "azCertificateName":  "",
    "azCertThumbprint":  "",
    "azCertificatePrivateKeyLocation":  "",
    "CredentialManifest": "https://verifiedid.did.msidentity.com/v1.0/tenants/fe83c546-e3ca-4d22-9fbf-10cb709424b1/verifiableCredentials/contracts/ZmU4M2M1NDYtZTNjYS00ZDIyLTlmYmYtMTBjYjcwOTQyNGIxdGVzdA/manifest",
    "IssuerAuthority": "did:ion:EiADyuOOFHQoQCiRVj1M6i9aDJwLpqgc88W-r2wQjf4iFA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJlZjNiNzJhZjg1ZWI0MDc3ODE1YmMzMGU2OTk2ZjJkOXZjU2lnbmluZ0tleS1hODc2YyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJVREJ4ZzYzWDFKLTlWRUNaT25sZ2NqQjFUa2p3TDFmY0Z0bUdYektXM1g0IiwieSI6IkpQZ3ZKRlk5bHpjV201NVJmc3pyRk1TbUs3VGlQVXlDOUtNbWNpdWhKX0EifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJhc3NlcnRpb25NZXRob2QiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoibGlua2VkZG9tYWlucyIsInNlcnZpY2VFbmRwb2ludCI6eyJvcmlnaW5zIjpbImh0dHBzOi8vd3d3Lm1pY3Jvc29mdC5jb20vIl19LCJ0eXBlIjoiTGlua2VkRG9tYWlucyJ9LHsiaWQiOiJodWIiLCJzZXJ2aWNlRW5kcG9pbnQiOnsiaW5zdGFuY2VzIjpbImh0dHBzOi8vaHViLmRpZC5tc2lkZW50aXR5LmNvbS92MS4wL2ZlODNjNTQ2LWUzY2EtNGQyMi05ZmJmLTEwY2I3MDk0MjRiMSJdfSwidHlwZSI6IklkZW50aXR5SHViIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlERlp0X1UtWGc2a3dSYTY2Smx4LVFSWnYzZTk3SlZhSkpoaUk0X2txdnFzdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHh5T3RzM1ZIWXJBWHJ1Y1lTNGpUWUd5Ri16dUluNkk5YlI3WkQyWVBjQ0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURXWWJtV0t2X2xXZHp6UzZBX1lrOVpjYkM3SW1aazFNZXpUWTZOMDZxSklBIn19",
    "VerifierAuthority": "did:ion:EiADyuOOFHQoQCiRVj1M6i9aDJwLpqgc88W-r2wQjf4iFA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJlZjNiNzJhZjg1ZWI0MDc3ODE1YmMzMGU2OTk2ZjJkOXZjU2lnbmluZ0tleS1hODc2YyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJVREJ4ZzYzWDFKLTlWRUNaT25sZ2NqQjFUa2p3TDFmY0Z0bUdYektXM1g0IiwieSI6IkpQZ3ZKRlk5bHpjV201NVJmc3pyRk1TbUs3VGlQVXlDOUtNbWNpdWhKX0EifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJhc3NlcnRpb25NZXRob2QiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoibGlua2VkZG9tYWlucyIsInNlcnZpY2VFbmRwb2ludCI6eyJvcmlnaW5zIjpbImh0dHBzOi8vd3d3Lm1pY3Jvc29mdC5jb20vIl19LCJ0eXBlIjoiTGlua2VkRG9tYWlucyJ9LHsiaWQiOiJodWIiLCJzZXJ2aWNlRW5kcG9pbnQiOnsiaW5zdGFuY2VzIjpbImh0dHBzOi8vaHViLmRpZC5tc2lkZW50aXR5LmNvbS92MS4wL2ZlODNjNTQ2LWUzY2EtNGQyMi05ZmJmLTEwY2I3MDk0MjRiMSJdfSwidHlwZSI6IklkZW50aXR5SHViIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlERlp0X1UtWGc2a3dSYTY2Smx4LVFSWnYzZTk3SlZhSkpoaUk0X2txdnFzdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHh5T3RzM1ZIWXJBWHJ1Y1lTNGpUWUd5Ri16dUluNkk5YlI3WkQyWVBjQ0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURXWWJtV0t2X2xXZHp6UzZBX1lrOVpjYkM3SW1aazFNZXpUWTZOMDZxSklBIn19"
}

export const issuer_api_request_endpoint = "https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest"

export const msalConfig = {
    auth: {
        clientId: config.azClientId,
        authority: `https://login.microsoftonline.com/${config.azTenantId}`,
        clientSecret: config.azClientSecret,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 4
        }
    }
  };

export const cca = new ConfidentialClientApplication(msalConfig);
export const msalClientCredentialRequest = {
    scopes: ["3db474b9-6a0c-4840-96ac-1fceb342124f/.default"],
    skipCache: false, 
};