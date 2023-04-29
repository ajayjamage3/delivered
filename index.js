const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {restoRouter} = require("./routes/resto.route")
const { orderRouter } = require("./routes/order.route")
const app = express()
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Welcome")
})
app.use("/",userRouter)
app.use("/",restoRouter)
app.use("/",orderRouter)

const port = process.env.port

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at ${port}`)
})