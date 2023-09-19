

const express=require('express')
const { OemSpecModel } = require('../model/OemSpaceModel')

const OemSpecRouter=express.Router()



OemSpecRouter.get("/",async(req,res)=>{

    const { q } = req.query;

    try{
        if(q){
            let data= await OemSpecModel.find({
                $or: [
                    { model_name: { $regex: q, $options: "i" } },
                    { model_year: { $regex: q, $options: "i" } }
                   
                  ]
               })
             res.send(data)
        }else{
            let data=await OemSpecModel.find()
            res.send(data)
        }
      
    }catch(err){
res.send({"msg":"Something Went Wrong !","err":err.message})
    }
})


OemSpecRouter.post("/",async(req,res)=>{
    let data=req.body
    try{
        let newData=new OemSpecModel(data)
        await newData.save()
        res.send("a")
    }catch(err){
 res.send(err)
    }
})

module.exports={
    OemSpecRouter
}