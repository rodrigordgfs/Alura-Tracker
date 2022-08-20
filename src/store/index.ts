import { INotification } from "@/Interfaces/INotification";
import { NOTIFY } from "@/store/constants/mutations";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { project, ProjectsState } from "./modules/projects";
import { task, TasksState } from "./modules/tasks";
export interface State {
  notifications: INotification[];
  project: ProjectsState;
  task: TasksState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notifications: [],
    project: {
      projects: [],
    },
    task: {
      tasks: [],
    },
  },
  mutations: {
    [NOTIFY](state, notification: INotification) {
      notification = { ...notification, id: new Date().getTime() };
      state.notifications.push(notification);
      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (n) => n.id !== notification.id
        );
      }, 3000);
    },
  },
  actions: {},
  modules: {
    project,
    task,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
