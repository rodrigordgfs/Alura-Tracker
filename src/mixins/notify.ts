import { NotificationType } from "@/Interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/constants/mutations";

export const notifyMixin = {
  methods: {
    notify(type: NotificationType, title: string, description: string) {
      store.commit(NOTIFY, {
        title: title,
        description: description,
        type: type,
      });
    },
  },
};
