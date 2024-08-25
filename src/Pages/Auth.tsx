import Login from "@/Components/auth/Login";
import Signup from "@/Components/auth/Signup";

const Auth = () => {
    return ( 
        <div className="h-screen w-full bg-neutral-900 text-neutral-50 flex justify-center items-center">
            <div className="w-[60vw] p-4 rounded-md border flex items-center justify-center">
                <Login/>
                <Signup/>
            </div>
        </div>
    );
}
 
export default Auth;