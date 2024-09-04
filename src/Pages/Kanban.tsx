import { useEffect, useState } from "react";
import Column from "@/Components/Column";
import BurnBarrel from "@/Components/BurnBarrel";
import Navbar from "@/Components/Navbar";
import { useProjectStore } from "@/lib/stores/projectStore";
import { useColumnStore } from "@/lib/stores/columnStore";
import { useTodoStore } from "@/lib/stores/todoStore";

const Kanban = () => {
    const [title, setTitle] = useState("")
    const fetchProjects = useProjectStore((state: any)=>state.fetchProjects)
    const projects = useProjectStore((state: any)=>state.projects)
    const activeProject = useProjectStore((state: any)=>state.project)
    const columns = useColumnStore((state: any)=> state.columns)
    const getColumns = useColumnStore((state: any)=> state.getColumns)
    const addColumn = useColumnStore((state: any)=> state.addColumn)
    const getTodos = useTodoStore((state: any)=>state.getTodos)

    useEffect(()=>{
        fetchProjects().then((data: any)=>{
            getColumns(data.id)
            getTodos(data.id)
        })
    }, [])

    useEffect(()=>{
        if(activeProject) getColumns(activeProject.id)
        if(activeProject) getTodos(activeProject.id)
    }, [activeProject])
    
    const handleSubmit = async()=>{
        if(!title.trim().length) return;
        await addColumn(activeProject.id, title)
    }

    return ( 
        <div className="h-screen w-full bg-neutral-900 text-neutral-50 flex flex-row">
            <Navbar projects={projects}/>
            <div className="flex flex-col h-full overflow-auto flex-grow">
                <div className="flex overflow-auto gap-3 p-12 flex-grow">
                    {
                        columns.length > 0 &&
                        <>
                            {
                                columns.map((column: any)=>{
                                    return (
                                        <Column key={column.id} title={column.title} headingColor="text-neutral-400" column={column.slug}/>
                                    )
                                })
                            }
                            <BurnBarrel/>
                        </> 
                    }
                </div>
                <div className="w-full px-12 py-4 flex gap-3 justify-center">
                    <input type="text" className="bg-neutral-800 rounded border border-neutral-500 w-[30%] p-2" placeholder="Enter column title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    <button onClick={handleSubmit} className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300">Submit</button>
                </div>
            </div>
        </div>
    );
}
 
export default Kanban;