import {Cascader, CascaderItem, CascaderInput} from './lmx-cascader/index';
let components = [
    Cascader,
    CascaderItem,
    CascaderInput
];

let install = function(Vue) {
    if(install.installed) {
        return;
    }
    components.forEach((comp) => {
        return Vue.component(comp.name, comp);
    })
}

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    CascaderItem,
    Cascader,
}