<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MessengerApp"
};
</script>

<style lang="less">
body {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background: #e5e5e5;
}
#app {
  position: relative;
  width: 980px;
  height: 719px;
  margin: 200px auto 0;

  max-height: 100vh;
  min-height: 400px;

  @media screen and (max-height: 720px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  & * {
    box-sizing: border-box;
  }
}
</style>
