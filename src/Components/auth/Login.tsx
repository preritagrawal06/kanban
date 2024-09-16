import { Input } from "@/Components/ui/input"
import { Button } from "../ui/button";
import { useState } from "react";
import { useUserStore } from "@/lib/stores/userStore";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const userLogin = useUserStore((state: any)=> state.userLogin)
    const navigate = useNavigate()
    const handleLogin = async()=>{
        if(!username.trim().length || !password.trim().length){
            toast({
                description: "Please fill all the details before submitting",
                variant: "destructive"
            })
            return
        }
        setLoading(true)
        await userLogin(username, password)
        setLoading(false)
        if(localStorage.getItem('token')){
            navigate("/")
        }
    }

    return ( 
        <div className="w-full flex flex-col items-center gap-8 p-4 border-r">
            <p className="text-xl text-neutral-200 font-bold">LOGIN</p>
            <Input placeholder="username" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <Input placeholder="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button variant="secondary" disabled={loading} onClick={handleLogin}>{loading ? "Logging..." : "Login"}</Button>
        </div>
    );
}
 
export default Login;