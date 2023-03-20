import React, { useState } from 'react'
import { MdTimer } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';

const Applications = () => {

  return (
    <>
    <div className='bg-dimWhite w-[60%] h-[80vh] mx-auto rounded-3xl shadow-xl border-2 border-gray-400'>
    <h1 className='text-[4rem] underline text-center font-bold '>Job Tracking</h1>

    <ul className='flex gap-10 w-[100%] justify-center font-bold mt-4 text-xl'>
        <li className='hover:underline font-bold'>Applied</li>
        <li className='hover:underline font-bold'>Responses</li>
        <li className='hover:underline font-bold'>Interviews</li>
        <li className='hover:underline font-bold'>Rejections</li>
        <li className='hover:underline font-bold'>Offers</li>
      </ul>

      <div className='w-[30rem] h-[20rem] ml-2 mt-20 border-black border-[1px] rounded-3xl bg-dimWhite'>
      <div className='relative flex flex-col items-center justify-center border-b-[1px] border-l-[1px] border-black bg-tertiary w-24 h-16 top-[-1px] right-[-1px] rounded-bl-lg ml-auto'>  

        <div className='flex gap-2 bg-black items-center justify-center text-white font-bold rounded-full w-[90%] h-12'>   
          <div> View</div>
          <div><BiLinkExternal /></div>
        </div> 
       </div> 

       <div className='ml-6 flex gap-4 mb-4'>
       <div className='inline-block rounded-lg border-[1px] w-16 h-16 border-black'></div>
       <div>
       <h2>Company Name</h2>
       <h5>position</h5>
       </div>
       </div>

       <div className='flex gap-3 ml-6'>
        <div className='bg-white text-center border-black rounded-[30px] border-[1px] w-24 h-fit p-1'>Entry Level</div>
        <div className='bg-white text-center border-black rounded-[30px] border-[1px] w-24 h-fit p-1'>Remote</div>
        <div className='bg-white text-center border-black rounded-[30px] border-[1px] w-24 h-fit p-1'> full time</div>
       </div>

       <div className='flex gap-3 w-[90%] h-[40%] relative bottom-[0%] items-end justify-end'>

        <div className= 'flex bg-white text-center border-black rounded-[10px] border-[1px] w-24 h-fit p-1'>
        <div className='mt-1 mr-1'><FaExclamationTriangle/></div>
        <div> Priority</div>
        </div>

        <div className= 'text-center w-24 h-fit p-1'>+ Add note</div>

        <div className='flex'>
        <div className='mt-2'><MdTimer/></div>
        <div className= 'text-center  w-24 h-fit p-1'> Elapsed T</div>
        </div>

       </div>
      
      </div>
      </div>
    </>
  )
}

export default Applications