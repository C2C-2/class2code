import React from "react";
import "./CompanyWorking.css";
import Dir from "./Rectangle.png";
function CompanyWorking() {
  return (
    <div className="CompanyWorkingAll">
      <div className="CompanyWorkingDesign">
        <div className="CompanyWorkingPart1">
          <div className="PartTitle">
            <span className="Title1">Emily Miller</span>
            <span className="Title2">VP of HR</span>
          </div>
          <div className="PartParagraph">
            <p className="ParaCompanyWorking">
              Quam elementum accumsan vitae habitant mattis. Enim sit placerat
              quis habitasse Odio pul.
            </p>
          </div>
        </div>
        <div className="CompanyWorkingPart2">
            <span className="LineCompanyWorking"/>
            <div className="PartImage">
                <img src={Dir} alt="Manager" height={40}/>
                <div className="PartTextUnder">
                    <span className="Partu1">Ultraboost 19 Shoes </span>
                    <span className="Partu2">Sallie Butler </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyWorking;
