<template>
  <div class="swiper-pagination">
    <ul class="pagination-list">
      <li
        :class="['pagination-item', { 'current-item': currentItem == item }]"
        v-for="item in paginationList"
        :key="item"
        @click="changeSlide(item)"
      ></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "swiper-pagination",
  computed: {
     slideNum() {
       return this.$parent.slideNum;
     },
    paginationList() {
      let list = [];
      for (let i = 0; i < this.slideNum; i++) {
        list[i] = i;
      }
      return list;
    },
    currentItem() {
      return this.$parent.currentItem;
    }
  },
  methods: {
    changeSlide(item) {
      this.$parent.currentItem = item;
      this.setTranslationDuration();
      if(this.$parent.auto && this.$parent.loop) {
        this.$parent.clearTimer();
      }
      
    },
     setTranslationDuration() {
      this.$parent.slideContanierStyle.transitionDuration = `${this.$parent.animationDuration}s`;
    },
  },
};
</script>