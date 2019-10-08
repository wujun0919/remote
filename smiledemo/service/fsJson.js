const fs=require("fs")

fs.readFile("./goods.json","utf8",(err,data)=>{
    let newData=JSON.parse(data)
    let pushData=[]
    newData.RECORDS.map((item) => {
        if (item.IMAGE1!=null) {
            pushData.push(item) 
        }
    })

    fs.writeFile("./newGoods.json",JSON.stringify(pushData),(err) => {
        if(err) console.log("写文件操作失败");
        else console.log("写文件操作成功");
        
        
    })
})