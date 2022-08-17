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
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <section>
            <strong>{{ elapsedTime }}</strong>
          </section>
          <button class="button" @click="handleStartCounter">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
          </button>
          <button class="button" @click="handleStopCounter">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CFormulario",

  data() {
    return {
      timeSeconds: 0,
      counter: 0,
    };
  },

  computed: {
    elapsedTime(): string {
      return new Date(this.timeSeconds * 1000).toISOString().slice(11, -5);
    },
  },

  methods: {
    handleStartCounter() : void {
      this.counter = setInterval(() => {
        this.timeSeconds += 1;
      }, 1000);
    },

    handleStopCounter() : void  {
      clearInterval(this.counter);
      this.timeSeconds = 0;
    },
  },
});
</script>

<style></style>
