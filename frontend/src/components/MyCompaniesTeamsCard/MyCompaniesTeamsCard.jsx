import { useState, useEffect } from "react";
import "./MyCompaniesTeamsCard.css";
import Profile from "./Frame.png";
function MyCompaniesTeamsCard({ color }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  return (
    <button className="MyCompaniesTeamsCardAll">
      <div className="MyCompaniesTeamsCardMain">
        <div className="MyCompaniesTeamsCardName">
          <span className="MyCompaniesTeamsCardName1">
            <span className="MyCompaniesTeamsCardText">Company Name</span>
          </span>
        </div>
        <div
          className={`${
            isDarkMode
              ? "MyCompaniesTeamsCardDesignDark"
              : "MyCompaniesTeamsCardDesign"
          }`}
        >
          <div className="MyCompaniesTeamsCardPart1">
            <span
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPartTextDark"
                  : "MyCompaniesTeamsCardPartText"
              }`}
            >
              Technical Debt Reduction
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
              Team Name
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
              <div className="MyCompaniesTeamsCardPart2Text2">Jun 24, 2022</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default MyCompaniesTeamsCard;
