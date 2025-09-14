import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props){
const [UserLogin, setUserLogin] = useState( null);         // localStorage.getItem("userToken")  in value to handel reload
           
useEffect(()=>{                         // handel reload 
if ( localStorage.getItem("userToken")) {
    setUserLogin(localStorage.getItem("userToken"))
}
},[])



    return<UserContext.Provider value={{UserLogin,setUserLogin}}>

   {props.children}

    </UserContext.Provider>

}