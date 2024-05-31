import "./UserTask.css";
import {
  Button,
  Modal,
  NumberInput,
  Table,
  Textarea,
  TextInput,
} from "@mantine/core";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardStatusCard from "../../../components/DashboardStatusCard/DashboardStatusCard";
import { useDisclosure } from "@mantine/hooks";
import { FaCheckCircle, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { updateFieldWithKey } from "../../../config/firebase";

const GET_TASKS = gql`
  query GetUserTasksInTeam($userId: String!, $teamId: Int!) {
    getUserTasksInTeam(userId: $userId, teamId: $teamId) {
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
      Steps {
        Description
        Number
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

const CREATE_TASK = gql`
  mutation CreateTaskForUser(
    $task: TaskInput!
    $userId: String!
    $userCreateTaskId: String!
    $companyId: Int!
    $teamId: Int!
  ) {
    createTaskForUser(
      task: $task
      userId: $userId
      userCreateTaskId: $userCreateTaskId
      companyId: $companyId
      teamId: $teamId
    ) {
      _id
    }
  }
`;

const DELETE_TASK = gql`
  query Query($taskId: Int!) {
    deleteTask(taskId: $taskId)
  }
`;

const UPDATE_TASK_STEPS = gql`
  mutation UpdateTaskSteps($taskId: Int!, $taskSteps: [TaskStepInput]!) {
    updateTaskSteps(taskId: $taskId, taskSteps: $taskSteps)
  }
`;

export const UserTask = () => {
  const navigation = useNavigate();
  const { team_id, company_id, id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState("");
  const [priority, setPriority] = useState("");
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [editedComments, setEditedComments] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [steps, setSteps] = useState([]);
  const [number, setNumber] = useState(1);
  const [description, setDescription] = useState("");

  const {
    loading: loadingTasks,
    error: errorTasks,
    data: dataTasks,
    refetch: refetchTasks,
  } = useQuery(GET_TASKS, {
    variables: { userId: id, teamId: parseInt(team_id) },
  });

  const [
    updateTask,
    {
      data: dataUpdateTask,
      loading: loadingUpdateTask,
      error: errorUpdateTask,
    },
  ] = useMutation(UPDATE_TASK);

  useEffect(() => {
    if (dataTasks) {
      setTasks(dataTasks?.getUserTasksInTeam);
    }
  }, [dataTasks]);

  const [openedTask, { open: openTask, close: closeTask }] =
    useDisclosure(false);

  const [createTask, { loading: loadingCreateTask }] = useMutation(CREATE_TASK);

  const [deleteTask, { loading: loadingDeleteTask }] =
    useLazyQuery(DELETE_TASK);

  const [updateTaskSteps] =
    useMutation(UPDATE_TASK_STEPS);

  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  const [openedAddStep, { open: openAddStep, close: closeAddStep }] =
    useDisclosure(false);

  // Function to open edit modal and set the task to edit
  const handleOpenEditModal = (task) => {
    setEditedTaskName(task?.TaskName);
    setEditedStartDate(task?.StartDate);
    setEditedEndDate(task?.EndDate);
    setEditedComments(task?.Comments);
    setEditedPriority(task?.Priority);
    openEditModal();
  };

  const handleCreateTask = async () => {
    await createTask({
      variables: {
        companyId: parseInt(company_id),
        teamId: parseInt(team_id),
        userId: id,
        userCreateTaskId: localStorage.getItem("id"),
        task: {
          TaskName: taskName,
          StartDate: startDate,
          EndDate: endDate,
          Priority: parseInt(priority),
          Comments: comments,
        },
      },
    }).then(() => {
      refetchTasks();
      updateFieldWithKey(
        `notifications/${id}`,
        {
          notification: `You have a new task: ${taskName}`,
        }
      );
    });
  };

  const handleSubmitEditedTask = async (e, id) => {
    e.preventDefault();
    const editedTask = {
      TaskName: editedTaskName,
      StartDate: editedStartDate,
      EndDate: editedEndDate,
      Priority: parseInt(editedPriority),
      Comments: editedComments,
    };

    await updateTask({
      variables: {
        taskId: parseInt(id),
        task: editedTask,
      },
    });
    closeEditModal();
    refetchTasks();
  };

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
              <div className="DashboardUnderPart2">
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
                          <Modal
                            // Add modal props here
                            opened={openedEditModal}
                            onClose={closeEditModal}
                            title="Edit Task"
                            centered
                          >
                            <form
                              onSubmit={(e) => {
                                handleSubmitEditedTask(e, task?._id);
                              }}
                            >
                              <div className="d-flex gap-5">
                                <div className="flex-grow-1">
                                  <TextInput
                                    label="Task Name"
                                    placeholder="Enter task name"
                                    value={editedTaskName}
                                    onChange={(e) =>
                                      setEditedTaskName(e.target.value)
                                    }
                                    required
                                  />
                                  <br />
                                  <TextInput
                                    label="Start Date"
                                    placeholder="Enter start date"
                                    type="date"
                                    value={editedStartDate}
                                    onChange={(e) =>
                                      setEditedStartDate(e.target.value)
                                    }
                                    required
                                  />
                                  <br />
                                  <TextInput
                                    label="End Date"
                                    placeholder="Enter end date"
                                    type="date"
                                    value={editedEndDate}
                                    onChange={(e) =>
                                      setEditedEndDate(e.target.value)
                                    }
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
                                    value={editedPriority}
                                    onChange={(e) => setEditedPriority(e)}
                                    required
                                  />
                                  <br />
                                  <Textarea
                                    label="Comments"
                                    placeholder="Enter comments"
                                    value={editedComments}
                                    onChange={(e) =>
                                      setEditedComments(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <br />
                              <div className="d-flex gap-3 justify-content-end">
                                <Button
                                  type="submit"
                                  variant="filled"
                                  color="orange"
                                >
                                  {loadingUpdateTask ? "Updating..." : "Update"}
                                </Button>
                              </div>
                            </form>
                          </Modal>
                          <Button
                            className="mx-2"
                            onClick={() => {
                              updateTask({
                                variables: {
                                  taskId: parseInt(task?._id),
                                  task: {
                                    TaskStatus: "Approved",
                                  },
                                },
                              }).then(() => {
                                refetchTasks();
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
                                    refetchTasks();
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
                                  {steps?.map((step, index) => (
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
                            onClick={() => handleOpenEditModal(task)}
                            variant="filled"
                            color="orange"
                          >
                            Edit &nbsp; <MdModeEdit />
                          </Button>
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
                                refetchTasks();
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
                                refetchTasks();
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
