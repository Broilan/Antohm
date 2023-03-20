import React from 'react'
import '../styles/App.css'

const UserGroups = () => {
  return (
    <>
    <div className='relative bg-white border-gray-400 border-[1px] scale-[1.2] rounded-2xl w-[18rem] h-[26rem] overflow-y-scroll' id="usergroups">

        <div className=' border-b-[2px] border-black rounded-b-none bg-white bg-opacity-90 rounded-3xl font-bold text-3xl p-2 w-[20rem]'>
        <h1 className='text-center'> My Groups</h1>
        </div>

        <div className='p-2 border-b-black border-b-[1px] flex gap-1 hover:bg-gray-400'>
        <div className='rounded-[50%] border-[1px] w-12 h-12 border-black p-6 ml-[-5px]'></div>
        
        <div className='w-[100%] truncate'>
        <div className='font-bold flex'> <p>GroupName</p> <p className='ml-auto bg-blue-500 text-white rounded-[50%] h-6 w-6 text-center'>12</p></div>
        <div className='truncate'>essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
        </div>
        
        </div>

        

      

    </div>
    </>
  )
}

export default UserGroups