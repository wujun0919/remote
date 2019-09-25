import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Col, Row,Swipe, SwipeItem ,Lazyload,List,Field,NavBar} from "vant";

Vue.use(Button).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




 
