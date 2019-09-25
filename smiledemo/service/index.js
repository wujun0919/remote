const Koa=require("koa")
const {connect,initSchemas}=require("./database/init")
const mongoose=require("mongoose")
const router=require("koa-router")()
let user=require("./appApi/user")
const bodyParser=require("koa-bodyparser")
const app=new Koa();

app.use(bodyParser())
// (async ()=>{
//     await connect()
//     initSchemas()
//     const User=mongoose.model("User")
//     let oneUser=new User({userName:"jspangaa",password:"123456"})
//     oneUser.save().then(()=>{
//         console.log("插入成功");
        
//     })
// })()

// app.use(async(ctx,next)=>{
//     ctx.body="<h1>hello koa2</h1>"
//     next()
// })

router.use("/user",user)

app.use(router.routes())
app.listen(80,()=>{
    console.log('[server] starting at port 3000');
    
})