
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Register from './../Register/Register';
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
 

export function  MyNavbar() {
  const navigate =useNavigate()
let {UserLogin,setUserLogin}=useContext(UserContext)
function signout(){
  localStorage.removeItem("userToken");
  setUserLogin(null)
  navigate ("/login")
}

  function ChengProfile( ) {
  return axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
    headers:{
      token:localStorage.getItem("userToken")
    }
  })
 }

 let{data,isError,isLoading,error}=useQuery({
  queryKey:[`ChengProfilePh`],
  queryFn:ChengProfile,
 select:(data)=>data?.data?.user
 })

  return (
<>
    <Navbar fluid rounded className="sticky top-0 rounded-3xl z-50 w-full md:w-[70%] mx-auto btn "> 
       <Link to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Social App</span>
      </Link>
    
       {UserLogin !== null?(        <Dropdown   className="relative"                               //className=" md:translate-x-[290px] md:translate-y-[58.4px]"
          arrowIcon={false} 
          inline
          label={
            <Avatar alt="User settings" img= {data?.photo} rounded />
          }
        >
       <div className="absolute top-0 right-0 bg-slate-700 ">
           <DropdownHeader>
            <span className="block text-sm text-black dark:text-white ">{data?.name}</span>
            <span className="block truncate text-sm font-medium text-black dark:text-white"> {data?.email}</span>
          </DropdownHeader>
          <DropdownDivider />
          <DropdownItem><Link to="profile" className="text-black dark:text-white">profile</Link></DropdownItem>
          <DropdownItem className="hover:bg-black"><span onClick={signout} className="cursor-pointer text-black dark:text-white"   > Sign out</span></DropdownItem>
       </div>
          
        </Dropdown>)


:( <div className="flex gap-2 ms-2">         
   <Button className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-white hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800 w-[60px] md:w-fit">
    <Link to="login">login</Link>
        
      </Button>
      <Button className="w-[60px] bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 ">
       <Link to="register">Register</Link>
      </Button></div>) }
     



       {/* </div> */}
     </Navbar></>
  );
}
