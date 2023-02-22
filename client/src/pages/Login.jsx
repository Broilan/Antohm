// Imports
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

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
        navigate.push('/signup')
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
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                        <input onClick={switchPage} type="button" className="btn btn-primary float-right" value="Signup"/>            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;