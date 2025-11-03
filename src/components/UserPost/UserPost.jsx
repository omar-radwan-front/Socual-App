 
import React from "react";
 import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CreateCommentModel from "../CreateCommentModel/CreateCommentModel";
import { Link } from "react-router-dom";
import Commment from "../comment/Comment";
import UploadPost from "../UploadPost/UploadPost";
import DeletePost from "../DeletePost/DeletePost";

export default function UserPost({ id }) {
  console.log(id);

  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["userPost"],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
  });

  if (isLoading) return <div className="spinner"></div>;
  if (isError) return <h2 className="text-white text-2xl">{error.message}</h2>;

  return (
    <>
      {data?.map((post) => (
        <div
          key={post.id}
          className="w-full my-6 md:w-[80%] lg:w-[60%] mx-auto rounded-2xl 
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
                     border border-gray-200 dark:border-gray-700 
                     shadow-md p-5 transition hover:shadow-lg"
        >
          {/* Header */}
          <Link to={`/postdetails/${post.id}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.user.photo}
                  alt={post.user.name}
                  className="size-[40px] rounded-full border border-gray-400 dark:border-gray-600"
                />
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {post.user.name}
                </p>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleString("en-US")}
              </div>
            </div>

            {/* Body */}
            {post.body && (
              <p className="mb-4 text-gray-800 dark:text-gray-200 text-sm md:text-base">
                {post.body}
              </p>
            )}

            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.body}
                className="w-full rounded-xl object-cover shadow-sm mb-3"
              />
            )}
          </Link>

          {/* First comment preview */}
          {post.comments.length > 0 && (
            <div className="mt-2">
              <Commment postComment={post.comments[0]} />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4 items-center justify-start">
            <CreateCommentModel id={post.id} />
            <UploadPost id={post.id} />
            <DeletePost id={post.id} />
          </div>
        </div>
      ))}
    </>
  );
}
