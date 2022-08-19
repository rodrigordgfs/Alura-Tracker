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
import { defineComponent } from "vue";
import CActionButton from "./CActionButton.vue";

export default defineComponent({
  name: "MenuLateral",

  emits: ["onChangeTheme"],

  components: { CActionButton },

  data() {
    return {
      darkMode: false,
    };
  },

  computed: {
    themeButtonText(): string {
      return this.darkMode ? "Ativar LightMode" : "Ativar DarkMode";
    },
  },

  methods: {
    handleChangeTheme(): void {
      this.darkMode = !this.darkMode;
      this.$emit("onChangeTheme", this.darkMode);
    },
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
