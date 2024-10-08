import { KeyboardEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/lib/stores/userStore";
import { useProjectStore } from "@/lib/stores/projectStore";

const AddProject = () => {
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const user = useUserStore((state: any)=>state.user)
    const addProject = useProjectStore((state: any)=>state.addProject)

    const handleSubmit = async()=>{
        if(!name.trim().length){
            return 
        }
        setLoading(true)
        await addProject(name, user.user_id)
        setLoading(false)
        setName("")
        setAdding(false)
    }

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            handleSubmit()
        }
    }

    return ( 
    <>
        {
            adding ?
            <div className="flex flex-col gap-2">
                <Input type="text" placeholder="project name" value={name} onChange={(e)=>{setName(e.target.value)}} onKeyUp={handleKeyUp} autoFocus/>
                <div className="flex gap-2">
                    <Button className="flex-grow" variant="ghost" onClick={()=>{setAdding(false)}}>Close</Button>
                    <Button className="flex-grow" variant="secondary" onClick={handleSubmit} disabled={loading}>{loading ? "Creating.." : "Create"}</Button>
                </div>
            </div>
            :
            <button onClick={()=>{setAdding(true)}} className="flex items-center justify-center rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300 w-full">
                Create new board
            </button>
        }
    </>
    );
}
 
export default AddProject;