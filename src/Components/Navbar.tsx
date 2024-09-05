import { useUserStore } from "@/lib/stores/userStore";
import AddProject from "./AddProject";
import { useProjectStore } from "@/lib/stores/projectStore";
import { DialogCloseButton } from "./DeleteDialog";

type ProjectProp = {
    name: string,
    id: string,
    created_by: string,
    created_at: Date
}

const Navbar = ({ projects }: { projects: ProjectProp[] }) => {
    const userLogout = useUserStore((state: any) => state.userLogout)
    const user = useUserStore((state: any) => state.user)
    const activeProject = useProjectStore((state: any) => state.project)
    const setActiveProject = useProjectStore((state: any) => state.setActiveProject)
    
    return (
        <div className="w-56 py-8 px-4 border-r shrink-0 flex flex-col gap-8">
            <p className="text-xl font-semibold">Hi, {user.username}!</p>
            <div className="w-full flex flex-col flex-grow gap-2">
                {
                    projects.length > 0 &&
                    projects.map((project) => {
                        return (
                            <div key={project.id} onClick={()=>{setActiveProject(project)}} className={`group w-full flex items-center justify-between rounded ${activeProject.id === project.id ? "border border-neutral-600 bg-neutral-800/50" : ""} transition-colors hover:bg-neutral-800 hover:cursor-pointer p-2`}>
                                {project.name}
                                <div className={`hidden ${activeProject.id === project.id ? "group-hover:flex": ""}`}>
                                    {/* <Button className="hover:bg-red-500/50 h-fit w-fit p-2" variant="ghost" size="icon">
                                        <img src="/cross-svgrepo-com.svg" alt="" width={8} height={8}/>
                                    </Button> */}
                                    <DialogCloseButton activeProject={activeProject}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex flex-col gap-4">
                <AddProject />
                <button onClick={userLogout} className="flex items-center justify-center rounded bg-red-600 px-3 py-1.5 text-xs text-neutral-100 transition-colors hover:bg-red-700 w-full">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;