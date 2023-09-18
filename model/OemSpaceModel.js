

const mongoose=require(`mongoose`)



const OemSpecSchema=mongoose.Schema({
    model_name:{  type: String,required: true },
    model_year:{type:String,required:true},
    new_price:{type:Number,required:true},
    color:{type:Array,required:true},
    mileage:{type:Number,required:true},
    power:{type:Number,required:true},
    max_speed:{type:Number,required:true},
    image:{type:String,required:true}
},{
    versionKey:false
})



const OemSpecModel=mongoose.model("oem",OemSpecSchema)



module.exports={
    OemSpecModel
}


