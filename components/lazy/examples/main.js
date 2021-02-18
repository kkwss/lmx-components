import Vue from 'vue'
import App from './App.vue'
import lazy from './../packages/lmx-lazy/index.js';
Vue.use(lazy, '/assets/yy.jpg');
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
