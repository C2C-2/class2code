
import "./RequirementNeed.css";
import { useState,useEffect } from "react";
function RequirementNeed({colorProps}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(colorProps === "dark");
  }, [colorProps]);
  return (
    <div className="ReqNeedAllCard">
      <button    className={`${
          isDarkMode
            ? "ReqTextCardDark"
            : "ReqTextCard"
        }`}>React</button>
    </div>
  );
}

export default RequirementNeed;
