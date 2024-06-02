import { useEffect, useState } from "react";
import "./Dashboard.css";
import DashboardStatusCard from "../../../components/DashboardStatusCard/DashboardStatusCard";
import { Button, Modal, Table } from "@mantine/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import SecondSignup from "../../SecondSignup/SecondSignup";
import { useDisclosure } from "@mantine/hooks";
function Dashboard() {
  const [projectsNumber, setProjectsNumber] = useState(0);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [companiesNumber, setCompaniesNumber] = useState(0);
  const [teamsNumber, setTeamsNumber] = useState(0);
  const [Tasks, setTasks] = useState([]);

  const GET_Statistics = gql`
    query Query($userId: String!) {
      getProfileStatistics(userId: $userId) {
        NumberOfProjects
        NumberOfTeams
        NumberOfTasks
        NumberOfMyCompanies
      }
    }
  `;

  const GET_TASKS = gql`
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        Tasks {
          UserCreated {
            FirstName
            LastName
          }
          TaskName
          TaskStatus
          StartDate
          EndDate
          Priority
          Comments
          CompanyName
          TeamName
          IsMarked
          CreateDate
          _id
        }
      }
    }
  `;

  const UPDATE_TASK = gql`
    mutation Mutation($taskId: Int!, $task: TaskInput!) {
      updateTask(taskId: $taskId, task: $task) {
        _id
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_Statistics, {
    variables: { userId: localStorage.getItem("id") },
  });

  const {
    loading: loadingTasks,
    error: errorTasks,
    data: dataTasks,
    refetch: refetchTasks,
  } = useQuery(GET_TASKS, {
    variables: { userId: localStorage.getItem("id") },
  });

  useEffect(() => {
    if (dataTasks) {
      setTasks(dataTasks.getUser.Tasks);
    }
  }, [dataTasks]);

  const [
    updateTask,
    {
      data: dataUpdateTask,
      loading: loadingUpdateTask,
      error: errorUpdateTask,
    },
  ] = useMutation(UPDATE_TASK);

  useEffect(() => {
    if (data) {
      setProjectsNumber(data.getProfileStatistics.NumberOfProjects);
      setTasksNumber(data.getProfileStatistics.NumberOfTasks);
      setCompaniesNumber(data.getProfileStatistics.NumberOfMyCompanies);
      setTeamsNumber(data.getProfileStatistics.NumberOfTeams);
    }
  }, [data]);

  const [opened, { open, close }] = useDisclosure(
    localStorage.getItem("type") ? true : false
  );

  return (
    <div className="DashboardAll" id="man">
      {localStorage.getItem("type") == "new" && (
        <Modal padding="xl" size="lg" opened={opened}>
          <SecondSignup close={close} />
        </Modal>
      )}

      <div className="DashboardMain">
        <div className="grid">
          <div className="sideBareFake"></div>
          <div className="rightGrid">
            <div className="navbarFake"></div>
            <div className="DashboardCenter">
              <div className="DashboardTexts">
                <span className="DashboardTexts1">
                  <span className="DashboardTexts1Part1">Hello,</span>
                  <span className="DashboardTexts1Part2">
                    {localStorage.getItem("name") || "Osama"}!
                  </span>
                </span>
                <span className="DashboardTexts2">
                  <span className="DashboardTexts2Part1">
                    Hi, welcome to dashboard management dashboard
                  </span>
                  <span className="DashboardTexts2Part2" />
                </span>
              </div>
              <div className="DashboardClasses">
                <button className="DashboardMyProjects">
                  <div className="DashboardMyProjects1">
                    <h6 className="DashboardMyProjects1Text">My Projects</h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M20.5 6.75H12.5003L9.89969 4.8C9.63967 4.60599 9.32411 4.5008 8.99969 4.5H4C3.60218 4.5 3.22064 4.65804 2.93934 4.93934C2.65804 5.22064 2.5 5.60218 2.5 6V18.75C2.5 19.1478 2.65804 19.5294 2.93934 19.8107C3.22064 20.092 3.60218 20.25 4 20.25H20.5C20.8978 20.25 21.2794 20.092 21.5607 19.8107C21.842 19.5294 22 19.1478 22 18.75V8.25C22 7.85218 21.842 7.47064 21.5607 7.18934C21.2794 6.90804 20.8978 6.75 20.5 6.75ZM4 6H8.99969L11.0003 7.5L8.99969 9H4V6ZM20.5 18.75H4V10.5H8.99969C9.32411 10.4992 9.63967 10.394 9.89969 10.2L12.5003 8.25H20.5V18.75Z"
                        fill="#1C1C1C"
                      />
                    </svg>
                  </div>
                  <span className="DashboardMyProjects2">{projectsNumber}</span>
                </button>
                <button
                  className="DashboardMyProjects"
                  style={{ backgroundColor: "#fff4e6" }}
                >
                  <div className="DashboardMyProjects1">
                    <h6 className="DashboardMyProjects1Text">Total Tasks</h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M21.5004 12C21.5004 12.1989 21.4214 12.3897 21.2807 12.5303C21.1401 12.671 20.9493 12.75 20.7504 12.75H12.5004C12.3015 12.75 12.1107 12.671 11.9701 12.5303C11.8294 12.3897 11.7504 12.1989 11.7504 12C11.7504 11.8011 11.8294 11.6103 11.9701 11.4697C12.1107 11.329 12.3015 11.25 12.5004 11.25H20.7504C20.9493 11.25 21.1401 11.329 21.2807 11.4697C21.4214 11.6103 21.5004 11.8011 21.5004 12ZM12.5004 6.75001H20.7504C20.9493 6.75001 21.1401 6.67099 21.2807 6.53033C21.4214 6.38968 21.5004 6.19892 21.5004 6.00001C21.5004 5.80109 21.4214 5.61033 21.2807 5.46968C21.1401 5.32902 20.9493 5.25001 20.7504 5.25001H12.5004C12.3015 5.25001 12.1107 5.32902 11.9701 5.46968C11.8294 5.61033 11.7504 5.80109 11.7504 6.00001C11.7504 6.19892 11.8294 6.38968 11.9701 6.53033C12.1107 6.67099 12.3015 6.75001 12.5004 6.75001ZM20.7504 17.25H12.5004C12.3015 17.25 12.1107 17.329 11.9701 17.4697C11.8294 17.6103 11.7504 17.8011 11.7504 18C11.7504 18.1989 11.8294 18.3897 11.9701 18.5303C12.1107 18.671 12.3015 18.75 12.5004 18.75H20.7504C20.9493 18.75 21.1401 18.671 21.2807 18.5303C21.4214 18.3897 21.5004 18.1989 21.5004 18C21.5004 17.8011 21.4214 17.6103 21.2807 17.4697C21.1401 17.329 20.9493 17.25 20.7504 17.25ZM8.21979 3.96938L5.75042 6.43969L4.78104 5.46938C4.64031 5.32865 4.44944 5.24959 4.25042 5.24959C4.05139 5.24959 3.86052 5.32865 3.71979 5.46938C3.57906 5.61011 3.5 5.80098 3.5 6.00001C3.5 6.19903 3.57906 6.3899 3.71979 6.53063L5.21979 8.03063C5.28945 8.10036 5.37216 8.15568 5.46321 8.19342C5.55426 8.23117 5.65186 8.2506 5.75042 8.2506C5.84898 8.2506 5.94657 8.23117 6.03762 8.19342C6.12867 8.15568 6.21139 8.10036 6.28104 8.03063L9.28104 5.03063C9.42177 4.8899 9.50083 4.69903 9.50083 4.50001C9.50083 4.30098 9.42177 4.11011 9.28104 3.96938C9.14031 3.82865 8.94944 3.74959 8.75042 3.74959C8.55139 3.74959 8.36052 3.82865 8.21979 3.96938ZM8.21979 9.96938L5.75042 12.4397L4.78104 11.4694C4.64031 11.3286 4.44944 11.2496 4.25042 11.2496C4.05139 11.2496 3.86052 11.3286 3.71979 11.4694C3.57906 11.6101 3.5 11.801 3.5 12C3.5 12.0986 3.51941 12.1961 3.55712 12.2872C3.59483 12.3782 3.65011 12.4609 3.71979 12.5306L5.21979 14.0306C5.28945 14.1004 5.37216 14.1557 5.46321 14.1934C5.55426 14.2312 5.65186 14.2506 5.75042 14.2506C5.84898 14.2506 5.94657 14.2312 6.03762 14.1934C6.12867 14.1557 6.21139 14.1004 6.28104 14.0306L9.28104 11.0306C9.42177 10.8899 9.50083 10.699 9.50083 10.5C9.50083 10.301 9.42177 10.1101 9.28104 9.96938C9.14031 9.82865 8.94944 9.74959 8.75042 9.74959C8.55139 9.74959 8.36052 9.82865 8.21979 9.96938ZM8.21979 15.9694L5.75042 18.4397L4.78104 17.4694C4.71136 17.3997 4.62863 17.3444 4.53759 17.3067C4.44654 17.269 4.34896 17.2496 4.25042 17.2496C4.15187 17.2496 4.05429 17.269 3.96324 17.3067C3.8722 17.3444 3.78947 17.3997 3.71979 17.4694C3.65011 17.5391 3.59483 17.6218 3.55712 17.7128C3.51941 17.8039 3.5 17.9015 3.5 18C3.5 18.0986 3.51941 18.1961 3.55712 18.2872C3.59483 18.3782 3.65011 18.4609 3.71979 18.5306L5.21979 20.0306C5.28945 20.1004 5.37216 20.1557 5.46321 20.1934C5.55426 20.2312 5.65186 20.2506 5.75042 20.2506C5.84898 20.2506 5.94657 20.2312 6.03762 20.1934C6.12867 20.1557 6.21139 20.1004 6.28104 20.0306L9.28104 17.0306C9.42177 16.8899 9.50083 16.699 9.50083 16.5C9.50083 16.301 9.42177 16.1101 9.28104 15.9694C9.14031 15.8286 8.94944 15.7496 8.75042 15.7496C8.55139 15.7496 8.36052 15.8286 8.21979 15.9694Z"
                        fill="#1C1C1C"
                      />
                    </svg>
                  </div>
                  <span className="DashboardMyProjects2">{tasksNumber}</span>
                </button>
                <button
                  className="DashboardMyProjects"
                  style={{ backgroundColor: "#e3fafc" }}
                >
                  <div className="DashboardMyProjects1">
                    <h6 className="DashboardMyProjects1Text">My Companies</h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M20.5 6.75H12.5003L9.89969 4.8C9.63967 4.60599 9.32411 4.5008 8.99969 4.5H4C3.60218 4.5 3.22064 4.65804 2.93934 4.93934C2.65804 5.22064 2.5 5.60218 2.5 6V18.75C2.5 19.1478 2.65804 19.5294 2.93934 19.8107C3.22064 20.092 3.60218 20.25 4 20.25H20.5C20.8978 20.25 21.2794 20.092 21.5607 19.8107C21.842 19.5294 22 19.1478 22 18.75V8.25C22 7.85218 21.842 7.47064 21.5607 7.18934C21.2794 6.90804 20.8978 6.75 20.5 6.75ZM4 6H8.99969L11.0003 7.5L8.99969 9H4V6ZM20.5 18.75H4V10.5H8.99969C9.32411 10.4992 9.63967 10.394 9.89969 10.2L12.5003 8.25H20.5V18.75Z"
                        fill="#1C1C1C"
                      />
                    </svg>
                  </div>
                  <span className="DashboardMyProjects2">
                    {companiesNumber}
                  </span>
                </button>
                <button
                  className="DashboardMyProjects"
                  style={{ backgroundColor: "#f8f0fc" }}
                >
                  <div className="DashboardMyProjects1">
                    <h6 className="DashboardMyProjects1Text">My Teams</h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M21.5004 12C21.5004 12.1989 21.4214 12.3897 21.2807 12.5303C21.1401 12.671 20.9493 12.75 20.7504 12.75H12.5004C12.3015 12.75 12.1107 12.671 11.9701 12.5303C11.8294 12.3897 11.7504 12.1989 11.7504 12C11.7504 11.8011 11.8294 11.6103 11.9701 11.4697C12.1107 11.329 12.3015 11.25 12.5004 11.25H20.7504C20.9493 11.25 21.1401 11.329 21.2807 11.4697C21.4214 11.6103 21.5004 11.8011 21.5004 12ZM12.5004 6.75001H20.7504C20.9493 6.75001 21.1401 6.67099 21.2807 6.53033C21.4214 6.38968 21.5004 6.19892 21.5004 6.00001C21.5004 5.80109 21.4214 5.61033 21.2807 5.46968C21.1401 5.32902 20.9493 5.25001 20.7504 5.25001H12.5004C12.3015 5.25001 12.1107 5.32902 11.9701 5.46968C11.8294 5.61033 11.7504 5.80109 11.7504 6.00001C11.7504 6.19892 11.8294 6.38968 11.9701 6.53033C12.1107 6.67099 12.3015 6.75001 12.5004 6.75001ZM20.7504 17.25H12.5004C12.3015 17.25 12.1107 17.329 11.9701 17.4697C11.8294 17.6103 11.7504 17.8011 11.7504 18C11.7504 18.1989 11.8294 18.3897 11.9701 18.5303C12.1107 18.671 12.3015 18.75 12.5004 18.75H20.7504C20.9493 18.75 21.1401 18.671 21.2807 18.5303C21.4214 18.3897 21.5004 18.1989 21.5004 18C21.5004 17.8011 21.4214 17.6103 21.2807 17.4697C21.1401 17.329 20.9493 17.25 20.7504 17.25ZM8.21979 3.96938L5.75042 6.43969L4.78104 5.46938C4.64031 5.32865 4.44944 5.24959 4.25042 5.24959C4.05139 5.24959 3.86052 5.32865 3.71979 5.46938C3.57906 5.61011 3.5 5.80098 3.5 6.00001C3.5 6.19903 3.57906 6.3899 3.71979 6.53063L5.21979 8.03063C5.28945 8.10036 5.37216 8.15568 5.46321 8.19342C5.55426 8.23117 5.65186 8.2506 5.75042 8.2506C5.84898 8.2506 5.94657 8.23117 6.03762 8.19342C6.12867 8.15568 6.21139 8.10036 6.28104 8.03063L9.28104 5.03063C9.42177 4.8899 9.50083 4.69903 9.50083 4.50001C9.50083 4.30098 9.42177 4.11011 9.28104 3.96938C9.14031 3.82865 8.94944 3.74959 8.75042 3.74959C8.55139 3.74959 8.36052 3.82865 8.21979 3.96938ZM8.21979 9.96938L5.75042 12.4397L4.78104 11.4694C4.64031 11.3286 4.44944 11.2496 4.25042 11.2496C4.05139 11.2496 3.86052 11.3286 3.71979 11.4694C3.57906 11.6101 3.5 11.801 3.5 12C3.5 12.0986 3.51941 12.1961 3.55712 12.2872C3.59483 12.3782 3.65011 12.4609 3.71979 12.5306L5.21979 14.0306C5.28945 14.1004 5.37216 14.1557 5.46321 14.1934C5.55426 14.2312 5.65186 14.2506 5.75042 14.2506C5.84898 14.2506 5.94657 14.2312 6.03762 14.1934C6.12867 14.1557 6.21139 14.1004 6.28104 14.0306L9.28104 11.0306C9.42177 10.8899 9.50083 10.699 9.50083 10.5C9.50083 10.301 9.42177 10.1101 9.28104 9.96938C9.14031 9.82865 8.94944 9.74959 8.75042 9.74959C8.55139 9.74959 8.36052 9.82865 8.21979 9.96938ZM8.21979 15.9694L5.75042 18.4397L4.78104 17.4694C4.71136 17.3997 4.62863 17.3444 4.53759 17.3067C4.44654 17.269 4.34896 17.2496 4.25042 17.2496C4.15187 17.2496 4.05429 17.269 3.96324 17.3067C3.8722 17.3444 3.78947 17.3997 3.71979 17.4694C3.65011 17.5391 3.59483 17.6218 3.55712 17.7128C3.51941 17.8039 3.5 17.9015 3.5 18C3.5 18.0986 3.51941 18.1961 3.55712 18.2872C3.59483 18.3782 3.65011 18.4609 3.71979 18.5306L5.21979 20.0306C5.28945 20.1004 5.37216 20.1557 5.46321 20.1934C5.55426 20.2312 5.65186 20.2506 5.75042 20.2506C5.84898 20.2506 5.94657 20.2312 6.03762 20.1934C6.12867 20.1557 6.21139 20.1004 6.28104 20.0306L9.28104 17.0306C9.42177 16.8899 9.50083 16.699 9.50083 16.5C9.50083 16.301 9.42177 16.1101 9.28104 15.9694C9.14031 15.8286 8.94944 15.7496 8.75042 15.7496C8.55139 15.7496 8.36052 15.8286 8.21979 15.9694Z"
                        fill="#1C1C1C"
                      />
                    </svg>
                  </div>
                  <span className="DashboardMyProjects2">{teamsNumber}</span>
                </button>
              </div>
              <div className="DashboardUnder">
                <div className="DashboardUnderPart1">
                  <span className="DashboardUnderPart1Text1">New Tasks</span>
                  <span className="DashboardUnderPart1Text2">
                    {Tasks?.length} Tasks
                  </span>
                </div>
                <div className="DashboardUnderPart2">
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Comment</Table.Th>
                        <Table.Th>Deadline</Table.Th>
                        <Table.Th>Created By</Table.Th>
                        <Table.Th>Team</Table.Th>
                        <Table.Th>Company</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Action</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {Tasks?.map((task, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>{task?.TaskName}</Table.Td>
                          <Table.Td>{task?.Comments}</Table.Td>
                          <Table.Td>
                            <div className="TableDesign">
                              <span className="TableDesignText1 justify-content-center">
                                {task?.EndDate}
                              </span>
                              <span className="TableDesignText2 text-dark">
                                {getDaysDifference(
                                  task.StartDate,
                                  task.EndDate
                                )}
                                &nbsp; DAYS
                              </span>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            {task?.UserCreated?.FirstName +
                              " " +
                              task?.UserCreated?.LastName}
                          </Table.Td>
                          <Table.Td>{task?.TeamName}</Table.Td>
                          <Table.Td>{task?.CompanyName}</Table.Td>
                          <Table.Td>
                            <DashboardStatusCard
                              status={task?.TaskStatus}
                              color={
                                task?.TaskStatus == "Pending"
                                  ? "red"
                                  : task.TaskStatus == "new"
                                  ? "yellow"
                                  : "green"
                              }
                            />
                          </Table.Td>
                          <Table.Td>
                            <Button
                              variant="filled"
                              color="#2C5D63"
                              disabled={
                                task?.TaskStatus == "Finish" ? "disabled" : null
                              }
                              onClick={async (e) => {
                                e.preventDefault();
                                await updateTask({
                                  variables: {
                                    taskId: parseInt(task._id),
                                    task: {
                                      TaskName: task.TaskName,
                                      TaskStatus:
                                        task.TaskStatus == "New"
                                          ? "Pending"
                                          : task.TaskStatus == "Pending"
                                          ? "Finish"
                                          : "New",
                                      StartDate: task.StartDate,
                                      EndDate: task.EndDate,
                                      Priority: task.Priority,
                                      Comments: task.Comments,
                                      IsMarked: task.IsMarked,
                                      CreateDate: task.CreateDate,
                                    },
                                  },
                                }).then(() => {
                                  refetchTasks();
                                });
                              }}
                            >
                              {task?.TaskStatus == "Pending"
                                ? "Finish"
                                : task?.TaskStatus == "New"
                                ? "Start"
                                : "Done"}
                            </Button>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDaysDifference(startDateString, endDateString) {
  if (!startDateString || !endDateString) {
    return 0; // Return 0 if either date is falsy (e.g., null or undefined)
  }

  const startDate = new Date();
  const endDate = new Date(endDateString);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return 0; // Return 0 if either date is invalid
  }

  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.round(diffInDays); // Round the result to the nearest integer
}

export default Dashboard;
