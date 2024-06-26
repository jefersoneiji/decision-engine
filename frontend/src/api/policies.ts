import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { Edge, Node, ReactFlowJsonObject, Viewport } from "reactflow";
import axiosRetry from "axios-retry";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000
})

axiosRetry(instance, { retries: 3 })

export async function getAllPolicies() {
    try {
        const response = await instance.get('/policies/')

        toast.success(
            'Got all policies fetched!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )

        return response;
    } catch (e: unknown) {
        const error = e as AxiosError<{ error: string }>
        toast.error(
            error.response?.data.error || 'Something went wrong!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
        handlesOfflineRequest()
        throw new Error(e as string)
    }
}

export async function deletePolicy(id: string) {
    try {
        await instance.delete(`/policies/${id}`)

        toast.success(
            'Policy deleted!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )

    } catch (e: unknown) {
        const error = e as AxiosError<{ error: string }>
        toast.error(
            error.response?.data.error || 'Something went wrong!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
        handlesOfflineRequest()
        throw new Error(e as string)
    }
}

export async function getPolicy(id: string) {
    try {
        const response = await instance.get(`/policies/${id}`)

        toast.success(
            'Policy found!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
        return response
    } catch (e: unknown) {
        const error = e as AxiosError<{ error: string }>
        toast.error(
            error.response?.data.error || 'Something went wrong!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
        handlesOfflineRequest()
        throw new Error(e as string)
    }
}
export type PolicyData = {
    nodes: Array<Node>;
    edges: Array<Edge>
    viewport: Viewport
}

export async function savePolicy(data: ReactFlowJsonObject<PolicyData> & { title: string }) {
    try {
        await instance.post('/policies/', {
            title: data.title,
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
    } catch (e: unknown) {
        const error = e as AxiosError<{ error: string }>
        toast.error(
            error.response?.data.error || 'Something went wrong while saving policy!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )

        handlesOfflineRequest()
        throw new Error(e as string)
    }
}

export async function updatePolicy(id: string, data: ReactFlowJsonObject<PolicyData> & { title: string, id: string }) {
    try {
        await instance.put(`/policies/${id}`, {
            title: data.title,
            edges: data.edges,
            nodes: data.nodes,
        })

        toast.success(
            'Policy Updated!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )
    } catch (e: unknown) {
        const error = e as AxiosError<{ error: string }>
        toast.error(
            error.response?.data.error || 'Something went wrong while saving policy!',
            {
                autoClose: 5000,
                position: 'bottom-left'
            }
        )

        handlesOfflineRequest()
        throw new Error(e as string)
    }
}

const handlesOfflineRequest = () => {
    if (navigator.onLine === false) {
        throw new Error('Network is offline.')
    }
}