import IProject from "@/Interfaces/IProject";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT
} from "@/utils/mutationsTypes";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

interface State {
  projects: IProject[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },

    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((p) => p.id === project.id);
      state.projects[index] = project;
    },

    [DELETE_PROJECT](state, projectId: string) {
      state.projects = state.projects.filter((p) => p.id !== projectId);
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
