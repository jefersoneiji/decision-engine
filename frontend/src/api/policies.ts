import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export async function getAllPolicies() {
    try {
        await instance.get('/policies/')
        
        toast.success(
            'Got all policies fetched!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
    } catch (e) {
        toast.error(
            'Something went wrong!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
        throw new Error(e as string)
    }
}

export async function savePolicy(data) {
    try {
        await instance.post('/policies/', {
            title: 'Lorem ipsum',
            edges: data.edges,
            nodes: data.nodes,
        })
        
        toast.success(
            'Policy Saved!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
    } catch (e) {
        toast.error(
            'Something went wrong while saving policy!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
        throw new Error(e as string)
    }
}