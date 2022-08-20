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
            v-model="description"
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import CTemporizador from "./CTemporizador.vue";

export default defineComponent({
  name: "CFormulario",

  emits: ["onSaveTask"],

  components: {
    CTemporizador,
  },

  setup(props, { emit }) {
    const store = useStore(key);

    const description = ref("");
    const projectId = ref("");

    const projects = computed(() => store.state.project.projects);

    const onCounterFinish = (timeSeconds: number) => {
      emit("onSaveTask", {
        description: description.value,
        time: timeSeconds,
        project: projects.value.find(
          (project) => project.id === projectId.value
        ),
      });
      description.value = "";
    };

    return {
      projects,
      description,
      projectId,
      onCounterFinish,
    };
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--background-primary);
}
</style>
