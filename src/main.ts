import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import "quasar/src/css/index.sass";

import quasarIconSet from "quasar/icon-set/fontawesome-v6";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import router from "./routes";

const app = createApp(App);
// const app = createApp({});

app.use(router);

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
});

app.mount("#app");
