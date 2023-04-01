import React from 'react'
import { AiFillGithub, AiFillLinkedin  } from 'react-icons/ai';
import { RiTwitterFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';

const OtherUserCard = ({otherUser}) => {
  return (
    <>
    <div className='relative bg-white rounded-2xl border-gray-300 scale-[1.2] border-[1px] w-[18rem] h-[26rem]'>
    <img src={otherUser?.header} className='w-[100%] object-cover rounded-2xl h-16  rounded-br-none rounded-bl-none border-gray-400 border-b-black border-b-[1px]'/>
    <div className='flex flex-col items-center justify-center mt-[-3.5rem]'>
        <img src={otherUser?.pfp} className=' rounded-[50%] outline outline-1 w-16 mt-5 mb-3'/>
        <div className='font-bold'>{otherUser?.name}</div>
        <div className='mb-3' >{otherUser?.email}</div>
        
        <p className='text-sm px-5 text-center border-b-[1px] pb-2 h-[7rem] border-b-gray-400'>{otherUser?.bio ?? null}</p>

        <div className='flex gap-16 mt-2 border-b-[1px] pb-2 border-b-gray-400 w-[100%] justify-center'>
            <div className='text-center font-bold'>{otherUser?.followers?.length ?? "0"} <br /> followers</div>
            <div className='text-center font-bold '>{otherUser?.following?.length ?? "0"}<br /> following</div>
        </div>

        <div>
            <div className='flex justify-center'>
            <h1 className='font-bold p-1'>Public Links</h1>
            </div>

            <div className='flex gap-3'>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={otherUser?.github ?? null} target="_blank"><AiFillGithub /> </a>
            <p>Github</p>
            </div>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={otherUser?.twitter ?? null} target="_blank"><RiTwitterFill /> </a>
            <p>Twitter</p> 
            </div>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={otherUser?.linkedin ?? null} target="_blank"><AiFillLinkedin /> </a>
            <p>LinkedIn</p> 
            </div>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={otherUser?.website ?? null} target="_blank"><FaClipboardList /> </a>
            <p>Website</p> 
            </div>
            
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default OtherUserCard