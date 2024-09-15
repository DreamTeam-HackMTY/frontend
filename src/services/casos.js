import axios from './axios.js';

const baseURL = 'cases/'

export async function readCasos(){
    try {
        const response = await axios.get(`${baseURL}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los casos") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los casos")
    }
}

export async function readCaso(id){
    try {
        const response = await axios.get(`${baseURL}/${id}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los casos") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los casos")
    }
}

export async function createCaso(data){
    try {
        const response = await axios.post(`${baseURL}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los casos") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los casos")
    }
}

export async function updateCaso(id, data){
    try {
        const response = await axios.put(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los casos") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los casos")
    }
}

export async function modifyCaso(id, data){
    try {
        const response = await axios.patch(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los casos") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los casos")
    }
}