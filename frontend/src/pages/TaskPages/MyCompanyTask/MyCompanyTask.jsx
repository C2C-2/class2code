import { useState } from "react";
import "./MyCompanyTask.css";
import MyCompanyTaskCard from "../../../components/MyCompanyTaskCard/MyCompanyTaskCard";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button,TextInput, Select } from "@mantine/core";
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
          StartDate
          EndDate
          Comments
        }
        CompanyName
      }
    }
  }
`;
const GET_USER_TEAMS = gql`
  query Teams($userId: String!) {
    getUser(userId: $userId) {
      MyCompanies {
        Teams {
          TeamName
          Members {
            LastName
            FirstName
          }
        }
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
const CREATE_TASK = gql`
  mutation CreateTaskForTeam(
    $task: TaskInput!
    $teamId: Int!
    $userId: String!
  ) {
    createTaskForTeam(task: $task, teamId: $teamId, userId: $userId) {
      TaskName
      Priority
      StartDate
      EndDate
      Comments
    }
  }
`;
function MyCompanyTask() {
  const [filterType, setFilterType] = useState(null);
  const user_id = localStorage.getItem("id");
  const [taskData, setTaskData] = useState({
    task: null,
    teamId: null,
    userId: user_id,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const { loading, error, data } = useQuery(GET_USER_TASKS, {
    variables: { userId: user_id }, // Pass your user ID here
  });
  const { loadingTeams, errorTeams, dataTeams } = useQuery(GET_USER_TEAMS, {
    variables: { userId: user_id }, // Pass your user ID here
  });
  const {
    loading: filterLoading,
    error: filterError,
    data: filteredData,
  } = useQuery(FILTER_TASKS, {
    variables: { userId: user_id, filterType: filterType },
    skip: !filterType, // Skip this query if filterType is not set
  });
  const handleFilter = (type) => {
    setFilterType(type);
  };
  const [createTask] = useMutation(CREATE_TASK);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      task: {
        ...prevData.task,
        [name]: value,
      },
    }));
  };
  const handleCreateTask = () => {
    createTask({ variables: taskData })
      .then((res) => {
        console.log("Task created successfully:", res.data.createTaskForTeam);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
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
            CreateDate: "2024-04-17",
            IsMarked: false,
            _id: "1",
            color: "#FFF3BF",
            StartDate: "2024-04-17",
            EndDate: "2024-04-18",
            comment: "Hi",
          },
          {
            TaskName: "Task 2",
            TaskStatus: "Completed",
            Priority: "Low",
            CreateDate: "2024-04-16",
            IsMarked: true,
            _id: "2",
            color: "rgba(65, 191, 117, 0.66)",
            StartDate: "2024-04-17",
            EndDate: "2024-04-18",
            comment: "Hi",
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
            CreateDate: "2024-04-15",
            IsMarked: false,
            _id: "3",
            color: "#FFF3BF",
            StartDate: "2024-04-17",
            EndDate: "2024-04-18",
            comment: "Hi",
          },
          {
            TaskName: "Task 3",
            TaskStatus: "InProgress",
            Priority: "Medium",
            CreateDate: "2024-04-15",
            IsMarked: false,
            _id: "3",
            color: "#FFF3BF",
            StartDate: "2024-04-17",
            EndDate: "2024-04-18",
            comment: "Hi",
          },
          {
            TaskName: "Task 3",
            TaskStatus: "InProgress",
            Priority: "Medium",
            CreateDate: "2024-04-15",
            IsMarked: false,
            _id: "3",
            color: "#FFF3BF",
            StartDate: "2024-04-17",
            EndDate: "2024-04-18",
            comment: "Hi",
          },
          {
            TaskName: "Task 3",
            TaskStatus: "InProgress",
            Priority: "Medium",
            CreateDate: "2024-04-15",
            IsMarked: false,
            _id: "3",
            color: "#FFF3BF",
            StartDate: "2024-04-17",
            EndDate: "2024-04-18",
            comment: "Hi",
          },
          // {
          //   TaskName: "Task 4",
          //   TaskStatus: "InProgress",
          //   Priority: "High",
          //   CreateDate: "2024-04-14T08:00:00Z",
          //   IsMarked: false,
          //   _id: "4",
          //   color:"#FFF3BF"
          // },
        ],
      },
    ],
  };

  return (
    <div className="MyCompanyTaskAll">
      <div className="MyCompanyTaskAllMain">
        <div className="MyCompanyTaskAllCenter">
          <div className="FackDivMyCompanyTask"></div>
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
              <div>
                <Modal
                  opened={opened}
                  onClose={close}
                  title="Add Task"
                  centered
                >
                  <div className="d-flex flex-column gap-4 p-2">
                    <div className="d-flex flex-row gap-3">
                      <TextInput
                        label="Name"
                        name="name"
                        value={taskData.name}
                        onChange={handleInputChange}
                        placeholder="Task name"
                      />
                      <TextInput
                        label="Priority"
                        placeholder="2"
                        name="priority"
                        value={taskData.priority}
                      />
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <TextInput
                        label="Start Date"
                        name="startDate"
                        value={taskData.startDate}
                        onChange={handleInputChange}
                        placeholder="12/3/2005"
                      />
                      <TextInput
                        label="End Date"
                        name="endDate"
                        value={taskData.endDate}
                        onChange={handleInputChange}
                        placeholder="22/9/2005"
                      />
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <Select
                        label="Type"
                        placeholder="Select"
                        data={["User", "Team"]}
                        defaultValue="React"
                        clearable
                      />
                      <TextInput
                        label="For"
                        name="assignedTo"
                        value={taskData.assignedTo}
                        onChange={handleInputChange}
                        placeholder="User or Team Name"
                      />
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <TextInput
                        label="Comment"
                        name="comment"
                        value={taskData.comment}
                        onChange={handleInputChange}
                        placeholder="Your Comment"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-end pt-3">
                    <Button
                      variant="filled"
                      color="#388E3C"
                      onClick={handleCreateTask}
                    >
                      Create
                    </Button>
                  </div>
                </Modal>

                <Button onClick={open} variant="filled" color="orange">
                  New
                </Button>
              </div>
              <Button
                variant="filled"
                color="#F1F1F1"
                onClick={() => handleFilter("Date")}
                className="MyCompanyTaskContentButtonText"
              >
                Date
              </Button>
              <Button
                variant="filled"
                color="#F1F1F1"
                onClick={() => handleFilter("Priority")}
                className="MyCompanyTaskContentButtonText"
              >
                Priority
              </Button>
              <Button
                variant="filled"
                color="#F1F1F1"
                onClick={() => handleFilter("Late")}
                className="MyCompanyTaskContentButtonText"
              >
                Late
              </Button>
              <Button
                variant="filled"
                color="#F1F1F1"
                onClick={() => handleFilter("In Progress")}
                className="MyCompanyTaskContentButtonText"
              >
                In Progress
              </Button>
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
                        StartDate={task.StartDate}
                        EndDate={task.EndDate}
                        Comment={task.comment}
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
