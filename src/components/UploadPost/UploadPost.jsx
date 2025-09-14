import React, { useRef, useState } from 'react'
 import { useForm } from 'react-hook-form'
import axios from 'axios';
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
import style from "./UploadPost.module.css"
import { useQueryClient } from '@tanstack/react-query';



 export default function UploadPost({id}) {
    const [IsLoading, setIsLoading] = useState( false)  

  let query=useQueryClient()
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  async function onSubmit(data) {
    console.log("Form Data:", data);
     setIsLoading(true) 
    try {
      let mydata=new FormData()
      mydata.append("body",data.body)
      mydata.append("image",data.image[0])
      let res=await axios.put(`https://linked-posts.routemisr.com/posts/${id}`,mydata,{
        headers:{
          token:localStorage.getItem("userToken")
        }
     
    
      }) 
         console.log(res);
         toast.success("Change success")
        await query.invalidateQueries({ queryKey: ["profile"], exact: true });
        await query.invalidateQueries({ queryKey: ["home"], exact: true });
        await  query.invalidateQueries({queryKey:[`getComment`], exact:true});
        await  query.invalidateQueries({queryKey:[`userPost`], exact:true});
       
  setIsLoading(false) 
 
    } catch (error) {
      console.log(error);
       toast.error("Change error")
        setIsLoading(false) 
    }
    reset(); // تفضي الفورم
    setOpenModal(false); // تقفل المودال
  };

  return (
    <>
      <Button className=" my-2 w-[100%] md:w-fit" onClick={() => setOpenModal(true)}>UPload Post</Button>

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
             Upload your Post 

            </h3>

           
            <div>
              <div className="mb-2 block ">
                <Label htmlFor="body"  > Title</Label>
              </div>
              <TextInput className=' '
                id="body"
                type="text"
                {...register('body')}
             
               />
            </div>
            <div>
              <div className="mb-2 block ">
                <Label htmlFor="photo" className='flex justify-center items-center bg-amber-700 p-5 cursor-pointer'><i className='fa-solid fa-image fa-2xl'></i></Label>
              </div>
              <TextInput className='hidden'
                id="photo"
                type="file"
                {...register('image')}
             
               />
            </div>
            <div className="w-full">
               <Button  disabled={IsLoading}
                             type="submit" className='md:w-1/4 mt-2'> {IsLoading?<i className="fas fa-spinner fa-spin text-white"></i>:"submit"}</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
