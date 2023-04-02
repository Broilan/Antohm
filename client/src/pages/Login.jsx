// Imports
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import capybara from '../assets/Capybara.png'
import logo from '../assets/Thrive.png'

const Login = () => {
    const {currentUser, nowCurrentUser} = useContext(DataContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();

    function switchPage() {
        navigate('/signup')
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };

        axios.post(`http://localhost:8000/user/login`, userData)
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

    if (currentUser) return <Navigate to="/profile" /> // double check

    return (   
        <div className='h-screen  bg-blue-500'>
            <img src={logo} className="absolute left-[-3rem] overflow-y-hidden h-96 w-96 top-[75%]" />
            <div className=' flex flex-col items-center absolute w-[60%] h-screen'>
                <img src={capybara} className=" absolute h-96 w-96 mt-[25rem]"/>
                <p className='absolute text-center text-white font-bold text-[2rem] mt-[5rem]'>Steamline your job search and <br></br>be apart of a  like-minded, supportive <br></br>
                community that'll help you<br></br> achieve your goals <br></br> and help you stay motivated.</p>
            </div>  
                 <div className='flex flex-col items-center justify-center  absolute bg-white w-[40%] h-screen right-0'>
                    <form className="flex flex-col border-black border-[1px] rounded-lg shadow-2xl p-32" onSubmit={handleSubmit}>
                        <div className='text-center mb-20 font-bold text-[5rem]'>Login</div>

                            <>
                            <label htmlFor="email" className='font-bold text-[1.5rem]'>Email</label>
                            <input  className="border-[1px] border-black w-96 h-14 rounded-lg mb-5" type="text" name="email" value={email} onChange={handleEmail} />
                            </>

                            <>
                            <label htmlFor="password" className='font-bold text-[1.5rem]'>Password</label>
                            <input className="border-[1px] border-black w-96 h-14 rounded-lg" type="text" name="password" value={password} onChange={handlePassword} />
                            </>
                        <button type="submit" className='mt-5 rounded-[10px] bg-blue-500 h-16 font-bold text-white'>Submit</button>
                        <input  className="mt-10 cursor-pointer" onClick={switchPage} type="button"value="or sign-up for a free account!"/>            
                    </form>
            </div>
                </div>
    )
}

export default Login;