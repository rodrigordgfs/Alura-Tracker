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
import { ADD_PROJECT, EDIT_PROJECT } from "@/utils/mutationsTypes";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VForm",

  props: {
    id: {
      type: String,
    },
  },

  data() {
    return {
      projectName: "",
    };
  },

  setup() {
    const store = useStore();
    const { notify } = useNotify();
    return {
      store,
      notify,
    };
  },

  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (project) => project.id === this.id
      );
      this.projectName = project?.name || "";
    }
  },

  methods: {
    handleSave() {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName,
        });
      } else {
        this.store.commit(ADD_PROJECT, this.projectName);
      }
      this.projectName = "";
      this.notify(
        NotificationType.SUCCESS,
        "Sucesso",
        "Projeto salvo com sucesso"
      );
      this.$router.push("/projects");
    },
  },
});
</script>

<style scoped></style>
