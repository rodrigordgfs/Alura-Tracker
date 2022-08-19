<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <div class="field">
          <input
            class="input"
            type="text"
            name="tarefa"
            id="tarefa"
            placeholder="Qual tarefa você deseja iniciar?"
            v-model="task"
          />
        </div>
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Selecione um projeto</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <CTemporizador @onCounterFinish="onCounterFinish" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import CTemporizador from "./CTemporizador.vue";

export default defineComponent({
  name: "CFormulario",

  emits: ["onSaveTask"],

  components: {
    CTemporizador,
  },

  data() {
    return {
      timeSeconds: 0,
      counter: 0,
      task: "",
      projectId: "",
    };
  },

  setup() {
    const store = useStore(key);
    return {
      projects: computed(() => store.state.projects),
    };
  },

  methods: {
    handleStartCounter(): void {
      this.counter = setInterval(() => {
        this.timeSeconds += 1;
      }, 1000);
    },

    handleStopCounter(): void {
      clearInterval(this.counter);
      this.timeSeconds = 0;
    },

    onCounterFinish(timeSeconds: number): void {
      this.$emit("onSaveTask", {
        description: this.task,
        time: timeSeconds,
        project: this.projects.find((project) => project.id === this.projectId),
      });
      this.task = "";
    },
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--background-primary);
}
</style>
