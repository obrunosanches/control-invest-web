import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./pages/Dashboard.vue";
import Category from "./pages/Category.vue";
import Transaction from "./pages/Transaction.vue";
import Account from "./pages/Account.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/categories", component: Category },
  { path: "/transactions", component: Transaction },
  { path: "/accounts", component: Account },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
