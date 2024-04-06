import { useState,useEffect } from "react";
import "./ProjectRequirements.css"
function ProjectRequirements({color}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  return (
    <button className='ProjectRequirementsAll'>
        <span  className={`${
          isDarkMode
            ? "ProjectRequirementsTextDark"
            : "ProjectRequirementsText"
        }`}>Experience in A</span>
    </button>
  )
}

export default ProjectRequirements