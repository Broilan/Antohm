import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../App";
import './NavStyles/navbar.css'

const Navbar = () => {            
    const {isAuthenticated, handleLogout} = useContext(DataContext)

    return (
        <>
        {isAuthenticated?
            <header>       
                <div className="nav__area">
                    <h1 className="nav__title">Thriver!</h1>
                    
                    
                     <>
                    <NavLink to="/" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '>Home</NavLink>
                    <NavLink to="/profile" className='border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold transition-color hover:shadow-2xl '>Profile</NavLink>
                    <div onClick={handleLogout} className=' cursor-pointer border-[1px] border-black p-[10px] bg-blue-500 text-white rounded-[20px] mr-[20px] text-[20px] font-bold hover:shadow-2xl  '>Logout</div>
                    </>

                </div>
            </header>
                    :null
                    
            }
        </>
    );
}



export default Navbar;
