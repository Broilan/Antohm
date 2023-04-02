import React, {useState} from 'react'
import { BiLinkExternal } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

const Comment = (props) => {
    const {from, to, comments, content, likes, postID} = props

  return (
    <>

    <div className='bg-dimWhite border-gray-400 border-[1px] h-fit cursor-pointer' >
    <div className='flex w-[100%] gap-2 m-5'>
      
    <img src={from.pfp ?? null} className='border-black border-[1px]  h-16 w-16 rounded-[50%]'/>
    <div>
    <h2>{from.name}</h2>
    <h2>@{from.displayName}</h2>
    </div>
    <div className='ml-auto mr-8'><BsThreeDots /></div>
    </div>
    <div className="px-4">{content}</div>
    <div className='flex pl-4 gap-4 mt-4'>

    <div className='flex gap-1'>
    <div className='mt-1'><AiOutlineHeart /></div>
    <div> {likes.length}</div>
    </div>
    <div className='flex gap-1'>
    <div className='mt-1'><FaRegCommentDots/></div>
    <div>{comments.length}</div>
    </div>
    </div>

  </div>
  </>
  )
}

export default Comment