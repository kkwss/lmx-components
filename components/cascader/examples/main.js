import Vue from 'vue'
import App from './App.vue'

import cd from './../packages/index';
Vue.use(cd);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
