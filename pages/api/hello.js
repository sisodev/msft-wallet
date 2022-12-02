import {insertSession, selectAll, getSessionById, updateSessionById, deleteSessionById} from "../../lib/db";
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os';


export default async function handler(req, res) {
  if(req.method === "GET") {
    // console.log(`header info::: ${JSON.stringify(req.header)}`)
    // const {state} = req.query
    // console.log(state)
    // const result = await selectAll() 
    // console.log(result)
    // res.status(200).json({result })
    let mypath = path.resolve(process.cwd(), "public/")

    res.status(200).json({"path": mypath, "os": os.type() })
  }
  if(req.method === "POST") {
    console.log(req.body.image)
    return res.status(200).json({"status": "File uploaded"})
  }
}
