import { motion } from "framer-motion";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type CardProp = {
    title: string,
    id: string,
    column: string
}

type addCardProp = {
    column: string,
    setCards: Dispatch<SetStateAction<CardProp[]>>
}

const AddCard = ({column, setCards}: addCardProp) => {
    const [adding, setAdding] = useState(false)
    const [text, setText] = useState("")
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(!text.trim().length) return;

        const newCard: CardProp = {
            title: text,
            column,
            id: Math.random().toString()
        }

        setCards((prev)=>[...prev, newCard])
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
                        <button type="submit" className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300">Add</button>
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