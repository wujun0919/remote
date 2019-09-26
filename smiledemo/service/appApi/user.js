const Router=require("koa-router")
const router=new Router()

router.get("/",async (ctx) => {
    ctx.body="首页"
})
router.post("/regiest",async ctx=>{
    console.log(await ctx.request.body);
    ctx.body="发到数据"
    
})

module.exports=router.routes()