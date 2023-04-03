import { createApp } from "vue";
import "./style.css";
import { registerPlugins } from "./plugins";
import { createPinia } from "pinia";
import HelloWorld from "./components/HelloWorld.vue";

const app = createApp({});

registerPlugins(app);

app.component("HelloWorld", HelloWorld);

const pinia = createPinia();
pinia.use(() => window.initialSettings);
app.use(pinia);

app.mount("#app");
