import { getUserDetails } from "../../lib/db"


export default async function handler(req, res) {
    if(req.method === "GET") {
        const {state} = req.query
        const user = await getUserDetails(state)
        if(user) {
            console.log(`in the api:: ${JSON.stringify(user,null,2)}`)
            res.status(200).json(user)
        }else{
            res.status(400).json({user: "not found"})
        }
    }
}