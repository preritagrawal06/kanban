import {create} from "zustand"
import api from "../utils/api"

type CardProp = {
    description: string,
    id: string,
    column: string,
    handleDragStart: any
}

export const useTodoStore = create((set)=>({
    todos: [],
    getTodos: async(projectId: string)=>{
        try {
            const {data} = await api.get('todo/', {
                params:{
                    projectId: projectId
                }
            })
            // console.log(data)
            set({todos: data})

        } catch (error) {
            console.log((error as Error).message);
        }
    },
    addTodo: async(projectId: string, column: string, description: string)=>{
        try {
            const {data} = await api.post('todo/', {
                projectId: projectId,
                column: column,
                description: description
            })
            console.log(data);
            set((state: any)=>({todos: [...state.todos, data]}))
        } catch (error) {
            console.log((error as Error).message);
            
        }
    },
    transferTodo: (cards: any)=>{
        set({todos: cards})
    },
    updateTodo: async(column: string, cardId: string)=>{
        try {
            const {data} = await api.patch(`todo/${cardId}`, {
                column: column
            })
            console.log(data);
        } catch (error) {
            console.log((error as Error).message);
            
        }
    },
    deleteTodo: async(cardId: string)=>{
        try {
            const response = await api.delete(`todo/${cardId}`)
            // console.log(response.status)
            if(response.status === 204){
                set((state: any)=>({
                    todos: state.todos.filter((c: CardProp)=>c.id != cardId)
                }))
            }
        } catch (error) {
            console.log((error as Error).message);
            
        }
    },
}))