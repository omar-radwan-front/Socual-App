import React, { useRef, useState } from 'react'
import style from "./ChangePassword.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput
} from "flowbite-react";
import toast from 'react-hot-toast';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { Link, useNavigate } from "react-router-dom";

 export default function ChangePassword() {
    const navigate =useNavigate()

     const [IsLoading, setIsLoading] = useState( false)  
const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);
    let query=useQueryClient()

    const schema =z.object({                // valid data 
     password : z.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"must be regex"),
     newPassword : z.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"must be regex"),
    
  }) 
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
        resolver:zodResolver(schema) 
  });

  async function onSubmit(data) {
    console.log("Form Data:", data);
              setIsLoading(true) 

    try {
      let res=await axios.patch(`https://linked-posts.routemisr.com/users/change-password`,data,{
        headers:{
          token:localStorage.getItem("userToken")
        }
     
    
      })
         if (res.data.message === "success") {
          setIsLoading(false) 
                   console.log(res);
         toast.success("Change success")
          localStorage.setItem("userToken",res.data.token)
              await query.invalidateQueries({ queryKey: ["profile"], exact: true });
        await query.invalidateQueries({ queryKey: ["home"], exact: true });
       await  query.invalidateQueries({queryKey:[`getComment`], exact:true});
       await  query.invalidateQueries({queryKey:[`userPost`], exact:true});
       await  query.invalidateQueries({queryKey:[`ChengProfilePh`], exact:true});
            navigate ("/login")

         }
    } catch (error) {
      console.log(error);
       toast.error("Change error")
        setIsLoading(false) 
    }
      finally {
      setIsLoading(false);
      reset(); // تفضي الفورم
      setOpenModal(false); // تقفل المودال
    }
  };

  return (
    <>
      <Button className=" my-2 w-[100%] md:w-fit" onClick={() => setOpenModal(true)}>Change Password</Button>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <ModalHeader />
        <ModalBody>
         
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Change Your Password
            </h3>

           
            <div>
              <div className="mb-2 block">
                <Label htmlFor="ChangPass">Old Password</Label>
              </div>
              <TextInput
                id="ChangPass"
                type="password"
                {...register('password')}
                // placeholder="اكتب تعليقك هنا"
               />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="newPass">New Password</Label>
              </div>
              <TextInput
                id="newPass"
                type="password"
                {...register("newPassword")}
                // value={id}
               />
            </div>

        
            <div className="w-full">
    <Button  disabled={IsLoading}
        type="submit" className='md:w-1/4 mt-2'> {IsLoading?<i className="fas fa-spinner fa-spin text-white"></i>:"submit"}</Button>            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
