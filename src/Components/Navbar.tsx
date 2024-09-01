import { useUserStore } from "@/lib/stores/userStore";
import AddProject from "./AddProject";

type ProjectProp = {
    name: string,
    id: string,
    created_by: string,
    created_at: Date
}

const Navbar = ({projects}: {projects: ProjectProp[]}) => {
    const userLogout = useUserStore((state: any)=>state.userLogout)
    const user = useUserStore((state: any)=>state.user)
    return (
        <div className="w-56 py-8 px-4 border-r shrink-0 flex flex-col gap-8">
            <p className="text-xl font-semibold">Hi, {user.username}!</p>
            <div className="w-full flex flex-col flex-grow gap-2">
                {
                    projects.length > 0 && 
                    projects.map((project)=>{
                        return (
                            <div key={project.id} className="w-full rounded border border-neutral-600 bg-neutral-800/50 transition-colors hover:bg-neutral-800 p-2">
                                {project.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex flex-col gap-4">
                <AddProject/>
                <button onClick={userLogout} className="flex items-center justify-center rounded bg-red-600 px-3 py-1.5 text-xs text-neutral-100 transition-colors hover:bg-red-700 w-full">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;