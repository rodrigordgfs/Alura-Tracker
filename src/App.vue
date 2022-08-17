<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <CMenuLateral @onChangeTheme="handleChangeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CMenuLateral from "./components/CMenuLateral.vue";

export default defineComponent({
  name: "App",

  components: {
    CMenuLateral,
  },

  data() {
    return {
      darkMode: false,
    };
  },

  methods: {
    handleChangeTheme(darkMode: boolean) {
      this.darkMode = darkMode;
    },
  },
});
</script>

<style>
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
