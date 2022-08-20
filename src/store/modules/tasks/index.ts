import http from "@/http";
import ITask from "@/Interfaces/ITask";
import { State } from "@/store";
import { GET_TASKS, PATCH_TASK, POST_TASK } from "@/store/constants/actions";
import { ADD_TASK, EDIT_TASK, SET_TASKS } from "@/store/constants/mutations";
import { Module } from "vuex";

export interface TasksState {
  tasks: ITask[];
}

export const task: Module<TasksState, State> = {
  state: {
    tasks: [],
  },
  mutations: {
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },

    [SET_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },

    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((p) => p.id === task.id);
      state.tasks[index] = task;
    },
  },
  actions: {
    [POST_TASK]({ commit }, task: ITask) {
      return http.post("tasks", task).then(({ data }) => {
        commit(ADD_TASK, data);
      });
    },

    [GET_TASKS]({ commit }) {
      http.get("tasks").then(({ data }) => {
        commit(SET_TASKS, data);
      });
    },

    [PATCH_TASK]({ commit }, task: ITask) {
      return http.patch(`tasks/${task.id}`, task).then(({ data }) => {
        commit(EDIT_TASK, data);
      });
    },
  },
};
