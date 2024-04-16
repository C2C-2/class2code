import React from "react";
import "./AvailableProjectCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";

function AvailableProjectsCard({ projectName, applications, projectDescription, requirements, colorProp }) {
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
            <span className="T1Project">{projectName}</span>
            <span className="T2Project">{applications} Apply</span>
          </div>
          <div className="ParagraphAvailableProject">
            <p className="P1Project">{projectDescription}</p>
          </div>
        </div>
        <div className="RequirementsAvailableProject">
          <span className="TextRequirements">Requirements</span>
          <div className="ReqNeed">
            {requirements?.map((requirement, index) => (
              <RequirementNeed key={index} colorProps={colorProp} textReq={requirement} />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

export default AvailableProjectsCard;
