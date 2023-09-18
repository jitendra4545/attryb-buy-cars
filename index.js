

require(`dotenv`).config()
const express=require('express')
const app=express()




app.get("/",(req,res)=>{
    res.send('hi there!')
})



app.listen(process.env.port,()=>{
    console.log(`Server running on port ${process.env.port}`)
})