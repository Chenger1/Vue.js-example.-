<template>
  <div>
    <my-header></my-header>
    <div class="wrapper">
      <form v-on:submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="username" type="text" name="username" value class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" name="password" value class="form-control" />
        </div>
        <button type="submit" name="button" class="btn btn-primary">Login</button>
      </form>
    </div>
    <div>
      Don`t have an account? Click
      <router-link to="/userRegistrationForm">Register</router-link>
    </div>
  </div>
</template>
<script>
import myHeader from "../Header";
export default {
  name: "login_user",
  data() {
    return {
      username: null,
      password: null
    };
  },
  components: { myHeader },
  methods: {
    login() {
      if (this.username == null || this.password == null) {
        alert("Wrong.Try again");
      } else {
        this.$store
          .dispatch("LOGIN", {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: "TasksList" });
          });
      }
    }
  }
};
</script> 