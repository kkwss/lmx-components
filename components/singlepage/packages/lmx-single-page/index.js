import SinglePage from './src/single-page.vue';
import SinglePageButton from './src/single-page-button.vue';
import SinglePageScroll from './src/single-page-scroll.vue';
SinglePage.install = function(Vue) {
    Vue.component(SinglePage.name, SinglePage);
}
SinglePageButton.install = function (Vue) { 
    Vue.component(SinglePageButton.name, SinglePageButton);
 }
 SinglePageScroll.install = function(Vue) {
     Vue.component(SinglePageScroll.name, SinglePageScroll);
 }
export {SinglePage, SinglePageButton, SinglePageScroll};