import { createApp } from "vue";
import "./style.css";
import { registerPlugins } from "./plugins";
import HelloWorld from "./components/HelloWorld.vue";

const app = createApp({});

registerPlugins(app);

app.component("HelloWorld", HelloWorld);

app.mount("#app");
