import React from 'react'

const NotifDd = (props) => {
  const {notifsOpen, setNotifsOpen} = props
  return (
    <>
    <div className='absolute bg-white w-96 h-[25rem] rounded-3xl overflow-y-scroll z-10 right-6 border-gray-400 border-[2px]' id="notifs">

      <div className='mb-[0.75rem]'>
      <h1 className='font-bold p-2 border-b-black border-b-[1px]'>Notifications</h1>
      <div onClick={() => setNotifsOpen(false)} className='bg-black cursor-pointer rounded-[50%] h-5 w-5 text-white text-center ml-auto mr-5 mt-[-2rem]'>x</div>
      </div>

      <div className='' >
    <div className='flex truncate border-b-gray-500 border-b-[1px]  hover:bg-gray-200'>
    <div className='rounded-[50%] m-1 border-[1px] w-5 h-8 p-5 border-black'></div>
    <div>
    <div className='font-semibold text-sm mt-1'>Name did xyzbca!</div>
    <div className='truncate text-sm'>essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
    </div>
    </div>
    </div>

    </div>
    
    </>
  )
}

export default NotifDd