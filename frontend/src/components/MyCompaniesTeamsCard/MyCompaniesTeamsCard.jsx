import { useState, useEffect } from "react";
import "./MyCompaniesTeamsCard.css";
import Profile from "./Frame.png";
import { Link } from "react-router-dom";
function MyCompaniesTeamsCard({ color, companyName, teamName, teamRole, createDate ,teamId  }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  return (
    <div className="MyCompaniesTeamsCardAll">
      <div className="MyCompaniesTeamsCardMain">
        <div className="MyCompaniesTeamsCardName">
          <span className="MyCompaniesTeamsCardName1">
          <span className="MyCompaniesTeamsCardText">{companyName}</span>
          </span>
        </div>
        <div
          className={`${
            isDarkMode
              ? "MyCompaniesTeamsCardDesignDark"
              : "MyCompaniesTeamsCardDesign"
          }`}
        >
      <div className="MyCompaniesTeamsCardEditButton">
      <Link to={`/editTeams/${teamId}`} className="MyCompaniesTeamsCardEditButtonText">. . .</Link>
          </div>
          <div className="MyCompaniesTeamsCardPart1">
            <span
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPartTextDark"
                  : "MyCompaniesTeamsCardPartText"
              }`}
            >
               {teamRole}
            </span>
            <span
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPartNumberDark"
                  : "MyCompaniesTeamsCardPartNumber"
              }`}
            >
              5
            </span>
          </div>
          <div className="MyCompaniesTeamsCardPart2">
            <button
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPart2TextDark"
                  : "MyCompaniesTeamsCardPart2Text"
              }`}
            >
              {teamName}
            </button>
            <div className="MyCompaniesTeamsCardPart2Under">
              <div className="MyCompaniesTeamsCardPart2UnderProfile">
                <img
                  src={Profile}
                  alt="Profile"
                  className="MyCompaniesTeamsCardPart2UnderProfileImg"
                />
                <button
                  className={`${
                    isDarkMode
                      ? "MyCompaniesTeamsCardPart2UnderProfileTextDark"
                      : "MyCompaniesTeamsCardPart2UnderProfileText"
                  }`}
                >
                  Lead Name
                </button>
              </div>
              <div className="MyCompaniesTeamsCardPart2Text2"> {createDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompaniesTeamsCard;
