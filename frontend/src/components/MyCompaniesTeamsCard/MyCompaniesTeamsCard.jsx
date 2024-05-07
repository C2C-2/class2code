import { useState, useEffect } from "react";
import "./MyCompaniesTeamsCard.css";
import Profile from "./Frame.png";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Modal, Button, Input, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import CreateTeamCard from "../CreateTeamCard/CreateTeamCard";
import CreateTeamAddOnsCard from "../CreateTeamAddOnsCard/CreateTeamAddOnsCard";
const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam($teamId: Int!, $team: TeamInput!) {
    updateTeam(teamId: $teamId, team: $team) {
      CreateDate
      Members {
        LastName
        FirstName
        Work
      }
      TeamName
      TeamRole
    }
  }
`;
function MyCompaniesTeamsCard({
  color,
  companyName,
  teamName,
  teamRole,
  createDate,
  teamId,
  imagesUser,
  Members,
  Tasks,
  teamLead,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: teamName,
    teamLead: teamLead,
    teamRole: teamRole,
    company: companyName,
    Members: [...Members],
    Tasks: [...Tasks],
    createDate: createDate,
    imagesUser: imagesUser,
  });
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeamData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [updateTeam] = useMutation(UPDATE_TEAM_MUTATION);
  const handleChange = () => {
    updateTeam({
      variables: {
        teamId: parseInt(teamId),
        team: teamData,
      },
    });
  };
  return (
    <div className="MyCompaniesTeamsCardAll">
      <div className="MyCompaniesTeamsCardMain">
        <div className="MyCompaniesTeamsCardName">
          <div className="MyCompaniesTeamsCardName1">
            <h6 className="MyCompaniesTeamsCardText">{companyName}</h6>
          </div>
        </div>
        <div
          className={`${
            isDarkMode
              ? "MyCompaniesTeamsCardDesignDark"
              : "MyCompaniesTeamsCardDesign"
          }`}
        >
          <div className="MyCompaniesTeamsCardEditButton">
            <div></div>
            <Modal opened={opened} onClose={close} title="Edit Team" centered>
              <div className="d-flex flex-column gap-4 p-2">
                <div className="d-flex flex-row gap-3">
                  <TextInput
                    label="Name"
                    name="teamName"
                    value={teamData.teamName}
                    onChange={handleInputChange}
                    placeholder="Task name"
                  />
                  <TextInput
                    label="Team Lead"
                    value={teamData.teamLead}
                    name="teamLead"
                    placeholder="Team Lead"
                  />
                </div>
                <div className="d-flex flex-row gap-3">
                  <TextInput
                    label="Team Role"
                    name="teamRole"
                    value={teamData.teamRole}
                    onChange={handleInputChange}
                    placeholder="12/3/2005"
                  />
                  <TextInput
                    label="Company"
                    name="company"
                    value={teamData.company}
                    onChange={handleInputChange}
                    placeholder="Company A"
                  />
                </div>

                <div className="d-flex flex-row gap-5">
                  <div className="d-flex flex-column gap-2">
                    <span className="EditTeamLabel">User</span>
                    {teamData.Members.map((member) => (
                      <CreateTeamCard key={teamData.teamId} name={member.MemberName} />
                    ))}
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <span className="EditTeamLabel">Role</span>
                    {teamData.Members.map((memberRole) => (
                      <CreateTeamCard key={teamData.teamId} name={memberRole.MemberRole} />
                    ))}
                  </div>
                </div>
                <div className="EditTaskSteps">
                  <CreateTeamAddOnsCard />
                </div>
              </div>
              <div className="d-flex flex-row justify-content-end pt-3">
                <Button variant="filled" color="#388E3C" onClick={handleChange}>
                  Save
                </Button>
              </div>
            </Modal>
            <Button
            variant="transparent"
            color= "#0d062d"
              onClick={open}
              className="MyCompaniesTeamsCardEditButtonText"
            >
              . . .
            </Button>
          </div>
          <div className="MyCompaniesTeamsCardPart1">
            <h6
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPartTextDark"
                  : "MyCompaniesTeamsCardPartText"
              }`}
            >
              {teamRole}
            </h6>
            <h6
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPartNumberDark"
                  : "MyCompaniesTeamsCardPartNumber"
              }`}
            >
              5
            </h6>
          </div>
          <div className="MyCompaniesTeamsCardPart2">
            <button
              className={`${
                isDarkMode
                  ? "MyCompaniesTeamsCardPart2TextDark"
                  : "MyCompaniesTeamsCardPart2Text"
              }`}
            >
              {teamName}
            </button>
            <div className="MyCompaniesTeamsCardPart2Under">
              <div className="MyCompaniesTeamsCardPart2UnderProfile">
                <img
                  src={imagesUser}
                  alt="Profile"
                  className="MyCompaniesTeamsCardPart2UnderProfileImg"
                />
                <button
                  className={`${
                    isDarkMode
                      ? "MyCompaniesTeamsCardPart2UnderProfileTextDark"
                      : "MyCompaniesTeamsCardPart2UnderProfileText"
                  }`}
                >
                  {teamLead}
                </button>
              </div>
              <div className="MyCompaniesTeamsCardPart2Text2">
                {" "}
                {createDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompaniesTeamsCard;
