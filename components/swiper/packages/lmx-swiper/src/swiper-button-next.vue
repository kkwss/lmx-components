<template>
  <div class="button-next" @click="goNextPage">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "button-next",
  methods: {
    goNextPage() {
      if(this.$parent.loop && this.$parent.currentItem ==  this.$parent.slideNum - 1) {
        this.$parent.loopOption.isInLoop = true;
      } else if(!this.$parent.loop && this.$parent.currentItem ==  this.$parent.slideNum - 1) {
        return;
      }
      this.setTranslationDuration();
      this.$parent.currentItem++;
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