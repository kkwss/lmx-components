import Vue from 'vue';
import { SwiperSlide, SwiperPagination, SwiperContainer, SwiperButtonPrev, SwiperButtonNext } from './lmx-swiper/index';
let components = [SwiperSlide, SwiperPagination, SwiperContainer, SwiperButtonPrev, SwiperButtonNext];
let install = function (Vue) {
    if (install.installed) {
        return;
    }
    components.forEach((comp) => {
        return Vue.component(comp.name, comp);
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    SwiperSlide,
    SwiperPagination, 
    SwiperContainer, 
    SwiperButtonPrev, 
    SwiperButtonNext
}