import VueRouter from "vue-router";
import Dashboard from "../layout/Dashboard.vue";
import Home from "../pages/Index.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [{ path: "", component: Home }],
  },
];


export default routes
