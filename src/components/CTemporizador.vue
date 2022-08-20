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
import { defineComponent, ref } from "vue";
import CActionButton from "./CActionButton.vue";
import CCronometro from "./CCronometro.vue";

export default defineComponent({
  name: "CTemporizador",

  emits: ["onCounterFinish"],

  components: {
    CCronometro,
    CActionButton,
  },

  setup(props, { emit }) {
    const timeSeconds = ref(0);
    const counter = ref(0);
    const running = ref(false);

    const handleStartCounter = () => {
      running.value = true;
      counter.value = setInterval(() => {
        timeSeconds.value += 1;
      }, 1000);
    };

    const handleStopCounter = () => {
      running.value = false;
      clearInterval(counter.value);
      emit("onCounterFinish", timeSeconds.value);
      timeSeconds.value = 0;
    };

    return {
      timeSeconds,
      running,
      handleStartCounter,
      handleStopCounter,
    };
  },
});
</script>

<style></style>
