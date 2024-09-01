import { create } from "zustand";
import api from "../utils/api";
import {jwtDecode} from 'jwt-decode'

export const useUserStore = create((set)=>({
    user: JSON.parse(localStorage.getItem('user')!) || null,
    userLogin: async (username: string, password: string)=>{
        try {
            const {data} = await api.post("token/", {
                username: username,
                password: password
            })
            // console.log(data);
            // console.log(jwtDecode(data.access))
            set({user: jwtDecode(data.access)})
            localStorage.setItem('token', data.access)
            localStorage.setItem('user', JSON.stringify(jwtDecode(data.access)))

        } catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            console.log((error as Error).message)
        }
    },
    userSignup: async(username: string, email: string, password: string)=>{
        try {
            const {data} = await api.post("user/register/", {
                username,
                email,
                password
            })
            console.log(data);
            
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    userLogout: ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        set({user: null})
    }
}))