<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="column is-one-quarter">
      <CMenuLateral @onChangeTheme="handleChangeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <CNotification type="danger" title="teste" description="teste" />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CMenuLateral from "./components/CMenuLateral.vue";
import CNotification from "./components/CNotification.vue";

export default defineComponent({
  name: "App",

  components: {
    CMenuLateral,
    CNotification,
  },

  setup() {
    const darkMode = ref(false);

    const handleChangeTheme = () => {
      darkMode.value = !darkMode.value;
    };

    return {
      darkMode,
      handleChangeTheme,
    };
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
