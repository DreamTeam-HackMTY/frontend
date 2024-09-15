import axios from './axios.js';

const baseURL = 'roles/'

export async function readRoles(){
    try {
        const response = await axios.get(`${baseURL}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los roles") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los roles")
    }
}

export async function readRol(id){
    try {
        const response = await axios.get(`${baseURL}/${id}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los roles") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los roles")
    }
}

export async function createRol(data){
    try {
        const response = await axios.post(`${baseURL}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los roles") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los roles")
    }
}

export async function updateRol(id, data){
    try {
        const response = await axios.put(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los roles") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los roles")
    }
}

export async function modifyRol(id, data){
    try {
        const response = await axios.patch(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los roles") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los roles")
    }
}