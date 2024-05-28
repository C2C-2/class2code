import "./TeamTask.css";
import {
  Button,
  Modal,
  Textarea,
  TextInput,
  Table,
  NumberInput,
} from "@mantine/core";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { FaCross, FaTrash } from "react-icons/fa";

const GET_TEAM = gql`
  query GetTeam($teamId: Int!) {
    getTeam(teamId: $teamId) {
      Tasks {
        CompanyName
        EndDate
        StartDate
        Comments
        Priority
        Steps {
          Description
          Number
          _id
        }
        TaskName
        TaskStatus
        _id
      }
      TeamName
    }
  }
`;
const CREATE_TASK_TEAM = gql`
  mutation Mutation(
    $task: TaskInput!
    $teamId: Int!
    $userId: String!
    $companyId: Int!
  ) {
    createTaskForTeam(
      task: $task
      teamId: $teamId
      userId: $userId
      companyId: $companyId
    ) {
      _id
    }
  }
`;
const UPDATE_TASK_TEAM = gql`
  mutation UpdateTask($taskId: Int!, $task: TaskInput!) {
    updateTask(taskId: $taskId, task: $task) {
      Comments
      EndDate
      StartDate
      Priority
      TaskName
      TaskStatus
    }
  }
`;

const DELETE_Task = gql`
  query Query($taskId: Int!) {
    deleteTask(taskId: $taskId)
  }
`;

const UPDATE_TASK_STEPS = gql`
  mutation UpdateTaskSteps($taskId: Int!, $taskSteps: [TaskStepInput]!) {
    updateTaskSteps(taskId: $taskId, taskSteps: $taskSteps)
  }
`;

export const TeamTask = () => {
  const navigation = useNavigate();
  const user_id = localStorage.getItem("id");
  const { team_id, company_id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState("");
  const [priority, setPriority] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const [steps, setSteps] = useState([]);
  const [number, setNumber] = useState(1);
  const [description, setDescription] = useState("");

  const {
    loading: loadingTeams,
    error: errorTeams,
    data: dataTeams,
    refetch: refetchTask,
  } = useQuery(GET_TEAM, {
    variables: { teamId: parseInt(team_id) },
  });

  const [deleteTask] = useLazyQuery(DELETE_Task);

  const handleDeleteTask = (taskId) => {
    deleteTask({
      variables: {
        taskId: parseInt(taskId),
      },
    }).then(() => {
      refetchTask();
    });
  };

  const [createTask, { loading: loadingCreateTask }] =
    useMutation(CREATE_TASK_TEAM);

  const handleCreateTask = async () => {
    await createTask({
      variables: {
        companyId: parseInt(company_id),
        teamId: parseInt(team_id),
        userId: user_id,
        task: {
          TaskName: taskName,
          StartDate: startDate,
          EndDate: endDate,
          Priority: parseInt(priority),
          Comments: comments,
        },
      },
    }).then(() => {
      refetchTask();
    });
  };

  const [updateTask] = useMutation(UPDATE_TASK_TEAM);

  const handleUpdateTask = () => {
    updateTask({
      variables: {
        taskId: parseInt(currentTaskId),
        task: {
          TaskName: taskName,
          StartDate: startDate,
          EndDate: endDate,
          Priority: parseInt(priority),
          Comments: comments,
        },
      },
    }).then(() => {
      refetchTask();
    });
  };

  useEffect(() => {
    if (dataTeams) {
      setTaskName(dataTeams?.getTeam?.TaskName);
      setComments(dataTeams?.getTeam?.Comments);
      setEndDate(dataTeams?.getTeam?.EndDate);
    }
  }, [dataTeams]);

  const openEditTaskWithDetails = (task) => {
    setCurrentTaskId(task._id);
    setTaskName(task.TaskName);
    setStartDate(task.StartDate || "");
    setEndDate(task.EndDate || "");
    setPriority(task.Priority || "");
    setComments(task.Comments || "");
    openEditTask();
  };

  const [openedTask, { open: openTask, close: closeTask }] =
    useDisclosure(false);
  const [openedEditTask, { open: openEditTask, close: closeEditTask }] =
    useDisclosure(false);

  const [openedAddStep, { open: openAddStep, close: closeAddStep }] =
    useDisclosure(false);

  const [updateTaskSteps, { loading: updateTaskStepsLoading }] =
    useMutation(UPDATE_TASK_STEPS);

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
              <div>
                <Modal
                  xOffset={"30%"}
                  yOffset={"8%"}
                  padding={"xl"}
                  size={"lg"}
                  opened={openedTask}
                  onClose={closeTask}
                  title="Create Task"
                  centered
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateTask().then(() => closeTask());
                    }}
                  >
                    <div className="d-flex gap-5">
                      <div className="flex-grow-1">
                        <TextInput
                          label="Task Name"
                          placeholder="Enter task name"
                          value={taskName}
                          onChange={(e) => {
                            setTaskName(e.target.value);
                          }}
                          required
                        />
                        <br />
                        <TextInput
                          label="Start Date"
                          placeholder="Enter start date"
                          type="Date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                        <br />
                        <TextInput
                          label="End Date"
                          placeholder="Enter end date"
                          value={endDate}
                          type="Date"
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="flex-grow-1">
                        <NumberInput
                          label="Priority"
                          placeholder="Enter priority"
                          type="number"
                          min={1}
                          max={10}
                          value={priority}
                          onChange={(e) => {
                            const value = Number(e);
                            if (value >= 1 && value <= 10) {
                              setPriority(value);
                            }
                          }}
                          required
                        />
                        <br />
                        <Textarea
                          label="Comments"
                          placeholder="Enter comments"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="d-flex gap-3 justify-content-end">
                      <Button type="submit" variant="filled" color="orange">
                        {loadingCreateTask ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </form>
                </Modal>

                <Button
                  variant="filled"
                  color="orange"
                  onClick={openTask}
                  w={100}
                >
                  New
                </Button>
              </div>

              <div className="DashboardUnderPart2 pt-5">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Deadline</Table.Th>
                      <Table.Th>Team</Table.Th>
                      <Table.Th>Company</Table.Th>
                      <Table.Th>Status</Table.Th>

                      <Table.Th className="d-flex  w-50 justify-content-center">
                        Actions
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {dataTeams?.getTeam?.Tasks.map((task, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{task?.TaskName}</Table.Td>
                        <Table.Td>
                          <div className="TableDesign">
                            <span className="TableDesignText1 justify-content-center">
                              IN {task?.EndDate}
                            </span>
                          </div>
                        </Table.Td>
                        <Table.Td>{dataTeams?.getTeam?.TeamName}</Table.Td>
                        <Table.Td>{task?.CompanyName}</Table.Td>
                        <Table.Td>{task?.TaskStatus}</Table.Td>
                        <Table.Td className="d-flex gap-2">
                          <>
                            <Modal
                              opened={openedEditTask}
                              onClose={closeEditTask}
                              title="Edit Task"
                              centered
                            >
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleUpdateTask();
                                }}
                              >
                                <TextInput
                                  label="Task Name"
                                  placeholder="Enter task name"
                                  value={taskName}
                                  onChange={(e) => setTaskName(e.target.value)}
                                />
                                <TextInput
                                  label="Start Date"
                                  placeholder="Enter start date"
                                  type="Date"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                                <TextInput
                                  label="End Date"
                                  placeholder="Enter end date"
                                  type="Date"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                />
                                <TextInput
                                  label="Priority"
                                  placeholder="Enter priority"
                                  type="number"
                                  value={priority}
                                  onChange={(e) =>
                                    setPriority(Number(e.target.value))
                                  }
                                />
                                <Textarea
                                  label="Comments"
                                  placeholder="Enter comments"
                                  value={comments}
                                  onChange={(e) => setComments(e.target.value)}
                                />
                                <br />
                                <div className="d-flex gap-3 justify-content-end">
                                  <Button
                                    type="submit"
                                    variant="filled"
                                    color="green"
                                    onClick={() => {
                                      handleUpdateTask;
                                      closeEditTask();
                                    }}
                                  >
                                    Update Task
                                  </Button>
                                </div>
                              </form>
                            </Modal>

                            <Button
                              variant="filled"
                              color="orange"
                              onClick={() => {
                                openEditTaskWithDetails(task);
                              }}
                            >
                              Edit Task
                            </Button>
                          </>

                          <>
                            <Modal
                              opened={openedAddStep}
                              onClose={closeAddStep}
                              title="Add Step"
                              centered
                            >
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();

                                  await updateTaskSteps({
                                    variables: {
                                      taskId: parseInt(task._id),
                                      taskSteps: steps?.map((step) => ({
                                        Number: step.Number,
                                        Description: step.Description,
                                      })),
                                    },
                                  }).then(() => {
                                    refetchTask();
                                    closeAddStep();
                                  });
                                }}
                              >
                                <TextInput
                                  label="Number"
                                  placeholder="Enter number"
                                  value={number}
                                  onChange={(e) =>
                                    setNumber(parseInt(e.target.value))
                                  }
                                  required
                                />
                                <Textarea
                                  label="Description"
                                  placeholder="Enter description"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  required
                                />
                                <br />

                                <div className="px-3 mt-4">
                                  {steps.map((step, index) => (
                                    <>
                                      <div
                                        key={index}
                                        className="d-flex justify-content-between align-items-center w-25"
                                      >
                                        <h6 key={index}>{step.Number}.</h6>
                                        <h6 key={index}>{step.Description}</h6>
                                        <Button
                                          variant="light"
                                          color="red"
                                          onClick={() => {
                                            setSteps((e) =>
                                              e.filter((_, i) => i !== index)
                                            );
                                          }}
                                        >
                                          <FaTrash color="red" />
                                        </Button>
                                      </div>
                                      <br />
                                    </>
                                  ))}
                                </div>

                                <br />

                                <div className="d-flex gap-3">
                                  <Button
                                    onClick={(e1) => {
                                      e1.preventDefault();
                                      setSteps((e) => [
                                        ...e,
                                        {
                                          Number: number,
                                          Description: description,
                                        },
                                      ]);
                                    }}
                                    variant="filled"
                                    color="orange"
                                  >
                                    Add Step
                                  </Button>
                                </div>
                                <br />
                                <div className="d-flex gap-3 justify-content-end">
                                  <Button
                                    type="submit"
                                    variant="filled"
                                    color="green"
                                    style={{
                                      position: "absolute",
                                      bottom: "1rem",
                                    }}
                                  >
                                    Save
                                  </Button>
                                </div>
                              </form>
                            </Modal>
                            <Button
                              variant="filled"
                              color="green"
                              onClick={() => {
                                setSteps(task.Steps);
                                openAddStep();
                              }}
                            >
                              Steps
                            </Button>
                          </>

                          <Button
                            variant="transparent"
                            color=""
                            onClick={() => {
                              const ask = confirm("Are you Sure?");
                              if (!ask) return;
                              else {
                                handleDeleteTask(task._id);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="20"
                              viewBox="0 0 18 20"
                              fill="none"
                            >
                              <path
                                d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z"
                                fill="#EB5757"
                              />
                            </svg>
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
};
