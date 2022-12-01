import {insertSession, selectAll, getSessionById, updateSessionById, deleteSessionById} from "../../lib/db";
import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if(req.method === "GET") {
    // console.log(`header info::: ${JSON.stringify(req.header)}`)
    // const {state} = req.query
    // console.log(state)
    // const result = await selectAll() 
    // console.log(result)
    // res.status(200).json({result })
    console.log(path.join(process.cwd(), "/public"))

    res.status(200).json({"test": "testing path"})
  }
  if(req.method === "POST") {
    console.log(req.body.image)
    return res.status(200).json({"status": "File uploaded"})
  }
}
