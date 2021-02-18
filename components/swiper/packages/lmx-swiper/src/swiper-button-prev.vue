<template>
  <div class="button-prev" @click="goPrevPage">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "button-prev",
  methods: {
    goPrevPage() {
      if(this.$parent.loop && this.$parent.currentItem == 0) {
        this.$parent.loopOption.isInLoop = true;
      } else if(!this.$parent.loop && this.$parent.currentItem == 0) {
        return;
      }
      this.setTranslationDuration();
      this.$parent.currentItem--;
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