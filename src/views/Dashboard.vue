<template>
  <div>
    <h1>This is a Dashboard page</h1>
    <h6>Welcome, {{user.given_name}}</h6>
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
