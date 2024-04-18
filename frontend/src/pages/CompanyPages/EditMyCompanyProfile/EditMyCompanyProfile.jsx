import { useState, useEffect } from "react";
import "./EditMyCompanyProfile.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import CurrentProject from "../../../components/CurrentProject/CurrentProject";
import EditTeamMyCompanyProfile from "../../../components/EditTeamMyCompanyProfile/EditTeamMyCompanyProfile";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
function EditMyCompanyProfile() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [companyName, setCompanyName] = useState("Company ABC");
  const [domain, setDomain] = useState("www.companyabc.com");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );
  const [rate, setRate] = useState(4.9);
  const [project, setProject] = useState("Project XYZ");
  const [teams, setTeams] = useState([
    { TeamName: "Team 1" },
    { TeamName: "Team 2" },
    { TeamName: "Team 3" },
  ]);

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

  const UPDATE_COMPANY_MUTATION = gql`
    mutation UpdateCompany($companyId: Int!, $company: CompanyInput!) {
      updateCompany(companyId: $companyId, company: $company) {
        CompanyDescription
        CompanyName
        Domain
        CreateDate
        Project {
          ProjectName
        }
        Teams {
          TeamName
        }
        Rate
      }
    }
  `;
  const [updateCompany, { data, loading, error }] = useMutation(
    UPDATE_COMPANY_MUTATION
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "companyName") {
      setCompanyName(value);
    } else if (name === "domain") {
      setDomain(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "rate") {
      setRate(parseFloat(value));
    } else if (name === "project") {
      setProject(value);
    }
  };

  const handleProjectChange = (newProject) => {
    setProject(newProject);
  };
  const handleRemoveTeamMember = (teamName) => {
    setTeams(teams.filter((team) => team.TeamName !== teamName));
  };

  const handleSubmit = () => {
    updateCompany({
      variables: {
        companyId: companyId,
        company: {
          CompanyName: companyName,
          Domain: domain,
          CompanyDescription: description,
          Rate: rate,
          Project: {
            ProjectName: project,
          },
          Teams: teams,
        },
      },
    });
  };
  return (
    <div className="EditMyCompanyProfileAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="MainEditMyCompanyProfile">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="CenterEditMyCompanyProfile">
          <div className="AllEditMyCompanyProfile">
            <div className="EditMyCompanyProfileButtonBack">
              <Link to="/MyCompanies">
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.49999 11L1.5 6L6.49999 1"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
              </Link>
            </div>
            <div className="Part2EditCenter">
              <div className="DescriptionEditMyCompanyProfile">
                <div className="CompanyName">
                  <div className="EditC1">
                    <span className="EditC1Text">{companyName}</span>
                    <span
                      className="EditC1Number"
                      type="number"
                      name="rate"
                      value={rate}
                      onChange={handleInputChange}
                    >
                      4.9
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M15.2904 5.9597L10.8896 5.31899L8.92295 1.33849C8.74616 0.982806 8.40129 0.803009 8.05643 0.803009C7.71368 0.803009 7.37122 0.980401 7.19383 1.33849L5.22658 5.31869L0.825457 5.9588C0.0362136 6.07305 -0.280085 7.0439 0.292079 7.60013L3.47581 10.697L2.72235 15.071C2.61531 15.6958 3.11411 16.197 3.67275 16.197C3.82098 16.197 3.97341 16.1618 4.11984 16.0843L8.05703 14.0193L11.9939 16.0849C12.1401 16.1615 12.2922 16.1964 12.4398 16.1964C12.9991 16.1964 13.4988 15.697 13.3917 15.0719L12.6392 10.6976L15.8235 7.60133C16.396 7.0451 16.0797 6.07395 15.2904 5.9597ZM11.6301 9.66389L11.0853 10.1937L11.214 10.9417L11.8009 14.3527L8.73022 12.7415L8.05733 12.3885L8.05824 2.85174L9.59253 5.9573L9.92867 6.6377L10.6806 6.74714L14.1151 7.24715L11.6301 9.66389Z"
                          fill="#F4CE14"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="EditC2">
                    <span className="EditC2Text">Andrew Smith</span>
                  </div>
                </div>
                <div className="EditDomain">
                  <div className="EditD1">
                    <span className="EditD1Text">{domain}</span>
                  </div>
                  <div className="EditD2">
                    <span className="EditD2Text">Company Domain</span>
                  </div>
                </div>
                <div className="EditCreateDate">
                  <div className="EditCD1">
                    <span className="CD1Text">Created Date</span>
                  </div>
                  <div className="EditCD2">
                    <span className="EditCD2Text">22/4/2022</span>
                  </div>
                </div>
              </div>
              <div className="ContentEditMyCompanyProfile">
                <div className="Part1EditMyCompanyProfile">
                  <div className="DescriptionText">
                    <div className={`${isDarkMode ? "EditDU1Dark" : "EditDU1"}`}>
                      Description
                    </div>
                    <div className="EditDU2">
                      <textarea
                        cols="70"
                        rows="4"
                        name="description"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                        className={`${
                          isDarkMode ? "textareaDark" : "textareaLight"
                        }`}
                        value={description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="InputsTextEditMyCompanyProfile">
                    <div
                      className={`${
                        isDarkMode
                          ? "GeneralInformationDark"
                          : "GeneralInformation"
                      }`}
                    >
                      General Information
                    </div>
                    <div className="InputsMyCompanyProfile">
                      <div className="InputOverAll">
                        <span
                          className={`${
                            isDarkMode
                              ? "TextPartCompanyDark"
                              : "TextPartCompany"
                          }`}
                        >
                          Name
                        </span>
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Company Name"
                          className="TextInput"
                          value={companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="InputOverAll">
                        <span
                          className={`${
                            isDarkMode
                              ? "TextPartCompanyDark"
                              : "TextPartCompany"
                          }`}
                        >
                          Domain
                        </span>
                        <input
                          type="text"
                          name="domain"
                          placeholder="Domain"
                          className="TextInput"
                          value={domain}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="ButtonEdit">
                    <Link to="/MyCompanies">
                      <Button
                        variant="filled"
                        color="#388E3C"
                        w={135}
                        h={40}
                        onClick={handleSubmit}
                      >
                        Update Profile
                      </Button>
                      </Link>
                      <Button
                        variant="transparent"
                        color={`${isDarkMode ? "#fff" : "#000"}`}
                        w={105}
                        h={30}
                        size="compact-md"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="Part2EditUnderOther">
                  <div className="EditCurrentProjects">
                    <div
                      className={`${isDarkMode ? "EditCP1Dark" : "EditCP1"}`}
                    >
                      Current Projects
                    </div>
                    <div className="ChangeProject">
                      <span
                        className={`${
                          isDarkMode
                            ? "ChangeProjectTextDark"
                            : "ChangeProjectText"
                        }`}
                      >
                        Change Project
                      </span>
                      <input
                        type="text"
                        className="ChangeProjectDivs"
                        value={project}
                        onChange={(e) => handleProjectChange(e.target.value)}
                      />
                    </div>
                    <div className="CardOfCurrentProject">
                      <CurrentProject project={project} />
                    </div>
                  </div>
                  <div className="PartTeams">
                    <div
                      className={`${
                        isDarkMode ? "EditTeamsDark" : "EditTeams"
                      }`}
                    >
                      Teams
                    </div>
                    <div className="CreateTeam">
                      <span
                        className={`${
                          isDarkMode ? "ChangeTeamTextDark" : "ChangeTeamText"
                        }`}
                      >
                        Create Team
                      </span>
                      <button className="ChangeTeamDivs">
                        <span className="TextChange">Create Team</span>
                      </button>
                    </div>
                    <div className="EditCurrentTeams">
                      {teams.map((team) => (
                        <EditTeamMyCompanyProfile
                          key={team.TeamName}
                          team={team}
                          onRemove={handleRemoveTeamMember}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMyCompanyProfile;
