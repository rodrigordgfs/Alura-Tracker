<template>
  <header>
    <h1><img src="../assets/logo.png" alt="Logo" /></h1>
    <CActionButton
      :name="themeButtonText"
      type="repeat"
      :action="handleChangeTheme"
    />
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

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
