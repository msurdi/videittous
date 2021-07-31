import { createApp } from "vue";
import VueFeather from "vue-feather";
import App from "./App.vue";
import router from "./router";
import "./styles/tailwind.css";

const app = createApp(App);
app.use(router);
app.component(VueFeather.name, VueFeather);
app.mount("#app");
