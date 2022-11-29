import {insertSession, selectAll, getSessionById, updateSessionById, deleteSessionById} from "../../lib/db";


export default async function handler(req, res) {
  if(req.method === "GET") {
    console.log(`header info::: ${JSON.stringify(req.header)}`)
    const {state} = req.query
    console.log(state)
    const result = await selectAll() 
    console.log(result)
    res.status(200).json({result })
  }
}
