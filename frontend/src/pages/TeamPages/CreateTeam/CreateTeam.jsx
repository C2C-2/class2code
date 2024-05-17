import "./CreateTeam.css";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard";
import CreateTeamCardRole from "../../../components/CreateTeamCardRole/CreateTeamCardRole";
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
function CreateTeam() {
  const dummyUsers = [
    { name: "User 1", role: "Role 1" },
    { name: "User 2", role: "Role 2" },
  ];
  return (
    <div className="CreateTeamAll">
      <div className="CreateTeamMain">
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
                {dummyUsers.map((user, index) => (
                  <CreateTeamCard key={index} name={user.name} />
                ))}
              </div>
              <div className="CreateTeamRoles">
                <span className="CreateTeamLabel">Role</span>
                {dummyUsers.map((user, index) => (
                  <CreateTeamCardRole key={index} role={user.role} />
                ))}
              </div>
            </div>
            <CreateTeamAddOnsCard />
            <div className="CreateTeamButton">
              <Link to="/MyCompaniesTeams">
                <Button variant="filled" color="#388E3C" w={130} h={40}>
                  Create
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
