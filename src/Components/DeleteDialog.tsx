import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { useProjectStore } from "@/lib/stores/projectStore"
import { useState, KeyboardEvent } from "react"

type ProjectProp = {
    name: string,
    id: string,
    created_by: string,
    created_at: Date
}

export function DialogCloseButton({ activeProject }: { activeProject: ProjectProp }) {
    const [text, setText] = useState("")
    const reqResponse = activeProject.name.trim().toLowerCase().split(" ").join("")
    const deleteProject = useProjectStore((state: any) => state.deleteProject)

    const handleSubmit = () => {
        if (!text.trim().length) return
        if (text !== reqResponse) return
        deleteProject(activeProject.id)
    }

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            handleSubmit()
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:bg-red-500/50 h-fit w-fit p-2" variant="ghost" size="icon">
                    <img src="/cross-svgrepo-com.svg" alt="" width={8} height={8} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-neutral-900/50">
                <DialogHeader>
                    <DialogTitle className="text-neutral-100">Are you sure?</DialogTitle>
                    <DialogDescription>
                        Type <span className="text-red-500">"{reqResponse}"</span> to delete the project
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input className="text-neutral-100" value={text} onChange={(e) => { setText(e.target.value) }} onKeyUp={handleKeyUp}/>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
