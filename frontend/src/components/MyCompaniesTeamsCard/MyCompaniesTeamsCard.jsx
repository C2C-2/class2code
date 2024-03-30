import React from "react";
import "./MyCompaniesTeamsCard.css";
import Profile from "./Frame.png";
function MyCompaniesTeamsCard() {
  return (
    <button className="MyCompaniesTeamsCardAll">
      <div className="MyCompaniesTeamsCardMain">
        <div className="MyCompaniesTeamsCardName">
          <span className="MyCompaniesTeamsCardName1">
            <span className="MyCompaniesTeamsCardText">Company Name</span>
          </span>
        </div>
        <div className="MyCompaniesTeamsCardDesign">
          <div className="MyCompaniesTeamsCardPart1">
            <span className="MyCompaniesTeamsCardPartText">
              Technical Debt Reduction
            </span>
            <span className="MyCompaniesTeamsCardPartNumber">5</span>
          </div>
          <div className="MyCompaniesTeamsCardPart2">
            <button className="MyCompaniesTeamsCardPart2Text">Team Name</button>
            <div className="MyCompaniesTeamsCardPart2Under">
              <div className="MyCompaniesTeamsCardPart2UnderProfile">
                <img
                  src={Profile}
                  alt="Profile"
                  className="MyCompaniesTeamsCardPart2UnderProfileImg"
                />
                <button className="MyCompaniesTeamsCardPart2UnderProfileText">
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
