<template>
  <CBox>
    <div class="columns">
      <div class="column is-4">
        {{ task.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ task.project?.name || "Tarefa sem projeto" }}
      </div>
      <div class="column">
        <CCronometro :timeSeconds="task.time" />
      </div>
    </div>
  </CBox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ITask from "../Interfaces/ITask";
import CBox from "./CBox.vue";
import CCronometro from "./CCronometro.vue";

export default defineComponent({
  name: "CTarefa",

  components: {
    CCronometro,
    CBox,
  },

  props: {
    task: {
      type: Object as () => ITask,
      required: true,
    },
  },
});
</script>

<style scoped></style>
