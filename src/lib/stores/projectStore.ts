import {create} from "zustand"
import api from "../utils/api"
import { AxiosError } from "axios"

export const useProjectStore = create((set)=>({
    projects: [],
    project: null,
    fetchProjects: async()=>{
        try {
            const {data} = await api.get('project/')
            // console.log(data);
            set({projects: data})
            set((state: any)=>({project: state.projects[0]}))
            return data[0]
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    addProject: async(name: string, userId: string)=>{
        try {
            const {data} = await api.post('project/', {
                                name: name,
                                created_by: userId
                            })
            console.log(data)
            set((state: any)=>({
                projects: [...state.projects, data],
                project: data
            }))
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    setActiveProject: (project: any)=>{
        set({project: project})
    },
    deleteProject: async(projectId: string)=>{
        try {
            const res = await api.delete(`project/${projectId}`)

            if(res.status === 204){
                set((state: any)=>({projects: state.projects.filter((proj: any)=> proj.id !== projectId)}))
                set((state: any)=>({project: state.projects.length ? state.projects[0] : null}))
            }

        } catch (error) {
            console.log((error as Error).message);
        }
    },
    shareProject: async(projectId: string, email: string)=>{
        try{
            const res = await api.post(`projects/${projectId}/share/`,{
                email: email
            })
            return res?.data?.detail
        } catch(error){
            const status = (error as AxiosError).status
            if(status === 400){
                throw new Error("This email does not exist")
            }
            if(status === 403){
                throw new Error("You do not have permission to share the board")
            }
            console.log((error as Error).message);
        }
    }
}))