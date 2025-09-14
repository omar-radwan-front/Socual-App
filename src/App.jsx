import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFaind from './components/NotFaind/NotFaind'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/Protected Route/ProtectedRoute'
 // import PostContextProvider from './Context/PostContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from './components/postDetails/postDetails';
 import toast, { Toaster } from 'react-hot-toast'

   const x = createBrowserRouter([
  {path :"" ,element :<Layout/>,
    children :[{index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path : "profile" ,element: <ProtectedRoute><Profile/></ProtectedRoute>},
      {path : "login", element:<Login />},
      {path :"register",element:<Register />},
      {path : `postdetails/:id`,element : <PostDetails/>},
      {path:"*", element:<NotFaind/>}
    ]
  }
])
const query =new QueryClient()
function App() {
  
  return (
    <>  
     <UserContextProvider> 
      
 
                 <QueryClientProvider client={query}>
                  {/* <ReactQueryDevtools></ReactQueryDevtools> */}
         <RouterProvider router={x}></RouterProvider>
         <Toaster/>
         </QueryClientProvider>


           {/* </PostContextProvider> */}

   {/* <ReactQueryDevtools/> */}
   </UserContextProvider>
    </>
  )
}

export default App
