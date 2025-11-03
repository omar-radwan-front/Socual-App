import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)    // view password 
    const [ApiError, setApiError] = useState("")               // change UI handel error
    const Navigate = useNavigate()       //  go to 
    const [IsLoading, setIsLoading] = useState(false)        // change UI loading on button 
    let { UserLogin, setUserLogin } = useContext(UserContext)

    const schema = z.object({                // valid data 
        email: z.string().email("invalid email"),
        password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "must be regex"),
    })

    const form = useForm({                            // catch data like data of Api 
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema)                         // handel valid with data         
    });
    let { register, handleSubmit, formState, reset } = form;                         // destruct from form  into functions  

    function sentData(x) {              // x = import   object insert data from form 
        console.log(x);
        setIsLoading(true)
        axios.post(`https://linked-posts.routemisr.com/users/signin`, x).then((res) => {           // coll Api 
            if (res.data.message === "success") {
                setIsLoading(false)    // stop loading case success
                localStorage.setItem("userToken", res.data.token)                // storage in local  
                console.log(res);
                setUserLogin(res.data.token)                             // set in setState
                Navigate("/")                         //go to home 
                reset()                         //remove values from input
            }

        }).catch((err) => {
            setApiError(err.response.data.error)            //handel error display in ui 
            setIsLoading(false)                          // stop loading case error

        })

    }
    return (                      // display the data 
        <>
            <title> Login </title>
            <div className='flex justify-center items-center min-h-[calc(100vh-160px)] mt-0  dark:bg-gray-900 transition-colors duration-300'>
                <div className='mx-auto p-8 rounded-2xl w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300'>
                    <h1 className='text-gray-900 dark:text-white text-4xl font-bold mb-10 text-center'>Login Now</h1>

                    {ApiError && <h2 className='text-center bg-red-500 text-white rounded-md my-2 p-2 font-bold '>{ApiError}</h2>}

                    <form onSubmit={handleSubmit(sentData)} className="flex flex-col gap-4 mx-auto md:w-[90%]">
                        {/* handel reload and sent object to function about away argument export  */}
                        <div>
                            <TextInput id="email1" type="email" placeholder="name@flowbite.com"
                                {...register("email")}
                            />
                            {formState.errors.email && formState.touchedFields ? <p className='text-amber-800 text-center mt-2'>{formState.errors.email.message} </p> : ""}
                        </div>

                        <div className='relative'>
                            <TextInput id="password1" className='relative' type={showPassword ? "text" : "password"}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-3 text-gray-600 dark:text-gray-300"
                            >
                                {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                            </button>
                            {formState.errors.password && formState.touchedFields ? <p className='text-2xl w-[70%] mx-auto text-red-600 text-center mt-2'>{formState.errors.password.message} </p> : ""}
                        </div>

                        <Button disabled={IsLoading}
                            type="submit" className='w-full md:w-1/2 mx-auto mt-4 hover:opacity-90 transition-all' gradientDuoTone="purpleToBlue">
                            {IsLoading ? <i className="fas fa-spinner fa-spin text-white"></i> : "Submit"}
                        </Button>
                    </form>

                    <p className="text-center text-gray-700 dark:text-gray-300 mt-6 text-sm">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
