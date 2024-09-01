import { useEffect, useState } from "react";
import Column from "@/Components/Column";
import { DEFAULT_CARDS } from "@/lib/data";
import BurnBarrel from "@/Components/BurnBarrel";
import Navbar from "@/Components/Navbar";
import { useProjectStore } from "@/lib/stores/projectStore";

const Kanban = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS)
    const fetchProjects = useProjectStore((state: any)=>state.fetchProjects)
    const projects = useProjectStore((state: any)=>state.projects)

    useEffect(()=>{
        fetchProjects()
    }, [])
    
    return ( 
        <div className="h-screen w-full bg-neutral-900 text-neutral-50 flex flex-row">
            <Navbar projects={projects}/>
            <div className="flex flex-col h-full overflow-auto flex-grow">
                <div className="flex overflow-auto gap-3 p-12 flex-grow">
                    <Column title="Backlogs" headingColor="text-neutral-400" cards={cards} setCards={setCards} column="backlog"/>
                    <Column title="TO-DO" headingColor="text-yellow-400" cards={cards} setCards={setCards} column="todo"/>
                    <Column title="Doing" headingColor="text-blue-400" cards={cards} setCards={setCards} column="doing"/>
                    <Column title="Done" headingColor="text-green-400" cards={cards} setCards={setCards} column="done"/>
                    <BurnBarrel setCards={setCards}/>
                </div>
                <div className="w-full px-12 py-4 flex gap-3 justify-center">
                    <input type="text" className="bg-neutral-800 rounded border border-neutral-500 w-[30%] p-2" placeholder="Enter prompt"/>
                    <button className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300">Submit</button>
                </div>
            </div>
        </div>
    );
}
 
export default Kanban;