import React from 'react'
import style from "./Profile.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import UserPost from '../UserPost/UserPost'
import ChangePassword from '../ChangePassword/ChangePassword'
import UploadPhotoProfile from '../UploadPhotoProfile/UploadPhotoProfile'
import CreatePost from '../CreatePost/CreatePost'
import {Helmet} from "react-helmet";

  export default function Profile() { 

 function ChengeProfile( ) {
  return axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
    headers:{
      token:localStorage.getItem("userToken")
    }
  })
 }

 let{data,isError,isLoading,error}=useQuery({
  queryKey:[`profile`],
  queryFn:ChengeProfile,
 select:(data)=>data?.data?.user
 })
if (isLoading) {
  return <div className="spinner"></div>
}
if (isError) {
  return <h2 className='text-white text-2xl'> {error.message}</h2>
}
//  console.log(d ata?.data?.user);                       
 
  return (
 <> 
 
                <title>My Profile</title>
                <link rel="canonical" href="http://mysite.com/example" />
 <div className="w-full md:w-[50%] mx-auto my-10 md:flex gap-2 bg-slate-500 p-2 rounded-4xl justify-center">
   <ChangePassword/>
 <UploadPhotoProfile/>
 <CreatePost/>
</div>
  <div className="w-full md:w-[60%] mx-auto my-10">
    <div className="box flex flex-col justify-center items-center bg-slate-500 p-4 text-white border-2 border-amber-950 rounded-3xl">
      <img src={data?.photo} alt="" className='size-[200px]'/>


      <table className='my-5 mx-auto'>
        <thead className='p-2'>
          <tr>
            <td className='text-2xl '>Email :</td>
            <td className='text-black text-xl'>{data?.email}</td>
          </tr>
        </thead>
        <tbody className='p-5'>
          <tr>
            <td className='text-2xl '>Gender :</td>
            <td  className='text-black text-xl'>{data?.gender}</td>
          </tr>
          <tr>
            <td className='text-2xl '>BirthDay :</td>
            <td  className='text-black text-[16px] md:text-xl'>{data?.dateOfBirth}</td>
          </tr>
          <tr>
            <td className='text-2xl '>CreatedAt :</td>
            <td  className='text-black text-[16px] md:text-xl'>  {new Date(data?.createdAt).toLocaleString("en-US")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UserPost id={data?._id}/>

  
 </>
  )
}
