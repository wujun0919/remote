const mongoose=require('mongoose')
const db="mongodb://localhost/smile-db"
const glob=require("glob")
const {resolve}=require("path")

exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,"./schema","**/*.js")).forEach(require)
}

let maxConnectTimes=1
exports.connect=()=>{
    mongoose.connect(db,{useUnifiedTopology: true,useNewUrlParser: true});

    return new Promise((resolve,reject)=>{

        mongoose.connection.on("disconnected",()=>{
            console.log("****************数据库断开*****************");
            if (maxConnectTimes<=3) {
                maxConnectTimes++;
                mongoose.connect(db,{useUnifiedTopology: true,useNewUrlParser: true});
            }else{
                reject()
                throw new Error("数据库断开，请检查网络")
            }
        })
    
        mongoose.connection.on("error",(err)=>{
            console.log("****************数据库出错*****************");
            if (maxConnectTimes<=3) {
                maxConnectTimes++;
                mongoose.connect(db,{useUnifiedTopology: true,useNewUrlParser: true});
            }else{
                reject(err)
                throw new Error("数据库出现问题")
            }
        })
    
        mongoose.connection.once("open",()=>{
            console.log("****************数据库连接成功***************");
            resolve()
        })

    })
    
}