<template>
  <div :class="['swiper-slide']" :style="slideStyle" ref="slide">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "swiper-slide",
  data() {
    return {
      slideNo: -1,
      slideStyle: {},
      type: 'slide',
    };
  },
  methods: {
    setSlideNo() {
      this.slideNo = this.$refs.slide.dataset.no;
    },
    slideInit() {
      this[this.$parent.swiperAnimation + 'Init']();
    },
    stateChange(current) {
      this[this.$parent.swiperAnimation + 'StateChange'](current);
    },
    slideNodeCopy(node) {
      return node.cloneNode(true);
    },
    createNode(templateNode, transform) {
      let node = this.slideNodeCopy(templateNode);
      node.style.transform = transform;
      node.style.visibility = 'hidden';
      node.style.zIndex = '2';
      node.classList.add('swiper-slide');
      return node;
    },
    setLoopNode(slideNo, slideNode, indexHead, indexLast, degHead, degLast) {
      let loopStart = this.$parent.swiperAnimation == 'cube' ? 1 : 0;
      let loopEnd = this.$parent.swiperAnimation == 'cube' ? this.$parent.slideNum : this.$parent.slideNum - 1;
      if(slideNo == loopStart) {
        let transform = this.slideTransform(indexLast, degLast);
        let lastLoopNode = this.createNode(slideNode, transform);
        if(this.$parent.swiperAnimation !== 'cube') {
          lastLoopNode.style.visibility = 'visible';
        }
        this.$parent.loopOption.lastLoopNode = lastLoopNode;
      } else if(slideNo == loopEnd) {
        let transform = this.slideTransform(indexHead, degHead);
        let firstLoopNode = this.createNode(slideNode, transform);
        if(this.$parent.swiperAnimation !== 'cube') {
          firstLoopNode.style.visibility = 'visible';
        }
        this.$parent.loopOption.firstLoopNode = firstLoopNode;
      }
    },
    slideTransform(index, deg) {
      return this[this.$parent.swiperAnimation + 'SlideTransform'](index, deg);
    },
    cubeInit() {
       if(this.$parent.loop) {
         console.log(this.$refs.slide);
         this.setLoopNode(this.slideNo, this.$refs.slide, 0, (((this.$parent.slideNum - 1) % 4) + 2) % 4, 0, (this.$parent.slideNum - 1) * 90 - 180);
       }
      let slideStyle = {};
      let index = this.slideNo % 4;
      let deg = 90 * (this.slideNo);
      let transform = this.slideTransform(index, deg);
      slideStyle.transform = transform;
      slideStyle.zIndex = '0';
      this.slideStyle = slideStyle;
      this.cubeStateChange(0);
    },
    cubeStateChange(current) {
      let right = (current + 1) % (this.$parent.slideNum + 1);
      let left = (current + this.$parent.slideNum - 1) % (this.$parent.slideNum + 1);
      if(this.slideNo == right) {
        this.slideStyle.zIndex = '2';
      }
      this.$parent.cubeOption.cubeCallbackList.push(() => {
        if(this.slideNo == current || this.slideNo == left || this.slideNo == right) {
          this.slideStyle.zIndex = '1';
        } else {
          this.slideStyle.zIndex = '0';
        }
      })
    },
    cubeSlideTransform(index, deg) {
      let transform = `rotateY(${deg + 'deg'})`;
      if(index == 0) {
        transform += `translate3d(0px, 0px, 0px)`;
      } else if(index == 1) {
        transform += `translate3d(50%, 0px, ${this.$refs.slide.offsetWidth/2 + 'px'})`;
      } else if(index == 2) {
        transform += `translate3d(0px, 0px, ${this.$refs.slide.offsetWidth + 'px'})`;
      } else if(index == 3) {
        transform += `translate3d(-50%, 0px, ${this.$refs.slide.offsetWidth/2 + 'px'})`;
      }
      return transform;
    },
    slippageInit() {
      if(this.$parent.loop) {
        this.setLoopNode(this.slideNo, this.$refs.slide, -1, this.$parent.slideNum);
      }
      let slideStyle = {};
      let index = this.slideNo;
      let transform = this.slideTransform(index);
      slideStyle.transform = transform;
      this.slideStyle = slideStyle;
    },
    slippageStateChange() {
      return;
    },
    slippageSlideTransform(index) {
      let transform = `translate3d(${index * 100 + '%'}, 0px, 0px)`;
      return transform;
    },
    fifoInit() {
      let slideStyle = {};
      slideStyle.opacity = '0';
      slideStyle.transitionDuration = `${this.$parent.transitionDuration}s`;
      if(this.slideNo == 0) {
        slideStyle.zIndex = '1';
        slideStyle.opacity = '1';
      }
      this.slideStyle = slideStyle;
    },
    fifoStateChange(current) {
      if(this.slideNo == current) {
        this.slideStyle.opacity = '1';
      } else {
        this.slideStyle.opacity = '0';
      }
    },
  },
};
</script>
