import React from 'react'
import style from "./Commment.module.css"
import UpdataComment from '../UpdataComment/UpdataComment';
import DeleteComment from '../DeleteComment/DeleteComment';

export default function Commment({ postComment, idPost, userId }) {

  console.log(postComment);

  if (!postComment) {                          //handel error the undefine  catch
    return <p className="text-white">No comment available</p>;          
  }

  let { content, commentCreator, createdAt, _id } = postComment || {};

  return (
    <>
      <div className='w-fill rounded-md border-slate-900 p-3 bg-slate-800 text-white my-1.5'>
        <div className='flex justify-between items-center mb-4'>
          <div className="flex items-center gap-4">
            <img src={commentCreator?.photo} className='size-[36px]' alt="" />
            <p>{commentCreator?.name}</p>
          </div>
          <div className='text-xs'>
            {createdAt ? new Date(createdAt).toLocaleString("en-US") : ""}
          </div>
        </div>

        <div className="content px-12">
          {content}
        </div>

        <div className='md:flex gap-3 my-4 items-center'>
          {idPost === userId ? (
            <>
              <UpdataComment id={_id} />
              <DeleteComment id={_id} />
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
