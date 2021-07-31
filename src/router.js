import { createRouter, createWebHistory } from "vue-router";
import EncodePage from "./pages/EncodePage.vue";
import LandingPage from "./pages/LandingPage.vue";
import "./styles/tailwind.css";

const routes = [
  { name: "landing", path: "/", component: LandingPage },
  { name: "encode", path: "/encode", component: EncodePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
