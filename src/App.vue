<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div class="header">
    POS订票系统
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style scoped>

.header {
  width: 100%;
  height: 50px;
  /* margin: 5px auto; */
  /* background-color: burlywood; */
  line-height: 50px; /* 与高度相同，使文字垂直居中 */
  text-align: center; /* 文字水平居中 */
  font-size: 20px;
  font-weight: 600;
}
</style>