import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import ClienteView from "../views/ClienteView.vue";
import RegisterView from "../views/RegistroView.vue";

const auth = getAuth();

const routes = [
  { path: "/login", component: LoginView },
  { path: "/admin", component: AdminView},
  { path: "/cliente", component: ClienteView},
  { path: "/register", component: RegisterView},
  { path: "/", redirect: "/login" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  const requiresAuth = to.meta.requiresAuth;
  const roleRequired = to.meta.role;

  if (requiresAuth && !user) {
    next('/login');
  } else if (requiresAuth && user) {
    const userRole = user.displayName;
    if (userRole === roleRequired) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
