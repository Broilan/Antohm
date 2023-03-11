import React, { useContext, useState } from "react";
import "../styles/profile.css"
import QuantDash from "../components/QuantDash";
import { ProfileSideBar } from "../components";
import { DataContext } from "../App";


 export const PageContext = React.createContext()

const Profile = () => {
  const {currentUser} = useContext(DataContext)
  const [dash, setDash] = useState(<QuantDash currentUser={currentUser}/>)


  return (
    <PageContext.Provider value={{dash, setDash, currentUser}}>
    <div>
    <ProfileSideBar />
    {dash}
    </div>
    </PageContext.Provider>
  );
};

export default Profile;