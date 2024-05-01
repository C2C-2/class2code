import { useState, useEffect } from "react";
import "./MyCompanyTask.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import MyCompanyTaskCard from "../../../components/MyCompanyTaskCard/MyCompanyTaskCard";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
const GET_USER_TASKS = gql`
  query Tasks($userId: String!) {
    getUser(userId: $userId) {
      MyCompanies {
        Tasks {
          CreateDate
          TaskName
          Priority
          TaskStatus
          IsMarked
          _id
        }
        CompanyName
      }
    }
  }
`;
const FILTER_TASKS = gql`
  query FilterMyCompanies($userId: String!, $filterType: String) {
    filterMyCompanies(userId: $userId, filterType: $filterType) {
      Tasks {
        TaskStatus
        CreateDate
        Priority
        IsMarked
      }
    }
  }
`;
function MyCompanyTask() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterType, setFilterType] = useState(null);
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

  const { loading, error, data } = useQuery(GET_USER_TASKS, {
    variables: { userId: null }, // Pass your user ID here
  });
  const {
    loading: filterLoading,
    error: filterError,
    data: filteredData,
  } = useQuery(FILTER_TASKS, {
    variables: { userId: null, filterType: filterType },
    skip: !filterType, // Skip this query if filterType is not set
  });
  const handleFilter = (type) => {
    setFilterType(type);
    refetch();
  };
  const dummyData = {
    MyCompanies: [
      {
        CompanyName: "Company A",
        Tasks: [
          {
            TaskName: "Task 1",
            TaskStatus: "InProgress",
            Priority: "High",
            CreateDate: "2024-04-17T08:00:00Z",
            IsMarked: false,
            _id: "1",
            color:"#FFF3BF"
          },
          {
            TaskName: "Task 2",
            TaskStatus: "Completed",
            Priority: "Low",
            CreateDate: "2024-04-16T08:00:00Z",
            IsMarked: true,
            _id: "2",
            color:"green"
          },
        ],
      },
      {
        CompanyName: "Company B",
        Tasks: [
          {
            TaskName: "Task 3",
            TaskStatus: "InProgress",
            Priority: "Medium",
            CreateDate: "2024-04-15T08:00:00Z",
            IsMarked: false,
            _id: "3",
            color:"#FFF3BF"
          },
          {
            TaskName: "Task 4",
            TaskStatus: "InProgress",
            Priority: "High",
            CreateDate: "2024-04-14T08:00:00Z",
            IsMarked: false,
            _id: "4",
            color:"#FFF3BF"
          },
        ],
      },
    ],
  };

  return (
    <div className="MyCompanyTaskAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="MyCompanyTaskAllMain">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="MyCompanyTaskAllCenter">
          <div className="MyCompanyTaskAllCenterButtonBack">
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
          <div className="MyCompanyTaskAllContent">
            <div className="MyCompanyTaskContentButtons">
              <button className="MyCompanyTaskContentButtonsDesign">
                <span
                  className="MyCompanyTaskContentButtonText"
                  onClick={() => handleFilter("Date")}
                >
                  Date
                </span>
              </button>
              <button className="MyCompanyTaskContentButtonsDesign">
                <span
                  className="MyCompanyTaskContentButtonText"
                  onClick={() => handleFilter("Priority")}
                >
                  Priority
                </span>
              </button>
              <button className="MyCompanyTaskContentButtonsDesign">
                <span
                  className="MyCompanyTaskContentButtonText"
                  onClick={() => handleFilter("Late")}
                >
                  Late
                </span>
              </button>
              <button
                className="MyCompanyTaskContentButtonsDesign1"
                onClick={() => handleFilter("In Progress")}
              >
                <span className="MyCompanyTaskContentButtonText">
                  In Progress
                </span>
              </button>
            </div>
            <div className="MyCompanyTaskContentCard">
              {
                /* {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : filterLoading ? (
                <p>Loading Filtered Data...</p>
              ) : filterError ? (
                <p>Error: {filterError.message}</p>
              ) : filterType ? (
                filteredData &&
                filteredData.filterMyCompanies.map((company) =>
                  company.Tasks.map((task, index) => (
                    <MyCompanyTaskCard
                      key={index}
                      taskName={task.TaskName}
                      taskStatus={task.TaskStatus}
                      priority={task.Priority}
                      createDate={task.CreateDate}
                      companyName={company.CompanyName}
                      task_id={task._id}
                    />
                  ))
                )
              ) :*/ dummyData &&
                  dummyData.MyCompanies.map((company) =>
                    company.Tasks.map((task, index) => (
                      <MyCompanyTaskCard
                        key={index}
                        taskName={task.TaskName}
                        taskStatus={task.TaskStatus}
                        priority={task.Priority}
                        createDate={task.CreateDate}
                        companyName={company.CompanyName}
                        task_id={task._id}
                        colorReq={task.color}
                      
                      />

                    ))
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompanyTask;
