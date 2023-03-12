import React, {useContext} from 'react'
import { AiFillGithub, AiFillLinkedin  } from 'react-icons/ai';
import { RiTwitterFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { DataContext } from '../App';

const AboutGroup = () => {
  const {currentUser} = useContext(DataContext)
  return (
    <>
    <div className='absolute right-40 top-40 bg-white rounded-2xl border-gray-300 border-[1px] w-[18rem] h-fit'>
    <p className='bg-gray-500 rounded-2xl h-16 font-bold text-white justify-center rounded-br-none rounded-bl-none border-gray-400 border-b-black border-b-[1px] flex flex-col items-center'>
        About Resources
    </p>
    <p className='p-3 text-md'>The resources page is a place you can come to view user-posted resources, and talk with other users in a particular STEM field. Don't hesitate to hop into one of the sub-groups, cross-discipline discussion is encouraged!</p>
    <div className='flex gap-20 text-center justify-center border-t-[1px] border-t-gray-300'>
        <div>
        <p className='font-bold'>Users</p>
        <p>100</p>
        </div>

        <div>
        <p className='font-bold'>Online</p>
        <p>50</p>
        </div>
    </div>
    

    </div>
    </>
  )
}

export default AboutGroup