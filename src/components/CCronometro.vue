<template>
  <section>
    <strong>{{ elapsedTime }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CCronometro",

  props: {
    timeSeconds: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    elapsedTime(): string {
      return new Date(this.timeSeconds * 1000).toISOString().slice(11, -5);
    },
  },
});
</script>

<style></style>
