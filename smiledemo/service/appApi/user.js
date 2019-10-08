const Router=require("koa-router")
const router=new Router()
const mongoose=require("mongoose")


router.get("/",async (ctx) => {
    ctx.body="首页"
})
router.post("/regiest",async ctx=>{
    const User=mongoose.model("User")
    let newUser=new User(ctx.request.body)
    await newUser.save().then(() => {
        ctx.body={
            code:200,
            msg:"注册成功"
        }
    }).catch((error) => {
        ctx.body={
            code:500,
            msg:error
        }
    })
})

router.post("/login",async (ctx) => {
    let loginUser=ctx.request.body
    let userName=loginUser.userName
    let password=loginUser.password
    const User=mongoose.model("User")

    
    await User.findOne({userName:userName}).exec().then(async(res) => {
        if (res) {
            const newUser=new User()
            await newUser.comparePassword(password,res.password).then((result) => {
               if (result) {
                   ctx.body={code:200,msg:true}
               }else{
                ctx.body={code:200,msg:false}
               }
            }).catch((err) => {
                ctx.body={code:500,msg:err}
            });
            
            
            
        }else{
            ctx.body={code:200,msg:"用户不存在"}
        }
    }).catch((error) => {
        ctx.body={code:500,msg:"查找用户错误"}
    })
})

module.exports=router.routes()