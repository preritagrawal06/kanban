import { useProjectStore } from "@/lib/stores/projectStore";
import { useTodoStore } from "@/lib/stores/todoStore";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type addCardProp = {
    column: string,
}

const AddCard = ({column}: addCardProp) => {
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    const addTodo = useTodoStore((state: any)=>state.addTodo)
    const activeProject = useProjectStore((state: any)=>state.project)
    
    const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(!text.trim().length) return;
        setLoading(true)
        await addTodo(activeProject.id, column, text)
        setLoading(false)
        setAdding(false)
    }
    

    return ( 
        <>
            {
                adding ?
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea onChange={(e)=> setText(e.target.value)} autoFocus placeholder="Add new task..." className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50"/>
                    <div className="flex items-center justify-end gap-1.5 mt-1.5">
                        <button onClick={()=>{setAdding(false)}} className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50">Close</button>
                        <button type="submit" disabled={loading} className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300">{loading ? "Adding.." : "Add"}</button>
                    </div>
                </motion.form>
                :
                <motion.button layout onClick={()=>{setAdding(true)}} className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50">
                    <span>Add Card</span>
                </motion.button>
            }
        </>
    );
}
 
export default AddCard;