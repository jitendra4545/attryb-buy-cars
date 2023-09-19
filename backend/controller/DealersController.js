


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
const upload = multer({ storage });




// DealerRouter.get("/", (req, res) => {
//     res.send('hi this Dealers')
// })


DealerRouter.post("/add", upload.single('image'), Authentication, async (req, res) => {

    let { registration_place, prev_buyer, accident, original_paint, major_scratch, km, price, desc, title } = req.body
    let id = req.body.UserId

    console.log(id)


    try {
        cloudinary.uploader.upload(req.file.path, async (err, result) => {
            console.log(result)
            if (result) {
                let newdata = new DealearsModel({ image: result.url, registration_place, prev_buyer, accident, original_paint, major_scratch, km, price, desc, title, user_id: id })
                await newdata.save()
                res.send({ "msg": "Car Added Successfully" })
            }
        })


    } catch (err) {
        res.send({ "msg": "Something went wrong ! Unable to Add Cars", "err": err.message })
    }
})



DealerRouter.get("/", async (req, res) => {
    try {
        let AllData = await DealearsModel.find({}).populate("oem_id");
        res.send(AllData)
    } catch (err) {
        res.send({ "msg": "Something went wrong ! Unable to get Cars", "err": err.message })
    }
})



DealerRouter.patch("/:id", async (req, res) => {
      const id=req.params.id
      
      let data=req.body
      
    try {
     await DealearsModel.findOneAndUpdate({_id:id},data)  
         res.send({"msg":"Data Updated Successfully"})
       
    } catch (err) {
        res.send({ "msg": "Something went wrong ! Unable to update data", "err": err.message })
    }
})



DealerRouter.delete("/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await DealearsModel.findOneAndDelete({_id:id})

        res.send({"msg":"Data deleted Successfully"})
         
    }catch(err){
        res.send({ "msg": "Something went wrong ! Unable to delete data", "err": err.message })
    }
})








module.exports = {
    DealerRouter
}