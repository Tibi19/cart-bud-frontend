import axios, { InternalAxiosRequestConfig } from "axios"
import { KEY_TOKEN } from "@/local/keys"

const API_URL = "http://localhost:8080/"

export const remote = axios.create({
    baseURL: API_URL
})

remote.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(KEY_TOKEN)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers["Content-Type"] = 'application/json'
    return config
})