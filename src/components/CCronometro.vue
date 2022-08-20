<template>
  <section>
    <strong class="display">{{ elapsedTime }}</strong>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "CCronometro",

  props: {
    timeSeconds: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    return {
      elapsedTime: computed(() =>
        new Date(props.timeSeconds * 1000).toISOString().slice(11, -5)
      ),
    };
  },
});
</script>

<style>
.display {
  color: var(--text-primary);
}
</style>
