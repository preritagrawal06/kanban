import {create} from "zustand"
import api from "../utils/api"

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
    }
}))