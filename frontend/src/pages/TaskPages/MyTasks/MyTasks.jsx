import { Button, Table } from "@mantine/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DashboardStatusCard from "../../../components/DashboardStatusCard/DashboardStatusCard";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

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

export const MyTasks = () => {
  const navigation = useNavigate();
  const [isDesc, setIsDesc] = useState(true);

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

  const sortedTasks = dataTasks?.getUser?.Tasks?.slice().sort((a, b) => {
    const dateA = new Date(a.EndDate);
    const dateB = new Date(b.EndDate);
    return isDesc ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="ShowAllPostsAll">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="PostsSearchPart">
              <Button
                justify="center"
                variant="filled"
                color="#283739"
                radius="md"
                onClick={() => {
                  navigation(-1);
                }}
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
            </div>
            <div className="EditMyCompaniesContentData">
              <div className="ShowAllPostsButtons">
                <Button
                  variant="filled"
                  color="gray"
                  onClick={() => {
                    setIsDesc(!isDesc);
                  }}
                  rightSection={isDesc ? <FaArrowUp /> : <FaArrowDown />}
                >
                  Date
                </Button>
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
                    {sortedTasks?.map((task, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{task?.TaskName}</Table.Td>
                        <Table.Td>{task?.Comments}</Table.Td>
                        <Table.Td>
                          <div className="TableDesign">
                            <span className="TableDesignText1 justify-content-center">
                              {task?.EndDate}
                            </span>
                            <span className="TableDesignText2 text-dark">
                              {getDaysDifference(task.StartDate, task.EndDate)}
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
                              task?.TaskStatus === "Pending"
                                ? "red"
                                : task.TaskStatus === "new"
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
                              task?.TaskStatus === "Finish" ? "disabled" : null
                            }
                            onClick={async (e) => {
                              e.preventDefault();
                              await updateTask({
                                variables: {
                                  taskId: parseInt(task._id),
                                  task: {
                                    TaskName: task.TaskName,
                                    TaskStatus:
                                      task.TaskStatus === "New"
                                        ? "Pending"
                                        : task.TaskStatus === "Pending"
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
                            {task?.TaskStatus === "Pending"
                              ? "Finish"
                              : task?.TaskStatus === "New"
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
      return 0;
    }

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 0;
    }

    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.round(diffInDays);
  }
};
