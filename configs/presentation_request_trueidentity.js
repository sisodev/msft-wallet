export const presentation_request_trueidentity = {
    "includeQRCode": false,
    "callback": {
      "url": "https://YOURPUBLICREACHABLEHOSTNAME/api/verifier/presentationCallback",
      "state": "STATEWILLBESETINCODE",
      "headers": {
        "api-key": "OPTIONAL API-KEY for VERIFIER CALLBACK API"
      }
    },
    "authority": "did:ion: THIS IS YOUR DID FROM THE VC PAGE IN AZURE PORTAL WHICH IS SET IN THE SAMPLE BY COPYING THE VALUE FROM APPSETTINGS.JSON   ",
    "registration": {
      "clientName": "TrueIdentity Verifier",
      "purpose": "So we can see your identity has been verified by True Identity"
    },
  
    "includeReceipt": false,
    "requestedCredentials": [
      {
        "type": "TrueIdentity",
        "purpose": "So we can see your identity has been verified by True Identiy",
        "acceptedIssuers": [ "did:ion:EiDXOEH-YmaP2ZvxoCI-lA5zT1i5ogjgH6foIc2LFC83nQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWdfODEwYmQ1Y2EiLCJwdWJsaWNLZXlKd2siOnsiY3J2Ijoic2VjcDI1NmsxIiwia3R5IjoiRUMiLCJ4IjoiRUZwd051UDMyMmJVM1dQMUR0Smd4NjdMMENVVjFNeE5peHFQVk1IMkw5USIsInkiOiJfZlNUYmlqSUpqcHNxTDE2Y0lFdnh4ZjNNYVlNWThNYnFFcTA2NnlWOWxzIn0sInB1cnBvc2VzIjpbImF1dGhlbnRpY2F0aW9uIiwiYXNzZXJ0aW9uTWV0aG9kIl0sInR5cGUiOiJFY2RzYVNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTkifV0sInNlcnZpY2VzIjpbeyJpZCI6ImxpbmtlZGRvbWFpbnMiLCJzZXJ2aWNlRW5kcG9pbnQiOnsib3JpZ2lucyI6WyJodHRwczovL2RpZC53b29kZ3JvdmVkZW1vLmNvbS8iXX0sInR5cGUiOiJMaW5rZWREb21haW5zIn0seyJpZCI6Imh1YiIsInNlcnZpY2VFbmRwb2ludCI6eyJpbnN0YW5jZXMiOlsiaHR0cHM6Ly9iZXRhLmh1Yi5tc2lkZW50aXR5LmNvbS92MS4wLzNjMzJlZDQwLThhMTAtNDY1Yi04YmE0LTBiMWU4Njg4MjY2OCJdfSwidHlwZSI6IklkZW50aXR5SHViIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlCUlNqWlFUYjRzOXJzZnp0T2F3OWVpeDg3N1l5d2JYc2lnaFlMb2xTSV9KZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQXZDTkJoODlYZTVkdUk1dE1wU2ZyZ0k2aVNMMmV2QS0tTmJfUElmdFhfOGciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUN2RFdOTFhzcE1sbGJfbTFJal96ZV9SaWNKOWdFLUM1b2dlN1NnZTc5cy1BIn19" ]
      }
    ],
    "configuration": {
      "validation": {
        "allowRevoked": true,
        "skipLinkedDomainCheck": true
      }
    }
  }