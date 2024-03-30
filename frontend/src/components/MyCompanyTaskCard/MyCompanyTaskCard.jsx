import React from "react";
import "./MyCompanyTaskCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
function MyCompanyTaskCard() {
  return (
    <button className="MyCompanyTaskCardAll">
      <div className="MyCompanyTaskCardMain">
        <div className="MyCompanyTaskCardName">
          <span className="MyCompanyTaskCardName1">
            <span className="MyCompanyTaskCardText">Company Name</span>
          </span>
        </div>
        <div className="MyCompanyTaskCardDesign">
          <div className="MyCompanyTaskCardEditButton">
            <button className="MyCompanyTaskCardEditButtonText">. . .</button>
          </div>
          <div className="MyCompanyTaskCardCenter">
            <div className="MyCompanyTaskCardCenterPart1">
              <span className="MyCompanyTaskCardCenterPart1Text1">
                Task Name
              </span>
              <span className="MyCompanyTaskCardCenterPart1Text2">
                Jun 24, 2022
              </span>
            </div>
            <span className="MyCompanyTaskCardCenterPart2Text1">5</span>
          </div>
          <div className="MyCompanyTaskCardCenterParagraph">
            <p className="MyCompanyTaskCardCenterParagraphText">
              Brainstorming brings team members' diverse experience into play.{" "}
            </p>
          </div>
          <div className="MyCompanyTaskCardCenterCardOther">
          <RequirementNeed />
          <RequirementNeed />
          </div>

        </div>
      </div>
    </button>
  );
}

export default MyCompanyTaskCard;
