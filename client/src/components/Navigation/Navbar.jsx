import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import DmModal from "../DmModal";
import NotifDd from "../NotifDd";
import { DataContext } from "../../App";
import { FaHome } from 'react-icons/fa';
import { ImCool } from 'react-icons/im';
import { BsFillSunFill } from 'react-icons/bs';


import { MdOutlineCallMade, MdWorkOutline} from 'react-icons/md';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { AiOutlineBell, AiFillHome, AiOutlineDown } from 'react-icons/ai';
import { TfiEmail } from 'react-icons/tfi';
import { MdOutlinePerson } from 'react-icons/md';

import logo from '../../assets/Thrive.png'


const Navbar = () => {            
    const {isAuthenticated, handleLogout, mOpen, setMOpen} = useContext(DataContext)
    const [dropdown, setDropdown] = useState(false)
    const [notifsOpen, setNotifsOpen] = useState(false)

    function openDropdown() {
        dropdown == true? setDropdown(false) : setDropdown(true)
    }

    function openMessages(){
        setMOpen(true)
    }


    return (
        <>
        {isAuthenticated?
            <nav>                         
                
                <div className="flex gap-10 items-center justify-center w-screen h-[3rem] bg-white border-black border-[1px] p-6">
            <NavLink className=" bg-transparent w-1 scale-x-[50] cursor-pointer translate-x-[-5rem] z-10 h-10" to="/"></NavLink> 
            <img src={logo} className="absolute bottom-[30.25rem] scale-[0.25] left-[-16rem] z-[1]" />  

                <div className=" w-[17rem]  h-8 cursor-pointer" >

                    <div className="flex ml-[27rem] bg-white border-l-black rounded-xl flex-col h-fit ">
                    <div className="flex items-center z-10" onClick={openDropdown} >
                         <div className="text-xl font-bold ">Home</div>
                         <div className="text-xl border-r-[1px] border-gray-500"><AiOutlineDown /></div>
                    </div>
                    

                    {dropdown == true? 
                    <div className="z-50 bg-white w-[8rem] outline ">  

                    <p className="text-center text-gray-500 font-bold">Feeds</p>

                    <div className="flex p-1 hover:bg-gray-300 cursor-pointer ">
                        <div className="my-auto mr-3 text-3xl "><FaHome /></div>
                         <div className="text-xl mt-1 font-bold">Home</div>
                    </div>

                    <div className="flex p-1 hover:bg-gray-300 cursor-pointer ">
                        <div className="my-auto mr-3 text-3xl "><ImCool /></div>
                         <div className="text-xl mt-1 font-bold">Popular</div>
                    </div>

                    <div className="flex p-1 hover:bg-gray-300 cursor-pointer ">
                        <div className="my-auto mr-3 text-3xl "><MdOutlineCallMade /></div>
                         <div className="text-xl mt-1 font-bold">All</div>
                    </div>

                    <p className="text-center text-gray-500 font-bold">Your groups</p>
                    <div className="flex p-1 hover:bg-gray-300 cursor-pointer ">
                        <div className="my-auto mr-3 text-3xl ">+</div>
                         <div className="text-xl mt-1 font-bold">Create a group</div>
                    </div>
                    
                    <div className="flex p-1 hover:bg-gray-300 cursor-pointer ">
                        <div className="my-auto mr-3 w-10 h-10 border-black border-[1px] rounded-[50%]">img</div>
                         <div className="text-xl mt-1 font-bold">Home</div>
                         <div className='ml-auto my-auto mr-2 bg-blue-500 text-white rounded-[50%] h-6 w-6 text-center'>12</div>
                    </div>
                    </div> 

                     : null}
                    
                    </div>

                
                </div>
                    
                     <div className="flex gap-10">
                    <input type="text" placeholder="Search" className="border-gray-600 px-24 mx-28 border-[1px] rounded-xl w-[25rem] h-10" />
                    <NavLink to="/" className=' text-black text-[20px] font-bold transition-color mt-3 '><FaHome/></NavLink>
                    <NavLink to="/jobs" className=' text-black text-[20px] font-bold transition-color mt-3 '><MdWorkOutline /></NavLink>
                    <NavLink to="/resources" className=' text-black text-[20px] font-bold transition-color mt-3  '><HiOutlineNewspaper /></NavLink>
                    <NavLink to="/profile" className=' text-black text-[20px] font-bold transition-color mt-3 '><MdOutlinePerson /></NavLink>
                    <div id="notif-btn" onClick={() => setNotifsOpen(true)} className='cursor-pointer text-black text-[20px] font-bold mt-3'><AiOutlineBell/></div>
                    <div onClick={openMessages} className='cursor-pointer text-black  text-[20px] font-bold mt-3'><TfiEmail/></div>
                    </div>
                </div>
                                                                                                                                       
                { mOpen != false?<><DmModal mOpen={mOpen} setMOpen={setMOpen}/></> : null }
                { notifsOpen == true?<><NotifDd notifsOpen={notifsOpen} setNotifsOpen={setNotifsOpen}/></> : null }
            </nav>
                    :null
                    
            }
        </>
    );
}



export default Navbar;
