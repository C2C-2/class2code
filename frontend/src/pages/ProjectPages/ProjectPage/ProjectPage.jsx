import "./ProjectPage.css";
import ProjectImg from "./ProjectTitle.png";
import Alram from "./alarm_on.png";
import { Button, Modal } from "@mantine/core";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import CompanyWorkOnCard from "../../../components/CompanyWorkOnCard/CompanyWorkOnCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

const GET_PROJECT = gql`
  query GetProject($projectId: Int!) {
    getProject(projectId: $projectId) {
      ProjectDescription
      ProjectName
      Requirements {
        Value
      }
      Applies {
        CompanyName
        CreateDate
      }
    }
  }
`;

function ProjectPage() {
  const { projectId } = useParams();
  const [companyId, setCompanyId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const GET_MY_COMPANIES = gql`
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        MyCompanies {
          CompanyName
          _id
        }
      }
    }
  `;

  const { data: CompaniesData } = useQuery(GET_MY_COMPANIES, {
    variables: { userId: localStorage.getItem("id") },
  });

  useEffect(() => {
    if (CompaniesData) {
      setCompanyId(CompaniesData?.getUser?.MyCompanies[0]?._id);
    }
  }, [CompaniesData]);

  const APPLY_TO_PROJECT = gql`
    mutation Mutation($projectId: Int!, $companyId: Int!) {
      applyForProject(projectId: $projectId, companyId: $companyId)
    }
  `;

  const [applyToProject] = useMutation(APPLY_TO_PROJECT);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId: parseInt(projectId) },
  });

  return (
    <div className="ShowAllPostsAll" id="man">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody" style={{ gap: "0px" }}>
            <div className="navbarFake"></div>
            <div className="ProjectPageCenter">
              <div className="ProjectPagePart1">
                <div className={"ProjectPageTitle"}>
                  <img
                    src={ProjectImg}
                    alt="ProjectImg"
                    className="ProjectPageImg"
                  />
                  <div className="ProjectPageTitleContent">
                    <div className="PTTop">
                      <div className="PTText">
                        <span className="PTSpan1">
                          Hi, {localStorage.getItem("name")}
                        </span>
                        <span className="PTSpan2">
                          {data?.getProject?.ProjectName}
                        </span>
                      </div>
                      <div className="PTSvg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28vw"
                          height="10vw"
                          viewBox="0 0 210 88"
                          fill="none"
                        >
                          <rect
                            x="37.1133"
                            y="-26"
                            width="63.0854"
                            height="63.0854"
                            rx="7.00486"
                            fill="#388E3C"
                          />
                          <rect
                            y="-0.0213013"
                            width="63.0854"
                            height="63.0854"
                            rx="7.00486"
                            fill="#388E3C"
                          />
                          <rect
                            x="133.594"
                            y="19.0269"
                            width="29.7706"
                            height="29.7706"
                            rx="7.00486"
                            fill="#388E3C"
                          />
                          <rect
                            x="116.078"
                            y="31.283"
                            width="29.7706"
                            height="29.7706"
                            rx="7.00486"
                            fill="#388E3C"
                          />
                          <rect
                            x="181.047"
                            y="52.0519"
                            width="21.9736"
                            height="21.9736"
                            rx="7.00486"
                            fill="#388E3C"
                          />
                          <rect
                            x="168.121"
                            y="61.0982"
                            width="21.9736"
                            height="21.9736"
                            rx="7.00486"
                            fill="#388E3C"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="PTParagraph">
                      {data?.getProject?.ProjectDescription}
                    </p>
                  </div>
                </div>
                <br />
                <div className="ProjectPageUnder">
                  <br />
                  <div className="ProjectUnderText">
                    <div className="ProjectUnderName">
                      <span className="ProjectNameText">Project Name:</span>
                      <h6>{data?.getProject?.ProjectName}</h6>
                    </div>
                    <div className="ProjectUnderDetails">
                      <span className="ProjectDetailsText">
                        Project Details :
                      </span>
                      <p className="ProjectDetailsParagraph">
                        {data?.getProject?.ProjectDescription}
                      </p>
                    </div>
                    <br />
                    <div className="ProjectUnderRequirements">
                      <span className="ProjectRequirementsText">
                        Project Requirements :
                      </span>
                      <div className="ProjectRequirementsCard">
                        {data?.getProject?.Requirements?.map(
                          (requirement, index) => (
                            <div key={index} className="ProjectRequirement">
                              {requirement.Value}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="ProjectUnderButton">
                    <Modal
                      xOffset={"30%"}
                      yOffset={"10%"}
                      opened={opened}
                      onClose={close}
                      title="Take Project By Company"
                      centered
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          applyToProject({
                            variables: {
                              projectId: parseInt(projectId),
                              companyId: parseInt(companyId),
                            },
                          });
                          close();
                        }}
                      >
                        <div className="htmlInputGroup">
                          <label htmlFor="PostCompany">Company</label>
                          <select
                            className="htmlInput"
                            name="Company"
                            id="PostCompany"
                            required
                            onChange={(e) => setCompanyId(e.target.value)}
                          >
                            {CompaniesData?.getUser?.MyCompanies?.map(
                              (company, index) => {
                                return (
                                  <option key={index} value={company?._id}>
                                    {company?.CompanyName}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </div>
                        <br />
                        <div className="w-100 d-flex justify-content-end">
                          <Button variant="filled" color="green" type="submit">
                            Apply
                          </Button>
                        </div>
                      </form>
                    </Modal>
                    <Button
                      variant="filled"
                      color="#388E3C"
                      w={150}
                      radius="md"
                      onClick={(e) => {
                        e.stopPropagation();
                        open();
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
              <div className="ProjectPagePart2">
                <div className="Part2AllProjectPage">
                  <div className="ProjectPagePart2Title">
                    <span className="CompanyWorkOnText">Company Work On</span>
                    <button className="ViewAllButton">View All</button>
                  </div>
                  <div className="ProjectPagePart2Content">
                    {data?.getProject?.Applies?.map((company, index) => (
                      <CompanyWorkOnCard
                        key={index}
                        companyName={company?.CompanyName}
                        createDate={company?.CreateDate?.slice(0, 10)}
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
  );
}

export default ProjectPage;
