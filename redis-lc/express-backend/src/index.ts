import express from "express"
import { createClient } from "redis"

const app = express()
app.use(express.json())
const client = createClient()
client.connect()

let temp = 0;

app.post("/submit", async(req, res) => {
    let { problem, userId, code, language } = req.body;

    temp = temp+1;

    await client.lPush("submissions", JSON.stringify({problem, temp, userId, code, language}))
    res.json({message: "Submitted"})
})

app.listen(3000)