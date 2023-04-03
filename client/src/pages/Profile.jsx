import React, { useState } from "react";
import QuantDash from "../components/QuantDash";
import { ProfileNav, SocialDash } from "../components";

const Profile = () => {
  const [current, setCurrent] = useState(1)
  return (
    <>
    <div className="fixed right-64 mt-20 3xl:right-0 3xl:mr-4 lg:hidden 1.5xl:mr-1"><ProfileNav setCurrent={setCurrent}/></div>
    {current == 1? <SocialDash /> :<QuantDash /> }
    </>
  );
};

export default Profile;