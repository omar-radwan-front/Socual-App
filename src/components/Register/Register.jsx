import React, { useState } from 'react'
import style from "./Register.module.css"
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { name } from './../../../node_modules/tar/dist/esm/types';
import {  Radio } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
 export default function Register() {
    const [showPassword, setShowPassword] = useState(false)

  const [ApiError, setApiError] = useState("")
  const Navigate =useNavigate()
  const [IsLoading, setIsLoading] = useState( false)        // change UI loading on button 
  
 const schema =z.object({
    name : z.string()
    .min(1 ," must be at least 1 characters long" )
    .max(10 ,"mus be 10 characters max"),
    email : z.email("invalid email"),
    password : z.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"The password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."),
    rePassword : z.string(),
    dateOfBirth : z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"can't be future date ").refine((date)=> {
  const userDate = new Date (date);
  const newDay = new Date;
  newDay.setHours(0,0,0,0)
      return userDate < newDay }),

    gender :z.enum(["male","female"]," male or female")
  }).refine((object)=>{ 
    return object.password ===  object.rePassword
  },{
    error:"pass not",
    path :["rePassword"],
  })
  const form = useForm({
    defaultValues:{
      name : "",
      email :"",
      password :"",
      rePassword : "",
      dateOfBirth: "",
      gender:"",
    },
    resolver:zodResolver(schema)             
  });
  let {register,handleSubmit,formState,reset}=form;
  function sentData(data){
        setIsLoading(true)

    // console.log(data);
       axios.post(`https://linked-posts.routemisr.com/users/signup`,data).then((res)=>{
    if (res.data.message === "success") {
      Navigate("/login")
              setIsLoading(false)
     reset()
    }
     
   }).catch((err)=>{
    // console.log(err.response.data.error);
    setApiError(err.response.data.error)
            setIsLoading(false)
   reset                         //remove values from input
   })
    
  }
  return (
    <>
      <title> Register</title>
 <div  className=' flex  flex-col justify-center align-middle h-[76vh]  p-5 '>
         <div className='   mx-auto p-5 rounded-3xl w-full md:w-[60%]' style={{backdropFilter:"blur(15px)",border:`2px solid black`,boxShadow:"0 0 10px white"}}>
    <h1 className='text-white text-4xl mb-10'> Register Now</h1>

    {ApiError && <h2 className='text-center bg-red-500 text-white rounded-md my-2 p-2 font-bold '>{ApiError}</h2>}
       <form onSubmit={handleSubmit(sentData)} className="flex  flex-col gap-1 mx-auto md:w-[70%] ">
      <div>
       
        <TextInput id="name" type="text" placeholder="Enter your Name" style={{backgroundColor:"white",color:"black"}}
         {...register("name")}
               />
          {formState.errors.name&&formState.touchedFields?<p className='text-2xl text-red-600 text-center my-3 relative'>{formState.errors.name.message} </p>:""}
      </div>
      <div>
        
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" style={{backgroundColor:"white",color:"black"}}
             {...register("email")}
          />
                  {formState.errors.email&&formState.touchedFields?<p className=' text-red-600 text-center mt-2'>{formState.errors.email.message} </p>:""}

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
                  {formState.errors.password&&formState.touchedFields?<p className='text-2xl text-red-600 text-center mt-2'>{formState.errors.password.message} </p>:""}

      </div>
      <div className='relative'>
        <TextInput id="password2"   type={showPassword ? "text" : "password"} style={{backgroundColor:"white",color:"black"}}
               {...register("rePassword")}
             />
                              <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-2 text-sm text-gray-600"
          >
            {showPassword ?  <i class="fa-solid fa-eye"></i>:<i class="fa-solid fa-eye-slash"></i>}
          </button>
                    {formState.errors.rePassword&&formState.touchedFields?<p className='text-2xl text-red-600 text-center mt-2'>{formState.errors.rePassword.message} </p>:""}

      </div>
      <div>
        <TextInput id="date of Birth" type="date" style={{backgroundColor:"white",color:"black"}}
               {...register("dateOfBirth")}
             />
                    {formState.errors.dateOfBirth&&formState.touchedFields?<p className='text-2xl text-red-600 text-center mt-2'>{formState.errors.dateOfBirth.message} </p>:""}

      </div>

<div className='flex gap-1 my-2'>
   <div className="flex items-center gap-2">
        <Radio id="male" 
            {...register("gender")}
         value="male"   />
        <Label htmlFor="male" className='dark:text-white'>male</Label>
      </div>
   <div className="flex items-center gap-2 text-black my-2">
        <Radio id="female" 
                   {...register("gender")}

         value="female"  />
        <Label htmlFor="female" className='dark:text-white'>female</Label>
      </div>

           {formState.errors.gender&&formState.touchedFields?<p className='text-2xl text-amber-800 text-center mt-5'>{formState.errors.gender.message} </p>:""}

</div>
    <Button  disabled={IsLoading}
      type="submit" className='md:w-1/4 mt-2'> {IsLoading?<i className="fas fa-spinner fa-spin text-white"></i>:"submit"}</Button>    </form>
   </div>
 </div>
    </>
  )
} 