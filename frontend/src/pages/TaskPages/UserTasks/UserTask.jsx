import "./UserTask.css";
import { Button, Table } from "@mantine/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardStatusCard from "../../../components/DashboardStatusCard/DashboardStatusCard";

const GET_TASKS = gql`
  query Query($userId: String!) {
    getUser(userId: $userId) {
      WorkCompanies {
        Tasks {
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
  }
`;

const UPDATE_TASK = gql`
  mutation Mutation($taskId: Int!, $task: TaskInput!) {
    updateTask(taskId: $taskId, task: $task) {
      _id
    }
  }
`;

export const UserTask = () => {
  const navigation = useNavigate();
  const user_id = localStorage.getItem("id");
  const { team_id, company_id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Open");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState("");
  const [priority, setPriority] = useState();
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const {
    loading: loadingTasks,
    error: errorTasks,
    data: dataTasks,
    refetch: refetchTasks,
  } = useQuery(GET_TASKS, {
    variables: { userId: localStorage.getItem("id") },
  });

  const [
    updateTask,
    {
      data: dataUpdateTask,
      loading: loadingUpdateTask,
      error: errorUpdateTask,
    },
  ] = useMutation(UPDATE_TASK);

  const combinedTasks = dataTasks?.getUser?.WorkCompanies?.map(
    (company) => company.Tasks
  );

  const Tasks = combinedTasks?.flat();

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
                justify="center"
                variant="filled"
                color="#283739"
                radius="md"
                size="lg"
                h={70}
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
              <div className="DashboardUnderPart2">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Deadline</Table.Th>
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
                        <Table.Td>
                          <div className="TableDesign">
                            <span className="TableDesignText1 justify-content-center">
                              {task?.EndDate}
                            </span>
                            <span className="TableDesignText2 text-dark">
                              IN
                              {getDaysDifference(task.StartDate, task.EndDate)}
                              DAYS
                            </span>
                          </div>
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
                            color="#EE7214"
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
  );

  function getDaysDifference(startDateString, endDateString) {
    if (!startDateString || !endDateString) {
      return 0; // Return 0 if either date is falsy (e.g., null or undefined)
    }

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 0; // Return 0 if either date is invalid
    }

    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.round(diffInDays); // Round the result to the nearest integer
  }
};
