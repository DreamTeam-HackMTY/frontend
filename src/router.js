import { createRouter, createWebHistory } from 'vue-router';
import { VerifySession, VerifyLogin } from './Guards/AuthGuard';
import login from './Pages/Login.vue';
import Home from './Pages/Home.vue'
import Enfermedades from './Pages/Enfermedades.vue'

const routes = [
  { path: '/login', component: login, beforeEnter: VerifyLogin },
  { 'path': '/', component: Home, beforeEnter: VerifySession },
  { 'path': '/enfermedades', component: Enfermedades }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
