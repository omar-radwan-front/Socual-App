import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { name } from './../../../node_modules/tar/dist/esm/types';
import {  Radio } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { UserContext } from "../../Context/UserContext.jsx";
import { UserContext } from '../../Context/UserContext';
 
 
 export default function Login() {
    const [showPassword, setShowPassword] = useState(false)    // view password 
    const [ApiError, setApiError] = useState("")               // change UI handel error
    const Navigate =useNavigate()       //  go to 
    const [IsLoading, setIsLoading] = useState( false)        // change UI loading on button 
    let {UserLogin,setUserLogin}=useContext(UserContext)
    const schema =z.object({                // valid data 
    email : z.email("invalid email"),
    password : z.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"must be regex"),
    
  }) 

  const form = useForm({                            // catch data like data of Api 
    defaultValues:{ 
      email :"",
      password :"",
    },
    resolver:zodResolver(schema)                         // handel valid with data         
  });
 let {register,handleSubmit,formState,reset}=form;                         // destruct from form  into functions  

  function sentData(x){              // x = import   object insert data from form 
    console.log(x);
    setIsLoading(true)
        axios.post(`https://linked-posts.routemisr.com/users/signin`,x).then((res)=>{           // coll Api 
    if (res.data.message === "success") {
      setIsLoading(false)    // stop loading case success
      localStorage.setItem("userToken",res.data.token)                // storage in local  
      console.log(res);
      setUserLogin(res.data.token)                             // set in setState
      Navigate("/")                         //go to home 
      reset()                         //remove values from input
    }
     
   }).catch((err)=>{
    setApiError(err.response.data.error)            //handel error display in ui 
          setIsLoading(false)                          // stop loading case error
  
   })
    
  }
  return (                      // display the data 
    <>
     <title> Login </title>
  <div className=' flex  flex-col justify-center align-middle h-[76vh]  p-5'>
     <div className='   mx-auto p-5 rounded-3xl w-full md:w-[60%]'style={{backdropFilter:"blur(15px)",border:`2px solid black`,boxShadow:"0 0 10px white"}}>
    <h1 className='text-white text-4xl mb-10'> Login Now</h1>
        {ApiError && <h2 className='text-center bg-red-500 text-white rounded-md my-2 p-2 font-bold '>{ApiError}</h2>}

       <form onSubmit={handleSubmit(sentData)} className="flex  flex-col gap-1 mx-auto md:w-[70%]  " >        
        {/* handel reload and sent object to function about away argument export  */}
      <div>
        
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" style={{backgroundColor:"white",color:"black"}}
             {...register("email")}
          />
                  {formState.errors.email&&formState.touchedFields?<p className=' text-amber-800 text-center mt-2'>{formState.errors.email.message} </p>:""}

      </div>
       <div className='relative'>
             <TextInput id="password1" className='relative' type={showPassword ? "text" : "password"}
      style={{backgroundColor:"white",color:"black"}}
                   {...register("password")} 
     
                />
                      <button
                 type="button"
                 onClick={() => setShowPassword(prev => !prev)}
                 className="absolute right-2 top-2 text-sm text-gray-600"
               >
                 {showPassword ?  <i class="fa-solid fa-eye"></i>:<i class="fa-solid fa-eye-slash"></i>}
               </button>
                       {formState.errors.password&&formState.touchedFields?<p className='text-2xl w-[30%] mx-auto text-red-600 text-center mt-2'>{formState.errors.password.message} </p>:""}
     
           </div>
      <Button  disabled={IsLoading}
      type="submit" className='md:w-1/4 mt-2'> {IsLoading?<i className="fas fa-spinner fa-spin text-white"></i>:"submit"}</Button>
    </form>
   </div>
  </div>
    </>
  )
}

