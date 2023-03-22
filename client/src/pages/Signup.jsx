import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import capybara from '../assets/Capybara.png'
import logo from '../assets/Thrive.png'
import defaultpfp from '../assets/defaultpfp.png'
import defaultheader from '../assets/defaultheader.jpg'

const Signup = () => {
    const [name, setName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    function switchPage() {
        navigate('/login')
    } 

    const handleName = (e) => {
         setName(e.target.value);
    }     

    const handleDisplayName = (e) => {
        setDisplayName(e.target.value);
   }  

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function
        // make sure password and confirm password are equal
        // password length >= 8 characters
        if (password === confirmPassword && password.length >= 8) {
            const pfp = defaultpfp
            const header = defaultheader
            const newUser = { name, displayName, email, password, pfp, header };
            axios.post(`http://localhost:8000/user/signup`, newUser)
            .then(response => {
                console.log('===> Yay, new user');
                console.log(response);
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Signup', error));
        } else {
            if (password !== confirmPassword) return alert('Passwords don\'t match');
            alert('Password needs to be at least 8 characters. Please try again.');
        }
    }

    if (redirect) return <Navigate to="/login" /> // You can have them redirected to profile (your choice)


    return (
        <div className='h-screen bg-blue-500'>
         <img src={logo} className="absolute left-[-3rem] overflow-hidden h-96 w-96 top-[75%]" />
        <div className=' flex flex-col items-center absolute w-[60%] h-screen'>
        <img src={capybara} className=" absolute h-96 w-96 mt-[25rem]"/>
        <p className='absolute text-center text-white font-bold text-[2rem] mt-[5rem]'>Steamline your job search and <br></br>
                be apart of a  like-minded, supportive <br></br>
             community that'll help you<br></br> achieve your goals <br></br> and help you stay motivated.</p>
        </div>            

                    <div className='flex flex-col items-center justify-center  absolute bg-white w-[40%] h-screen right-0'>
                    <form className="flex flex-col  p-32" onSubmit={handleSubmit}>
                        <h2 className='text-center mb-10 font-bold text-[3rem]'>Create Account</h2>
                            <>
                            <label htmlFor="name" className='font-bold text-[1.5rem]'>Name</label>
                            <input type="text" name="name" value={name} onChange={handleName} className="border-[1px] mb-6 border-black w-96 h-14 rounded-lg"/>
                            </>

                            <>
                            <label htmlFor="display name" className='font-bold text-[1.5rem]'>Display Name</label>
                            <input type="text" name="name" placeholder='This cant be changed in the future!' value={displayName} onChange={handleDisplayName} className="border-[1px] p-1 mb-6 border-black w-96 h-14 rounded-lg"/>
                            </>

                            <>
                            <label htmlFor="email" className='font-bold text-[1.5rem]'>Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="border-[1px] mb-6 border-black w-96 h-14 rounded-lg"/>
                            </>

                            <>
                            <label htmlFor="password" className='font-bold text-[1.5rem]'>Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="border-[1px] mb-6 border-black w-96 h-14 rounded-lg"/>
                            </>

                            <>
                            <label htmlFor="confirmPassword" className='font-bold text-[1.5rem]'>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="border-[1px] mb-6 border-black w-96 h-14 rounded-lg"/>
                            </>

                            <div className='ml-8'>
                            <input type="checkbox" name="confirmPassword" className='mr-3' />
                            <label htmlFor="checkbox">I agree to the terms and conditions</label>
                            </div>

                        <input onClick={handleSubmit} type="submit" className='mt-5 rounded-[10px] bg-blue-500 h-16 font-bold text-white cursor-pointer' value="Create"/> 
                        <input onClick={switchPage} type="button" className="cursor-pointer" value="Login"/>                   
                        </form>
                         

                </div>
            </div>
    )
}

export default Signup;

// <div className='h-screen bg-blue-500'>
// <div className=' flex flex-col items-center absolute w-[60%] h-screen'>
//     <p className='absolute text-center text-white font-bold text-[2rem] mt-[5rem]'>Steamline your job search and <br></br>be apart of a  like-minded, supportive <br></br>
//     community that'll help you<br></br> achieve your goals <br></br> and help you stay motivated.</p>
// </div>  
//      <div className='flex flex-col items-center justify-center  absolute bg-white w-[40%] h-screen right-0'>
//         <form className="flex flex-col border-black border-[1px] p-32" onSubmit={handleSubmit}>
//             <div className='text-center mb-20 font-bold text-[5rem]'>Login</div>

//                 <>
//                 <label htmlFor="email" className='font-bold text-[1.5rem]'>Email</label>
//                 <input  className="border-[1px] border-black w-96 h-14 rounded-lg mb-5" type="text" name="email" value={email} onChange={handleEmail} />
//                 </>

//                 <>
//                 <label htmlFor="password" className='font-bold text-[1.5rem]'>Password</label>
//                 <input className="border-[1px] border-black w-96 h-14 rounded-lg" type="text" name="password" value={password} onChange={handlePassword} />
//                 </>
//             <button type="submit" className='mt-5 rounded-[10px] bg-blue-500 h-16 font-bold text-white'>Submit</button>
//             <input  className="mt-10" onClick={switchPage} type="button"value="or sign-up for a free account!"/>            
//         </form>
// </div>
//     </div>
