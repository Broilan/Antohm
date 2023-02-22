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
                    <NavLink to="/" className='nav__link'>Home</NavLink>
                    <NavLink to="/profile" className='nav__link'>Profile</NavLink>
                    <div onClick={handleLogout} className='nav__link'>Logout</div>
                    </>

                </div>
            </header>
                    :null
                    
            }
        </>
    );
}



export default Navbar;
