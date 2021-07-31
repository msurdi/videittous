import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";
import "./styles/tailwind.css";

const routes = [{ path: "/", component: LandingPage }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
