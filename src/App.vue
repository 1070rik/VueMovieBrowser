<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    body {
        background-color: #651212;
    }
    #app {
        height: 100vh;
        width: 30vw;
        margin: 0 auto;
        font-family: "Roboto",serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
