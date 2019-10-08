import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from "./views/ShoppingMail.vue";
import Regiest from "./views/Regiest.vue";
import Login from "./views/login.vue";
import Goods from './views/goods.vue';
import CategoryList from './views/CategoryList.vue';
import Cart from './views/cart.vue';
import Main from './views/Main.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:"/",name:"Main",component:Main,children:[
      {path:"/",name:"ShoppingMail",component:ShoppingMail},
      {path:"/categoryList",name:"CategoryList",component:CategoryList},
      {path:"/cart",name:"Cart",component:Cart}
  ]},
    
    {path:"/regiest",name:"Regiest",component:Regiest},
    {path:"/login",name:"Login",component:Login},
    {path:"/goods",name:"Goods",component:Goods}
    
    
  ]
})
