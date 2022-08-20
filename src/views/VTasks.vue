<template>
  <CFormulario @onSaveTask="handleSaveTask" />
  <div class="lista">
    <CBox :v-if="emptyTaskList">Você não está muito produtivo hoje :C</CBox>
    <CTarefa
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @onSelectedTask="handleSelectedTask"
    />
    <div
      class="modal"
      :class="{ 'is-active': selectedTask }"
      v-if="selectedTask"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="handleCloseModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="nomeTarefa" class="label">Nome da Tarefa</label>
            <input
              type="text"
              class="input"
              id="nomeTarefa"
              v-model="selectedTask.description"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="handleEditTask">
            Salvar Alterações
          </button>
          <button class="button" @click="handleCloseModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useNotify from "@/hooks/useNotify";
import { NotificationType } from "@/Interfaces/INotification";
import { useStore } from "@/store";
import {
GET_PROJECTS,
GET_TASKS,
PATCH_TASK,
POST_TASK
} from "@/store/constants/actions";
import { computed, defineComponent } from "vue";
import CBox from "../components/CBox.vue";
import CFormulario from "../components/CFormulario.vue";
import CTarefa from "../components/CTarefa.vue";
import ITask from "../Interfaces/ITask";

export default defineComponent({
  name: "VTasks",

  components: {
    CFormulario,
    CTarefa,
    CBox,
  },

  setup() {
    const store = useStore();
    const { notify } = useNotify();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    return {
      store,
      notify,
      tasks: computed(() => store.state.task.tasks),
      emptyTaskList: computed(() => store.state.task.tasks.length === 0),
    };
  },

  data() {
    return {
      selectedTask: null as ITask | null,
    };
  },

  methods: {
    handleSaveTask(task: ITask): void {
      this.store
        .dispatch(POST_TASK, task)
        .then(() => {
          this.notify(
            NotificationType.SUCCESS,
            "Sucesso",
            "Tarefa salva com sucesso"
          );
        })
        .catch(() => {
          this.notify(
            NotificationType.ERROR,
            "Erro",
            "Ocorreu um erro ao salvar a Tarefa"
          );
        });
    },

    handleEditTask(): void {
      this.store
        .dispatch(PATCH_TASK, this.selectedTask)
        .then(() => {
          this.notify(
            NotificationType.SUCCESS,
            "Sucesso",
            "Tarefa salva com sucesso"
          );
          this.handleCloseModal();
        })
        .catch(() => {
          this.notify(
            NotificationType.ERROR,
            "Erro",
            "Ocorreu um erro ao salvar a Tarefa"
          );
        });
    },

    handleSelectedTask(task: ITask) {
      this.selectedTask = task;
    },

    handleCloseModal() {
      this.selectedTask = null;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.23rem;
}
</style>
