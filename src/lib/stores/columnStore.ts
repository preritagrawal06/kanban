import { create } from "zustand";
import api from "../utils/api";
import { generateSlug } from "../utils/generateSlug";
export const useColumnStore = create((set) => ({
  columns: [],
  getColumns: async (projectId: string) => {
    try {
      const { data } = await api.get("column/", {
        params: {
          projectId: projectId,
        },
      });
    //   console.log(data);
      set({ columns: data });
    } catch (error) {
      console.log((error as Error).message);
    }
  },
  addColumn: async(projectId: string, title: string)=>{
    try {
        const slug = generateSlug(title, projectId)
        const {data} = await api.post("column/", {
            projectId: projectId,
            title: title,
            slug: slug
        })
        console.log(data);
        set((state: any)=>({columns: [...state.columns, data]}))
    } catch (error) {
        console.log((error as Error).message);
    }
  }
}));
