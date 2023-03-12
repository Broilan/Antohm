import React, {useState, useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../App';

const Jobs = () => {
const {currentUser, isAuthenticated} = useContext(DataContext)




  return (
    <>
    <div className='flex gap-10 items-center justify-center w-[50vw] border-2 border-gray-300 bg-white h-[3rem] mx-auto rounded-2xl mt-2'>
        <div className='bg-blue-400 rounded-xl p-1 text-white border-gray-400 border-2  font-bold'>Experience level</div>
        <div className='bg-blue-400 rounded-xl p-1 text-white border-gray-400 border-2  font-bold'>Date posted</div>
        <div className='bg-blue-400 rounded-xl p-1 text-white border-gray-400 border-2  font-bold'>Company</div>
        <div className='bg-blue-400 rounded-xl p-1 text-white border-gray-400 border-2  font-bold'>Job type</div>
        <div className='bg-blue-400 rounded-xl p-1 text-white border-gray-400 border-2  font-bold'>On-site/remote</div>
        <div className='bg-blue-400 rounded-xl p-1 text-white border-gray-400 border-2  font-bold '>Location</div>
        <div className=' text-black font-bold'>Reset</div>
    </div>

    <div className='flex w-screen h-screen justify-center'>
    <div className='border-gray-400 border-[1px] rounded-tl-xl h-screen bg-white w-[25vw]'>

        <div>
            <div className='bg-blue-400 w-[100%] h-24 outline-blue-500 rounded-tl-xl flex flex-col items-center'>
            <p className='text-white text-center mt-1 text-xl font-bold'>Search our api for one million + jobs. <br />  Updated <p className='underline text-2xl inline'>everyday.</p></p>
           <input id="search-jobs" className='border-black border-[1px] rounded-2xl pl-2 py-2 w-64 translate-y-3' placeholder='Search now' type="text" />
           <div className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] rounded-2xl w-16 h-8 text-center mr-4 p-1 mt-[-25px] ml-auto text-white font-bold'>Search</div>
            </div>
        </div>

        <div className='border-[1px] border-gray-400 w-[100%] h-screen mt-6 flex flex-col overflow-y-scroll'>
            <div className='border-[1px] border-gray-400 w-[100%] h-26  cursor-pointer'>
                
                <div className='flex border-gray-300 hover:bg-gray-200 border-[1px]'>
                <img src="" alt="xx" className='w-16 h-16 rounded-xl border-black border-[1px] m-1'/>
                <div>
                <p className='font-bold px-1 mb-1'>position</p>
                <p className='font-bold px-1'>company</p>
                <p className='px-1'>benefits</p>
                <p className='px-1'>date posted</p>
                </div>
                </div>

            </div>
        </div>

    </div>



    <div className='border-gray-400 border-[1px] rounded-tr-xl h-screen bg-white w-[40vw]'>

        <div className='m-2 border-b-gray-400 border-b-[1px]'>

            <div className='flex'>
                <img src="" alt="" className='rounded-[50%] border-black border-[1px] w-24 h-24'/>
                <h1 className='text-[3.5rem] font-semibold'>Company</h1>
                <div className='flex gap-10 ml-auto mr-2 text-[1rem] '>

                <div className='text-xl'>
                    <h1 className='underline font-semibold text-3xl'>Salary</h1>
                    <h3>$430,000</h3>
                </div>

                <ul className='text-xl'>
                <h1 className='underline font-semibold text-3xl'>Benefits</h1>
                <li>401k</li>
                <li>Dental</li>
                </ul>
                <div></div>
                
                </div>
            </div>

        <h2 className='text-[3rem] ml-28 font-bold mt-[-1rem]'>Postition</h2>
        <h3 className='font-semibold text-xl'>Location</h3>
        <div className='bg-blue-500 rounded-xl w-16 h-8 ml-auto mt-[-2rem] mb-[0.5rem] text-white font-bold text-center pt-1 cursor-pointer'>Apply</div>
        </div>

    </div>
    </div>
    </>
  )
}

export default Jobs