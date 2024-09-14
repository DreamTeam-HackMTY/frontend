import axios from './axios.js';

const baseURL = 'enfermedades/'

export async function readEnfermedades(){
    try {
        const response = await axios.get(`${baseURL}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los enfermedades") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los enfermedades")
    }
}

export async function readEnfermedad(id){
    try {
        const response = await axios.get(`${baseURL}/${id}`)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los enfermedades") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los enfermedades")
    }
}

export async function createEnfermedad(data){
    try {
        const response = await axios.post(`${baseURL}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los enfermedades") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los enfermedades")
    }
}

export async function updateEnfermedad(id, data){
    try {
        const response = await axios.put(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los enfermedades") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los enfermedades")
    }
}

export async function modifyEnfermedad(id, data){
    try {
        const response = await axios.patch(`${baseURL}/${id}`, data)
        if(response.status < 300) return response
        else throw new Error("Error en al obtener los enfermedades") 
    } catch (error) {
        console.error(error)
        throw new Error("Error en al obtener los enfermedades")
    }
}