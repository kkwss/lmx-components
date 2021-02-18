<template>
    <div class="cascader-item">
        <select name="" id="" v-model="checkedValue" @change="getCascaderList(checkedValue)">
            <option :value="i" v-for="(i, index) in list" :key="index">{{i}}</option>
        </select>
    </div>
</template>
<script>
export default {
    name: 'cascader-item',
    props: {
        cascaderNo: {
            type: String,
            default: '0'
        },
        tip: {
            type: String,
            defsult: '',
        }
    },
    data() {
        return {
            list: this.cascaderNo==='0' ? this.$parent.currentL : [],
            checkedValue: this.tip,
        }
    },
    methods: {
        getCascaderList(checkedValue) {
                 new Promise((res) => {
                     this.$parent.currentL = this.$parent.getList(checkedValue);
                     res();
                }).then(() => {
                     this.$parent.currentNo = this.cascaderNo;
                     this.$parent.$children.forEach((i) => {
                         if(parseInt(i.cascaderNo) === parseInt(this.$parent.currentNo) + 1) {
                             return i.list = this.$parent.currentL;
                         }
                     })
                })
        },
    },
}
</script>
