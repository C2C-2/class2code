import React from "react";
import "./AvailableProjectCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
function AvailableProjectsCard(props) {
  return (
    <button className="AvailableProjectAll">
      <div className="AvailableProjectDesign">
        <div className="AddProjectAvailable">
          <span className="Adds1">
            <button className="Plus">+</button>
          </span>
        </div>
        <div className="PartTextAvailableProject">
          <div className="PartTitleAvailableProject">
            <span className="T1Project">Restaurant System</span>
            <span className="T2Project">{props.count} Apply</span>
          </div>
          <div className="ParagraphAvailableProject">
            <p className="P1Project">
              Emmelie is a traditional book-worm and has always been from a
              young age. She is a housekeeper mom with two kids and she has a
              lot of time to read and relax.
            </p>
          </div>
        </div>
        <div className="RequirementsAvailableProject">
          <span className="TextRequirements">Requirements</span>
          <div className="ReqNeed">
            <RequirementNeed />
            <RequirementNeed />
          </div>
        </div>
      </div>
    </button>
  );
}

export default AvailableProjectsCard;
