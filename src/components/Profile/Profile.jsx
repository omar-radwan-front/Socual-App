 

import React from "react";
import style from "./Profile.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserPost from "../UserPost/UserPost";
import ChangePassword from "../ChangePassword/ChangePassword";
import UploadPhotoProfile from "../UploadPhotoProfile/UploadPhotoProfile";
import CreatePost from "../CreatePost/CreatePost";
import { Helmet } from "react-helmet";

export default function Profile() {
  function ChengeProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: [`profile`],
    queryFn: ChengeProfile,
    select: (data) => data?.data?.user,
  });

  if (isLoading) {
    return <div className="spinner"></div>;
  }
  if (isError) {
    return <h2 className="text-white text-2xl">{error.message}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>My Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {/* Actions section (Change password, Upload photo, Create post) */}
      <div
        className="w-full md:w-[60%] mx-auto my-10 flex flex-col md:flex-row 
        gap-3 justify-center items-center 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
        border border-gray-200 dark:border-gray-700 
        rounded-2xl p-4 shadow-md"
      >
        <ChangePassword />
        <UploadPhotoProfile />
        <CreatePost />
      </div>

      {/* Profile info */}
      <div className="w-full md:w-[60%] mx-auto my-10">
        <div
          className="flex flex-col justify-center items-center 
          bg-white/80 dark:bg-gray-900/80 
          text-gray-900 dark:text-gray-100 
          border border-gray-200 dark:border-gray-700 
          rounded-2xl shadow-md p-6"
        >
          <img
            src={data?.photo}
            alt="Profile"
            className="size-[160px] md:size-[200px] rounded-full border-4 border-blue-600 dark:border-indigo-500 shadow-md"
          />

          <table className="my-6 text-left">
            <tbody>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="py-2 pr-4 font-semibold">Email:</td>
                <td className="text-sm md:text-base">{data?.email}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="py-2 pr-4 font-semibold">Gender:</td>
                <td className="text-sm md:text-base capitalize">{data?.gender}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="py-2 pr-4 font-semibold">Birthday:</td>
                <td className="text-sm md:text-base">{data?.dateOfBirth}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Created At:</td>
                <td className="text-sm md:text-base">
                  {new Date(data?.createdAt).toLocaleString("en-US")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* User posts */}
      <UserPost id={data?._id} />
    </>
  );
}
