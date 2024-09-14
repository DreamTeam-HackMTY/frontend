import axios from './axios.js';

const baseURL = 'users/'

export async function readUsers(){
    try {
        const response = await axios.get(`${baseURL}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los users") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los users")
    }
}

export async function readUser(id){
    try {
        const response = await axios.get(`${baseURL}/${id}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los users") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los users")
    }
}

export async function createUser(data){
    try {
        const response = await axios.post(`${baseURL}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los users") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los users")
    }
}

export async function updateUser(id, data){
    try {
        const response = await axios.put(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los users") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los users")
    }
}

export async function modifyUser(id, data){
    try {
        const response = await axios.patch(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los users") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los users")
    }
}