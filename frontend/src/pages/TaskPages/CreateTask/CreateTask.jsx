import { useState } from "react";
import "./CreateTask.css";
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard";
import { Button } from "@mantine/core";
import CreateTaskCard from "../../../components/CreateTaskCard/CreateTaskCard";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { Descriptions } from "antd";
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
      Steps {
        Description
        Number
      }
    }
  }
`;

function CreateTask() {
  const [taskData, setTaskData] = useState({
    task: null,
    teamId: null,
    userId: null,
  });
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
  const dummySteps = [
    { Number: 1, Description: "Sample step 1" },
    { Number: 2, Description: "Sample step 2" },
  ];
  const handleCreateTask = () => {
    createTask({ variables: taskData })
      .then((res) => {
        // Handle success, e.g., show a success message
        console.log("Task created successfully:", res.data.createTaskForTeam);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error creating task:", error);
      });
  };
  return (
    <div className="CreateTaskAll" id="man">
      <div className="CreateTaskMain">
        <div className="CreateTaskContent">
          <div className="CreateTaskCenter">
            <span className="CreateTaskHeader">Add Task</span>
            <div className="InputsAll">
              <div className="CreateTaskInput1">
                <div className="CreateTaskDataInput">
                  <span className="CreateTaskLabel">Name</span>
                  <input
                    type="text"
                    placeholder="Task Name"
                    name="TaskName"
                    onChange={handleInputChange}
                    className="CreateTaskTextInput"
                  />
                </div>
                <div className="CreateTaskDataInput">
                  <span className="CreateTaskLabel">Priority</span>
                  <input
                    type="number"
                    placeholder="2"
                    className="CreateTaskTextInput"
                    name="Priority"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="CreateTaskInput2">
                <div className="CreateTaskDataInput">
                  <span className="CreateTaskLabel">Start Date</span>
                  <input
                    placeholder="12/3/2005"
                    className="CreateTaskTextInput"
                    name="StartDate"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="CreateTaskDataInput">
                  <span className="CreateTaskLabel">End Date</span>
                  <input
                    placeholder="22/9/2005"
                    className="CreateTaskTextInput"
                    name="EndDate"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="CreateTaskInput2">
                <div className="CreateTaskDataInput">
                  <span className="CreateTaskLabel">For</span>
                  <input
                    type="text"
                    placeholder="User of Team Name"
                    className="CreateTaskTextInput"
                    name="UserId"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="CreateTaskDataInput">
                  <span className="CreateTaskLabel">Comment</span>
                  <input
                    type="text"
                    placeholder="Your Comment"
                    className="CreateTaskTextInput"
                    name="Comments"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="CreateTaskSteps">
              <span className="CreateTaskLabel">Steps</span>
              {dummySteps.map((step, index) => (
                <CreateTaskCard
                  key={index}
                  number={Number}
                  description={Descriptions}
                />
              ))}
              <CreateTeamAddOnsCard />
            </div>
            <div className="CreateTaskButton">
              <Link to="/MyCompanyTask">
                <Button
                  variant="filled"
                  color="#388E3C"
                  w={130}
                  h={40}
                  onClick={handleCreateTask}
                >
                  Create
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
