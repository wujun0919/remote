import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from "./views/ShoppingMail.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:"/",name:"ShoppingMail",component:ShoppingMail}
  ]
})