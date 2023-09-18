


const mongoose=require(`mongoose`)
const { OemSpecModel } = require("./OemSpaceModel")


const DealersSchema=mongoose.Schema({
    user_id:{type:String},
    oem_id:{type:mongoose.Schema.Types.ObjectId,ref:OemSpecModel},
    image:{type:String,required:true},
    title:{type:String,required:true},
    desc:{type:Array,required:true},
    price:{type:Number,required:true},
    km:{type:Number,required:true},
    major_scratch:{type:String,required:true},
    original_paint:{type:String,required:true},
    accident:{type:Number,required:true},
    prev_buyer:{type:Number,required:true},
    registration_place:{type:String,required:true},
})


const DealearsModel=mongoose.model("dealers_car",DealersSchema)


module.exports={
    DealearsModel
}