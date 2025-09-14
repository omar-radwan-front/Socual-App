import React from 'react'
import style from "./UserPost.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import CreateCommentModel from '../CreateCommentModel/CreateCommentModel';
import { Link } from 'react-router-dom';
import Commment from '../commment/commment';
import UploadPost from '../UploadPost/UploadPost';
import DeletePost from '../DeletePost/DeletePost';
  
 export default function UserPost({id}) {
console.log(id);

  function UserPost( ) {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
  }
  let{data,isError,isLoading,error}=useQuery({
    queryKey :  ['userPost'],
    queryFn  :  UserPost,
    select:(data)=>data?.data?.posts
  })
  console.log(data);
  
  return (
     <>
      {data?.map((post)=>{
  return  <div   key={post.id} className='w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-300 p-4 mx-auto'>
  <Link key={post.id} to={`/postdetails/${post.id}`} ><div className='flex justify-between items-center mb-4'>
<div className="flex items-center gap-4">
  <img src={post.user.photo}className='size-[36px]' alt={post.user.name} />
  <p>{post.user.name}</p>
</div>
<div className='text-xs'>
  {new Date(post.createdAt).toLocaleString("en-US")}
</div>
</div>

 
{post.body&& <h2 className=' mb-4'>{post.body}</h2>}
{post.image&& <img src={post.image} className='w-full rounded-md' alt={post.body}></img>}



</Link>
{post.comments.length > 0 &&
<Commment  postComment={post.comments[0]} />
}
<div className=' md:flex  gap-3 my-4 items-center'>
  <CreateCommentModel id={post.id}/>
<UploadPost id={post.id}/>
<DeletePost  id={post.id}/>
</div>
</div>               
   })}
     </>
  )
}
