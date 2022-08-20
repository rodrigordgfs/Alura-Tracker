<template>
  <section>
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
  </section>
</template>

<script lang="ts">
import useNotify from "@/hooks/useNotify";
import { NotificationType } from "@/Interfaces/INotification";
import { useStore } from "@/store";
import { PATCH_PROJECT, POST_PROJECT } from "@/store/constants/actions";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "VForm",

  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { notify } = useNotify();

    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (project) => project.id === props.id
      );
      projectName.value = project?.name || "";
    }

    const handleSave = () => {
      if (props.id) {
        store
          .dispatch(PATCH_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => {
            saveSuccess();
          })
          .catch(() => {
            notify(
              NotificationType.ERROR,
              "Erro",
              "Ocorreu um erro ao salvar o projeto"
            );
          });
      } else {
        store
          .dispatch(POST_PROJECT, projectName.value)
          .then(() => {
            saveSuccess();
          })
          .catch(() => {
            notify(
              NotificationType.ERROR,
              "Erro",
              "Ocorreu um erro ao salvar o projeto"
            );
          });
      }
    };

    const saveSuccess = () => {
      projectName.value = "";
      notify(NotificationType.SUCCESS, "Sucesso", "Projeto salvo com sucesso");
      router.push("/projects");
    };

    return {
      projectName,
      handleSave,
    };
  },
});
</script>

<style scoped></style>
