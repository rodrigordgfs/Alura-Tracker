<template>
  <CFormulario @onSaveTask="handleSaveTask" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Procure por uma tarefa"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <CBox>Você não está muito produtivo hoje :C</CBox>
    <CTarefa
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @onSelectedTask="handleSelectedTask"
    />
    <CModal v-if="selectedTask" :isOpen="selectedTask !== null">
      <template v-slot:header>
        <p class="modal-card-title">Editar Tarefa</p>
        <button
          class="delete"
          aria-label="close"
          @click="handleCloseModal"
        ></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="nomeTarefa" class="label">Nome da Tarefa</label>
          <input
            type="text"
            class="input"
            id="nomeTarefa"
            v-model="selectedTask.description"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="handleEditTask">
          Salvar Alterações
        </button>
        <button class="button" @click="handleCloseModal">Cancelar</button>
      </template>
    </CModal>
  </div>
</template>

<script lang="ts">
import CModal from "@/components/CModal.vue";
import useNotify from "@/hooks/useNotify";
import { NotificationType } from "@/Interfaces/INotification";
import { useStore } from "@/store";
import {
GET_PROJECTS,
GET_TASKS,
PATCH_TASK,
POST_TASK
} from "@/store/constants/actions";
import { computed, defineComponent, ref, watchEffect } from "vue";
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
    CModal,
  },

  setup() {
    const store = useStore();
    const { notify } = useNotify();

    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    const selectedTask = ref(null as ITask | null);
    const filtro = ref("");

    const tasks = computed(() => store.state.task.tasks);
    const emptyTaskList = computed(() => store.state.task.tasks.length === 0);

    const handleSaveTask = (task: ITask) => {
      store
        .dispatch(POST_TASK, task)
        .then(() => {
          notify(
            NotificationType.SUCCESS,
            "Sucesso",
            "Tarefa salva com sucesso"
          );
        })
        .catch(() => {
          notify(
            NotificationType.ERROR,
            "Erro",
            "Ocorreu um erro ao salvar a Tarefa"
          );
        });
    };

    const handleEditTask = () => {
      store
        .dispatch(PATCH_TASK, selectedTask.value)
        .then(() => {
          notify(
            NotificationType.SUCCESS,
            "Sucesso",
            "Tarefa salva com sucesso"
          );
          handleCloseModal();
        })
        .catch(() => {
          notify(
            NotificationType.ERROR,
            "Erro",
            "Ocorreu um erro ao salvar a Tarefa"
          );
        });
    };

    const handleSelectedTask = (task: ITask) => {
      selectedTask.value = task;
    };

    const handleCloseModal = () => {
      selectedTask.value = null;
    };

    watchEffect(() => {
      store.dispatch(GET_TASKS, filtro.value);
    });

    return {
      tasks,
      filtro,
      emptyTaskList,
      selectedTask,
      handleSaveTask,
      handleEditTask,
      handleSelectedTask,
      handleCloseModal,
    };
  },
});
</script>

<style>
.lista {
  padding: 1.23rem;
}
</style>
