
import React, { useState } from "react";
import style from "./Home.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import CreateCommentModel from "../CreateCommentModel/CreateCommentModel";
import CreatePost from "../CreatePost/CreatePost";
import { Helmet } from "react-helmet";
import usePosts from "../../Hooks/usePosts";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  let query = useQueryClient();

  let { data, isError, isLoading, error } = usePosts();
  console.log(data);

  console.log(isLoading);
  console.log(isError);

  if (!error) {
    query.invalidateQueries({ queryKey: ["profile"], exact: true });
    query.invalidateQueries({ queryKey: ["home"], exact: true });
    query.invalidateQueries({ queryKey: [`getComment`], exact: true });
    query.invalidateQueries({ queryKey: [`userPost`], exact: true });
    query.invalidateQueries({ queryKey: [`ChengProfilePh`], exact: true });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <h2 className="text-center text-red-600 dark:text-red-400 text-2xl mt-10">{error.message}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* إنشاء بوست جديد */}
      <div
        className="w-full  md:w-[15%] mx-auto flex justify-center items-center my-10 rounded-2xl p-4 
        bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 
        shadow-md transition-all duration-300 "
      >
        <CreatePost />
      </div>

      {/* عرض كل البوستات */}
      {data?.map((post) => {
        return (
          <div
            key={post.id}
            className="w-full my-6 md:w-[70%] lg:w-[55%] mx-auto p-5 rounded-2xl 
            bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 
            transition-all duration-300 hover:shadow-xl"
          >
            <Link key={post.id} to={`/postdetails/${post.id}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.photo}
                    className="size-[40px] rounded-full border border-gray-300 dark:border-gray-600"
                    alt={post.user.name}
                  />
                  <p className="text-gray-900 dark:text-white font-medium">
                    {post.user.name}
                  </p>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleString("en-US")}
                </div>
              </div>

              {post.body && (
                <h2 className="mb-3 text-gray-900 dark:text-gray-200">
                  {post.body}
                </h2>
              )}
              {post.image && (
                <img
                  src={post.image}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600"
                  alt={post.body}
                />
              )}
            </Link>

            <Comment
              postComment={post.comments[0]}
              idPost={post.id}
              userId={post.user._id}
            />
            <CreateCommentModel id={post.id} />
          </div>
        );
      })}
    </>
  );
}

