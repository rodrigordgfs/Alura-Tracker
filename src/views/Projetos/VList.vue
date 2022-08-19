<template>
  <section>
    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
    </router-link>
    <table class="table is-full-width">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Projeto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button
              class="button ml-2 is-danger"
              @click="handleDelete(project.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { DELETE_PROJECT } from "@/utils/mutationsTypes";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "VList",

  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },

  methods: {
    handleDelete(id: string) {
      this.store.commit(DELETE_PROJECT, id);
    },
  },
});
</script>

<style scoped></style>
