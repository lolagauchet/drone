<template>
  <div id="app">
    <div id="nav" class="navbar-menu">
      <div class="navbar-start">

      <router-link to="/" class="navbar-item">Login</router-link>
      <router-link to="/home" class="navbar-item">Home</router-link>
      <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
 @import '../node_modules/bulma/css/bulma.css';
 
 #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {   
  border-bottom: 1px solid #42b983;
  padding: 10px 30px;
  margin-bottom: 40px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
