import { useEffect, useState } from "react";
import "./CreateTeam.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard"
import CreateTeamCardRole from "../../../components/CreateTeamCardRole/CreateTeamCardRole"
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard"
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
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
  const dummyUsers = [
    { name: "User 1", role: "Role 1" },
    { name: "User 2", role: "Role 2" },
  ];
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
               {dummyUsers.map((user, index) => (
                  <CreateTeamCard
                    key={index}
                    name={user.name}
                    
                  />
                ))}
            </div>
            <div className="CreateTeamRoles">
            <span className={`${
                  isDarkMode
                    ? "CreateTeamLabelDark"
                    : "CreateTeamLabel"
                }`}>Role</span>
             {dummyUsers.map((user, index) => (
                  <CreateTeamCardRole
                    key={index}
                  
                    role={user.role}
                  />
                ))}
            </div>
          </div>
        <CreateTeamAddOnsCard/>
        <div className="CreateTeamButton">
          <Link to="/MyCompaniesTeams">
                <Button variant="filled" color="#388E3C" w={130} h={40}>Create</Button>
                </Link>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
