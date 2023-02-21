// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Profile  } from "./pages";
import { Navbar } from "./components";
import axios from "axios";

export const DataContext = React.createContext();

function App() {
  // const BACK_URI = process.env.REACT_APP_API_SERVER_URL;

  //modal stuff
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState()

  
//  const getProtectedResource = async () => { 
//   const token = await getAccessTokenSilently();    
//       const config = {
//         url: `${BACK_URI}/api/user/seed`,
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           "Authorization": `bearer ${token}`
//         }
//   }
//   axios(config)
//   .then(response => {
//     const name = response.data.payload.name
//     const email = response.data.payload.email
//     axios({
//       method: 'POST',
//       url: `${BACK_URI}/api/user/create/${name}/${email}`,
//       headers: {
//         "content-type": "application/json",
//         "Authorization": `bearer ${token}`
//       }
//     }).then(response => {
//       console.log(response)
//     }).catch(err =>{
//       console.log("error", err)
//     })   
//   }).catch(err =>{
//     console.log("error", err)
//   })
// };

//runs the function above and logs the bearer token, token acquired using the getAccessTokenSilently() function at the top of the page

  
//   useEffect(() => {
//      getProtectedResource()
//     console.log(token)
//  }, []) 


  return (
    <BrowserRouter>
    <DataContext.Provider value={{ open, setOpen, modalType, setModalType}}>
    <Navbar/>
          <Routes>
              <Route path='/profile' element={ <Profile />} /> 
          </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
