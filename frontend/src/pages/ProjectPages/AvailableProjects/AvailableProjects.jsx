import { useState } from "react";
import "./AvailableProjects.css";
import AvailableProjectCard from "../../../components/AvailableProjectsCard/AvailableProjectsCard";
import { Button, Input, Pagination } from "@mantine/core";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

function AvailableProjects() {
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const searchInProjects = gql`
    query SearchInProjects($word: String!) {
      searchInProjects(word: $word) {
        FileName
        ProjectName
        applications
        ProjectDescription
        Requirements {
          Value
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(searchInProjects, {
    variables: { word: searchWord },
  });

  const dummyProjects = [
    {
      _id: "1",
      applications: "5",
      ProjectName: "Dummy Project 1",
      ProjectDescription:
        "Emmelie is a traditional book-worm and has always been from a young age. She is a housekeeper mom with two kids and she has a lot of time to read and relax.",
      Requirements: [{ Value: "Rest" }, { Value: "Rest" }],
    },
    {
      _id: "2",
      applications: "7",
      ProjectName: "Dummy Project 2",
      ProjectDescription:
        "Emmelie is a traditional book-worm and has always been from a young age. She is a housekeeper mom with two kids and she has a lot of time to read and relax.",
      Requirements: [{ Value: "React" }, { Value: "Rest" }],
    },
  ];

  const GET_PROJECTS = gql`
    query GetProjects {
      getProjects {
        _id
        ProjectDescription
        ProjectName
        Requirements {
          Value
        }
      }
    }
  `;
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  const handleSearchInputChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className="ShowAllPostsAll" id="man">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="PostsSearchPart">
              <Link to="/Dashboard">
                <Button
                  justify="center"
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
              <div className="SearchPartShowAllPosts">
                <Input
                  type="text"
                  placeholder="Search for Posts"
                  className= "TextPartShowAllPosts"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  radius="md"
                ></Input>
                <Button variant="filled" color="green" radius="md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.3547 12.9681C8.67003 15.0575 4.78756 14.869 2.31969 12.4011C-0.352547 9.72885 -0.352769 5.39584 2.31969 2.72338C4.99215 0.0509178 9.32517 0.0511395 11.9974 2.72338C14.4653 5.19124 14.6538 9.07371 12.5645 11.7584L15.6265 14.8205C15.7872 14.9812 15.8712 15.1902 15.8766 15.3998C15.8832 15.6271 15.8001 15.8567 15.6265 16.0302C15.2925 16.3643 14.7512 16.3646 14.4168 16.0302L11.3547 12.9681ZM10.7877 3.93309C12.7925 5.93786 12.792 9.18705 10.7877 11.1914C8.78336 13.1957 5.53418 13.1961 3.52941 11.1914C1.52464 9.18661 1.52508 5.93742 3.52941 3.93309C5.53373 1.92877 8.78292 1.92832 10.7877 3.93309Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="AvailableProjectCardAll">
              {loading ? (
                <p>Loading...</p>
              ) : dummyProjects ? (
                dummyProjects.map((project, index) => (
                  <AvailableProjectCard
                    key={index}
                    projectName={project.ProjectName}
                    projectDescription={project.ProjectDescription}
                    applications={project.applications}
                    project_id={project._id}
                    requirements={project.Requirements.map((req) => req.Value)}
                  />
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <Pagination
                total={Math.ceil(dummyProjects?.length / limit) || 1}
                color="orange"
                value={page}
                onChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableProjects;
