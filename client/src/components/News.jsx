import React from 'react'

const News = () => {
  return (
    <>
    <div className='absolute bg-white rounded-3xl w-[20rem] h-[26rem] overflow-y-scroll' id="usergroups">

        <div className=' border-b-[2px] border-black rounded-b-none bg-white bg-opacity-90 rounded-3xl font-bold text-3xl p-2 w-[20rem]'>
        <h1 className='text-center'>News</h1>
        </div>

        <ul className='p-2 flex gap-1 list-disc list-inside hover:bg-gray-400 '>        
         <li className='font-bold'>Newstext and what not  

         <div className='flex gap-4 ml-4'><div className='font-normal'>3 days ago</div> ~ 
         <div className='font-normal'>15 viewers</div>
         </div>
         
         </li>
        
        </ul>

        

      

    </div>
    </>
  )
}

export default News