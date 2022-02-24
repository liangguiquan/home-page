import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/styles/global.less'
import "./eventBus"  // 事件总线

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
