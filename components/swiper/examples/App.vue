<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <swiper-container swiperAnimation='cube'>
      <swiper-slide v-for="(item, index) in list" :key="index" :no="index">
        <img :src="item" alt="">
      </swiper-slide>
      <template v-slot:swiper-pagination>
        <swiper-pagination></swiper-pagination>
      </template>
    </swiper-container>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      list: ['./assets/logo.png', './assets/logo.png', './assets/logo.png', './assets/logo.png', './assets/logo.png']
    }
  },
}
</script>

<style lang="scss">
  @import './../packages/assets/swiper-slide.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


