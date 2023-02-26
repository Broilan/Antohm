import React from 'react'
import { BiLinkExternal } from 'react-icons/bi';


const Resources = () => {
  return (
    <>
    <h1 className='text-2xl text-center font-bold mt-10'>My resources</h1>

                <ul className='flex gap-10 w-screen items-center justify-center mt-4 text-xl'>
                <li className='hover:underline'>All</li>
                <li className='hover:underline'>Skill-upkeep</li>
                <li className='hover:underline'>Job Search</li>
                <li className='hover:underline'>Mental Health</li>
                </ul>

                <div className='flex flex-wrap h-fit ml-[15rem] mt-8 gap-10'>

                <div className='w-[30rem] h-[12rem] bg-dimWhite rounded-3xl border-black border-[1.5px]'>
                <div className='ml-auto mr-[-1.5px] mt-[-0.1rem] rounded-tl-none rounded-br-none bg-tertiary border-black border-t-0 border-r-0 border-[1px] w-20 h-12 rounded-3xl p-1 text-center'> 
                <div className='bg-black text-white font-bold rounded-3xl h-10 p-2 flex gap-1'>
                <div>view</div>
                <div className='pt-1'><BiLinkExternal /></div>
                </div>
                </div>

                <div className='ml-2 mt-[-2rem]'>  
                <div>
                    <div className='inline-block rounded-lg border-[1px] w-16 h-16 border-black'> pic</div>
                    <div>saved from</div>
                </div>

                <div>
                    <p className='truncate mb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                <div className='flex gap-4'>   
                    <div className='border-black border-[0.5px] rounded-3xl p-1 bg-white font-semibold'>Skill-upkeep</div>
                    <div className='font-semibold p-1'>11/23/22</div>
                    <div className='ml-auto border-black border-[0.5px] rounded-3xl p-1 bg-blue-400 text-white font-semibold'>Archive</div>
                    <div className='mr-2 border-black border-[0.5px] rounded-3xl p-1 bg-red-500 text-white font-semibold'>Delete</div>
                </div> 

                </div>
                </div>   

                </div>
    </>
  )
}

export default Resources