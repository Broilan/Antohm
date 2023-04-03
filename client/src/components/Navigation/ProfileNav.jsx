import React from 'react'
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const ProfileSideBar = (props) => {
  const {setCurrent} = props
  return (
    <>
        <div className='flex flex-col gap-10 bg-dimWhite rounded-2xl shadow-xl border-gray-400 border-2 p-2 w-[21rem] lg:w-[18rem] items-center'>
            <div>
            <h4 className='font-bold text-3xl underline lg:text-2xl'>Dashboards</h4>
            <div className='flex justify-evenly font-bold text-xl lg:flex-col lg:w-fit'>
              <div onClick={() => setCurrent(2)} className="cursor-pointer flex items-center bg-red-300 rounded-xl p-1 text-white"><div  ><MdOutlineDashboardCustomize/> </div><div>Quant Dash</div></div>
              <div onClick={() => setCurrent(1)} className="cursor-pointer flex items-center bg-blue-400 rounded-xl p-1 text-white"><div ><MdOutlineDashboardCustomize/> </div><div>Social Dash</div></div>
            
            </div>
            </div>
        </div>
    </>
  )
}

export default ProfileSideBar