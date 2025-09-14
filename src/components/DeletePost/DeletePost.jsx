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

import style from "./DeletePost.module.css"
 export default function DeletePost({id}) {
     const [IsLoading, setIsLoading] = useState( false)  
    let query=useQueryClient()
  async function onSubmit(data) {
    console.log("Form Data:", data);
              setIsLoading(true) 

    try {
      let res=await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
          token:localStorage.getItem("userToken")
        }
      }) 
           if (res.data.message === "success") {
          setIsLoading(false) 
           console.log(res);
         toast.success("delete post success")
     await query.invalidateQueries({ queryKey: ["profile"], exact: true });
  await query.invalidateQueries({ queryKey: ["home"], exact: true });
       await  query.invalidateQueries({queryKey:[`getComment`], exact:true});
       await  query.invalidateQueries({queryKey:[`userPost`], exact:true});

          
          }
    } catch (error) {
      console.log(error);
       toast.error("not delete")
      setIsLoading(false) 
    }
 
  };

  return (
    <>
      <Button disabled={IsLoading} className=" my-2 w-[100%] md:w-fit" onClick={() =>onSubmit()}>{IsLoading?<i className="fas fa-spinner fa-spin text-white"></i>:"Delete Post"}</Button>
    </>
  );
}

   