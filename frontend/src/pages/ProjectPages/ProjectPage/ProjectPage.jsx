import React from "react";
import "./ProjectPage.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import ProjectImg from "./ProjectTitle.png";
import Alram from "./alarm_on.png";
import ProjectRequirements from "../../../components/ProjectRequirements/ProjectRequirements";
import { Button } from "@mantine/core";
import CompanyWorkOnCard from "../../../components/CompanyWorkOnCard/CompanyWorkOnCard";
function ProjectPage() {
  return (
    <div className="ProjectPageAll">
      <SideBar />
      <div className="ProjectPageMain">
        <NavBar />
        <div className="ProjectPageCenter">
          <div className="ProjectPagePart1">
            <div className="ProjectPageTitle">
              <img
                src={ProjectImg}
                alt="ProjectImg"
                className="ProjectPageImg"
              />
              <div className="ProjectPageTitleContent">
                <div className="PTTop">
                  <div className="PTText">
                    <span className="PTSpan1">Hi, Vanshika Pandey</span>
                    <span className="PTSpan2">Project Name</span>
                  </div>
                  <div className="PTSvg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="203"
                      height="84"
                      viewBox="0 0 203 84"
                      fill="none"
                    >
                      <rect
                        x="37.1133"
                        y="-26"
                        width="63.0854"
                        height="63.0854"
                        rx="7.00486"
                        fill="#388E3C"
                      />
                      <rect
                        y="-0.0213013"
                        width="63.0854"
                        height="63.0854"
                        rx="7.00486"
                        fill="#388E3C"
                      />
                      <rect
                        x="133.594"
                        y="19.0269"
                        width="29.7706"
                        height="29.7706"
                        rx="7.00486"
                        fill="#388E3C"
                      />
                      <rect
                        x="116.078"
                        y="31.283"
                        width="29.7706"
                        height="29.7706"
                        rx="7.00486"
                        fill="#388E3C"
                      />
                      <rect
                        x="181.047"
                        y="52.0519"
                        width="21.9736"
                        height="21.9736"
                        rx="7.00486"
                        fill="#388E3C"
                      />
                      <rect
                        x="168.121"
                        y="61.0982"
                        width="21.9736"
                        height="21.9736"
                        rx="7.00486"
                        fill="#388E3C"
                      />
                    </svg>
                  </div>
                </div>
                <p className="PTParagraph">
                  Project activity will be updated here. Click on the name
                  section to set your configuration.
                </p>
              </div>
            </div>
            <div className="ProjectPageUnder">
              <div className="ProjectUnderTime">
                <div className="TimeAll">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.49 5.5C9.97 5.5 5.5 9.98 5.5 15.5C5.5 21.02 9.97 25.5 15.49 25.5C21.02 25.5 25.5 21.02 25.5 15.5C25.5 9.98 21.02 5.5 15.49 5.5ZM15.5 23.5C11.08 23.5 7.5 19.92 7.5 15.5C7.5 11.08 11.08 7.5 15.5 7.5C19.92 7.5 23.5 11.08 23.5 15.5C23.5 19.92 19.92 23.5 15.5 23.5ZM15.28 10.5H15.22C14.82 10.5 14.5 10.82 14.5 11.22V15.94C14.5 16.29 14.68 16.62 14.99 16.8L19.14 19.29C19.48 19.49 19.92 19.39 20.12 19.05C20.33 18.71 20.22 18.26 19.87 18.06L16 15.76V11.22C16 10.82 15.68 10.5 15.28 10.5Z"
                      fill="#283739"
                    />
                  </svg>
                  <span className="TimeText">End Date: Sep 22, 9pm</span>
                </div>
                <div className="TimeAll">
                  <img src={Alram} alt="Alram" />
                  <span className="TimeText">Start Date: Sep 22, 9pm</span>
                </div>
              </div>
              <div className="ProjectUnderText">
                <div className="ProjectUnderName">
                  <span className="ProjectNameText">Project Name:</span>
                  <span className="ProjectNameText1">UPX</span>
                </div>
                <div className="ProjectUnderDetails">
                  <span className="ProjectDetailsText">Project Details :</span>
                  <p className="ProjectDetailsParagraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="ProjectUnderRequirements">
                  <span className="ProjectRequirementsText">
                    Project Requirements :
                  </span>
                  <div className="ProjectRequirementsCard">
                    <ProjectRequirements />
                    <ProjectRequirements />
                    <ProjectRequirements />
                  </div>
                </div>
              </div>
              <div className="ProjectUnderButton">
                <Button variant="filled" color="#388E3C" w={150} radius="md">
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <div className="ProjectPagePart2">
            <div className="Part2AllProjectPage">
              <div className="ProjectPagePart2Title">
                <span className="CompanyWorkOnText">Company Work On</span>
                <button className="ViewAllButton">View All</button>
              </div>
              <div className="ProjectPagePart2Content">
                <CompanyWorkOnCard/>
                <CompanyWorkOnCard/>
                <CompanyWorkOnCard/>
                <CompanyWorkOnCard/>
                <CompanyWorkOnCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
