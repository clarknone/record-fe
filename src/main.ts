import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import "quasar/src/css/index.sass";
import { VueQueryPlugin } from "@tanstack/vue-query";

import quasarIconSet from "quasar/icon-set/fontawesome-v6";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import router from "./routes";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
});

app.mount("#app");
