 
import React, { useState } from "react";
import style from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comment from "../comment/Comment";

export default function PostDetails() {
  const [Show, setShow] = useState(false);
  let { id } = useParams();
  console.log(id);

  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: [`getComment`],
    queryFn: getAllPosts,
    select: (data) => data?.data?.post,
  });

  console.log(data?.data?.post);

  function toggleComments() {
    setShow((prev) => !prev);
  }

  return (
    <>
      <div
        key={data?.id}
        className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-2xl 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
        border border-gray-200 dark:border-gray-700 
        shadow-md hover:shadow-lg transition-all duration-300 
        text-gray-900 dark:text-gray-100 p-5 mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img
              src={data?.user.photo}
              className="size-[44px] rounded-full border border-gray-300 dark:border-gray-600"
              alt={data?.user.name}
            />
            <p className="font-semibold text-base">{data?.user.name}</p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {new Date(data?.createdAt).toLocaleString("en-US")}
          </div>
        </div>

        {data?.body && (
          <h2 className="text-sm md:text-base leading-relaxed mb-4 text-gray-800 dark:text-gray-200">
            {data?.body}
          </h2>
        )}

        {data?.image && (
          <img
            src={data?.image}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700"
            alt={data?.body}
          />
        )}

        <button
          onClick={toggleComments}
          className="mt-5 px-4 py-2 rounded-xl font-medium 
          bg-gradient-to-r from-blue-600 to-indigo-600 
          hover:from-blue-700 hover:to-indigo-700 
          dark:from-blue-500 dark:to-indigo-500 
          text-white shadow-md transition-all duration-300"
        >
          {Show ? "Hide Comments" : "All Comments"}
        </button>

        {Show && (
          <div className="mt-4 space-y-2">
            {data?.comments.map((comment) => (
              <Comment
                key={comment._id}
                postComment={comment}
                userId={data?.user.id}
                idPost={data?.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
