import Vue from 'vue'
import store from './store/index.js'
import App from './App.vue'
import './assets/style.scss';
Vue.config.productionTip = false

new Vue({
  store, 
  render: h => h(App),
}).$mount('#app')
