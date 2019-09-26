const Koa=require("koa")
const app=new Koa();
const Router=require("koa-router")
const router=new Router()
const {connect,initSchemas}=require("./database/init")
const mongoose=require("mongoose")
const bodyParser=require("koa-bodyparser")

let user=require("./appApi/user")

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

router.get("/",async(ctx) => {
    ctx.body="hello koa"
})
router.use("/user",user)

app.use(router.routes())
app.listen(80,()=>{
    console.log('[server] starting at port 80');
    
})