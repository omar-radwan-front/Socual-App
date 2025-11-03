import React, { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function DeletePost({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const query = useQueryClient();

  async function onSubmit() {
    setIsLoading(true);
    try {
      const res = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      if (res.data.message === "success") {
        toast.success("Post deleted successfully 🗑️");
        await Promise.all([
          query.invalidateQueries({ queryKey: ["profile"], exact: true }),
          query.invalidateQueries({ queryKey: ["home"], exact: true }),
          query.invalidateQueries({ queryKey: ["getComment"], exact: true }),
          query.invalidateQueries({ queryKey: ["userPost"], exact: true }),
        ]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post ❌");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={onSubmit}
        className={`my-2 w-full md:w-fit px-5 py-2.5 
                    bg-gradient-to-r from-red-600 to-rose-700 
                    hover:from-red-700 hover:to-rose-800 
                    text-white font-semibold rounded-xl 
                    shadow-md hover:shadow-lg 
                    transition-all duration-300`}
      >
        {isLoading ? (
          <i className="fas fa-spinner fa-spin text-white"></i>
        ) : (
          <>
            <i className="fa-solid fa-trash-can mr-2"></i>
            Delete Post
          </>
        )}
      </Button>
    </>
  );
}
