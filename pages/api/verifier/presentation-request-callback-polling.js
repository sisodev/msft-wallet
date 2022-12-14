import {getSessionById} from "../../../lib/db";

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}

export default async function handler(req,res) {
    const {state} = req.query
    if(state !== undefined) {
        const result = await getSessionById(state)
        console.log('why i have to poll')
        console.log(result)
        res.status(200).send(result ? result.session_state: "pending")
    }else {
        res.status(200).send("pending")
    }
   
 }