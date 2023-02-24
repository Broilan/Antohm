import React, {useState} from 'react'



const Settings = () => {
    const [page, setPage]= useState()
  return (
    <>
        <h1 className='text-2xl text-center font-bold mt-10'>Settings</h1>

      <ul className='flex gap-10 w-screen items-center justify-center mt-4 text-xl'>
        <li className='hover:underline font-bold'>Profile</li>
        <li className='hover:underline font-bold'>Account</li>
        <li className='hover:underline font-bold'>Notifications</li>
        <li className='hover:underline font-bold'>Privacy</li>
        <li className='hover:underline font-bold'>Report an issue</li>
      </ul>

      <div className='flex flex-col items-center w-screen h-fit mt-4 '>

        <div className='bg-white w-[50%] rounded-3xl p-4'>

            <div className='text-center mt-2 font-bold text-3xl'>Profile Settings</div>
            <div className='ml-5 font-bold underline text-xl'>Option heading</div>
            <ul className='list-disc list-inside'>
            <li className='ml-10 '>essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
            </ul>

        </div>

      </div>

    </>
  )
}

export default Settings