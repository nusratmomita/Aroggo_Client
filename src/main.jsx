import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { routers } from './Routes/Routes.jsx'
import AuthProvider from './Authentication/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastContainer></ToastContainer>
    <RouterProvider router={routers}></RouterProvider>
  </AuthProvider>
)
