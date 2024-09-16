import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Auth from './Pages/Auth'
import Kanban from './Pages/Kanban.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from './lib/utils/protectedRoute.tsx'
import { Toaster } from "@/Components/ui/toaster"


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Kanban />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Toaster/>
    <RouterProvider router={router} />
  </StrictMode>,
)
