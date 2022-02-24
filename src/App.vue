<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>

import Home from './view/Home'


export default {
  name: 'App',
  components: {
    Home,
  },
  // created(){
  //   const uid = uuidv4();
  //   console.log(uid);
  // },
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
