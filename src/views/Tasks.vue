<template>
  <CFormulario @onSaveTask="handleSaveTask" />
  <div class="lista">
    <CBox :v-if="emptyTaskList">Você não está muito produtivo hoje :C</CBox>
    <CTarefa v-for="(task, index) in tasks" :key="index" :task="task" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CBox from "../components/CBox.vue";
import CFormulario from "../components/CFormulario.vue";
import CTarefa from "../components/CTarefa.vue";
import ITask from "../Interfaces/ITask";

export default defineComponent({
  name: "App",

  components: {
    CFormulario,
    CTarefa,
    CBox,
  },

  data() {
    return {
      tasks: [] as ITask[],
    };
  },

  computed: {
    emptyTaskList(): boolean {
      return this.tasks.length === 0;
    },
  },

  methods: {
    handleSaveTask(task: ITask) {
      this.tasks.push(task);
    },
  },
});
</script>

<style>
.lista {
  padding: 1.23rem;
}
</style>
