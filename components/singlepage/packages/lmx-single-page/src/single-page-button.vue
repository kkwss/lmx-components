<template>
  <div class="single-page-button" @click="clickHandler" v-show="morePages" ref="loading">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "single-page-button",
  props: {
    changePage: {
      type: Function,
      default: () => {},
    },
    pageList: {
      type: Number,
      require: true,
    },
    total: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
        currentNum: 1,
        morePages: true,
        loadingNode: null,
    };
  },
  computed: {
    pageNum() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  methods: {
    clickHandler() {
        if(!this.morePages) {
          document.removeChild(this.loadingNode);
        }
        if(this.currentNum == this.pageNum) {
            this.morePages = false;
            return;
        }
        this.currentNum++;
        this.$emit('changePage', this.currentNum);
    },
  },
  mounted() {
      this.loadingNode = this.$refs.loading;
      if(this.pageNum === 1) {
          this.morePages = false;
          document.removeChild(this.loadingNode);
      }
  },
};
</script>
