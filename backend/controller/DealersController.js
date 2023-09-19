


const path = require("path");
const express = require(`express`)
const { DealearsModel } = require("../model/DealersModel")
const { Authentication } = require("../middleware/Auth")
const multer = require('multer');
const { cloudinary } = require("../utils/Cloudinary");
const DealerRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + "-" + Date.now() + ext;
        cb(null, filename);
    },
});
const upload = multer({storage:storage });






DealerRouter.post("/add", upload.single('image'), Authentication, async (req, res) => {

    let { registration_place, prev_buyer, accident, original_paint, major_scratch, km, price, desc, title,oem_id } = req.body
    let id = req.body.UserId

    

    console.log("hgghghhg",req.file,"body",req)

    try {

        if(registration_place==""||prev_buyer==""||accident==""||original_paint==""||major_scratch==""||km==""||price==""||title==""||oem_id==""){
            alert("fill all the fields")
        }else{
            cloudinary.uploader.upload(req.file.path, async (err, result) => {
                console.log("ghghfg",result)
                if (result) {
                    let newdata = new DealearsModel({ image: result.url, registration_place, prev_buyer, accident, original_paint, major_scratch, km, price, desc, title, user_id: id,oem_id })
                    await newdata.save()
                    res.send({ "msg": "Car Added Successfully" })
                }
            })
        }

        


    } catch (err) {
        res.send({ "msg": "Something went wrong ! Unable to Add Cars", "err": err.message })
    }
})



DealerRouter.get("/", async (req, res) => {
    const { order, filter, search } = req.query;
    try {
      if (filter === "price") {
        let data;
        //if order is desc then we are sorting the data and sending on fronted on the basis of price in descending order
  
        if (order == "desc") {
          data = await DealearsModel.find()
            .populate("oem_id")
            .sort({ price: -1 });
          console.log(data);
        } else {
          //else if  then we are sorting the data and sending on fronted on the basis of price in ascending price
          data = await DealearsModel.find()
            .populate("oem_id")
            .sort({ price: 1 });
        }
  
        res.send(data);
      } else if (filter == "mileage") {
        let data = await DealearsModel.find().populate("oem_id").lean();
  
        if (order == "desc") {
          //if data order is descegin and filter is mileage than we are populated the oem model so that
          //we can get the desired mileage data from the realation oemId and sort on the basis of the data
          //this will lean the data in plain js object and after sorting we can send to frontend
  
          data.sort((a, b) => b.oem_id.mileage - a.oem_id.mileage);
        } else {
          data.sort((a, b) => a.oem_id.mileage - b.oem_id.mileage);
        }
  
        res.send( data );
      } else if (filter === "colors") {
        //this is used for colors filter as we have populated oemId and mathing the colors with regex query
        //having opitons i which enable case sensitive searching
  
        let data = await DealearsModel.find().populate({
          path: "oem_id",
          match: { color: { $regex: order, $options: "i" } },
        });
        //math will return the documnets which are  not found allso but wich null so we are filtering and sending on frontend
        data = data.filter((el) => el.oem_id !== null);
  
        res.send(data);
      } else {
        let data = await DealearsModel.find().populate({
          path: "oem_id",
        });
  
        res.send( data );
      }
    } catch (error) {
      res.send({ "msg":"Something Went Wrong !","err":err.message});
    }
})



DealerRouter.patch("/:id", Authentication,async (req, res) => {
      const id=req.params.id
      
      let data=req.body
      
    try {
     await DealearsModel.findOneAndUpdate({_id:id},data)  
         res.send({"msg":"Data Updated Successfully"})
       
    } catch (err) {
        res.send({ "msg": "Something went wrong ! Unable to update data", "err": err.message })
    }
})



DealerRouter.delete("/:id",Authentication,async(req,res)=>{
    const id=req.params.id
    try{
        await DealearsModel.findOneAndDelete({_id:id})

        res.send({"msg":"Data deleted Successfully"})
         
    }catch(err){
        res.send({ "msg": "Something went wrong ! Unable to delete data", "err": err.message })
    }
})


DealerRouter.get("/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
        let AllData = await DealearsModel.find({_id:id}).populate("oem_id");
        res.send(AllData)
    } catch (err) {
        res.send({ "msg": "Something went wrong ! Unable to get Cars", "err": err.message })
    }
})





module.exports = {
    DealerRouter
}