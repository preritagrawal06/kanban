import { jwtDecode } from "jwt-decode"

export const getTokenValue = ()=>{
    let token
    if(localStorage.getItem('token')){
        token = jwtDecode(localStorage.getItem('token')!)
    } else{
        token = null
    }
    
    if(token){
        if(token.exp! < Date.now()){
            return null
        }
    }
    return token
}