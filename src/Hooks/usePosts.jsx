import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function usePosts() {
  function getAllPosts(){
return axios.get(`https://linked-posts.routemisr.com/posts?limit=100`,{
  headers:{
    token : localStorage.getItem("userToken")
  }
})
 }
let  request = useQuery({
  queryKey:["home"],
  queryFn :getAllPosts,
  // staleTime:20000,
  // gcTime:4000,
  select:(data)=>data?.data?.posts,
});
return request
}
