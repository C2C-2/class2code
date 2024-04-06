import React from "react";
import "./MyCompaniesCard.css";
import { useEffect, useState } from "react";
import Profile from "./Rectangle.png";
export default function MyCompaniesCard({colorProp}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(colorProp === "dark");
  }, [colorProp]);
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
              Company Name
            </span>
            <span  className={`${
                isDarkMode ? "MyCompaniesCardT2MyDark" : "MyCompaniesCardT2My"
              }`}>
              Wore these with my training tee and pods to a graduation bbq and
              the young bucks was all over it. Love the look and feel.
            </span>
            <span className={`${
                isDarkMode ? "MyCompaniesCardT3Dark" : "MyCompaniesCardT3"
              }`}>9.6</span>
          </div>
          <div className="MyCompaniesCardImgPartMy">
            <hr className="MyCompaniesCardLineMy"></hr>
            <div className="MyCompaniesCardImg">
              <img src={Profile} alt="Profile" />
              <div className="MyCompaniesCardTextsOver">
                <span className="MyCompaniesCardTe1">Ultraboost 19 Shoes</span>
                <span className={`${
                isDarkMode ? "MyCompaniesCardTe2Dark" : "MyCompaniesCardTe2"
              }`}>Sallie Butler</span>
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
                <path
                  d="M16.524 24.4779C16.8091 24.4779 17.0824 24.376 17.284 24.1946C17.4856 24.0132 17.5988 23.7671 17.5988 23.5105V17.7063C17.5988 17.4498 17.4856 17.2037 17.284 17.0223C17.0824 16.8409 16.8091 16.739 16.524 16.739C16.2389 16.739 15.9655 16.8409 15.7639 17.0223C15.5624 17.2037 15.4491 17.4498 15.4491 17.7063V23.5105C15.4491 23.7671 15.5624 24.0132 15.7639 24.1946C15.9655 24.376 16.2389 24.4779 16.524 24.4779ZM27.2725 12.8695H22.9731V11.9021C22.9731 11.1324 22.6334 10.3943 22.0287 9.85001C21.4239 9.30576 20.6038 9 19.7486 9H17.5988C16.7436 9 15.9235 9.30576 15.3187 9.85001C14.714 10.3943 14.3743 11.1324 14.3743 11.9021V12.8695H10.0749C9.78979 12.8695 9.51639 12.9714 9.31482 13.1528C9.11324 13.3342 9 13.5803 9 13.8368C9 14.0934 9.11324 14.3395 9.31482 14.5209C9.51639 14.7023 9.78979 14.8042 10.0749 14.8042H11.1497V25.4453C11.1497 26.215 11.4894 26.9531 12.0942 27.4974C12.6989 28.0416 13.5191 28.3474 14.3743 28.3474H22.9731C23.8283 28.3474 24.6485 28.0416 25.2532 27.4974C25.858 26.9531 26.1977 26.215 26.1977 25.4453V14.8042H27.2725C27.5576 14.8042 27.831 14.7023 28.0326 14.5209C28.2342 14.3395 28.3474 14.0934 28.3474 13.8368C28.3474 13.5803 28.2342 13.3342 28.0326 13.1528C27.831 12.9714 27.5576 12.8695 27.2725 12.8695ZM16.524 11.9021C16.524 11.6455 16.6372 11.3995 16.8388 11.2181C17.0404 11.0367 17.3138 10.9347 17.5988 10.9347H19.7486C20.0336 10.9347 20.307 11.0367 20.5086 11.2181C20.7102 11.3995 20.8234 11.6455 20.8234 11.9021V12.8695H16.524V11.9021ZM24.048 25.4453C24.048 25.7018 23.9347 25.9479 23.7332 26.1293C23.5316 26.3107 23.2582 26.4127 22.9731 26.4127H14.3743C14.0892 26.4127 13.8158 26.3107 13.6142 26.1293C13.4127 25.9479 13.2994 25.7018 13.2994 25.4453V14.8042H24.048V25.4453ZM20.8234 24.4779C21.1085 24.4779 21.3819 24.376 21.5834 24.1946C21.785 24.0132 21.8983 23.7671 21.8983 23.5105V17.7063C21.8983 17.4498 21.785 17.2037 21.5834 17.0223C21.3819 16.8409 21.1085 16.739 20.8234 16.739C20.5383 16.739 20.2649 16.8409 20.0634 17.0223C19.8618 17.2037 19.7486 17.4498 19.7486 17.7063V23.5105C19.7486 23.7671 19.8618 24.0132 20.0634 24.1946C20.2649 24.376 20.5383 24.4779 20.8234 24.4779Z"
                  fill="#EB5757"
                />
                <circle
                  cx="18.8335"
                  cy="18.6791"
                  r="18.1382"
                  fill="#EB5757"
                  fill-opacity="0.4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
