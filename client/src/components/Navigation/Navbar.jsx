import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DmModal from "../DmModal";
import NotifDd from "../NotifDd";
import { DataContext } from "../../App";
import { FaHome } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';


import { MdWorkOutline} from 'react-icons/md';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { AiOutlineBell } from 'react-icons/ai';
import { TfiEmail } from 'react-icons/tfi';
import { MdOutlinePerson } from 'react-icons/md';
import { VscSettingsGear } from 'react-icons/vsc';



const Navbar = () => {     
    const {currentUser} = useContext(DataContext)   
    const {isAuthenticated, handleLogout, mOpen, setMOpen} = useContext(DataContext)
    const [notifsOpen, setNotifsOpen] = useState(false)
    const nav = useNavigate()


    function openMessages(){
        setMOpen(true)
    }

    return (
        <>
        {isAuthenticated?
        <nav>                         
            <div className="flex items-center w-screen h-12 lg:h-16 bg-white border-black border-[1px] py-6 px-2 gap-1">                    
                     <div onClick={() => nav('/')} className="font-Oswald cursor-pointer ml-auto text-[3rem] lg:hidden h-0 translate-y-[-2.2rem]">AntΩhm</div>   
                     <img src={currentUser?.pfp} onClick={() => nav('/profile')} className=" hidden cursor-pointer border-gray-300 border-[1px] ml-auto h-[3.6rem] w-[3.6rem] lg:block rounded-[50%]" />   
                    <input type="text" placeholder="Search" className="border-gray-600 text-center mx-auto border-[1px] rounded-xl w-[30%] lg:w-[100%] h-10" />

                <div className="flex gap-8 mr-4">
                    <NavLink to="/" className='ml text-black lg:hidden text-[20px] font-bold transition-color mt-3 '><FaHome/></NavLink>
                    <NavLink to="/jobs" className=' text-black lg:hidden text-[20px] font-bold transition-color mt-3 '><MdWorkOutline /></NavLink>
                    <NavLink to="/resources" className=' text-black lg:hidden text-[20px] font-bold transition-color mt-3  '><HiOutlineNewspaper /></NavLink>
                    <NavLink to="/profile" className=' text-black lg:hidden text-[20px] font-bold transition-color mt-3 '><MdOutlinePerson /></NavLink>
                    <div id="notif-btn" onClick={() => setNotifsOpen(true)} className='cursor-pointer lg:hidden text-black text-[20px] font-bold mt-3'><AiOutlineBell/></div>
                    <div onClick={openMessages} className='cursor-pointer text-black  text-[20px] lg:hidden font-bold mt-3'><TfiEmail/></div>
                    <div className='items-center mr-[-1rem] text-[20px] ml-1 lg:text-3xl font-bold transition-color my-auto mt-1'><VscSettingsGear/></div>
                    <div onClick={handleLogout} className='cursor-pointer text-black lg:hidden  text-[20px] font-bold mt-3'><BiLogOut /></div>
                </div>
             </div>
                                                                                                                                       
                { mOpen != false?<><DmModal mOpen={mOpen} setMOpen={setMOpen}/></> : null }
                { notifsOpen == true?<><NotifDd notifsOpen={notifsOpen} setNotifsOpen={setNotifsOpen}/></> : null }
         </nav>
                    :null
                    
            }
                    <>

        {isAuthenticated?
        <footer className="fixed bottom-0 z-[200]">                         
            <div className="hidden fixed bottom-0 lg:flex items-center justify-evenly text-gray-500 w-screen h-16 bg-white border-black border-[1px] px-2 xs:px-0">                    
                    <NavLink to="/" className='flex flex-col items-center text-3xl font-bold transition-color my-auto mt-1 md:mt-2 xs:mt-4'>
                    <div><FaHome/></div>
                    <div className="text-xl md:text-sm xs:hidden">Home</div>
                    </NavLink>
                    <NavLink to="/jobs" className='flex flex-col items-center text-3xl font-bold transition-color my-auto mt-1 md:mt-2 xs:mt-4'>
                        <MdWorkOutline />
                        <div className="text-xl md:text-sm xs:hidden">Jobs</div>
                        </NavLink>
                    <NavLink to="/resources" className='flex flex-col items-center text-3xl font-bold transition-color my-auto mt-1 md:mt-2 xs:mt-4'>
                        <HiOutlineNewspaper />
                        <div className="text-xl md:text-sm xs:hidden">Resources</div>
                        </NavLink>
                    <div id="notif-btn" onClick={() => setNotifsOpen(true)} className='flex flex-col items-center text-3xl font-bold transition-color my-auto mt-1 md:mt-2 xs:mt-4 '>
                        <AiOutlineBell/>
                        <div className="text-xl md:text-sm xs:hidden">Notifications</div>
                        </div>
                    <div onClick={openMessages} className='flex flex-col items-center text-3xl font-bold transition-color my-auto mt-1 md:mt-2 xs:mt-4'>
                        <TfiEmail/>
                        <div className="text-xl md:text-sm xs:hidden">Messages</div>
                        </div>
                    <div onClick={handleLogout} className='flex flex-col items-center text-3xl font-bold transition-color my-auto mt-1 md:mt-2 xs:mt-4'>
                        <BiLogOut />
                        <div className="text-xl md:text-sm xs:hidden">Logout</div>
                    </div>
             </div>
                                                                                                                                       
                { mOpen != false?<><DmModal mOpen={mOpen} setMOpen={setMOpen}/></> : null }
                { notifsOpen == true?<><NotifDd notifsOpen={notifsOpen} setNotifsOpen={setNotifsOpen}/></> : null }
         </footer>
                    :null
                    
            }
        </>
        </>
        
    );
}



export default Navbar;
