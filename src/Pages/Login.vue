<template>
    <div class="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-48 w-auto" :src="'/logo.png'" alt="EpiDemidata Logo" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Iniciar sesión en EpiDemidata
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Accede a tu cuenta para gestionar datos epidemiológicos
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Correo electrónico</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#2492d1] focus:border-[#2492d1] focus:z-10 sm:text-sm"
                            placeholder="Correo electrónico" v-model="email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Contraseña</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#2492d1] focus:border-[#2492d1] focus:z-10 sm:text-sm"
                            placeholder="Contraseña" v-model="password" />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 text-[#2492d1] focus:ring-[#2492d1] border-gray-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Recordarme
                        </label>
                    </div>

                    <div class="text-sm">
                        <!-- <a href="#" class="font-medium text-[#2492d1] hover:text-[#1c74a5]">
                            ¿Olvidaste tu contraseña?
                        </a> -->
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2492d1] hover:bg-[#1c74a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2492d1]">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                           
                        </span>
                        Iniciar sesión
                    </button>
                </div>
            </form>

            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-gray-50 text-gray-500">
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../services/session';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('')
const password = ref('')

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await login({ email: email.value, password: password.value });
        const data = res.data
        localStorage.setItem('token', data.data.token);
        router.push('/');
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>