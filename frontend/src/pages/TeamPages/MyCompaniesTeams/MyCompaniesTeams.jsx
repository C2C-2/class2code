import { useEffect, useState } from "react";
import "./MyCompaniesTeams.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, TextInput, Select } from "@mantine/core";
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

function MyCompaniesTeams({ user_id }) {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [teamData, setTeamData] = useState({
    team: null,
    companyId: null,
  });
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "";
  }, [receivedData]);
  const { loading, error, data } = useQuery(GET_MY_COMPANIES_TEAMS, {
    variables: { user_id },
  });
  const [createTeam] = useMutation(CREATE_NEW_TEAMS);
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
    createTeam({variables:{team:teamData ,companyId:company_id }})
      .then((res) => {
        console.log("Task created successfully:", res.data.createTaskForTeam);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };
  const dummyData = {
    getUser: {
      MyCompanies: [
        {
          CompanyName: "Company A",
          Teams: [
            {
              TeamRole: "Developer",
              TeamName: "Team 1",
              CreateDate: "2024-04-17",
              _id: "1",
              images: "https://i.pravatar.cc/300",
              TeamLead: "Mohammed",
              Tasks: [
                {
                  TaskName: "Task 1",
                },
              ],
              Members: [
                {
                  MemberName: "Mohammed",
                  MemberRole: "Developer",
                },
                {
                  MemberName: "Qossay",
                  MemberRole: "Developer",
                },
              ],
            },
            {
              TeamRole: "Manager",
              TeamName: "Team 2",
              CreateDate: "2024-04-16",
              _id: "2",
              images: "https://i.pravatar.cc/300",
              TeamLead: "Mohammed",
              Tasks: [
                {
                  TaskName: "Task 1",
                },
              ],
              Members: [
                {
                  MemberName: "Mohammed",
                  MemberRole: "Developer",
                },
                {
                  MemberName: "Qossay",
                  MemberRole: "Developer",
                },
              ],
            },
          ],
        },
        {
          CompanyName: "Company B",
          Teams: [
            {
              TeamRole: "Developer",
              TeamName: "Team 3",
              CreateDate: "2024-04-15",
              _id: "3",
              images: "https://i.pravatar.cc/300",
              TeamLead: "Qossay",
              Tasks: [
                {
                  TaskName: "Task 1",
                },
              ],
              Members: [
                {
                  MemberName: "Mohammed",
                  MemberRole: "Developer",
                },
                {
                  MemberName: "Qossay",
                  MemberRole: "Developer",
                },
              ],
            },
            {
              TeamRole: "Manager",
              TeamName: "Team 4",
              CreateDate: "2024-04-14",
              _id: "4",
              images: "https://i.pravatar.cc/300",
              TeamLead: "Osama",
              Tasks: [
                {
                  TaskName: "Task 1",
                },
              ],
              Members: [
                {
                  MemberName: "Mohammed",
                  MemberRole: "Developer",
                },
                {
                  MemberName: "Qossay",
                  MemberRole: "Developer",
                },
              ],
            },
          ],
        },
      ],
    },
  };
  return (
    <div className="MyCompaniesTeamsAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="MyCompaniesTeamsMain">
        <NavBar sendDataToParent={receiveDataFromChild} />
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
              <Button variant="filled" color="#F1F1F1" c="black">
                Priority
              </Button>
              <Button variant="filled" color="#F1F1F1" c="black">
                Late
              </Button>
            </div>
            <div className="MyCompaniesTeamsContentCard">
              {dummyData.getUser.MyCompanies.map((company) =>
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
                    color={receivedData}
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
