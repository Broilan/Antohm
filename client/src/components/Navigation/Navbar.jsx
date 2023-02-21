import { NavLink, Outlet } from "react-router-dom";
import './NavStyles/navbar.css'

const Navbar = () => {            
    

    return (
        <>
            <header>
                <div className="nav__area">
                    <h1 className="nav__title">Thriver!</h1>
                    <NavLink to="/" className='nav__link'>Home</NavLink>
                    <NavLink to="/about" className='nav__link'>About</NavLink>
                    <NavLink to="/profile" className='nav__link'>Profile</NavLink>
                    <NavLink to="/test/public" className='nav__link'>public-test</NavLink>
                    <NavLink to="/test/protected" className='nav__link'>protected-test</NavLink>
                    <NavLink to="/test/admin" className='nav__link'>admin-test</NavLink>
                    &nbsp; | &nbsp;
                </div>
            </header>
            <section>
                <Outlet />
            </section>
        </>
    );
}



export default Navbar;
