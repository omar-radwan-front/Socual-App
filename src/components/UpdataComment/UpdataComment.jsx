import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput
} from "flowbite-react";
import axios from "axios";
 import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query';

import style from "./UpdataComment.module.css"

 export default function UpdataComment({id}) {
    let query=useQueryClient()
    const [IsLoading, setIsLoading] = useState( false)  
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true)
    console.log("Form Data:", data);
    try {
      let res=await axios.put(`https://linked-posts.routemisr.com/comments/${id}`,data,{
        headers:{
          token:localStorage.getItem("userToken")
        }
     
    
      }) 
        if (res.data.message === "success") {
        setIsLoading(false) 
        console.log(res);
        toast.success("Update comment success")
        await query.invalidateQueries({ queryKey: ["profile"], exact: true });
        await query.invalidateQueries({ queryKey: ["home"], exact: true });
            await  query.invalidateQueries({queryKey:[`getComment`], exact:true});
            await  query.invalidateQueries({queryKey:[`userPost`], exact:true});
        }
         
    } catch (error) {
      console.log(error);
       toast.error("not Access to Updata comment")
       setIsLoading(false) 
    } finally {
      setIsLoading(false);
      reset(); // تفضي الفورم
      setOpenModal(false); // تقفل المودال
    }
  };

  return (
    <>
      <Button className=" my-2 w-[100%] md:w-fit" onClick={() => setOpenModal(true)}>Updata Comment</Button>

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
              Updata Your Comment
            </h3>

           
            <div>
              <div className="mb-2 block">
                <Label htmlFor="AddComment">UpdataComment</Label>
              </div>
              <TextInput
                id="AddComment"
                type="text"
                {...register('content')}
                placeholder="اكتب تعليقك هنا"
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
