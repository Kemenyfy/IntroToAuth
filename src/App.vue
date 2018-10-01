<template>
  <div id="app">
    <nav class="navbar">
        <div class="navbar-header">
          <router-link :to="'/'" class="logIn" >Home</router-link> |
          <router-link :to="'/about'" class="logIn">About</router-link> |
          <button
            v-if="!authenticated"
            @click="login()">Log In
          </button>
          <button
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>
        </div>
    </nav>
    <div class="container">
      <router-view 
        :auth="auth" 
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
import AuthService from "./AuthService/AuthService";

const auth = new AuthService();

const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: "app",
  data() {
    authNotifier.on("authChange", authState => {
      this.authenticated = authState.authenticated;
    });
    return {
      auth,
      authenticated
    };
  },
  methods: {
    login,
    logout
  }
};
</script>

<style lang="scss">

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logIn {
  text-decoration: none;
  font-weight: bold;
  color: black;
}

.logIn:hover {
  color: #42b983;
}
</style>
