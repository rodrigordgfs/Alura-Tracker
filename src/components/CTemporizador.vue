<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CCronometro :timeSeconds="timeSeconds" />
    <CActionButton
      :disabled="running"
      type="play"
      name="Play"
      :action="handleStartCounter"
    />
    <CActionButton
      :disabled="!running"
      type="stop"
      name="Stop"
      :action="handleStopCounter"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CActionButton from "./CActionButton.vue";
import CCronometro from "./CCronometro.vue";

export default defineComponent({
  name: "CTemporizador",

  emits: ["onCounterFinish"],

  components: {
    CCronometro,
    CActionButton,
  },

  data() {
    return {
      timeSeconds: 0,
      counter: 0,
      running: false,
    };
  },

  methods: {
    handleStartCounter(): void {
      this.running = true;
      this.counter = setInterval(() => {
        this.timeSeconds += 1;
      }, 1000);
    },

    handleStopCounter(): void {
      this.running = false;
      clearInterval(this.counter);
      this.$emit("onCounterFinish", this.timeSeconds);
      this.timeSeconds = 0;
    },
  },
});
</script>

<style></style>
