import {SinglePage, SinglePageButton, SinglePageScroll} from './lmx-single-page/index';

let components = [SinglePage, SinglePageButton, SinglePageScroll];
let install = function(Vue) {
    if(install.installed) {
        return;
    }
    components.forEach((comp) => {
        return Vue.component(comp.name, comp);
    })
}

export default {
    install,
    SinglePage,
    SinglePageButton,
    SinglePageScroll
}