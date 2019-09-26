<template>
    <div>
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow=""
            @click-left="goBack"
         />
         <div class="regiest-panel">
             <van-field 
                v-model="username"
                label="用户名"
                right-icon="clear"
                placeholder="请输入用户名"
                required=""
                @click-right-icon="username=''"
         >
         </van-field>
         <van-field 
            v-model="password"
            label="密码"
            icon="clear"
            placeholder="请输入密码"
            required=""
            @click-icon="password=''"
         >
         </van-field>
            <div class="register-button">
                <van-button type="primary" size="large" @click="axiosRegiestUser">马上注册</van-button>
            </div>
         </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                username: "",
                password:""
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            axiosRegiestUser(){
                axios({
                    url:"/api",
                    method:"post",
                    data:{
                        username:this.username,
                        password:this.password
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .regiest-panel{
        width: 96%;
        border-radius: 5px;
        margin: 20px auto;
        padding-bottom:80px;
    }
    .regiest-button{
        padding-top:10px;
    }
</style>