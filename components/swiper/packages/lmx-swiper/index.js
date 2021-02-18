import SwiperContainer from './src/swiper-container';
import SwiperPagination from './src/swiper-pagination';
import SwiperSlide from './src/swiper-slide';
import SwiperButtonPrev from './src/swiper-button-prev';
import SwiperButtonNext from './src/swiper-button-next';

SwiperContainer.install = function(Vue) {
    Vue.component(SwiperContainer.name, SwiperContainer);
}
SwiperPagination.install = function(Vue) {
    Vue.component(SwiperPagination.name, SwiperPagination);
}
SwiperSlide.install = function(Vue) {
    Vue.component(SwiperSlide.name, SwiperSlide);
}
SwiperButtonPrev.install = function(Vue) {
    Vue.component(SwiperButtonPrev.name, SwiperButtonPrev);
}
SwiperButtonNext.install = function(Vue) {
    Vue.component(SwiperButtonNext.name, SwiperButtonNext);
}

export {SwiperSlide, SwiperPagination, SwiperContainer, SwiperButtonPrev, SwiperButtonNext};