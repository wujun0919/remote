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
},{collection:"user"})

userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject) => {
            let isOk=true
            if (md5(_password)==password) {
                isOk=true
            }else{
                isOk=false
            }
            resolve(isOk)
        })
    }
}



mongoose.model("User",userSchema)