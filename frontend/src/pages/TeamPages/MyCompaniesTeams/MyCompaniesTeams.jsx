import { useEffect, useState } from "react";
import "./MyCompaniesTeams.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import MyCompaniesTeamsCard from "../../../components/MyCompaniesTeamsCard/MyCompaniesTeamsCard";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
function MyCompaniesTeams({ user_id }) {
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

  const GET_MY_COMPANIES_TEAMS = gql`
    query MyCompanies($userId: String!) {
      getUser(userId: $userId) {
        MyCompanies {
          CompanyName
          Teams {
            TeamRole
            TeamName
            CreateDate
            _id
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_MY_COMPANIES_TEAMS, {
    variables: { user_id },
  });
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
            },
            {
              TeamRole: "Manager",
              TeamName: "Team 2",
              CreateDate: "2024-04-16",
              _id: "2",
              images: "https://i.pravatar.cc/300",
              TeamLead: "Mohammed",
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
            },
            {
              TeamRole: "Manager",
              TeamName: "Team 4",
              CreateDate: "2024-04-14",
              _id: "4",
              images: "https://i.pravatar.cc/300",
              TeamLead: "Osama",
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
              <button className="MyCompaniesTeamsContentButtonsDesign">
                <span className="MyCompaniesTeamsContentButtonText">Date</span>
              </button>
              <button className="MyCompaniesTeamsContentButtonsDesign">
                <span className="MyCompaniesTeamsContentButtonText">
                  Priority
                </span>
              </button>
              <button className="MyCompaniesTeamsContentButtonsDesign">
                <span className="MyCompaniesTeamsContentButtonText">Late</span>
              </button>

              <Link
                to="/CreateTeam"
                className="MyCompaniesTeamsContentButtonsDesign1"
              >
                <span className="MyCompaniesTeamsContentButtonText">
                  Create Team
                </span>
              </Link>
            </div>
            <div className="MyCompaniesTeamsContentCard">
              {dummyData.getUser.MyCompanies.map((company) =>
                company.Teams.map((team) => (
                  <MyCompaniesTeamsCard
                    key={team._id}
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
