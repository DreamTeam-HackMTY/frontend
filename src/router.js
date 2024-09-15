import { createRouter, createWebHistory } from 'vue-router';
import login from './Pages/Login.vue';
import Home from './Pages/Home.vue'
import Enfermedades from './Pages/Enfermedades.vue'

const routes = [
  { path: '/login', component: login },
  { 'path': '/', component: Home },
  { 'path': '/enfermedades', component: Enfermedades }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
