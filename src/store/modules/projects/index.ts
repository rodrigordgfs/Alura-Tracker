import http from "@/http";
import IProject from "@/Interfaces/IProject";
import { State } from "@/store";
import {
    GET_PROJECTS,
    PATCH_PROJECT,
    POST_PROJECT
} from "@/store/constants/actions";
import {
    ADD_PROJECT,
    DELETE_PROJECT,
    EDIT_PROJECT,
    SET_PROJECTS
} from "@/store/constants/mutations";
import { Module } from "vuex";

export interface ProjectsState {
  projects: IProject[];
}

export const project: Module<ProjectsState, State> = {
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

    [SET_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http.get("projects").then(({ data }) => {
        commit(SET_PROJECTS, data);
      });
    },

    [POST_PROJECT](_, projectName: string) {
      return http.post("projects", { name: projectName });
    },

    [PATCH_PROJECT](_, project: IProject) {
      return http.patch(`projects/${project.id}`, project);
    },

    [DELETE_PROJECT]({ commit }, id: string) {
      return http.delete(`projects/${id}`).then(() => {
        commit(DELETE_PROJECT, id);
      });
    },
  },
};
