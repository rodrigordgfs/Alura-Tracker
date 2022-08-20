import { NotificationType } from "@/Interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/constants/mutations";

type useNotify = {
  notify: (type: NotificationType, title: string, description: string) => void;
};

export default (): useNotify => {
  const notify = (
    type: NotificationType,
    title: string,
    description: string
  ): void => {
    store.commit(NOTIFY, {
      title: title,
      description: description,
      type: type,
    });
  };

  return {
    notify,
  };
};
