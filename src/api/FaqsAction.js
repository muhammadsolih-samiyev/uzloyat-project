import axios from "axios"
export const BASE_URL = "https://api.dezinfeksiyatashkent.uz/api" 
const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`,
};
export const getFaq = async() => {
    try {
        const res = await axios.get(`${BASE_URL}/faqs`)
        return res?.data?.data
    } catch (error) {
        console.log(error);
    }
}

export const postFaq = async(payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/faqs`, payload, {headers})
        return res?.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const updateFaq = async(id, payload) => {
    try {
        const res = await axios.put(`${BASE_URL}/faqs/${id}`, payload, {headers})
        return res?.data
    } catch (error) {
        console.log(error);
    }
}

export const deleteFaqItem = async(id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/faqs/${id}`, {headers})
        return res?.data
    } catch (error) {
        console.log(error);
    }
}