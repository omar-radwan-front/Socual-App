 
import React from "react";
 import UpdataComment from "../UpdataComment/UpdataComment";
import DeleteComment from "../DeleteComment/DeleteComment";

export default function Comment({ postComment, idPost, userId }) {
  console.log(postComment);

  if (!postComment) {
    // handel error the undefine  catch
    return (
      <p className="text-center text-gray-700 dark:text-gray-300 italic my-2">
        No comment available
      </p>
    );
  }

  let { content, commentCreator, createdAt, _id } = postComment || {};

  return (
    <>
      <div
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 
        shadow-md p-4 mt-3 transition-all duration-300 hover:shadow-lg"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <img
              src={commentCreator?.photo}
              className="size-[40px] rounded-full border border-gray-300 dark:border-gray-600"
              alt={commentCreator?.name}
            />
            <p className="font-medium">{commentCreator?.name}</p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {createdAt ? new Date(createdAt).toLocaleString("en-US") : ""}
          </div>
        </div>

        <div className="px-2 text-gray-800 dark:text-gray-200">{content}</div>

        <div className="flex gap-3 mt-4 items-center">
          {idPost === userId ? (
            <>
              <UpdataComment id={_id} />
              <DeleteComment id={_id} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

