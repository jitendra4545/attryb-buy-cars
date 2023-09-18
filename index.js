
const cors=require(`cors`)
require(`dotenv`).config()
const express=require('express')
const { connection } = require('./config/db')
const { UserRouter } = require('./controller/UserController')
const { Authentication } = require('./middleware/Auth')
const { DealerRouter } = require('./controller/DealersController')
const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",UserRouter)
app.use("/dealer",DealerRouter)

app.get("/",(req,res)=>{
    res.send('hi there!')
})



app.listen(process.env.port,async()=>{
    try{
             await connection
             console.log(`DB connected Successfully`)
    }catch(err){
         console.log(`Unable to Connect With DB`)
    }
    console.log(`Server running on port ${process.env.port}`)
})