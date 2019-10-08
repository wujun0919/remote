<template>
    <div>
        <div class="search-bar">
            <van-row class="font">
                <van-col span="3"><img :src="searchImage" alt="" width="80%"></van-col>
                <van-col span="16"><input type="text" class="search-input"></van-col>
                <van-col span="5"><van-button type="default" size="mini" class="search-button">查找</van-button></van-col>
            </van-row>
        </div>
    
        <!-- seiper -->
        <div class="swiper" >
            <van-swipe :autoplay="1000">
                 <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                     <img v-lazy="banner.image" width="100%" alt="">
                 </van-swipe-item>
            </van-swipe>
        </div>

        <!---type bar--->
        <!--type bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>

            </div>
        </div>

        <!--ad--->
        <div>
            <img v-lazy="adBanner"  width="100%">
        </div>

        <!---recommend area----->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide class="recommend-item" v-for="(item,index) in recommendGoods" :key="index">
                       
                            <img :src="item.image" alt="" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>${{item.price | moneyFilter}}(${{item.mallPrice | moneyFilter}})</div>
                      
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    
        <!---楼层------>
        <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info 
                                :goodsImage="item.image"
                                :goodsName="item.image"
                                :goodsPrice="item.price"
                                :goodsId="item.goodsId"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    
    
    <!----底层非常好，勿动-------------->
    </div>
</template>

<script>
    import {url} from "@/serviceApi.config.js";
    import { toMoney } from "../filter/moneyFilter";
    import FloorComponent from "../components/component/FloorComponent";
    import goodsInfo from "../components/component/goodsInfoComponent";
    import { swiper,swiperSlide } from "vue-awesome-swiper";
    import "swiper/dist/css/swiper.css"
    import axios from "axios";
    export default {
       data() {
           return {
               swiperOption:{
                   slidesPerView:3
               },
               searchImage: require("../assets/images/location.png"),
               bannerPicArray:[],
                category:[],
                adBanner:"",
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[]
           }
       },
       filters:{
           moneyFilter(money){
               return toMoney(money)
           }
       },
        components:{swiper,swiperSlide,FloorComponent,goodsInfo},
       created(){
           axios({
               url:url.getShoppingMailInfo,
               method:"get"
           }).then((res)=>{
               console.log(res)
               if (res.status==200) {
                   this.category=res.data.data.category
                   this.adBanner=res.data.data.advertesPicture.PICTURE_ADDRESS
                   this.bannerPicArray=res.data.data.slides
                   this.recommendGoods=res.data.data.recommend
                   this.floor1=res.data.data.floor1
                   this.floor2=res.data.data.floor2
                   this.floor3=res.data.data.floor3
                   this.floorName=res.data.data.floorName
                   this.hotGoods=res.data.data.hotGoods
               }
               
           }).catch(error=>console.log(error))
       }
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        line-height: 2.2rem;
        background-color: #e5017d;
        overflow: hidden;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border-left: 0px;
        border-right: 0px;
        border-top: 0px;
        border-bottom: 1px solid #ffffff;
        background-color: #e5017d;
        color: #ffff;
    }
    .search-button{
        margin-left:20%
    }
    .swiper{
        clear:both;
        max-height: 13rem;
        overflow: hidden;
    }

    .type-bar{
        background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
    }

    .type-bar div{
        padding: 0.3rem;
        font-size: 12px;
        text-align: center;
        flex:1
    }
    
    .recommend-area{
        background-color: #fff;
        margin-top:.3rem;

    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width: 99%;
        border-right:1px solid #eee;
        font-size: 12px;
        text-align: center
    }
    .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>