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
import { useToast } from "@/hooks/use-toast"
import { useProjectStore } from "@/lib/stores/projectStore"
import { useState, KeyboardEvent } from "react"

type ProjectProp = {
    name: string,
    id: string,
    created_by: string,
    created_at: Date
}

export function ShareProjectButton({ activeProject }: { activeProject: ProjectProp }) {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const shareProject = useProjectStore((state: any) => state.shareProject)
    const {toast} = useToast()

    const handleSubmit = async() => {
        try {
            if (!text.trim().length) return
            setLoading(true)
            const response = await shareProject(activeProject.id, text.trim())
            if(response){
                toast({
                    description: response
                })
            }
        } catch (error) {
            toast({
                description: (error as Error).message
            })
        }finally{
            setLoading(false)
        }
    }

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            handleSubmit()
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:bg-blue-500/50 h-fit w-fit p-2" variant="ghost" size="icon">
                    <img src="/share.svg" alt="" width={8} height={8} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-neutral-900/50">
                <DialogHeader>
                    <DialogTitle className="text-neutral-100">Share this board</DialogTitle>
                    <DialogDescription>
                        Enter the user email you want to share this board with
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input className="text-neutral-100" value={text} onChange={(e) => { setText(e.target.value) }} placeholder="john.doe@example.com" onKeyUp={handleKeyUp}/>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" disabled={loading} onClick={handleSubmit}>
                            {loading ? "Sharing..." : "Share"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
