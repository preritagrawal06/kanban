import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Auth from './Pages/Auth'
import Kanban from './Pages/Kanban.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Kanban/>
  },
  {
    path: "/auth",
    element: <Auth/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
