import { useEffect, useState } from "react";
import "./CreateTeam.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard"
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard"
import { Button } from "@mantine/core";
function CreateTeam() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#000";
  }, [receivedData]);
  return (
    <div className="CreateTeamAll" id="man">
      <SideBar />
      <div className="CreateTeamMain">
        <NavBar sendDataToParent={receiveDataFromChild}/>
        <div className={`${
                  isDarkMode
                    ? "CreateTeamContentDark"
                    : "CreateTeamContent"
                }`}>
          <div   className={`${
                  isDarkMode
                    ? "CreateTeamCenterDark"
                    : "CreateTeamCenter"
                }`}>
          <span className={`${
                  isDarkMode
                    ? "CreateTeamHeaderDark"
                    : "CreateTeamHeader"
                }`}>Create New Team</span>
          <div className="InputsAll">
            <div className="CreateTeamInput1">
            <div className="CreateTeamDataInput">
                  <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`}>Name</span>
                  <input
                    type="text"
                    placeholder="Team Name"
                    className="CreateTeamTextInput"
                  />
                </div>
                <div className="CreateTeamDataInput">
                  <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`}>Team Lead</span>
                  <input
                    type="text"
                    placeholder="Me"
                    className="CreateTeamTextInput"
                  />
                </div>
            </div>
            <div className="CreateTeamInput2">
            <div className="CreateTeamDataInput">
                  <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`} >Role of Team</span>
                  <input
                    type="text"
                    placeholder="QA Team"
                    className="CreateTeamTextInput"
                  />
                </div>
                <div className="CreateTeamDataInput">
                  <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`}>Company</span>
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
            <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`}>User</span>
            <CreateTeamCard/>
            <CreateTeamCard/>
            </div>
            <div className="CreateTeamRoles">
            <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`}>Role</span>
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
