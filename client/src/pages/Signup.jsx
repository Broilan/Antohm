import React, { forwardRef, useRef, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import capybara from '../assets/Capybara.png'
import logo from '../assets/Thrive.png'
import defaultpfp from '../assets/defaultpfp.png'
import defaultheader from '../assets/defaultheader.jpg'

const Signup = (props, ref) => {
    const nameRef = useRef();
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function
        // make sure password and confirm password are equal
        // password length >= 8 characters
        if (passwordRef.current.value === confirmPasswordRef.current.value && passwordRef.current.value.length >= 8) {
            const pfp = defaultpfp
            const header = defaultheader
            axios.post(`https://thrive-server.herokuapp.com/user/signup`, {
                name: nameRef.current.value,
                displayName: displayNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                pfp: pfp,
                header: header
            })
            .then(() => {
                if(window.location.pathname === '/signup'){
                    setRedirect(true);
                } else {
                    ref.current.scrollIntoView({behavior: 'smooth'});
                }
            }) 
            .catch(error => console.log('===> Error in Signup', error));
        } else {
            if (passwordRef.current.value !== confirmPasswordRef.current.value) return alert('Passwords don\'t match');
            alert('Password needs to be at least 8 characters. Please try again.');
        }
    }

    if (redirect) return <Navigate to="/login" />


    return (
        <>
        <div className='h-screen lg:hidden bg-blue-500'>
        <p className="absolute text-4xl font-Oswald ml-1">Thrive</p>
        <div className=' flex flex-col items-center absolute w-[60%] h-screen'>
        <img src={capybara} className=" absolute h-96 w-96 mt-[25rem]"/>
        <p className='absolute text-center text-white font-bold text-[2rem] mt-[5rem]'>Streamline your job search and <br></br>
                be apart of a  like-minded, supportive <br></br>
             community that'll help you<br></br> achieve your goals <br></br> and help you stay motivated.</p>
        </div>  
        </div>          

                    <div className='flex flex-col items-center justify-center absolute top-0 bg-white w-[40%] right-0 lg:relative h-screen lg:w-screen 3xs:top-[9.5rem] '>
                    <form className="flex flex-col items-center border-black border-[1px] rounded-lg shadow-2xl lg:border-[1px] lg:border-black 3xl:border-0 p-[8rem] mx-8 2xl:px-12 py-[2rem] 3xs:h-fit lg:w-screen lg:h-screen" onSubmit={handleSubmit}>
                        <h2 className='text-center mb-10 font-bold text-[3rem] mr-7'>Create Account</h2>
                            <div>
                            <label htmlFor="name" className='font-bold text-[1.5rem]'>Name</label>
                            <br />
                            <input type="text" name="name" ref={nameRef} className="border-[1px] 2xs:w-80 mb-6 border-black w-96 h-14 rounded-lg"/>
                            </div>

                            <div>
                            <label htmlFor="display name" className='font-bold text-[1.5rem]'>Display Name</label>
                            <br />
                            <input type="text" name="name" placeholder='This cant be changed in the future!' ref={displayNameRef} className="border-[1px] 2xs:w-80 p-1 mb-6 border-black w-96 h-14 rounded-lg"/>
                            </div>

                            <div>
                            <label htmlFor="email" className='font-bold text-[1.5rem]'>Email</label>
                            <br />
                            <input type="email" name="email" ref={emailRef} className="border-[1px] mb-6 border-black 2xs:w-80 w-96 h-14 rounded-lg"/>
                            </div>

                            <div>
                            <label htmlFor="password" className='font-bold text-[1.5rem]'>Password</label>
                            <br />
                            <input type="password" name="password" ref={passwordRef} className="border-[1px] mb-6 2xs:w-80 border-black w-96 h-14 rounded-lg"/>
                            </div>

                            <div>
                            <label htmlFor="confirmPassword" className='font-bold text-[1.5rem]'>Confirm Password</label>
                            <br />
                            <input type="password" name="confirmPassword" ref={confirmPasswordRef} className="border-[1px] 2xs:w-80 mb-6 border-black w-96 h-14 rounded-lg"/>
                            </div>

                            <div className='ml-8 lg:flex lg:ml-4'>
                            <input type="checkbox" name="confirmPassword" className='mr-3' />
                            <br />
                            <label htmlFor="checkbox">I agree to the terms and conditions</label>
                            </div>

                        <input onClick={handleSubmit} type="submit" className='mt-5 rounded-[10px] bg-blue-500 h-16 px-32 mr-6 lg:mr-0 font-bold text-white cursor-pointer' value="Create"/> 
                        <input onClick={() => navigate('/login')} type="button" className=" lg:hidden cursor-pointer mr-4" value="Login"/>                   
                        </form>
                         

                </div>
            </>
    )
}

export default forwardRef(Signup);

