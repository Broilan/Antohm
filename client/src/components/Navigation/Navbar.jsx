import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import DmModal from "../DmModal";
import NotifDd from "../NotifDd";
import { DataContext } from "../../App";
import './NavStyles/navbar.css'
import { FaHome } from 'react-icons/fa';
import { ImCool } from 'react-icons/im';
import { BsFillSunFill } from 'react-icons/bs';


import { MdOutlineGroups, MdOutlineCallMade } from 'react-icons/md';
import { AiOutlineBell, AiFillHome, AiOutlineDown } from 'react-icons/ai';
import { TfiEmail } from 'react-icons/tfi';
import { MdOutlinePerson } from 'react-icons/md';

import logo from '/Users/Tanner/Desktop/ThriverFolder/Thriver/client/src/assets/Thrive.png'


const Navbar = () => {            
    const {isAuthenticated, handleLogout} = useContext(DataContext)
    const [mOpen, setMOpen] = useState(false)
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
            <header>       
                <div className="nav__area">
                
                    
                <NavLink to="/"><img src={logo} className="relative left-[-7rem] h-96 w-96" /></NavLink>

                <div className="bg-four w-[17rem] h-8 ml-[-10rem] cursor-pointer z-10" >

                    <div className="flex flex-col bg-white hover:outline hover:outline-[1px] hover:outline-black h-fit">
                    <div className="flex" onClick={openDropdown} >
                        <div className="text-3xl my-auto mr-3"><AiFillHome /></div>
                         <div className="text-3xl mt-1 font-bold">Home</div>
                         <div className="text-xl mt-2 ml-auto mr-4"><AiOutlineDown /></div>
                    </div>

                    {dropdown == true? 
                    <div className="p-4">  

                    <input type="text" placeholder="Filter" className="border-[1px] w-[100%] text-center h-8 border-black" />

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

                    <div className="flex p-1 hover:bg-gray-300 cursor-pointer ">
                        <div className="my-auto mr-3 text-3xl "><BsFillSunFill /></div>
                         <div className="text-xl mt-1 font-bold">Happening Now</div>
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
                                    
                     <>
                    <NavLink to="/" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] ml-auto mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '><FaHome/></NavLink>
                    <NavLink to="/groups" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '><MdOutlineGroups /></NavLink>
                    <NavLink to="/profile" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '><MdOutlinePerson /></NavLink>
                    <div id="notif-btn" onClick={() => setNotifsOpen(true)} className=' cursor-pointer border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold hover:shadow-2xl  '><AiOutlineBell/></div>
                    <div onClick={openMessages} className='cursor-pointer border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold hover:shadow-2xl  '><TfiEmail/></div>
                    </>
                </div>
                                                                                                                                       
                { mOpen == true?<><DmModal mOpen={mOpen} setMOpen={setMOpen}/></> : null }
                { notifsOpen == true?<><NotifDd notifsOpen={notifsOpen} setNotifsOpen={setNotifsOpen}/></> : null }
            </header>
                    :null
                    
            }
        </>
    );
}



export default Navbar;
