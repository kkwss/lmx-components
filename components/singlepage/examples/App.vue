<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld  :buttonNum="10" :selectablePageList="9" msg="Welcome to Your Vue.js App"/>
    <single-page :buttonNum="9" :total="700" :pageList="10" :selectablePageList="list" :flyer="true"></single-page>
    <single-page-scroll :loadingHeight="10" :total="100" :pageList="10">滚动</single-page-scroll>
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
      list: [20, 30, 40],
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
