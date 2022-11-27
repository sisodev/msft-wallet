import {getSessionById} from "../../../lib/db";

export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
}


export default async function handler(req,res) {
   const {state} = req.query
   const {session_state} = await getSessionById(state)
   res.status(200).send(session_state)
}