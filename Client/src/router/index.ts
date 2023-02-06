import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DemoView from "@/views/DemoView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/demo",
            name: "demo",
            component: () => import("../views/DemoView.vue"),
        },
    ],
});

export default router;
