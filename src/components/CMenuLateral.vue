<template>
  <header>
    <h1><img src="../assets/logo.png" alt="Logo" /></h1>
    <CActionButton
      :name="themeButtonText"
      type="repeat"
      :action="handleChangeTheme"
    />
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CActionButton from "./CActionButton.vue";

export default defineComponent({
  name: "MenuLateral",

  emits: ["onChangeTheme"],

  components: { CActionButton },

  setup(props, { emit }) {
    const darkMode = ref(false);

    const handleChangeTheme = () => {
      darkMode.value = !darkMode.value;
      emit("onChangeTheme", darkMode.value);
    };

    return {
      darkMode,
      themeButtonText: computed(() =>
        darkMode.value ? "Ativar LightMode" : "Ativar DarkMode"
      ),
      handleChangeTheme,
    };
  },
});
</script>

<style scoped>
header {
  background: #0d3b66;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  text-align: center;
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
