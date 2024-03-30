import React from "react";
import "./CreateTeam.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard"
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard"
import { Button, Input } from "@mantine/core";
function CreateTeam() {
  return (
    <div className="CreateTeamAll">
      <SideBar />
      <div className="CreateTeamMain">
        <NavBar />
        <div className="CreateTeamContent">
          <div className="CreateTeamCenter">
          <span className="CreateTeamHeader">Create New Team</span>
          <div className="InputsAll">
            <div className="CreateTeamInput1">
            <div className="CreateTeamDataInput">
                  <span className="CreateTeamLabel">Name</span>
                  <input
                    type="text"
                    placeholder="Team Name"
                    className="CreateTeamTextInput"
                  />
                </div>
                <div className="CreateTeamDataInput">
                  <span className="CreateTeamLabel">Team Lead</span>
                  <input
                    type="text"
                    placeholder="Me"
                    className="CreateTeamTextInput"
                  />
                </div>
            </div>
            <div className="CreateTeamInput2">
            <div className="CreateTeamDataInput">
                  <span className="CreateTeamLabel">Role of Team</span>
                  <input
                    type="text"
                    placeholder="QA Team"
                    className="CreateTeamTextInput"
                  />
                </div>
                <div className="CreateTeamDataInput">
                  <span className="CreateTeamLabel">Company</span>
                  <input
                    type="text"
                    placeholder="Company A"
                    className="CreateTeamTextInput"
                  />
                </div>
            </div>
          </div>
          <div className="CreateTeamRoleUser">
            <div className="CreateTeamUsers">
            <span className="CreateTeamLabel">User</span>
            <CreateTeamCard/>
            <CreateTeamCard/>
            </div>
            <div className="CreateTeamRoles">
            <span className="CreateTeamLabel">Role</span>
            <CreateTeamCard/>
            <CreateTeamCard/>
            </div>
          </div>
        <CreateTeamAddOnsCard/>
        <div className="CreateTeamButton">
                <Button variant="filled" color="#388E3C" w={130} h={40}>Create</Button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
