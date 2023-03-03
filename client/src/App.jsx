// import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { Profile, Login, Signup, Home, PostPage, GroupsPage, OtherUserProf } from "./pages";
import Applications from "./components/Applications";
import { Navbar, Comment } from "./components";

export const DataContext = React.createContext();

function App() {
  //user & auth
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  //modal stuff
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState()

  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
      <Navigate to="/"/>
    }
  }



  return (
    <BrowserRouter>      
    
    <DataContext.Provider value={{ currentUser, handleLogout, nowCurrentUser, isAuthenticated, setIsAuthenticated, open, setOpen, modalType, setModalType}}>
    <Navbar/>
          <Routes>
              <Route path='/' element={ <Home />} />

              <Route path='/post/:id' element={ <PostPage />} />
              

              <Route path='/profile' element={ <PrivateRoute><Profile /></PrivateRoute>}/> 
              <Route exact path='/profile/:userid' element={ <OtherUserProf />} />
              <Route path='/groups' element={ <GroupsPage/>}/> 
              <Route path='applications' element={ <Applications />} />

              <Route path='/login' element={ <Login />} />
              <Route path='/signup' element={ <Signup />} />
          </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
