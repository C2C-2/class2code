import React from "react";
import "./MyCompanyTask.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import MyCompanyTaskCard from "../../../components/MyCompanyTaskCard/MyCompanyTaskCard";
function MyCompanyTask() {
  return (
    <div className="MyCompanyTaskAll">
      <SideBar />
      <div className="MyCompanyTaskAllMain">
        <NavBar />
        <div className="MyCompanyTaskAllCenter">
          <div className="MyCompanyTaskAllCenterButtonBack">
          <Button
              justify="center "
              variant="filled"
              color="#283739"
              radius="md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
              >
                <path
                  d="M1.5 6H16.5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.49999 11L1.5 6L6.49999 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="MyCompanyTaskAllContent">
          <div className="MyCompanyTaskContentButtons">
              <button className="MyCompanyTaskContentButtonsDesign">
                <span className="MyCompanyTaskContentButtonText">Date</span>
              </button>
              <button className="MyCompanyTaskContentButtonsDesign">
                <span className="MyCompanyTaskContentButtonText">Priority</span>
              </button>
              <button className="MyCompanyTaskContentButtonsDesign">
                <span className="MyCompanyTaskContentButtonText">Late</span>
              </button>
              <button className="MyCompanyTaskContentButtonsDesign1">
                <span className="MyCompanyTaskContentButtonText">In Progress</span>
              </button>
            </div>
            <div className="MyCompanyTaskContentCard">
              <MyCompanyTaskCard/>
              <MyCompanyTaskCard/>
              <MyCompanyTaskCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompanyTask;
