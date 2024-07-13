import axios from "axios"
export const BASE_URL = "https://api.dezinfeksiyatashkent.uz/api" 
import { headers } from "./FaqsAction"
export const getService = async() => {
    try {
        const res = await axios.get(`${BASE_URL}/services`)
        console.log(res?.data);
        return res?.data?.data
    } catch (error) {
        console.log(error);
    }
}

export const postService = async(payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/services`, payload, {headers})
        return res?.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const updateService = async(id, payload) => {
    try {
        const res = await axios.put(`${BASE_URL}/services/${id}`, payload, {headers})
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const deleteService = async(id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/services/${id}`, {headers})
        return res?.data
    } catch (error) {
        console.log(error);
    }
}