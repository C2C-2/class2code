import { useState,useEffect } from "react";
import "./CompanyWorkOnCard.css"
function CompanyWorkOnCard({color,companyName,createDate,imageUser}) {
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
  <img src={imageUser} className="CompanyWorkOnCardimg"/>
      <div className="CompanyWorkOnCardTexts">
        <span className={`${
          isDarkMode
            ? "CompanyWorkOnCardText1Dark"
            : "CompanyWorkOnCardText1"
        }`}>{companyName}</span>
        <span className={`${
          isDarkMode
            ? "CompanyWorkOnCardText2Dark"
            : "CompanyWorkOnCardText2"
        }`}>{createDate}</span>
      </div>
    </button>
  );
}

export default CompanyWorkOnCard;
