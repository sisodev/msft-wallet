export const issuanceConfig = {
    "includeQRCode": false,
    "callback": {
      "url": "https://YOURPUBLICREACHABLEHOSTNAME/api/issuer/issuanceCallback",
      "state": "STATEWILLBESETINCODE",
      "headers": {
        "api-key": "OPTIONAL API-KEY for ISSUANCE CALLBACK API"
      }
    },
    "authority": "did:ion: THIS IS YOUR DID FROM THE VC PAGE IN AZURE PORTAL WHICH IS SET IN THE SAMPLE BY COPYING THE VALUE FROM CONFIG.JSON   ",
    "registration": {
      "clientName": "Verifiable Credential Expert Sample"
    },
    "type": "VerifiedPrivilegedSigner",
    "manifest": "CREDENTIAL URL IN THIS SAMPLE WILL BE COPIED FROM CONFIG.JSON",
    "pin": {
      "value": "123456",
      "length": 4
    },
    "claims": {
      "given_name": "FIRSTNAME",
      "family_name": "LASTNAME",
      "dateOfBirth":"01/01/01",
      "passportNumber":"P001",
      "country":"USA"
    }
  }