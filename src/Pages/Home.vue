<template>
    <SideBar 
      :user-name="'María García'" 
      :user-role="'Investigadora'"/>
    <div class="flex-1 p-4 lg:ml-64 bg-[#2492d1]" style="height: 67px;">
    </div>
    <div class="flex-1 p-4 lg:ml-64">
        <router-view></router-view>
    </div>
  </template>
  
  <script setup>
  import SideBar from '../components/SideBar.vue'
  import { HomeIcon, ChartBarIcon, FileTextIcon } from 'lucide-vue-next'
  const __name = 'Home'

  </script>