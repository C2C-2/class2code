import { useEffect, useState } from "react";
import "./TaskPage.css";
import { Button, Checkbox } from "@mantine/core";
import { GoArrowUp } from "react-icons/go";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
const GET_TASK = gql`
  query GetTask($taskId: Int!) {
    getTask(taskId: $taskId) {
      EndDate
      Priority
      StartDate
      TaskName
      Steps {
        Description
        Number
        IsCompleted
      }
      TaskStatus
      IsMarked
    }
  }
`;

function TaskPage() {
  const [taskId, setTaskId] = useState(null);
  const [taskData, setTaskData] = useState(null);

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { taskId },
    skip: taskId === null,
  });

  useEffect(() => {
    if (!loading && !error && data && data.getTask) {
      setTaskData(data.getTask);
    }
  }, [loading, error, data]);
  const dummyTaskData = {
    EndDate: "2024-04-25",
    Priority: "High",
    StartDate: "2024-04-15",
    TaskName: "Example Task",
    Steps: [
      {
        Description: "Step 1",
        Number: 1,
        IsCompleted: false,
      },
      {
        Description: "Step 2",
        Number: 2,
        IsCompleted: false,
      },
      {
        Description: "Step 3",
        Number: 3,
        IsCompleted: false,
      },
    ],
    TaskStatus: "In Progress",
    IsMarked: true,
  };

  useEffect(() => {
    // Set dummy task data
    setTaskData(dummyTaskData);
  }, []);
  return (
    <div className="TaskPageAll" id="man">
      <div className="TaskPageCenter">
        <div className="TaskPageMain">
          <div className="TaskPageButtonBack">
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
          <div className="TaskPageContent">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : taskData ? (
              <>
                <div className="TaskPageContentPart1">
                  <div className="TSCP1">
                    <div className="TaskNameClass">
                      <div className="ArrowDesign">
                        <GoArrowUp className="TaskPageArrow" />
                      </div>
                      <span className="TaskPageText1Part1">
                        {" "}
                        {taskData.TaskName}
                      </span>
                    </div>
                    <div className="TaskPageTimes">
                      <span className="TaskPageText1Part1">
                        StartDate: {taskData.StartDate}
                      </span>
                    </div>
                    <div className="TaskPageTimes">
                      <span className="TaskPageText1Part1">
                        EndDate: {taskData.EndDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="TaskPageContentPart2">
                  <div className="TaskPagePart2TitleAll">
                    <div className="TaskPageContentPart2Title">
                      <div className="TaskPageTitle1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31"
                          height="30"
                          viewBox="0 0 31 30"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.9205 8.42249L18.3805 10.8825C18.7705 11.2725 19.4005 11.2725 19.7905 10.8825C20.1805 10.4925 20.1805 9.86249 19.7905 9.47249L16.6205 6.29249C16.4337 6.10523 16.1801 6 15.9155 6C15.651 6 15.3974 6.10523 15.2105 6.29249L12.0405 9.47249C11.6505 9.86249 11.6505 10.4925 12.0405 10.8825C12.4305 11.2725 13.0605 11.2725 13.4505 10.8825L15.9205 8.42249ZM15.9205 20.7625L13.4605 18.3025C13.2737 18.1152 13.0201 18.01 12.7555 18.01C12.491 18.01 12.2374 18.1152 12.0505 18.3025C11.6605 18.6925 11.6605 19.3225 12.0505 19.7125L15.2205 22.8925C15.6105 23.2825 16.2405 23.2825 16.6305 22.8925L19.8005 19.7225C20.1905 19.3325 20.1905 18.7025 19.8005 18.3125C19.6137 18.1252 19.3601 18.02 19.0955 18.02C18.831 18.02 18.5774 18.1252 18.3905 18.3125L15.9205 20.7625Z"
                            fill="#C3CAD9"
                          />
                        </svg>
                        <span className="TaskPageText1Part1">Task Parts</span>
                      </div>
                      <div className="TaskPageTitle2">
                        <span className="TaskPageText1Part1">
                          PRIORIY: {taskData.Priority}
                        </span>
                      </div>
                    </div>
                    <hr className="TaskPageLine" />
                  </div>
                  {taskData.Steps.map((step, index) => (
                    <div key={index} className="TaskPagePart2TitleAll">
                      <div className="TaskPageContentPart2Title">
                        <div className="TaskPageTitle1">
                          <Checkbox
                            defaultChecked={step.IsCompleted}
                            color="#388E3C"
                            radius="xl"
                          />
                          <span className="TaskPageText1Part1">
                            Step {step.Number}: {step.Description}
                          </span>
                        </div>
                      </div>
                      <hr className="TaskPageLine" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No task found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
