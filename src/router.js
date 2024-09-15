import { createRouter, createWebHistory } from 'vue-router';
import { VerifySession, VerifyLogin } from './Guards/AuthGuard';
import login from './Pages/Login.vue';
import Home from './Pages/Home.vue'
import Enfermedades from './Pages/Enfermedades.vue'
import EnfermedadesDash from './Views/Graphics/Enfermedades.vue';
import Usuarios from './Pages/Usuarios.vue'
import Configuracion from './Pages/Configuracion.vue'
import Mapa from './Pages/Mapa.vue';

const routes = [
  { path: '/login', component: login, beforeEnter: VerifyLogin },
  { 
    path: '/',
    component: Home,
    beforeEnter: VerifySession,
    children:
    [
      { 'path': '/enfermedades', component: Enfermedades },
      { 'path': '/enfermedadDash/:id/:name', component: EnfermedadesDash, props : true },
      { 'path': '/usuarios', component: Usuarios },
      { 'path': '/configuracion', component: Configuracion },
      { 'path': '/mapa', component: Mapa }

    ]
  },
  { path: '/enfermedades', component: Enfermedades }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
