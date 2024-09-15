import axios from './axios.js';

const baseURL = 'auth'

export async function login(data){
    try {
        const response = await axios.post(`${baseURL}/login`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}

export async function logout(){
    try {
        await axios.post(`${baseURL}/logout`)
        localStorage.clear()
        location.href = '/' 
    } catch (error) {
        console.error(error)
        localStorage.clear()
        location.href = '/'
    }
}

export async function user(){
    try {
        const response = await axios.get(`${baseURL}/me`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}