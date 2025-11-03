import React, { useState } from "react";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Schema validation
  const schema = z
    .object({
      name: z.string().min(1, "Name is required").max(10, "Max 10 characters"),
      email: z.string().email("Invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must include uppercase, lowercase, number & special char."
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
        .refine((date) => {
          const userDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return userDate < today;
        }, "Date cannot be in the future"),
      gender: z.enum(["male", "female"], { message: "Select male or female" }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;

  const sendData = (data) => {
    setIsLoading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, data)
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/login");
          reset();
        }
      })
      .catch((err) => setApiError(err.response.data.error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <title>Register</title>
      <div className="flex justify-center items-center min-h-[calc(100vh-160px)]  dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Create Account
          </h1>

          {ApiError && (
            <div className="text-center bg-red-500/90 text-white py-2 px-4 mb-4 rounded-md font-semibold">
              {ApiError}
            </div>
          )}

          <form onSubmit={handleSubmit(sendData)} className="space-y-5">
            {/* Name */}
            <div>
              <Label htmlFor="name" value="Full Name" className="text-gray-800 dark:text-gray-200 mb-1" />
              <TextInput id="name" type="text" placeholder="Enter your name" {...register("name")} />
              {formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" value="Email" className="text-gray-800 dark:text-gray-200 mb-1" />
              <TextInput id="email" type="email" placeholder="example@email.com" {...register("email")} />
              {formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Label htmlFor="password" value="Password" className="text-gray-800 dark:text-gray-200 mb-1" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
              {formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Label htmlFor="rePassword" value="Confirm Password" className="text-gray-800 dark:text-gray-200 mb-1" />
              <TextInput
                id="rePassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("rePassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
              {formState.errors.rePassword && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.rePassword.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dateOfBirth" value="Date of Birth" className="text-gray-800 dark:text-gray-200 mb-1" />
              <TextInput id="dateOfBirth" type="date" {...register("dateOfBirth")} />
              {formState.errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label value="Gender" className="text-gray-800 dark:text-gray-200 mb-1 block" />
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Radio id="male" value="male" {...register("gender")} />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="female" value="female" {...register("gender")} />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
              {formState.errors.gender && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.gender.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={IsLoading}
              gradientDuoTone="purpleToBlue"
              className="w-full mt-3 hover:opacity-90 transition-all"
            >
              {IsLoading ? (
                <i className="fas fa-spinner fa-spin text-white"></i>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
