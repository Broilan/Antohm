import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import DmModal from "../DmModal";
import { DataContext } from "../../App";
import './NavStyles/navbar.css'
import { FaHome } from 'react-icons/fa';
import { AiOutlineBell } from 'react-icons/ai';
import { TfiEmail } from 'react-icons/tfi';
import { MdOutlinePerson } from 'react-icons/md';

import logo from '/Users/Tanner/Desktop/ThriverFolder/Thriver/client/src/assets/Thrive.png'


const Navbar = () => {            
    const {isAuthenticated, handleLogout} = useContext(DataContext)
    const [mOpen, setMOpen] = useState(false)

    return (
        <>
        {isAuthenticated?
            <header>       
                <div className="nav__area">
                
                    

                <NavLink to="/"><img src={logo} className="relative left-[-7rem] h-96 w-96" /></NavLink>
                    
                    
                     <>
                    <NavLink to="/" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] ml-auto mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '><FaHome/></NavLink>
                    <NavLink to="/profile" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '><MdOutlinePerson /></NavLink>
                    <div className=' cursor-pointer border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold hover:shadow-2xl  '><AiOutlineBell/></div>
                    <div onClick={() => setMOpen(true)} className='cursor-pointer border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold hover:shadow-2xl  '><TfiEmail/></div>
                    </>

                </div>
                
                { mOpen == true?<><DmModal mOpen={mOpen} setMOpen={setMOpen}/></> : null }
            </header>
                    :null
                    
            }
        </>
    );
}



export default Navbar;
