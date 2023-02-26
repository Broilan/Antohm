import React from 'react'
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai';
import { Post, Usercard, UserGroups, News } from '../components'
import { GrEmoji } from 'react-icons/gr';

const Home = () => {
  return (
    <>
    <div className='flex flex-col ml-[15%] top-[10%] fixed gap-4' >

    <div >
        <Usercard />
    </div>

    <div >
        <UserGroups />
    </div>
    </div>

    <div className='right-[32%] top-[10%] fixed'>
        <News />
    </div>

    <div className='w-screen h-screen flex flex-col items-center'>

    <h1 className='font-bold text-[3rem] border-black border-[1px] w-[33%] text-center bg-white opacity-90'>Home</h1>

    <div className='border-black border-[1px] w-[33%] h-fit p-2 bg-white'>

    <div className='flex gap-1'>
    <div className='rounded-lg border-[1px] w-16 h-16 border-black'></div>
    <div className='font-semibold'>Username <br /> <p className='text-[0.8rem]'>@Username</p></div>
    </div>

    <br />
    <input type="text" className='border-black border-[1px] rounded-3xl w-[100%] h-32 text-center' placeholder='Post Something!' />

    <div className='flex gap-4 relative mt-[-1.2rem] ml-5'>
        <div><AiOutlineFileGif /></div>
        <div><AiFillPicture /></div>
        <div><GrEmoji /></div>
    </div>

    <div className='absolute bg-blue-500 h-10 w-24 text-center text-white font-bold p-2 rounded-3xl ml-[26.5%] mt-[-2.5rem]'>post</div>

    </div>

    <select type="text" className='bg-white w-[33%] border-black border-[1px] text-center font-semibold'>
        <option value="Recent">Recent</option>
        <option value="Following">Following</option>
    </select>

    <div className='w-[33%]'>
    <Post />
    </div>

    

    </div>
    </>
  )
}

export default Home