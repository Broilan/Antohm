import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DataContext } from '../App';
import { BiLinkExternal } from 'react-icons/bi';


const Resources = () => {
  const {currentUser} = useContext(DataContext)
  const [resources, setResources] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8000/user/resources/${currentUser.id}`)
    .then(response => {
      console.log(response.data.resources)
      setResources(response.data.resources)
    })
  }, [])

  return (
    <>
    <div className='bg-dimWhite w-[60%] h-[80vh] mx-auto rounded-3xl shadow-xl border-2 border-gray-400'>
    <h1 className='text-[4rem] underline text-center font-bold '>My resources</h1>

                <ul className='flex gap-10 w-[100%] justify-center font-bold mt-4 text-xl'>
                <li className='hover:underline'>All</li>
                <li className='hover:underline'>Skill-upkeep</li>
                <li className='hover:underline'>Job Search</li>
                <li className='hover:underline'>Mental Health</li>
                </ul>
                 
                <div className='flex flex-wrap h-fit ml-2 mt-8 gap-10 w-[100%]'>
                {resources?.map((r) =>
                <div className='w-[30rem] h-[12rem] bg-dimWhite rounded-3xl border-black border-[1.5px]'>
                <div className='ml-auto mr-[-1.5px] mt-[-0.1rem] rounded-tl-none rounded-br-none bg-tertiary border-black border-t-0 border-r-0 border-[1px] w-20 h-12 rounded-3xl p-1 text-center'> 
                <Link to={r.linkTo} className='bg-black text-white font-bold rounded-3xl h-10 p-2 flex gap-1'>
                <div>view</div>
                <div className='pt-1'><BiLinkExternal /></div>
                </Link>
                </div>

                <div className='ml-2 mt-[-2rem]'>  
                <div className='flex gap-4'>
                    <div className='rounded-lg border-[1px] w-16 h-16 border-black'> pic</div>
                    <div>
                    <div className='font-bold'>{r.resourceBy.name}</div>
                    <div className='font-bold text-sm'>@{r.resourceBy.displayName}</div>
                    </div>
                </div>

                <div>
                    <p className='truncate mt-4'>{r.post[0].content}</p>
                </div>

                <div className='flex gap-4 mt-4'>   
                    <div className='border-black border-[0.5px] rounded-3xl p-1 bg-white font-semibold'>{r.resourceType}</div>
                    <div className='font-semibold p-1'>r.date</div>
                    <div className='ml-auto border-black border-[0.5px] rounded-3xl p-1 bg-blue-400 text-white font-semibold'>Archive</div>
                    <div className='mr-2 border-black border-[0.5px] rounded-3xl p-1 bg-red-500 text-white font-semibold'>Delete</div>
                </div> 

                </div>
                </div>   
                  )}
                </div>
                </div>
               
    </>
  )
}

export default Resources