import {  useState } from "react";
import "./MyCompaniesTeams.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import MyCompaniesTeamsCard from "../../../components/MyCompaniesTeamsCard/MyCompaniesTeamsCard";
import { gql, useMutation, useQuery } from "@apollo/client";
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard";
import { Link } from "react-router-dom";
const GET_MY_COMPANIES_TEAMS = gql`
  query MyCompanies($userId: String!) {
    getUser(userId: $userId) {
      MyCompanies {
        Teams {
          CreateDate
          TeamRole
          Members {
            FirstName
            LastName
            Work
          }
          TeamName
          Tasks {
            TaskName
          }
          _id
        }
      }
    }
  }
`;
const CREATE_NEW_TEAMS = gql`
  mutation Mutation($team: TeamInput!, $companyId: Int!) {
    createNewTeam(team: $team, companyId: $companyId) {
      CreateDate
      Members {
        FirstName
        LastName
        Work
      }
      TeamName
      TeamRole
    }
  }
`;
const ADD_USER_TO_TEAM = gql`
  mutation AddUserToTeam($teamId: Int!, $userId: String!, $role: String!) {
    addUserToTeam(teamId: $teamId, userId: $userId, role: $role)
  }
`;

function MyCompaniesTeams(
) {
  const user_id = localStorage.getItem("id");
  const [teamData, setTeamData] = useState({
    team: null,
    companyId: null,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const { loading, error, data } = useQuery(GET_MY_COMPANIES_TEAMS, {
    variables: { user_id },
  });
  const [createTeam] = useMutation(CREATE_NEW_TEAMS);
  const [addUserToTeam] = useMutation(ADD_USER_TO_TEAM);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      team: {
        ...prevData.team,
        [name]: value,
      },
    }));
  };
  const handleCreateTeam = () => {
    createTeam({ variables: { team: teamData, companyId: company_id } })
      .then((res) => {
        console.log("Team created successfully:", res.data.createNewTeam);
        const teamId = res.data.createNewTeam._id;
        const userId = localStorage.getItem("id");
        const role = "member";
        addUserToTeam({ variables: { teamId, userId, role } });
      })
      .catch((error) => {
        console.error("Error creating team:", error);
      });
  };
  return (
    <div className="MyCompaniesTeamsAll" id="man">
      <div className="MyCompaniesTeamsMain">
        <div className="MyCompaniesTeamsCenter">
          <div className="FakeDiveMyCompaniesTeams"></div>
          <div className="MyCompaniesTeamsCenterButtonBack">
            <Link to="/Dashboard">
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.49999 11L1.5 6L6.49999 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Link>
          </div>
          <div className="MyCompaniesTeamsContent">
            <div className="MyCompaniesTeamsContentButtons">
              <div>
                <Modal
                  opened={opened}
                  onClose={close}
                  title="Create Team"
                  centered
                >
                  <div className="d-flex flex-column gap-4 p-2">
                    <div className="d-flex flex-row gap-3">
                      <TextInput
                        label="Name"
                        name="teamName"
                        value={teamData.teamName}
                        onChange={handleInputChange}
                        placeholder="Team name"
                      />
                      <TextInput
                        label="Team Lead"
                        placeholder="Team Lead Name"
                        name="teamLead"
                        value={teamData.teamLead}
                      />
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <TextInput
                        label="Role of Team"
                        placeholder="Team Role"
                        name="teamRole"
                        value={teamData.teamRole}
                      />
                      <TextInput
                        label="Company Name"
                        name="companyName"
                        value={teamData.companyName}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="CreateNewTeamRole">
                  <div className="d-flex flex-column gap-2 ">
                    <span className="EditTeamLabel">User</span>
                  
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <span className="EditTeamLabel">Role</span>
                  
                  </div>
                </div>
                    <div className='EditTaskSteps'>
              <span className="EditTaskLabel">Steps</span>
              
              <CreateTeamAddOnsCard/>
            </div>

                  </div>
                  <div className="d-flex flex-row justify-content-end pt-3" >
                <Button variant="filled" color="#388E3C" onClick={handleCreateTeam}>Create</Button>
                </div>
                </Modal>
                <Button onClick={open} variant="filled" color="orange">
                  New
                </Button>
              </div>

              <Button variant="filled" color="#F1F1F1" c="black">
                Date
              </Button>
            </div>
            <div className="MyCompaniesTeamsContentCard">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data &&
              data.getUser &&
              data.getUser.MyCompanies.map((company) =>
                company.Teams.map((team) => (
                  <MyCompaniesTeamsCard
                    key={team._id}
                    Members={team.Members}
                    Tasks={team.Tasks}
                    companyName={company.CompanyName}
                    teamRole={team.TeamRole}
                    teamName={team.TeamName}
                    createDate={team.CreateDate}
                    teamId={team._id}
                    imagesUser={team.images}
                    teamLead={team.TeamLead}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompaniesTeams;
