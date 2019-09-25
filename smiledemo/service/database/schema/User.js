const mongoose=require("mongoose")
const md5=require("md5")

const SALT_WORK_FACTOR=10
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const userSchema=new Schema({
    userId:{type:ObjectId},
    userName:{unique:true,type:String},
    password:{type:String,set:(val)=>{
        return md5(val)
    }},
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})

// userSchema.pre("save",(next)=>{
//     md5(this.password)
//     next()
// })

mongoose.model("User",userSchema)