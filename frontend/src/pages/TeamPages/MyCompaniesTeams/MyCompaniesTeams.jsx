import React from "react";
import "./MyCompaniesTeams.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button, Input, TextInput } from "@mantine/core";
import MyCompaniesTeamsCard from "../../../components/MyCompaniesTeamsCard/MyCompaniesTeamsCard";
function MyCompaniesTeams() {
  return (
    <div className="MyCompaniesTeamsAll">
      <SideBar />
      <div className="MyCompaniesTeamsMain">
        <NavBar />
        <div className="MyCompaniesTeamsCenter">
          <div className="MyCompaniesTeamsCenterButtonBack">
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
          <div className="MyCompaniesTeamsContent">
            <div className="MyCompaniesTeamsContentButtons">
              <button className="MyCompaniesTeamsContentButtonsDesign">
                <span className="MyCompaniesTeamsContentButtonText">Date</span>
              </button>
              <button className="MyCompaniesTeamsContentButtonsDesign">
                <span className="MyCompaniesTeamsContentButtonText">Priority</span>
              </button>
              <button className="MyCompaniesTeamsContentButtonsDesign">
                <span className="MyCompaniesTeamsContentButtonText">Late</span>
              </button>
              <button className="MyCompaniesTeamsContentButtonsDesign1">
                <span className="MyCompaniesTeamsContentButtonText">In Progress</span>
              </button>
            </div>
            <div className="MyCompaniesTeamsContentCard">
              <MyCompaniesTeamsCard/>
              <MyCompaniesTeamsCard/>
              <MyCompaniesTeamsCard/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompaniesTeams;
