<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="getIndex(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index">{{item.MALL_CATEGORY_NAME}}</li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub" >
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME" ></van-tab>
                        </van-tabs>
                    </div>

                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                <div class="list-item-img">
                                    <img src="item.IMAGE1" width="100%">
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div>{{item.ORI_PRICE}}</div>
                                </div>
                            </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import { url } from "../serviceApi.config";
    import axios from "axios";
    import { Toast } from "vant";

    export default {
        data() {
            return {
                category: [],
                categoryIndex:0,
                categorySub:[],
                active:0,
                loading:false,
                finished:false,
                page:1,
                goodList:[],
                categorySubId:"",
                isRefresh:false
            }
        },
        created(){
            this.getCategory()
        },
        mounted(){
            let winHeight=document.documentElement.clientHeight;
            document.getElementById("leftNav").style.height=winHeight-46+"px"
            document.getElementById("list-div").style.height=winHeight-90+"px"
        },
        methods: {
            getIndex(index,categoryId){
                this.categoryIndex=index;
                this.page=1
                this.finished=1
                this.goodList=[]
                this.getCategorySubByCategoryId(categoryId)
            },
            getCategory() {
                axios({
                    url:url.getCategoryList,
                    method:"get"
                }).then((result) => {
                    if (result.data.code==200 && result.data.msg) {
                        
                        this.category=result.data.msg
                        this.getCategorySubByCategoryId(this.category[0].ID)                        
                        
                    }else{
                        Toast.err("获取数据失败")
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },

            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:"post",
                    data:{categoryId}
                }).then((result) => {
                    if (result.data.code==200 && result.data.msg) {
                        this.categorySub=result.data.msg 
                        this.active=0
                        this.categorySubId=this.categorySub[0].ID
                        this.onLoad()
                    }else{
                        Toast.err("获取数据失败")
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },

            onLoad(){
                setTimeout(() => {
                   this.categorySubId=this.categorySubId?this.categorySubId : this.categorySub[0].ID
                    this.getGoodlist()
                },1000)
            },

            onRefresh(){
                setTimeout((params) => {
                    this.isRefresh=false;
                    this.finished=false;
                    this.goodList=[]
                    this.page=1
                    this.onLoad()
                },500)
            },
            //点击小类类别
            onClickCategorySub(index,title){
                this.categorySubId=this.categorySub[index].ID
               
                
                this.goodList=[]
                this.finished=false
                this.page=1
                this.onLoad()
            },
            //获得小类的商品
            getGoodlist(){
                axios({
                    url:url.getGoodsListByCategorySubId,
                    method:"post",
                    data:{
                        page:this.page,
                        categorySubId:this.categorySubId
                    }
                }).then((result) => {
                    if (result.data.code==200 && result.data.msg.length) {
                        this.page++
                        this.goodList=this.goodList.concat(result.data.msg)                      
                        
                    }else{
                        this.finished=true
                    }
                    this.loading=false
                }).catch((err) => {
                    console.log(err)
                });
            },

            goGoodsInfo(id){
                this.$router.push({path:"/goods",query:{goodsId:id}})
            }
        },
    }
</script>

<style scoped>
    #id{
        background-color:aliceblue;
    }
    #id ul li{
        line-height: 2rem;
        border-bottom:1px solid #e4e7ed;
        padding: 3px;
        font-size: 0.8rem;
        text-align: center;
    }
    .categoryActive{
        background-color: #fff;
    }
    .list-item{
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>