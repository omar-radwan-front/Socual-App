import React, { useState } from 'react'
import style from "./Home.module.css"
 import { useQuery } from '@tanstack/react-query';
 import axios from 'axios';
import Commment from '../commment/commment';
import { Link } from 'react-router-dom';
import CreateCommentModel from '../CreateCommentModel/CreateCommentModel';
import CreatePost from '../CreatePost/CreatePost';
import { Helmet } from 'react-helmet';
import usePosts from '../../Hooks/usePosts';
import { useQueryClient } from '@tanstack/react-query';

export default  function Home() {
      let query=useQueryClient()

let{data,isError,isLoading,error}=usePosts()
console.log(data);

console.log(data?.data?.posts);
console.log(isLoading);
console.log(isError);
if (!error) {
           query.invalidateQueries({ queryKey: ["profile"], exact: true });
          query.invalidateQueries({ queryKey: ["home"], exact: true });
          query.invalidateQueries({queryKey:[`getComment`], exact:true});
          query.invalidateQueries({queryKey:[`userPost`], exact:true});
          query.invalidateQueries({queryKey:[`ChengProfilePh`], exact:true});
}
if (isLoading) {
  return <div className="spinner"></div>
}
if (isError) {
  return <h2 className='text-white text-2xl'> {error.message}</h2>
}

return(
   <>
 <div className="w-full md:w-[30%] mx-auto my-10 md:flex gap-2 bg-slate-500  rounded-4xl justify-center mt-10">  
             
                 <title> Home</title>
             
 
 <CreatePost/>
 </div>

        {data?.map((post)=>{
  return <div key={post.id}  className='w-full my-4 md:w-[80%] lg:w-[60%] rounded-md bg-slate-300 p-4 mx-auto'>
           <Link key={post.id} to={`/postdetails/${post.id}`} ><div className='flex justify-between items-center mb-4'>
<div className="flex items-center gap-4">
  <img src={post.user.photo}className='size-[36px]' alt={post.user.name} />
  <p>{post.user.name}</p>
</div>
<div className='text-xs'>
  {new Date(post.createdAt).toLocaleString("en-US")}
  {/* , {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Africa/Cairo"
  })} */}
</div>
</div>

 
{post.body&& <h2 className=' mb-4'>{post.body}</h2>}
{post.image&& <img src={post.image} className='w-full rounded-md' alt={post.body}></img>}

</Link>
<Commment  postComment={post.comments[0]} idPost={post.id} userId={post.user._id} />
<CreateCommentModel id={post.id}/>
</div>
   })}
   </>
)
}

