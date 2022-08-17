<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="task"
        />
      </div>
      <div class="column">
        <CTemporizador @onCounterFinish="onCounterFinish" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTemporizador from "./CTemporizador.vue";

export default defineComponent({
  name: "CFormulario",

  emits: ["onSaveTask"],

  components: {
    CTemporizador,
  },

  data() {
    return {
      timeSeconds: 0,
      counter: 0,
      task: "",
    };
  },

  methods: {
    handleStartCounter(): void {
      this.counter = setInterval(() => {
        this.timeSeconds += 1;
      }, 1000);
    },

    handleStopCounter(): void {
      clearInterval(this.counter);
      this.timeSeconds = 0;
    },

    onCounterFinish(timeSeconds: number): void {
      this.$emit("onSaveTask", {
        description: this.task,
        time: timeSeconds,
      });
      this.task = "";
    },
  },
});
</script>

<style></style>
