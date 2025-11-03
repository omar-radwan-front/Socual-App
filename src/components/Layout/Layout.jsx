import React from 'react'
 import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import { MyNavbar } from '../Navbar/Navbar';
import logo from "../../assets/news-01.png"
  export default function Layout() {
  return (
  <>
 
 
   <MyNavbar/>
 <div className="container mx-auto my-5 bg-[url(logo)] ">
   <Outlet/>
 </div>

  <Footer/>
 
  </>
  )
}
