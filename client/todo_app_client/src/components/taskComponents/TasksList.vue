<template>
  <div>
    <my-header></my-header>
    <div class="tasks" v-for="task in tasksList">
      <div class="card">
        <div class="body">
          <h3 class="card-title">{{task.title}}</h3>
          <p class="card-text">{{task.body}}</p>
          <h4 class="card-text">{{task.date}}</h4>
        </div>
        <div class="card-footer">
          <button v-on:click="deleteTask(task)" type="submit" class="btn btn-dark">Delete</button>
          <router-link
          tag="button"
          class="btn btn-dark"
          :to="{name:'editTaskForm', params:{id:task.id}}"
          >Edit</router-link>
        </div>
      </div>
    </div>
    

  </div>
</template>
<script>
import axios from "axios";
import myHeader from "../Header.vue"

export default {
  name: "TasksList",
  data() {
    return {
      tasks:null,
    };
  },
  components: {myHeader},
  mounted() {
    this.$store.dispatch('GET_TASKS');
  },
  computed: {
    tasksList() {
      return this.$store.getters.TASKS;
    }
  },
  methods: {
    deleteTask(task) {
        this.$store.dispatch('DELETE_TASK', task.id)
        .then(reponse => {
          this.$store.dispatch('GET_TASKS');
        });
    }
  }
};
</script>
<style scoped>
.card {
  margin: 20px auto;
  width: 32rem;
}
</style>
