import VueRouter from "vue-router";
import Dashboard from "../layout/Dashboard.vue";
import Home from "../pages/Index.vue";
import Record from "../pages/Record.vue";
import Commit from "../pages/Commit.vue";
import Quote from "../pages/Quote.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "", component: Home },
      { path: "record", component: Record },
      { path: "commit", component: Commit },
      { path: "quote", component: Quote },
      { path: "login", component: Login },
    ],
  },
];

export default routes;
