const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const cors = require("cors")
const sql = require("mssql")

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const config = {
    user: process.env.DB_USER || "quizadmin",
    password: process.env.DB_PASSWORD || "password",
    server: process.env.DB_SERVER || "quizserver.database.windows.net",
    database: process.env.DB_NAME || "quizdb",
    options: { encrypt: true }
}

sql.connect(config).then(()=>console.log("Connected to Azure SQL"))

app.get("/results", async (req,res)=>{
const result = await sql.query`SELECT * FROM Answers`
res.json(result.recordset)
})

app.post("/vote", async (req,res)=>{
const {answer_id} = req.body
await sql.query`
UPDATE Answers
SET votes = votes + 1
WHERE id = ${answer_id}
`
io.emit("updateResults")
res.send("vote saved")
})

server.listen(process.env.PORT || 3000,()=>{
console.log("Server running")
})