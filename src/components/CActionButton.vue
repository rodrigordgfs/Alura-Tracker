<template>
  <button :disabled="disabled" class="button" @click="action">
    <span class="icon">
      <i :class="`fas fa-${type}`"></i>
    </span>
    <span>{{ name }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CActionButton",

  props: {
    type: {
      type: String,
      default: "play",
    },
    name: {
      type: String,
      default: "Play",
    },
    action: {
      type: Function as PropType<() => void>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style></style>
