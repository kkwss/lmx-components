<template>
  <div class="swiper-container">
    <div class="swiper-slide-wrapper" ref="slideWrapper">
      <div class="swiper-slide-container" 
      ref="slideContainer" 
      :style="slideContanierStyle" 
      @transitionend="transitionEndHandler" 
      @mouseover="clearTimer" 
      @mouseout="setTimer">
        <slot></slot>
      </div>
    </div>
    <slot name="swiper-util"></slot>
  </div>
</template>
<script>
export default {
  name: "swiper-container",
  props: {
    swiperAnimation: {
      type:String,
    },
    animationDuration: {
      type: Number,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    auto: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideWidth: 0,
      slideHeight: 0,
      slideNum: 0,
      currentItem: 0,
      slideContanierStyle: {
        transitionDuration: '0s'
      },
      loopOption: {
        lastLoopNode: null,
        firstLoopNode: null,
        isInLoop: false,
      },
      cubeOption: {
        distance: -1,
        cubeCallbackList: [],
      },
      slippageOption: {
        distance: 0,
      },
      fifoOption: {
        fifoCallbackList: [],
      },
      timer: null,
    };
  },
  mounted() {
    this.getSlideNum();
    this.setSlideNo();
    this.init();
    this.setTimer();
  },
  computed: {
  },
  watch: {
    currentItem(newValue, oldValue) {
      this.slideMove(newValue - oldValue);
      this.childStateChange(newValue);
    },
  },
  methods: {
    init() {
      this.slideWidth = this.$refs.slideContainer.offsetWidth;
      this.slideHeight = this.$refs.slideContainer.offsetHeight;
      this.$refs.slideContainer.style.transitionDuration = '0s';
      this.$refs.slideWrapper.style.width = this.slideWidth + 'px';
      this.$refs.slideWrapper.style.height = this.slideHeight + 'px';
      this.$refs.slideWrapper.style.perspective = `${this.slideHeight + this.slideWidth}px`
      if(this.swiperAnimation == 'cube') {
        this.slideContanierStyle = {
        transitionDuration: '0s',
        transform: 'rotateY(-90deg)',
        transformOrigin: `50% 50% -${this.slideWidth/2}px`,
      }
      }
    },
    transitionEndHandler() {
      this.slideContanierStyle.transitionDuration = '0s';
      if(this.loopOption.isInLoop == true) {
        this.loopOption.isInLoop = false;
        this.currentItem = this.currentItem == this.slideNum ? 0 : this.slideNum - 1;
      }
      if(this.swiperAnimation == 'cube') {
        this.cubeMoveAfter();
      }
    },
    getSlideNum() {
      this.slideNum = this.swiperAnimation == 'cube' ? this.$refs.slideContainer.children.length-1 : this.$refs.slideContainer.children.length;
      console.log(this.slideNum)
    },
    setSlideNo() {
      let childList = this.$refs.slideContainer.children;
      childList = Array.from(childList);
      childList.forEach((child, index) => {
        return child.dataset.no = index;
      })
      this.$children.forEach((child) => {
        if(child.type == 'slide') {
          child.setSlideNo();
          child.slideInit();
          return ;
        }
      })
      if(this.loop && this.loopOption.firstLoopNode && this.loopOption.lastLoopNode) {
        this.$refs.slideContainer.appendChild(this.loopOption.firstLoopNode);
        this.$refs.slideContainer.appendChild(this.loopOption.lastLoopNode);
      }
    },
    slideMove(step) {
      this[this.swiperAnimation + 'Move'](step);
    },
    childStateChange(currentItem) {
      this.$children.forEach((child) => {
        if(child.type == 'slide') {
          return child.stateChange(currentItem);
        }
      });
    },
    setTimer() {
      if(this.auto && this.loop) {
          this.timer = setInterval(() => {
            if (this.currentItem ==  this.slideNum - 1) {
              this.loopOption.isInLoop = true;
            }
            this.currentItem++;
            this.slideContanierStyle.transitionDuration = `${this.animationDuration}s`;
          }, this.animationDuration * 1000)
      } 
    },
    clearTimer() {
      if(this.auto && this.loop) {
        clearInterval(this.timer);
      }
    },
    cubeMove(step) {
       if(this.loopOption.isInLoop) {
        if(step == 1) {
          this.loopOption.lastLoopNode.style.visibility = 'visible';
        } else  {
          this.loopOption.firstLoopNode.style.visibility = 'visible';
        }
      } else {
        //LOOP转完之后会重新设置一次currentItem,届时会再次调用此方法，这个时候把LOOPNODE的style重置即可
        this.loopOption.lastLoopNode.style.visibility = 'hidden';
        this.loopOption.firstLoopNode.style.visibility = 'hidden';
      }
      this.$refs.slideContainer.style.transform = `rotateY(${this.cubeOption.distance * 90 - 90 * step + 'deg'})`
      this.cubeOption.distance -= step;
    },
    cubeMoveAfter() {
      if(this.cubeOption.cubeCallbackList.length) {
        this.cubeOption.cubeCallbackList.forEach((callback) => {
          return callback();
        })
        this.cubeOption.cubeCallbackList = [];
      }
    },
    slippageMove(step) {
      this.$refs.slideContainer.style.transform = `translate3d(${this.slippageOption.distance * 100 - step * 100}%, 0px, 0px)`
      this.slippageOption.distance -= step;
    },
    fifoMove() {
       this.loopOption.isInLoop = false;
       if(this.currentItem == -1) {
         this.currentItem = this.slideNum - 1;
       } else if(this.currentItem == this.slideNum) {
         this.currentItem = 0;
       }
    },
  },
};
</script>