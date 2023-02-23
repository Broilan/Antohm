import React from 'react'
import { BiLinkExternal } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

const Post = () => {
  return (
    <>
    <div className='bg-dimWhite border-gray-400 border-[1px] h-fit'>
    <div className='flex w-[100%] gap-2 m-5'>
      
    <div className='border-black border-[1px]  h-16 w-16 rounded-[50%]'>userpic</div>
    <div>
    <h2>username</h2>
    <h2>user@</h2>
    </div>
    <div className='ml-auto mr-8'><BsThreeDots /></div>
    </div>
    <div className="px-4"> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</div>
    <div className='flex pl-4 gap-4 mt-4'>

    <div className='flex gap-1'>
    <div className='mt-1'><AiOutlineHeart /></div>
    <div> likes</div>
    </div>
    <div className='flex gap-1'>
    <div className='mt-1'><FaRegCommentDots/></div>
    <div>comments</div>
    </div>
    <div className='ml-auto mr-5 text-3xl'><BiLinkExternal /></div>
    </div>

  </div>
  </>
  )
}

export default Post