import { createApp } from "vue";
import "./style.css";
import HelloWorld from "./components/HelloWorld.vue";

const app = createApp({});

app.component("HelloWorld", HelloWorld);

app.mount("#app");
