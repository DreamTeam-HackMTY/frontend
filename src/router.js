import { createRouter, createWebHistory } from 'vue-router';
import login from './Pages/Login.vue';
import Home from './Pages/Home.vue'
import Enfermedades from './Pages/Enfermedades.vue'
import Usuarios from './Pages/Usuarios.vue'
import Configuracion from './Pages/Configuracion.vue'

const routes = [
  { path: '/login', component: login },
  { 'path': '/', 
    component: Home, 
    children: 
    [
      { 'path': '/enfermedades', component: Enfermedades },
      { 'path': '/enfermedadDash/:id', component: Enfermedades, props : true },
      { 'path': '/usuarios', component: Usuarios },
      { 'path': '/configuracion', component: Configuracion },

    ]
  },
  { 'path': '/enfermedades', component: Enfermedades }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
