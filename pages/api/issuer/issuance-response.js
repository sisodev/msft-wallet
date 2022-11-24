import { getSession } from "../../../lib/get-session";

export default async function  handler(req, res) {
    if(req.method === "GET") {
        const session = await getSession(req,res)
        // console.log(session)
        // let resp = JSON.parse(JSON.stringify(session.sessionData))
        res.status(200).json({"message": "polling"})
    }
}