import { useTodoStore } from "@/lib/stores/todoStore";
import { DragEvent, useState } from "react";


const BurnBarrel = () => {
    const [active, setActive] = useState(false)
    const deleteTodo = useTodoStore((state: any)=>state.deleteTodo)
    const handleDragOver = (e: any)=>{
        e.preventDefault();
        setActive(true)
        // console.log(e.dataTransfer);
        
    }

    const handleDragLeave = ()=>{
        setActive(false)
    }

    const handleDragEnd = (e: DragEvent<HTMLDivElement>)=>{
        
        const cardId = e.dataTransfer.getData("cardId")
        // console.log(cardId);
        deleteTodo(cardId)
        setActive(false)
    }

    return ( 
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`mt-10 grid shrink-0 place-content-center h-56 w-56 rounded border text-3xl ${
            active ?
            'border-red-800 bg-red-800/20 text-red-500'
            : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`
        }>
            DELETE
        </div>
    );
}
 
export default BurnBarrel;