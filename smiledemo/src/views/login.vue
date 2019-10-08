<template>
    <div>
        <van-nav-bar
            title="用户登陆"
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
                :error-message="usernameErrMsg"
         >
         </van-field>
         <van-field 
            v-model="password"
            label="密码"
            icon="clear"
            placeholder="请输入密码"
            required=""
            @click-icon="password=''"
            :error-message="passwordErrMsg"
         >
         </van-field>
            <div class="register-button">
                <van-button type="primary" size="large" @click="loginAction" :loading="load">马上登陆</van-button>
            </div>
         </div>
    </div>
</template>

<script>
    import { Toast } from "vant";
    import axios from "axios";
    import { url } from "../serviceApi.config";
import { URL } from 'url';
    export default {
        data() {
            return {
                username: "",
                password:"",
                load:false,
                usernameErrMsg:"",
                passwordErrMsg:"",
            }
        },
        created(){
            if (localStorage.userInfo) {
                Toast.success("你已经登陆过了")
                this.$router.push("/")
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            loginAction(){
                this.checkForm() && this.axiosRegiestUser()
            },
            axiosRegiestUser(){
                this.load=true
                axios({
                    url:url.loginUser,
                    method:"post",
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                }).then((res) => {
                    if (res.data.code==200 && res.data.msg) {
                        new Promise((resolve,reject) => {
                            localStorage.userInfo={userName:this.username}
                            setTimeout(() => {
                                resolve()
                            },500)
                        }).then(() => {
                            Toast.success("登陆成功")
                            this.$router.push("/")
                        }).catch(() => {
                            Toast.fail("保存登陆状态失败")
                        });
                        
                    }else{
                        Toast.fail("登陆失败")
                        this.load=false;
                        this.username=""
                        this.password=""
                    }
                    
                }).catch((error) => {
                    Toast.fail("登陆失败")
                        this.load=false
                        this.username=""
                        this.password=""
                })
            },
            checkForm(){
                let isOk=true
                if (this.username.length<5) {
                    this.usernameErrMsg="用户名不能少于5位"
                    isOk=false
                }else{this.usernameErrMsg=""}

                if (this.password.length<6) {
                    this.passwordErrMsg="密码不能少于6位"
                    isOk=false
                }else{this.passwordErrMsg=""}
                return isOk
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