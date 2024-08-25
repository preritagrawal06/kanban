import { create } from "zustand";
import api from "../utils/api";

export const useUserStore = create((set)=>({
    user: localStorage.getItem('token') || null,
    userLogin: async (username: string, password: string)=>{
        try {
            const {data} = await api.post("token/", {
                username: username,
                password: password
            })
            console.log(data);
            set({user: data})
            localStorage.setItem('token', data)

        } catch (error) {
            localStorage.removeItem('token')
            console.log((error as Error).message)
        }
    },
    userSignup: async(username: string, email: string, password: string)=>{
        try {
            const {data} = await api.post("auth/user/register/", {
                username,
                email,
                password
            })
            console.log(data);
            
        } catch (error) {
            console.log((error as Error).message);
            
        }
    }
}))