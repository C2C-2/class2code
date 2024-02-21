import React from "react";
import "./SecondSignup.css";
import YoungMan from "./images/yongMan.svg";
import GreenBox from "../../components/greenBox/GreenBox";
const SecondSignup = () => {
  const skills = [
    "frontend",
    "backend",
    "database",
    "security",
    "devops",
    "ui/ux",
  ];

  return (
    <div className="main w-100 d-flex align-items-center justify-content-center">
      <div className="mainCenterDiv shadow p-4">
        <div className="hello d-flex w-100 justify-content-between p-4">
          <div className="title d-flex flex-column justify-content-center">
            <h4 className="mainTitle">Lets Complete Your Profile !</h4>
            <p className="subtitle">Add Your Information &amp; Skills</p>
          </div>
          <img
            src={YoungMan}
            alt="youngMan"
            className="youngMan"
            style={{ width: "80px", height: "80px" }}
          ></img>
        </div>
        <div className="skills">
          {skills.map((skill, i) => {
            return <GreenBox key={i} title={skill} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SecondSignup;
