import Vue from 'vue'
import App from './App.vue'
import SinglePage from './../packages/index';
Vue.use(SinglePage);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
