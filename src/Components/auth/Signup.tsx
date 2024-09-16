import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUserStore } from "@/lib/stores/userStore";
import { useToast } from "@/hooks/use-toast"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()

    const userSignup = useUserStore((state: any)=>state.userSignup)
    const handleSignup = async()=>{
        if(!username.trim().length || !password.trim().length || !email.trim().length){
            toast({
                description: "Please fill all the details before submitting",
                variant: "destructive"
            })
            return
        }
        setLoading(true)
        await userSignup(username, email, password)
        setLoading(false)
    }
    return ( 
        <div className="w-full flex flex-col items-center gap-8 p-4">
            <p className="text-xl text-neutral-200 font-bold">SIGNUP</p>
            <Input placeholder="username" type="text" value={username} onChange={e=>{setUsername(e.target.value)}}/>
            <Input placeholder="email" type="text" value={email} onChange={e=>{setEmail(e.target.value)}}/>
            <Input placeholder="password" type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
            <Button variant="secondary" disabled={loading} onClick={handleSignup}>{loading ? "Signing up.." : "Signup"}</Button>
        </div>
    );
}
 
export default Signup;