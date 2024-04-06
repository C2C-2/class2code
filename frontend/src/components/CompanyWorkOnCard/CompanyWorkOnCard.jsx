import { useState,useEffect } from "react";
import "./CompanyWorkOnCard.css";
function CompanyWorkOnCard({color}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  return (
    <button className={`${
      isDarkMode
        ? "CompanyWorkOnCardDark"
        : "CompanyWorkOnCard"
    }`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
      >
        <circle cx="16.2611" cy="16.6135" r="16.0111" fill="#465F85" />
      </svg>
      <div className="CompanyWorkOnCardTexts">
        <span className={`${
          isDarkMode
            ? "CompanyWorkOnCardText1Dark"
            : "CompanyWorkOnCardText1"
        }`}>Ellie joined team developers</span>
        <span className={`${
          isDarkMode
            ? "CompanyWorkOnCardText2Dark"
            : "CompanyWorkOnCardText2"
        }`}>04 April, 2021 | 04:00 PM</span>
      </div>
    </button>
  );
}

export default CompanyWorkOnCard;
