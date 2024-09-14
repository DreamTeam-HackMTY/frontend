import axios from './axios.js';

const baseURL = 'estados/'

export async function readEstados(){
    try {
        const response = await axios.get(`${baseURL}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}

export async function readEstado(id){
    try {
        const response = await axios.get(`${baseURL}/${id}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}

export async function createEstado(data){
    try {
        const response = await axios.post(`${baseURL}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}

export async function updateEstado(id, data){
    try {
        const response = await axios.put(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}

export async function modifyEstado(id, data){
    try {
        const response = await axios.patch(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los estados") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los estados")
    }
}