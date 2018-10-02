<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hey {{user.given_name}}, welcome to Awesome!</h1>
    <h5>Created by somebody/somehow/maybe</h5>
  </div>
</template>

<script>
export default {
  name: "home",
  props: {
    auth: Object
  },
  data: function() {
    return {
      user: {
        given_name: ""
      }
    };
  },
  mounted: function() {
    this.auth.getProfile((err, user) => {
      console.log({ err, user });
      this.user = user;
    });
  }
};
</script>
