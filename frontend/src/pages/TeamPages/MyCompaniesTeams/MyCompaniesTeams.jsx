import { useEffect, useState } from "react";
import "./MyCompaniesTeams.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import MyCompaniesTeamsCard from "../../../components/MyCompaniesTeamsCard/MyCompaniesTeamsCard";
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
function MyCompaniesTeams({user_id}) {
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
  return (
    <div className="MyCompaniesTeamsAll" id="man">
      <SideBar colorSide={receivedData}/>
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
              <button className="MyCompaniesTeamsContentButtonsDesign1">
                <span className="MyCompaniesTeamsContentButtonText">
                  In Progress
                </span>
              </button>
            </div>
            <div className="MyCompaniesTeamsContentCard">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
                data?.getUser?.MyCompanies.map((company) =>
                  company.Teams.map((team, index) => (
                    <MyCompaniesTeamsCard
                      key={index}
                      teamRole={team.TeamRole}
                      teamName={team.TeamName}
                      createDate={team.CreateDate}
                      teamId={team._id}
                      color={receivedData}
                    />
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompaniesTeams;
