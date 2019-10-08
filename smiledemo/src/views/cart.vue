<template>
    <div>
        <div class="nvbar-div">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img">
                    <img :src="item.image" width="100%">
                </div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count"></van-stepper>
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div>{{item.price | moneyFilter}}</div>
                    <div>{{item.count}}</div>
                    <div>{{item.price*item.count | moneyFilter}}</div>
                </div>
            </div>
        </div>
        <div class="totalMoney">商品总价：{{totalmoney | moneyFilter}}</div>
    </div>
</template>

<script>
    import { toMoney } from "../filter/moneyFilter";
    export default {
        data() {
            return {
                cartInfo: [],
                isEmpty:false
            }
        },
        created(){
            this.getCartInfo()
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        computed:{
            totalmoney(){
                let allMoney=0
                this.cartInfo.forEach((item) => {
                    allMoney+=item.price*item.count
                })
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return allMoney
            }
        },
        methods: {
            getCartInfo() {
                if (localStorage.cartInfo) {
                   this.cartInfo=JSON.parse(localStorage.cartInfo) 
                }
                this.isEmpty=this.cartInfo.length>0 ? true :false
            },

            //清空购物车
            clearCart(){
                localStorage.removeItem("cartInfo")
                this.cartInfo=[]
            }
        },
    }
</script>

<style scoped>
    .cart-title{
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom: 1px solid #e4e7ed;
        padding: 5px;
        text-align: right;
    }
    .pang-row{
        display: flex;
        flex-wrap: nowrap;
        padding:0.5rem;
        font-size: .85rem;
        border-bottom: 1px solid #e4e7ed;
    }
    .pang-img{flex:6}
    .pang-text{flex:14;padding-left: 10px;}
    .pang-control{padding-top:10px}
    .pang-goods-price{flex:4}

    .totalMoney{
        text-align: right;
        background-color: #fff;
        border-bottom: 1px solid #e4e7ed;
        padding:5px;
    }
</style>