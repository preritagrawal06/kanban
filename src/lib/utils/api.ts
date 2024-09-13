import axios from "axios";

const api = axios.create({baseURL:import.meta.env.VITE_BASE_URL})

api.interceptors.request.use(
    (config) => {
        // console.log(import.meta.env.VITE_BASE_URL);
        
        const authToken = localStorage.getItem('token')
        config.headers.Accept = 'application/json'
        config.headers["Content-Type"] = 'application/json'

        if(authToken){
            config.headers.Authorization = `Bearer ${authToken}`
        }

        return config
    },
    (error) => Promise.reject(error),
)

export default api

