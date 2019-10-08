const Router=require("koa-router")
const router=new Router()

const mongoose=require("mongoose")
const fs=require("fs")

router.get("/insertAllGoodsInfo",async (ctx) => {
    
    fs.readFile("./service/data_json/newGoods.json","utf8",(err,data) => {
        if (err) throw err
        data=JSON.parse(data)
        let count=0
        const Goods=mongoose.model("Goods")
        data.map((item) => {
            let newGoods=new Goods(item)
            newGoods.save().then(() => {
                count++;
                console.log("成功"+count);
                
            }).catch((err) => {
                console.log(err);
                
            });
        })
        
    })
    ctx.body="存入数据库成功"
    
})

router.get("/insertAllCategory",async (ctx) => {
    fs.readFile("./service/data_json/category.json",(err,data) => {
        if(err) throw err
        data=JSON.parse(data)
        let count=0
        const Category=mongoose.model("Category")
        data.RECORDS.map((item) => {
            let newCategory=new Category(item)
            newCategory.save().then(() => {
                count++
                console.log("加入成功:"+count)
            }).catch((err) => {
                console.log("加入失败:"+err)
            });
        })

        
    })
    ctx.body="插入数据库成功"
})

router.get("/insertAllCategorySub",async (ctx) => {
    fs.readFile("./service/data_json/category_sub.json",(err,data) => {
        if(err) throw err
        data=JSON.parse(data)
        let count=0
        const CategorySub=mongoose.model("CategorySub")
        data.RECORDS.map((item) => {
            let newCategorySub=new CategorySub(item)
            newCategorySub.save().then(() => {
                count++
                console.log("保存成功："+count);
                
            }).catch((err) => {
                console.log("保存失败："+err);
                
            });
        })
    })
    ctx.body="存入数据库成功"
})

router.post("/getDetailGoodsInfo",async (ctx) => {
    let goodsId=ctx.request.body.goodsId
    console.log(goodsId);
    
    const Goods=mongoose.model("Goods")
    await Goods.findOne({ID:goodsId}).exec().then((result) => {
        ctx.body={code:200,msg:result}
    }).catch((err) => {
        ctx.body={code:500,msg:"服务器错误"+err}
    });
})

router.get("/getCategoryList",async (ctx) => {
    const Category=mongoose.model("Category")
    await Category.find().exec().then((result) => {
        if (result) {
            ctx.body={code:200,msg:result}
        }else{
            ctx.body={code:200,msg:result}
        }

    }).catch((err) => {
        ctx={code:500,msg:err}
    }); 
})

router.post("/getCategorySubList",async (ctx) => {
    let categoryId=ctx.request.body.categoryId
    //let categoryId=1
    const CategorySub=mongoose.model("CategorySub")
    await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec().then((result) => {
        if (result) {
            ctx.body={code:200,msg:result}
        }else{
            ctx.body={code:200,msg:result}
        }

    }).catch((err) => {
        ctx={code:500,msg:err}
    }); 
})

router.post("/getGoodsListByCategorySubId",async (ctx) => {
    let categorySubId=ctx.request.body.categorySubId
    let page=ctx.request.body.page
    let num=10
    let start=(page-1)*10

    const Goods=mongoose.model("Goods")
    await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec().then((result) => {
        if (result) {
            ctx.body={code:200,msg:result}
        }else{
            ctx.body={code:200,msg:result}
        }

    }).catch((err) => {
        ctx={code:500,msg:err}
    }); 
})







module.exports=router.routes()