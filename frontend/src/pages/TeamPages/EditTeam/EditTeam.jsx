import {useState } from "react";
import "./EditTeam.css";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard";
import CreateTeamCardRole from "../../../components/CreateTeamCardRole/CreateTeamCardRole";
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard";
import { useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam($teamId: Int!, $team: TeamInput!) {
    updateTeam(teamId: $teamId, team: $team) {
      Members {
        FirstName
        LastName
        Work
      }
      TeamName
      TeamRole
      CreateDate
    }
  }
`;

function EditTeam() {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamLead: "",
    teamRole: "",
    company: "",
    members: [],
  });


  const handleMemberUpdate = (index, newFirstName, newLastName) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      FirstName: newFirstName,
      LastName: newLastName,
    };
    setTeamData({
      ...teamData,
      members: updatedMembers,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  // const [updateTeam] = useMutation(UPDATE_TEAM_MUTATION);
  // const handleSave =()=>{
  //       variables: {
  //         teamId: parseInt(teamId),
  //         team: teamData
  //       },
  // };

  return (
    <div className="EditTeamAll" id="man">
      <div className="EditTeamMain">
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
                    name="teamName"
                    value={teamData.teamName}
                    onChange={handleChange}
                    className="EditTeamTextInput"
                  />
                </div>
                <div className="EditTeamDataInput">
                  <span className="EditTeamLabel">Team Lead</span>
                  <input
                    type="text"
                    placeholder="Me"
                    name="teamLead"
                    value={teamData.teamLead}
                    onChange={handleChange}
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
                    name="teamRole"
                    value={teamData.teamRole}
                    onChange={handleChange}
                    className="EditTeamTextInput"
                  />
                </div>
                <div className="EditTeamDataInput">
                  <span className="EditTeamLabel">Company</span>
                  <input
                    type="text"
                    placeholder="Company A"
                    name="company"
                    value={teamData.company}
                    onChange={handleChange}
                    className="EditTeamTextInput"
                  />
                </div>
              </div>
            </div>
            <div className="EditTeamRoleUser">
              <div className="EditTeamUsers">
                <span className="EditTeamLabel">User</span>
                {teamData.members.map((member, index) => (
                  <CreateTeamCard
                    key={index}
                    firstName={member.FirstName}
                    lastName={member.LastName}
                    onClick={(newFirstName, newLastName) =>
                      handleMemberUpdate(index, newFirstName, newLastName)
                    }
                  />
                ))}
              </div>
              <div className="EditTeamRoles">
                <span className="EditTeamLabel">Role</span>
                {teamData.members.map((member, index) => (
                  <CreateTeamCardRole key={index} role={member.Work} />
                ))}
              </div>
            </div>
            <CreateTeamAddOnsCard />
            <div className="EditTeamButton">
              <Link to="/MyCompaniesTeams">
                <Button
                  variant="filled"
                  color="#388E3C"
                  w={130}
                  h={40}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;
