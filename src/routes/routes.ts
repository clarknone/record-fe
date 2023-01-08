import VueRouter from "vue-router";
import Dashboard from "../layout/Dashboard.vue";
import Home from "../pages/Index.vue";
import Record from "../pages/Record.vue";
import Commit from "../pages/Commit.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "", component: Home },
      { path: "record", component: Record },
      { path: "commit", component: Commit },
    ],
  },
];

export default routes;
