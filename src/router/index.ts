import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: () => import("../views/VTasks.vue"),
  },
  {
    path: "/projects",
    component: () => import("../views/VProjects.vue"),
    children: [
      {
        path: "",
        name: "Projetos",
        component: () => import("../views/Projetos/VList.vue"),
      },
      {
        path: "new",
        name: "Novo Projeto",
        component: () => import("../views/Projetos/VForm.vue"),
      },
      {
        path: ":id",
        name: "Editar Projeto",
        component: () => import("../views/Projetos/VForm.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
