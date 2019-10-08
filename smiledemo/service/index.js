const Koa=require("koa")
const app=new Koa();
const Router=require("koa-router")
const router=new Router()
const {connect,initSchemas}=require("./database/init")
const mongoose=require("mongoose")
const bodyParser=require("koa-bodyparser")
var cors = require('koa2-cors');

let user=require("./appApi/user")
let goods=require("./appApi/goods")

app.use(bodyParser())
app.use(cors({
  origin:(ctx)=>{
    if (ctx.header.origin=="http://localhost:8080") {
      return "*"
    }
    return false
  }
}))

;(async ()=>{
    await connect()
    initSchemas()
})()

router.get("/",async(ctx) => {
    ctx.body="hello koa"
})

router.use("/user",user)
router.use("/goods",goods)

app.use(router.routes())
app.listen(process.env.PORT || 80,process.env.host || "localhost",()=>{
    console.log('[server] starting at port 80');
    
})