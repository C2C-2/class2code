import  { useEffect, useState } from "react"
import "./CompanyWorkingCard.css";
import Dir from "./Rectangle.png";
import { Link } from "react-router-dom";
function CompanyWorkingCard({colorProp ,company }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(colorProp === "dark");
  }, [colorProp]);
  return (
    <Link to={`/OtherCompanyProfile/${company._id}`} className="CompanyWorkingAll">
      <div className="CompanyWorkingDesign">
        <div className="CompanyWorkingPart1">
          <div className="PartTitle">
            <h6 className="Title1">{company.CompanyName}</h6>
            <h6 className="Title2">{company.Domain}</h6>
          </div>
            <p>
            {company.CompanyDescription}
            </p>
        </div>
        <div className="CompanyWorkingPart2">
            <hr className="LineCompanyWorking"/>
            <div className="PartImage">
                <img src={Dir} alt="Manager" height={40}/>
                <div className="PartTextUnder">
                    <h6 className="Partu1">Ultraboost 19 Shoes </h6>
                    <h6 className="Partu2">Sallie Butler </h6>
                </div>
            </div>
        </div>
      </div>
    </Link>
  );
}

export default CompanyWorkingCard;
