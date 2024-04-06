
import { useState,useEffect } from 'react';
import "./DashboardProfileCard.css"
import Profile from "./Image.png";
function DashboardProfileCard({color}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  return (
    <div className='DashboardProfileCardAll'>
        <img src={Profile} alt='Profile' className='DashboardProfileCardimg'/>
        <div className='DashboardProfileCardText'>
            <span className={`${
                  isDarkMode
                    ? "DashboardProfileCardText1Dark"
                    : "DashboardProfileCardText1"
                }`}>Theresa Lane</span>
            <span className='DashboardProfileCardText2'>UX Design Team</span>
        </div>
    </div>
  )
}

export default DashboardProfileCard