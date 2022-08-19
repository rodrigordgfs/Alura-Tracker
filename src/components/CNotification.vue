<template>
  <div class="notificacao">
    <article
      class="message"
      :class="type[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">
        <p>{{ notification.title }}</p>
      </div>
      <div class="message-body">
        {{ notification.description }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { NotificationType } from "@/Interfaces/INotification";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "CNotification",

  data() {
    return {
      type: {
        [NotificationType.SUCCESS]: "is-success",
        [NotificationType.INFO]: "is-info",
        [NotificationType.ERROR]: "is-danger",
        [NotificationType.WARNING]: "is-warning",
      },
    };
  },

  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notificacao {
  z-index: 999;
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
}
</style>
