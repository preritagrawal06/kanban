import { jwtDecode } from "jwt-decode"

export const getTokenValue = ()=>{
    let token
    if(localStorage.getItem('token')){
        token = jwtDecode(localStorage.getItem('token')!)
        
    } else{
        token = null
    }
    
    if(token){
        if(token.exp! < Math.ceil(Date.now()/1000)){ // token.exp is in seconds
            
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return null
        }
    }
    return token
}