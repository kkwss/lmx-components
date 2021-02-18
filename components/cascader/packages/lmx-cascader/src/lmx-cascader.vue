<template>
  <div class="cascader">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "cascader",
  props: {
    getCascaderList: {
      type: Function,
    },
    currentList: {
      type: Array,
      default: () => []
    },
    provideList: {
      type: Array,
    },
    parentLabel: {
      type: String,
    },
    childrenLabel: {
      type: String,
    },
  },
  mounted() {
  },
  data() {
    return {
      currentNo: "-1",
      currentL: this.provideList && !this.getCascaderList ? this.getFirstList() : this.currentList,
      getList: this.getCascaderList && !this.provideList ? this.getCascaderList : this.getCascaderListDefault,
    };
  },
  methods: {
    getCascaderListDefault(item) {
      if(!this.parentLabel || !this.childrenLabel) {
        throw 'parentLabel or childrenLabel were not defined'
      }
      let res = [];
      let self = this;
      function handler(list) {
        for (let i of list) {
          if (i[self.parentLabel] === item) {
            if (i[self.childrenLabel]) {
              for (let j of i[self.childrenLabel]) {
                res.push(j[self.parentLabel]);
              }
              return;
            }
          }
          if (i[self.childrenLabel]) {
            handler(i[self.childrenLabel]);
          }
        }
      }
      handler(self.provideList);
      return res;
    },
    getFirstList() {
      let res = [];
      for (let i of this.provideList) {
        res.push(i[this.parentLabel]);
      }
      return res;
    },
  },
};
</script>