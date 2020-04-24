<template>
  <div class="navbar navbar-dark bg-dark text">
    <h1 class="navbar-brand">
      <div v-if="!IS_AUTH">
        <div>
          <router-link class="text" to="/">{{sitename}}</router-link>
        </div>
        <div class="nav navbar-nav navbar-right">
          <button class="btn btn-light">
            <router-link to="/loginUser">Login</router-link>
          </button>
        </div>
      </div>
      <div v-else>
        <router-link class="text" to="/tasksList">{{sitename}}</router-link>
          <div class="nav navbar-nav">
            <button type="button" class="btn btn-light" v-on:click="showCreateForm">Create</button>
          </div>
          <div class="nav navbar-nav">
            <button v-on:click="logOut" class="btn btn-primary">Logout</button>
        </div>
      </div>
    </h1>
  </div>
</template>
<script>
import { authComputed } from "../store/helper";
export default {
  name: "my-header",
  data() {
    return {
      sitename: "Todo. Vue.js and Django"
    };
  },
  methods: {
    showCreateForm() {
      this.$router.push({ name: "taskCreateForm" });
    },
    logOut() {
      this.$store.dispatch("LOGOUT_USER");
      this.$router.push({ name: "HomePage" });
    }
  },
  computed: {
    ...authComputed
  }
};
</script>
<style scoped>
.text {
  color: white;
}
a {
  text-decoration: none;
}
</style>