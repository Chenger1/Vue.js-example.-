<template>
  <div>
    <my-header></my-header>
    <div class="wrapper">
      <div class="form-group">
        <label for="taskTitle">Title</label>
        <input v-model="task.title" type="text" class="form-control" id="taskTitle">
      </div>
      <div class="form-group">
        <label for="taskBody">Text</label>
        <input v-model="task.body" type="text" class="form-control" id="taskBody">
      </div>
      <button v-on:click="submitForm" type="submit" class="btn btn-dark">Create</button>
    </div>
  </div>
</template>
<script>
import myHeader from "../Header";
export default {
  name: "taskCreateForm",
  data() {
    return {
      task: {
        title: null,
        body: null
      }
    };
  },
  components: { myHeader },
  methods: {
    submitForm() {
      if (this.task.title == null || this.task.body==null){
        alert('Wrong.Try again');
      } else{
        this.$store.dispatch("SAVE_TASK", this.task);
        this.$router.push({ name: "TasksList" });
      }
        
    }
  }
};
</script>