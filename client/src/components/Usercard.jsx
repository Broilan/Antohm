import React, {useContext, useRef, useEffect} from 'react'
import axios from 'axios';
import { AiFillGithub, AiFillLinkedin  } from 'react-icons/ai';
import { RiTwitterFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { DataContext } from '../App';

const Usercard = () => {
  const {currentUser} = useContext(DataContext)
  const followersRef = useRef(0)
  const followingRef = useRef(0) 
  useEffect(() => {
  axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}`).then(response => {
    followersRef.current = response.data.foundUser.followers.length
    followingRef.current = response.data.foundUser.following.length
  })
  }, [])
  
  return (
    <>
    <div className='relative bg-white rounded-2xl border-gray-300 scale-[1.2] border-[1px] w-[18rem] h-[26rem]'>
    <img src={currentUser?.header} className='w-[100%] object-cover rounded-2xl h-16  rounded-br-none rounded-bl-none border-gray-400 border-b-black border-b-[1px]'/>
    <div className='flex flex-col items-center justify-center mt-[-3.5rem]'>
        <img src={currentUser?.pfp} className=' rounded-[50%] outline outline-1 w-16 mt-5 mb-3'/>
        <div className='font-bold'>{currentUser?.name}</div>
        <div className='mb-3' >{currentUser?.email}</div>
        
        <p className='text-sm px-5 text-center border-b-[1px] pb-2 h-[7rem] border-b-gray-400'>{currentUser?.bio ?? null}</p>

        <div className='flex gap-16 mt-2 border-b-[1px] pb-2 border-b-gray-400 w-[100%] justify-center'>
            <div className='text-center font-bold'>{followersRef.current} <br /> followers</div>
            <div className='text-center font-bold '>{followingRef.current} <br /> following</div>
        </div>

        <div>
            <div className='flex justify-center'>
            <h1 className='font-bold p-1'>Public Links</h1>
            </div>

            <div className='flex gap-3'>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={currentUser?.github ?? null} target="_blank"><AiFillGithub /> </a>
            <p>Github</p>
            </div>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={currentUser?.twitter ?? null} target="_blank"><RiTwitterFill /> </a>
            <p>Twitter</p> 
            </div>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={currentUser?.linkedin ?? null} target="_blank"><AiFillLinkedin /> </a>
            <p>LinkedIn</p> 
            </div>

            <div className='flex flex-col cursor-pointer items-center'>
            <a href={currentUser?.website ?? null} target="_blank"><FaClipboardList /> </a>
            <p>Website</p> 
            </div>
            
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Usercard