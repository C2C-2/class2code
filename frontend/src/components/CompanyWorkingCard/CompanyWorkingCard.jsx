import  { useEffect, useState } from "react"
import "./CompanyWorkingCard.css";
import Dir from "./Rectangle.png";
function CompanyWorkingCard({colorProp ,company }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(colorProp === "dark");
  }, [colorProp]);
  console.log(colorProp);
  return (
    <div className="CompanyWorkingAll">
      <div className="CompanyWorkingDesign">
        <div className="CompanyWorkingPart1">
          <div className="PartTitle">
            <span className="Title1">{company.CompanyName}</span>
            <span className="Title2">{company.Domain}</span>
          </div>
          <div className="PartParagraph">
            <p className="ParaCompanyWorking">
            {company.CompanyDescription}
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

export default CompanyWorkingCard;
