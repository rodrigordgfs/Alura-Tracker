<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <CMenuLateral @onChangeTheme="handleChangeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <CFormulario @onSaveTask="handleSaveTask" />
      <div class="lista">
        <CBox :v-if="emptyTaskList">Você não está muito produtivo hoje :C</CBox>
        <CTarefa v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CBox from "./components/CBox.vue";
import CFormulario from "./components/CFormulario.vue";
import CMenuLateral from "./components/CMenuLateral.vue";
import CTarefa from "./components/CTarefa.vue";
import ITask from "./Interfaces/ITask";

export default defineComponent({
  name: "App",

  components: {
    CMenuLateral,
    CFormulario,
    CTarefa,
    CBox,
  },

  data() {
    return {
      tasks: [] as ITask[],
      darkMode: false,
    };
  },

  computed: {
    emptyTaskList(): boolean {
      return this.tasks.length === 0;
    },
  },

  methods: {
    handleSaveTask(task: ITask) {
      this.tasks.push(task);
    },

    handleChangeTheme(darkMode: boolean) {
      this.darkMode = darkMode;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.23rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background: var(--bg-primary);
}
</style>
