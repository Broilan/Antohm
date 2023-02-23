import React, { useState } from "react";
import "../styles/profile.css"
import Kanban from "../components/Kanban";
import QuantDash from "../components/QuantDash";
import { ProfileSideBar } from "../components";


 export const PageContext = React.createContext()

const Profile = () => {
  const [dash, setDash] = useState(<QuantDash />)


  return (
    <PageContext.Provider value={{dash, setDash}}>
    <div>
    <ProfileSideBar />
    {dash}
    </div>
    </PageContext.Provider>
  );
};

export default Profile;