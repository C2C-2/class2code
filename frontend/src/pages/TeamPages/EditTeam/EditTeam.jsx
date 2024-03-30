import React from "react";
import "./CreateTeam.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard"
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard"
import { Button, Input } from "@mantine/core";
function EditTeam() {
  return (
    <div className="EditTeamAll">
      <SideBar />
      <div className="EditTeamMain">
        <NavBar />
        <div className="EditTeamContent">
          <div className="EditTeamCenter">
          <span className="EditTeamHeader">Edit Team</span>
          <div className="EditTeamInputsAll">
            <div className="EditTeamInput1">
            <div className="EditTeamDataInput">
                  <span className="EditTeamLabel">Name</span>
                  <input
                    type="text"
                    placeholder="Team Name"
                    className="EditTeamTextInput"
                  />
                </div>
                <div className="EditTeamDataInput">
                  <span className="EditTeamLabel">Team Lead</span>
                  <input
                    type="text"
                    placeholder="Me"
                    className="EditTeamTextInput"
                  />
                </div>
            </div>
            <div className="EditTeamInput2">
            <div className="EditTeamDataInput">
                  <span className="EditTeamLabel">Role of Team</span>
                  <input
                    type="text"
                    placeholder="QA Team"
                    className="EditTeamTextInput"
                  />
                </div>
                <div className="EditTeamDataInput">
                  <span className="EditTeamLabel">Company</span>
                  <input
                    type="text"
                    placeholder="Company A"
                    className="EditTeamTextInput"
                  />
                </div>
            </div>
          </div>
          <div className="EditTeamRoleUser">
            <div className="EditTeamUsers">
            <span className="EditTeamLabel">User</span>
            <CreateTeamCard/>
            <CreateTeamCard/>
            </div>
            <div className="EditTeamRoles">
            <span className="EditTeamLabel">Role</span>
            <CreateTeamCard/>
            <CreateTeamCard/>
            </div>
          </div>
        <CreateTeamAddOnsCard/>
        <div className="EditTeamButton">
                <Button variant="filled" color="#388E3C" w={130} h={40}>Save</Button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
