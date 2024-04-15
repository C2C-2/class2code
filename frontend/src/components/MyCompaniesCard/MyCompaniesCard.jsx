import React, { useEffect, useState } from "react";
import "./MyCompaniesCard.css";
import Profile from "./Rectangle.png";

export default function MyCompaniesCard({
  colorProp,
  CompanyName,
  CompanyDescription,
  Rate,
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(colorProp === "dark");
  }, [colorProp]);
  console.log(colorProp);
  return (
    <button className="MyCompaniesCardMainOverMy">
      <div
        className={`${
          isDarkMode
            ? "MyCompaniesCardOverAllMyDark-mode"
            : "MyCompaniesCardOverAllMy"
        }`}
      >
        <div className="MyCompaniesCardAllItemMy">
          <div className="MyCompaniesCardtextPartMy">
            <span
              className={`${
                isDarkMode ? "MyCompaniesCardT1MyDark" : "MyCompaniesCardT1My"
              }`}
            >
              {CompanyName}
            </span>
            <span
              className={`${
                isDarkMode ? "MyCompaniesCardT2MyDark" : "MyCompaniesCardT2My"
              }`}
            >
              {CompanyDescription}
            </span>
            <span
              className={`${
                isDarkMode ? "MyCompaniesCardT3Dark" : "MyCompaniesCardT3"
              }`}
            >
              {Rate}
            </span>
          </div>
          <div className="MyCompaniesCardImgPartMy">
            <hr className="MyCompaniesCardLineMy"></hr>
            <div className="MyCompaniesCardImg">
              <img src={Profile} alt="Profile" />
              <div className="MyCompaniesCardTextsOver">
                <span className="MyCompaniesCardTe1">Ultraboost 19 Shoes</span>
                <span
                  className={`${
                    isDarkMode ? "MyCompaniesCardTe2Dark" : "MyCompaniesCardTe2"
                  }`}
                >
                  Sallie Butler
                </span>
              </div>
            </div>
            <button className="MyCompaniesCardRemove">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
              >
                {/* SVG path */}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
