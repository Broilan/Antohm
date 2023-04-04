// Imports
import React, { useRef } from 'react';
import Signup from './Signup';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import capybara from '../assets/Capybara.png'

const Login = () => {
    const {currentUser, nowCurrentUser} = useContext(DataContext)
    const loginRef = useRef();
    const signupRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    function switchPage() {
        navigate('/signup')
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://thrive-server.herokuapp.com/user/login`, {
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then(response => {
            const { token } = response.data;
            // save token to localStorage
            localStorage.setItem('jwtToken', token);
            // set token to headers
            setAuthToken(token);
            // decode token to get the user data
            const decoded = jwt_decode(token);
            // set the current user
            nowCurrentUser(decoded); // funnction passed down as props.
        })
        .catch(error => {
            console.log('===> Error on login', error);
            alert('Either email or password is incorrect. Please try again');
        });
    }

    if (currentUser) return <Navigate to="/profile" />

    return (
        <>   
        <div className='flex gap-1 lg:flex-col' id='login-signup-stuff'>            
        <p className="absolute text-4xl font-Oswald ml-1">AntΩhm</p>
        <div className='flex flex-col justify-center items-center h-screen w-[50vw] bg-blue-500 lg:w-screen '>
            <div className=' flex flex-col items-center absolute w-[60%] h-[100svh] 1.5xl:w-[50%] lg:w-screen'>
                <img src={capybara} className=" absolute h-96 w-96 mt-[25rem] 3xs:translate-y-[-6rem]"/>
                <p className='absolute text-center text-white font-bold text-[2rem] 2xs:text-[1.7rem] 3xs:text-[1.5rem] mt-[5rem] 3xs:mt-[3rem]'>Streamline your job search and <br></br>be apart of a  like-minded, supportive <br></br>
                community that'll help you<br></br> achieve your goals <br></br> and help you stay motivated.</p>
                <div className='absolute mt-[26rem] flex gap-10'>
                <button onClick={() => signupRef.current.scrollIntoView({behavior: 'smooth'})} className='hidden 3xs:translate-y-[-6rem] lg:block bg-blue-400 rounded-xl shadow-2xl border-gray-400 border-2 text-center p-1 w-20 text-white font-bold hover:bg-blue-500'>Signup</button>
                <button onClick={() => loginRef.current.scrollIntoView({behavior: 'smooth'})} className='hidden 3xs:translate-y-[-6rem] lg:block bg-blue-400 rounded-xl shadow-2xl border-gray-400 border-2 text-center w-20 p-1 text-white font-bold hover:bg-blue-500'>Login</button>
                </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center bg-white w-[50vw] lg:w-screen'>
                    <form ref={loginRef} className="flex flex-col items-center justify-center border-black border-[1px] rounded-lg 1.5xl:p-20 shadow-2xl gap-5 p-32 lg:w-screen lg:h-screen" onSubmit={handleSubmit}>
                        <div className='text-center mb-20 font-bold text-[5rem]'>Login</div>

                            <div>
                            <label htmlFor="email" className='font-bold text-[1.5rem]'>Email</label>
                            <br />
                            <input ref={emailRef} className="border-[1px] border-black w-96 h-14 rounded-lg mb-5 2xs:w-80" type="text" name="email"  />
                            </div>

                            <div>
                            <label htmlFor="password" className='font-bold text-[1.5rem]'>Password</label>
                            <br />
                            <input ref={passwordRef} className="border-[1px] border-black w-96 h-14 rounded-lg 2xs:w-80" type="text" name="password"  />
                            </div>
                        <button type="submit" className='mt-5 rounded-[10px] bg-blue-500 px-32 h-16 font-bold text-white'>Submit</button>
                        <input  className="mt-10 cursor-pointer lg:hidden" onClick={switchPage} type="button"value="or sign-up for a free account!"/>            
                    </form>
                    <div ref={signupRef} className='hidden lg:block'><Signup ref={loginRef} /></div>
                     </div>
            </div>
             </>   
    )
}

export default Login;