import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: () => import("../views/VTasks.vue"),
  },
  {
    path: "/projects",
    name: "Projetos",
    component: () => import("../views/VProjects.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
