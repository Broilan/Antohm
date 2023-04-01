import React, { useState } from "react";
import "../styles/profile.css"
import QuantDash from "../components/QuantDash";
import { ProfileNav, SocialDash } from "../components";

const Profile = () => {
  const [current, setCurrent] = useState(1)
  return (
    <>
    <ProfileNav setCurrent={setCurrent}/>
    {current == 1? <SocialDash /> :<QuantDash /> }
    </>
  );
};

export default Profile;