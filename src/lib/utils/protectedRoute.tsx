import { useUserStore } from "../stores/userStore"
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {
    let user = useUserStore((state: any) => state.user)
    return (
        user ? <Outlet /> : <Navigate to='/auth' />
    )
}