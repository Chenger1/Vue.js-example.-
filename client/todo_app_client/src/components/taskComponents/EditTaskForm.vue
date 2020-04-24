<template>
  <div>
    <my-header></my-header>
    <div class="wrapper">
      <div class="form-group">
        <label for="taskTitle">Title</label>
        <input type="text" class="form-control" id="taskTitle" v-model="task.title" />
      </div>
      <div class="form-group">
        <label for="taskBody">Text</label>
        <input type="text" class="form-control" id="taskBody" v-model="task.body" />
      </div>
      <button v-on:click="editTask" type="submit" class="btn btn-dark">Edit</button>
    </div>
  </div>
</template>
<script>
import myHeader from "../Header";
import axios from "axios";
export default {
  name: "EditTaskForm",
  data() {
    return {
      task: {}
    };
  },
  components: { myHeader },
  methods: {
    editTask() {
      this.$store.dispatch("EDIT_TASK", this.task);
      this.$router.push({ name: "TasksList" });
    }
  },
  mounted() {
    this.task = this.$store.getters.GET_TASK_DATA(this.$route.params.id);
  }
};
</script>