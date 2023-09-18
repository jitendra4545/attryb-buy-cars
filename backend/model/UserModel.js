

const mongoose=require('mongoose')



const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
},{
    versionKey:false
})


const UserModel=mongoose.model('CarUser',UserSchema)


module.exports={
    UserModel
}






