import Cascader from './src/lmx-cascader.vue';
import CascaderItem from './src/lmx-cascader-item.vue';
import CascaderInput from './src/lmx-cascader-input.vue';
Cascader.install = function(Vue) {
    Vue.component(Cascader.name, Cascader);
}
CascaderInput.install = function(Vue) {
    Vue.component(CascaderInput.name, CascaderInput);
}
CascaderItem.install = function(Vue) {
    Vue.component(CascaderItem.name, CascaderItem);
}

export {Cascader, CascaderItem, CascaderInput};