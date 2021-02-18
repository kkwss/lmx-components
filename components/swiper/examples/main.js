import Vue from 'vue'
import App from './App.vue'
import {SwiperSlide, SwiperPagination, SwiperContainer} from './../packages/lmx-swiper/index';
Vue.use(SwiperSlide);
Vue.use(SwiperPagination);
Vue.use(SwiperContainer);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
