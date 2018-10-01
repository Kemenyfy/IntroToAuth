<template>
  <div class="about">
    <a v-on:click="login" class="logIn">Log In</a>
  </div>
</template>

<script>
import AuthService from '../AuthService/AuthService.js';

const auth = new AuthService()

export default {
  name: 'app',
  methods: {
    login: function() {
      auth.login() 
    },
  }
}
</script>