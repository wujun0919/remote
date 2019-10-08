import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button,Tabbar,TabbarItem,Stepper,Tab,Tabs, Col, Row,Swipe, SwipeItem ,Lazyload,List,Field,NavBar,PullRefresh} from "vant";

Vue.use(Button).use(Tabbar).use(TabbarItem).use(Tab).use(Stepper).use(Tabs).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(PullRefresh)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




 
