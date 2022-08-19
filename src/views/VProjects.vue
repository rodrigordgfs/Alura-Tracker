<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="handleSave">
      <div class="field">
        <label for="nomeProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          id="nomeProjeto"
          v-model="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    <table class="table is-full-width">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Projeto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "VProjects",

  data() {
    return {
      projectName: "",
    };
  },

  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },

  methods: {
    handleSave() {
      this.store.commit("ADD_PROJECT", this.projectName);
      this.projectName = "";
    },
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
