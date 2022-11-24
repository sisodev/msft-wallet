import { getSession } from "../../../lib/get-session";

export default async function  handler(req, res) {
    if(req.method === "GET") {
        const session = await getSession(req,res)
        let resp = JSON.parse(JSON.stringify(session.sessionData))
        res.status(200).json(resp)
    }
}