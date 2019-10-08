const BASEURL="https://api.myjson.com/bins/uak5d"
const LOCALURL="http://localhost"

export const url={
    getShoppingMailInfo:BASEURL+"/",
    getGoodsInfo:BASEURL+"/getGoodsInfo",
    regiestUser:LOCALURL+"/user/regiest",
    loginUser:LOCALURL+"/user/login",
    getDetailGoodsInfo:LOCALURL+"/goods/getDetailGoodsInfo",
    getCategoryList:LOCALURL+"/goods/getCategoryList",
    getCategorySubList:LOCALURL+"/goods/getCategorySubList",
    getGoodsListByCategorySubId:LOCALURL+"/goods/getGoodsListByCategorySubId"
}

