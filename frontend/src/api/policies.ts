import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

async function getAllPolicies() {
    try {
        await instance.get('/policies/')
    } catch (e) {
        throw new Error(e)
    }
}

getAllPolicies()