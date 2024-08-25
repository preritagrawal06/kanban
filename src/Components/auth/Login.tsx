import { Input } from "@/Components/ui/input"
import { Button } from "../ui/button";
import { useState } from "react";
import { useUserStore } from "@/lib/stores/userStore";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = useUserStore((state: any)=> state.userLogin)

    return ( 
        <div className="w-full flex flex-col items-center gap-8 p-4 border-r">
            <p className="text-xl text-neutral-200 font-bold">LOGIN</p>
            <Input placeholder="username" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <Input placeholder="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button variant="secondary" onClick={()=>userLogin(username, password)}>Login</Button>
        </div>
    );
}
 
export default Login;