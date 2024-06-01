import { useCallback, useEffect, useState } from "react";
import "./AvailableProjects.css";
import AvailableProjectCard from "../../../components/AvailableProjectsCard/AvailableProjectsCard";
import { Alert, Button, Input, Pagination } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

function AvailableProjects() {
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const searchInProjects = gql`
    query Query($word: String!, $limit: Int, $page: Int) {
      searchInProjects(word: $word, limit: $limit, page: $page) {
        FileName
        ProjectName
        ProjectDescription
        Requirements {
          Value
        }
      }
    }
  `;

  const [search, { data: searchData, loading }] =
    useLazyQuery(searchInProjects);

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

  const fetch = useCallback(() => {
    if (projectsData) {
      setProjects(projectsData.getProjects);
    }
  }, [projectsData, page, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="ShowAllPostsAll" id="man">
      {err && (
        <div className="alert-container">
          <Alert className="alert" color="green" title={err} />
        </div>
      )}
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="PostsSearchPart mb-3">
              <Button
                justify="center"
                variant="filled"
                color="#283739"
                radius="md"
                onClick={() => navigate(-1)}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchWord === "") {
                    fetch();
                    return;
                  }
                  search({
                    variables: { word: searchWord, page: page - 1, limit },
                  }).then((e) => {
                    setProjects(() => e?.data?.searchInProjects);
                  });
                }}
                className="SearchPartShowAllPosts"
              >
                <Input
                  type="text"
                  placeholder="Search for Posts"
                  className="TextPartShowAllPosts"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  radius="md"
                ></Input>
                <Button
                  type="submit"
                  variant="filled"
                  color="green"
                  radius="md"
                >
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
              </form>
            </div>
            <div className="AvailableProjectCardAll">
              {loading ? (
                <p>Loading...</p>
              ) : projects ? (
                projects.map((project, index) => (
                  <AvailableProjectCard
                    key={index}
                    projectName={project.ProjectName}
                    projectDescription={project.ProjectDescription}
                    applications={project.applications}
                    project_id={project._id}
                    requirements={project.Requirements.map((req) => req.Value)}
                    setError={setErr}
                  />
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <Pagination
                total={Math.ceil(projects?.length / limit) || 1}
                color="orange"
                value={page}
                onChange={setPage}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableProjects;
