import { useState } from "react";
import "./MyCompanyTask.css";
import MyCompanyTaskCard from "../../../components/MyCompanyTaskCard/MyCompanyTaskCard";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Select, Textarea } from "@mantine/core";

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
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [type, setType] = useState("User");

  const [filterType, setFilterType] = useState(null);
  const user_id = localStorage.getItem("id");

  const navigation = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="ShowAllPostsAll">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <Button
              justify="center "
              variant="filled"
              color="#283739"
              radius="md"
              w={"fit-content"}
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
              <div className="d-flex gap-2">
                <div>
                  <Modal
                    xOffset={"30%"}
                    yOffset={"9%"}
                    padding={"xl"}
                    opened={opened}
                    onClose={close}
                    title="Add Task"
                    centered
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="d-flex justify-content-around p-2">
                        <div className="d-flex flex-column gap-3">
                          <TextInput
                            label="Name"
                            name="name"
                            value={taskName}
                            onChange={(e) => {
                              setTaskName(e.target.value);
                            }}
                            placeholder="Task name"
                          />
                          <TextInput
                            label="Priority"
                            placeholder="2"
                            name="priority"
                            value={priority}
                            onChange={(e) => {
                              setPriority(e.target.value);
                            }}
                          />
                          <TextInput
                            label="Start Date"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                            }}
                            placeholder="12/3/2005"
                          />
                          <TextInput
                            label="End Date"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => {
                              setEndDate(e.target.value);
                            }}
                            placeholder="22/9/2005"
                          />
                        </div>
                        <div className="d-flex flex-column gap-3">
                          <Select
                            label="Type"
                            placeholder="Select"
                            data={["User", "Team"]}
                            defaultValue={type}
                            clearable
                            onChange={(e) => {
                              setType(e);
                            }}
                          />
                          <TextInput
                            label="For"
                            name="assignedTo"
                            value={assignedTo}
                            onChange={(e) => {
                              setAssignedTo(e.target.value);
                            }}
                            placeholder="User or Team Name"
                          />
                          <Textarea
                            label="Comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            placeholder="Your Comment"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <Button variant="filled" color="#388E3C" type="submit">
                          Create
                        </Button>
                      </div>
                    </form>
                  </Modal>
                  <Button onClick={open} variant="filled" color="orange">
                    New
                  </Button>
                </div>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={() => {}}
                  className="MyCompanyTaskContentButtonText"
                >
                  Date
                </Button>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={() => {}}
                  className="MyCompanyTaskContentButtonText"
                >
                  Priority
                </Button>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={() => {}}
                  className="MyCompanyTaskContentButtonText"
                >
                  Late
                </Button>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={() => {}}
                  className="MyCompanyTaskContentButtonText"
                >
                  In Progress
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompanyTask;
