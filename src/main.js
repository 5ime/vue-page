import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
 
Vue.use(axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
