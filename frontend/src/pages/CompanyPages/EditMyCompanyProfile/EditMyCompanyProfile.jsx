import "./EditMyCompanyProfile.css";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { GoTrash } from "react-icons/go";

function EditMyCompanyProfile() {
  const { company_id } = useParams();
  const navigation = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [rate, setRate] = useState(0);
  const [createDate, setCreateDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamRole, setTeamRole] = useState("");

  const GET_COMPANY_DATA = gql`
    query GetCompany($companyId: Int!) {
      getCompany(companyId: $companyId) {
        _id
        Rate
        CompanyName
        CreateDate
        Domain
        CompanyDescription
        Admin {
          FirstName
          LastName
        }
        Project {
          ProjectName
        }
        Teams {
          TeamName
          _id
        }
      }
    }
  `;
  const { data: companyData, refetch: refetchCompany } = useQuery(
    GET_COMPANY_DATA,
    {
      variables: { companyId: parseInt(company_id) },
    }
  );

  const CREATE_TEAM = gql`
    mutation Mutation($team: TeamInput!, $companyId: Int!) {
      createNewTeam(team: $team, companyId: $companyId) {
        _id
      }
    }
  `;

  const [createTeam] = useMutation(CREATE_TEAM);

  const DELETE_TEAM = gql`
    query Query($teamId: Int!) {
      deleteTeam(teamId: $teamId)
    }
  `;

  const [deleteTeam] = useLazyQuery(DELETE_TEAM);

  useEffect(() => {
    if (companyData) {
      setCompanyName(companyData?.getCompany?.CompanyName);
      setCompanyDescription(companyData?.getCompany?.CompanyDescription);
      setCompanyDomain(companyData?.getCompany?.Domain);
      setRate(companyData?.getCompany?.Rate);
      setCreateDate(companyData?.getCompany?.CreateDate);
      setFullName(
        companyData?.getCompany?.Admin?.FirstName +
          " " +
          companyData?.getCompany?.Admin?.LastName
      );
      setProjectName(companyData?.getCompany?.Project?.ProjectName);
      setTeams(companyData?.getCompany?.Teams);
    }
  }, [companyData]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="ShowAllPostsAll">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="EditMyCompaniesContentData">
              <Button
                w={"fit-content"}
                justify="center "
                variant="filled"
                color="#283739"
                radius="md"
                onClick={() => navigation(-1)}
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
              <div className="EditMyCompaniesHead  d-flex justify-content-around align-items-center">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex gap-3 align-items-center">
                    <h4>{companyName}</h4>
                    <div className="d-flex gap-1">
                      <h6>{rate}</h6>
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
                    </div>
                  </div>
                  <span>{fullName}</span>
                </div>
                <div className="d-flex flex-column gap-1">
                  <h4>Domain</h4>
                  <span>{companyDomain}</span>
                </div>
                <div className="d-flex flex-column gap-1">
                  <h4>Create Date</h4>
                  <span>{createDate?.slice(0, 10)}</span>
                </div>
              </div>
              <div className="EditMyCompaniesBody">
                <div className="d-flex flex-column gap-4" style={{ flex: 1 }}>
                  <Textarea
                    resize="vertical"
                    size="md"
                    variant="filled"
                    label="Description"
                    value={companyDescription}
                    w={"100%"}
                  />
                  <TextInput
                    label="Company Name"
                    value={companyName}
                    size="md"
                    w={"100%"}
                  />
                  <TextInput
                    label="Domain"
                    value={companyDomain}
                    size="md"
                    w={"100%"}
                  />

                  <div className="d-flex gap-3 justify-content-end">
                    <Button variant="filled" color="green">
                      Update
                    </Button>
                    <Button variant="outline" color="red">
                      Reset
                    </Button>
                  </div>
                </div>
                <div
                  className="d-flex flex-column gap-4"
                  style={{ minWidth: 300 }}
                >
                  {projectName && (
                    <div className="d-flex flex-column gap-2">
                      <TextInput
                        label="Change Project"
                        placeholder="Project Name"
                        size="md"
                      />
                      <div className="project_name">
                        <h6>{"projectName"}</h6>
                        <Button variant="filled" color="green" size="xs">
                          Done!
                        </Button>
                      </div>
                    </div>
                  )}
                  <div>
                    <h4>Teams</h4>
                    <br />
                    <Modal
                      xOffset={"30%"}
                      yOffset={"9%"}
                      padding={"xl"}
                      opened={opened}
                      onClose={close}
                      title="Create Team"
                      centered
                    >
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          await createTeam({
                            variables: {
                              team: {
                                TeamName: teamName,
                                TeamRole: teamRole,
                              },
                              companyId: parseInt(company_id),
                            },
                          }).then(() => {
                            refetchCompany();
                            setTeamName("");
                            setTeamRole("");
                            close();
                          });
                        }}
                      >
                        <TextInput
                          value={teamName}
                          onChange={(e) => {
                            setTeamName(e.target.value);
                          }}
                          label="Team Name"
                          placeholder=""
                          size="sm"
                          required
                        />
                        <br />
                        <TextInput
                          value={teamRole}
                          onChange={(e) => {
                            setTeamRole(e.target.value);
                          }}
                          label="Team Role"
                          placeholder=""
                          size="sm"
                          required
                        />
                        <br />
                        <div className="d-flex gap-3 justify-content-end">
                          <Button type="submit" color="green">
                            Create Team
                          </Button>
                        </div>
                      </form>
                    </Modal>
                    <Button color="green" onClick={open}>
                      Create Team
                    </Button>
                    <div style={{ overflow: "auto", maxHeight: 300 }}>
                      {teams?.map((team) => (
                        <div
                          className="team_name my-3 d-flex align-items-center justify-content-between"
                          key={team._id}
                        >
                          <h6>{team.TeamName}</h6>
                          <Button
                            variant="outline"
                            color="red"
                            radius={"xl"}
                            onClick={() => {
                              deleteTeam({
                                variables: {
                                  teamId: parseInt(team._id),
                                },
                              }).then(() => {
                                refetchCompany();
                              });
                            }}
                          >
                            <GoTrash size={12} />
                          </Button>
                        </div>
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
