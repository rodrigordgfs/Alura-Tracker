<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <CMenuLateral />
    </div>
    <div class="column is-three-quarter">
      <CFormulario />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CFormulario from "./components/CFormulario.vue";
import CMenuLateral from "./components/CMenuLateral.vue";

export default defineComponent({
  name: "App",
  components: {
    CMenuLateral,
    CFormulario
  },
});
</script>

<style></style>
