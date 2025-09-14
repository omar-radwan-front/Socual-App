import React, { useState } from 'react'
import style from "./PostDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Commment from '../commment/commment'
 
 export default function PostDetails() {
  const [Show, setShow] = useState(false)
  let {id}=useParams()
  console.log(id);
  
   function getAllPosts(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
   }
   
   

let{data,isError,isLoading,error}=useQuery({
  queryKey:[`getComment`],
  queryFn :getAllPosts,
  select:(data)=>data?.data?.post
})
  console.log(data?.data?.post);
  

function toggleComments( ) {
setShow(prev => !prev);
}
  return (
     <>
   
   <div key={data?.id}  className='w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-300 p-4 mx-auto'>
     <div className='flex justify-between items-center mb-4'>
     <div className="flex items-center gap-4">
       <img src={data?.user.photo}className='size-[36px]' alt={data?.user.name} />
       <p>{data?.user.name}</p>
     </div>
     <div className='text-xs'>
       {new Date(data?.createdAt).toLocaleString("en-US")}
     
     </div>
     </div>
     
      
     {data?.body&& <h2 className=' mb-4'>{data?.body}</h2>}
     {data?.image&& <img src={data?.image} className='w-full rounded-md' alt={data?.body}></img>}
       <button onClick={toggleComments} className='bg-blue-900 p-2 rounded-2xl text-white mt-5 hover:bg-blue-500  cursor-pointer transition duration-300'> All Comments</button>
   { Show && 
   <div> {data?.comments.map((comment)=><Commment key={Commment.id} postComment={comment} userId={data?.user.id} idPost={data?.id}/>)}</div>
    
    }
     
     
     </div> 
     </>
  )
}
