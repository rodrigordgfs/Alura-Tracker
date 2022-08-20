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
import useNotify from "@/hooks/useNotify";
import { NotificationType } from "@/Interfaces/INotification";
import { useStore } from "@/store";
import { DELETE_PROJECT, GET_PROJECTS } from "@/store/constants/actions";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "VList",

  setup() {
    const store = useStore();
    const { notify } = useNotify();
    store.dispatch(GET_PROJECTS);
    return {
      store,
      notify,
      projects: computed(() => store.state.project.projects),
    };
  },

  methods: {
    handleDelete(id: string) {
      this.store
        .dispatch(DELETE_PROJECT, id)
        .then(() => {
          this.notify(
            NotificationType.SUCCESS,
            "Sucesso",
            "Projeto deletado com sucesso"
          );
        })
        .catch(() => {
          this.notify(
            NotificationType.ERROR,
            "Erro",
            "Erro ao deletar o projeto"
          );
        });
    },
  },
});
</script>

<style scoped></style>
