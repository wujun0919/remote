<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow=""
                @click-left="onClickLeft"
            />
        </div>
        <div class="topImage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goodss-price">{{goodsInfo.PRESENT_PRICE | moneyFilter}} </div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="goods-detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评论"></van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div><van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button></div>
            <div><van-button size="large" type="danger">直接购买</van-button></div>
        </div>
    </div>
</template>

<script>
    import { Toast } from "vant";
    import { url } from "../serviceApi.config";
    import axios from "axios";
    import { toMoney } from "../filter/moneyFilter";

    export default {
        data() {
            return {
                goodsId: "",
                goodsInfo:{}
            }
        },
        created(){
            this.getInfo()
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods:{
            getInfo(){
                this.goodsId=this.$route.query.goodsId
                
                axios({
                    url:url.getDetailGoodsInfo,
                    method:"post",
                    data:{goodsId:this.goodsId}
                }).then((res) => {
                    console.log(res)
                    this.goodsInfo=res.data.msg
                }).catch((err) => {
                    console.log(err);
                    
                });
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            addGoodsToCart(){
                let cartInfo=localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
                let isHaveGoods=cartInfo.find(cart=>{cart.goodsId==this.goodsId})
                if (!isHaveGoods) {
                    let newGoodsInfo={
                        goodsId:this.goodsInfo.ID,
                        name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    }
                    cartInfo.push(newGoodsInfo)
                    localStorage.cartInfo=JSON.stringify(cartInfo)
                    Toast.success("添加成功")
                }else{
                    Toast.success("已有此商品")
                }
                this.$router.push({name:"Cart"})
            }
        }
    }
</script>

<style scoped>
    .goods-detail{
        font-size: 0%
    }
    .goods-bottom{
        width: 100%;
        position: fixed;
        background-color: #fff;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom>div{
        flex:1;
        padding: 5px;
    }
</style>