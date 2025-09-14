// import axios from 'axios';
// import React from 'react'
//   import { createContext } from "react";
 

// export let PostContext =createContext();
// export default function PostContextProvider(props){

//   function getAllPosts( ) {
//     return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`,
//         {headers:{
//             token:localStorage.getItem("userToken")
//         }
//     }).then((res)=>{
//   return res.data.posts;
        
//     }).catch((err)=>{
//   return err
        
//     })
// }



// return <PostContext.Provider value={{getAllPosts}}>
//     {props.children}
// </PostContext.Provider>   
// }




















//////////////////////////////////////////////////////

//   const [Posts, setPosts] = useState([])
//   let {getAllPosts}=useContext(PostContext)

//   async function getPost( ) {
//   // let res=  await getAllPosts()
//  try {
//   let res =await getAllPosts()
//   console.log(res);
//   setPosts(res)
//  } catch (error) {
//   console.log(error);
  
//  }
// }
// // if(res.length){
// //   setPost(res)
// // }
  
// //   }
// useEffect(()=>{
//   getPost()
// },[])
//   return (

///////////////////////////////////////////////////////////