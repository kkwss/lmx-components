<template>
  <div class="single-page-scroll" ref="loading">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "single-page-scroll",
  props: {
    loadingHeight: {
      type: Number,
      default: 0,
    },
    pageList: {
      type: Number,
      require: true,
    },
    total: {
      type: Number,
      require: true,
    },
    lastPageTip: {
      type: String,
      default: "已经到底啦",
    },
  },
  data() {
    return {
      currentNum: 1,
      timer: null,
      observer: null,
      isLastPage: false,
      loadingNode: null,
    };
  },
  computed: {
    pageNum() {
      return Math.ceil(this.total / this.pageList);
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (!this.observer) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
  },
  methods: {
    init() {
      if (window.IntersectionObserver) {
        this.observer = new IntersectionObserver(
          (entry) => {
            entry.forEach((item) => {
              if (
                item.isIntersecting &&
                item.intersectionRatio >= 0.8 &&
                this.currentNum < this.pageNum
              ) {
                this.currentNum++;
                this.$emit("changePage", this.currentNum);
              }
            });
          },
          {
            threshold: [0.8],
          }
        );
        this.observer.observe(this.$refs.loading);
        return;
      }
      this.loadingNode = this.$refs.loading;
      this.loadingHandler();
      window.addEventListener("scroll", this.scrollHandler);
    },
    scrollHandler() {
      if (this.timer || this.isLastPage) {
        alert(this.lastPageTip);
        return;
      }
      this.timer = setTimeout(() => {
        this.loadingHandler();
      }, 300);
    },
    loadingHandler() {
      if (this.currentNum == this.pageNum) {
        this.isLastPage = true;
        if (this.observer) {
          this.observer.disconnect();
        }
        return;
      }
      let top = this.loadingNode.offsetTop;
      let viewHeight =
        document.documentElement.clientHeight || window.innerHeight;
      if (viewHeight - top > 0) {
        this.currentNum++;
        this.$emit("changePage", this.currentNum);
      }
    },
  },
};
</script>