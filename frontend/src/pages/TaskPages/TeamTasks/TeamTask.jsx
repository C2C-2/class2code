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
import { FaCheckCircle, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import { updateFieldWithKey } from "../../../config/firebase";

const GET_TEAM = gql`
  query GetTeam($teamId: Int!) {
    getTeam(teamId: $teamId) {
      Members {
        id
      }
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

  const [deleteTask, { loading: loadingDeleteTask }] =
    useLazyQuery(DELETE_Task);

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
      dataTeams?.getTeam?.Members.forEach(async (member) => {
        await updateFieldWithKey(`notifications/${member.id}`, {
          notification: `You have get task ${taskName} in (${dataTeams?.getTeam?.TeamName}) team`,
        });
      });
    });
  };

  const [updateTask, { loading: loadingUpdateTask }] =
    useMutation(UPDATE_TASK_TEAM);

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
                      <Table.Th>Approve</Table.Th>
                      <Table.Th>Edit</Table.Th>
                      <Table.Th>Reset</Table.Th>
                      <Table.Th>Delete</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {dataTeams?.getTeam?.Tasks.map((task, index) => (
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
                        <Table.Td>{dataTeams?.getTeam?.TeamName}</Table.Td>
                        <Table.Td>{task?.CompanyName}</Table.Td>
                        <Table.Td>{task?.TaskStatus}</Table.Td>
                        <Table.Td>
                          <Button
                            onClick={() => {
                              updateTask({
                                variables: {
                                  taskId: parseInt(task?._id),
                                  task: {
                                    TaskStatus: "Approved",
                                  },
                                },
                              }).then(() => {
                                refetchTask();
                              });
                            }}
                            variant="filled"
                            color="green"
                          >
                            {loadingUpdateTask ? (
                              "Approving..."
                            ) : (
                              <>
                                Approve &nbsp; <FaCheckCircle />
                              </>
                            )}
                          </Button>
                        </Table.Td>
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
                              color="violet"
                              onClick={() => {
                                setSteps(task.Steps);
                                openAddStep();
                              }}
                            >
                              Steps
                            </Button>
                          </>
                        </Table.Td>
                        <Table.Td>
                          <Button
                            onClick={async (e) => {
                              e.preventDefault();
                              const editedTask = {
                                TaskStatus: "New",
                              };
                              await updateTask({
                                variables: {
                                  taskId: parseInt(task?._id),
                                  task: editedTask,
                                },
                              }).then(() => {
                                refetchTask();
                              });
                            }}
                            variant="filled"
                            color="yellow"
                          >
                            {loadingUpdateTask ? (
                              "Updating..."
                            ) : (
                              <>
                                Reset &nbsp; <FaCheckCircle />
                              </>
                            )}
                          </Button>
                        </Table.Td>
                        <Table.Td>
                          <Button
                            onClick={() => {
                              deleteTask({
                                variables: {
                                  taskId: parseInt(task?._id),
                                },
                              }).then(() => {
                                refetchTask();
                              });
                            }}
                            variant="filled"
                            color="red"
                          >
                            {loadingDeleteTask ? (
                              "Deleting..."
                            ) : (
                              <>
                                Delete &nbsp; <FaRegTrashAlt />
                              </>
                            )}
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
