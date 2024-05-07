import "./MyCompanyTaskCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, gql } from '@apollo/client';
import { Modal, Button, Input, TextInput } from "@mantine/core";
import CreateTaskCard from '../CreateTaskCard/CreateTaskCard';
import CreateTeamAddOnsCard from "../CreateTeamAddOnsCard/CreateTeamAddOnsCard";
const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: Int!, $task: TaskInput!) {
    updateTask(taskId: $taskId, task: $task) {
      Comments
      EndDate
      Priority
      StartDate
      TaskName
    }
  }
`;

const GET_TASK = gql`
  query GetTask($taskId: Int!) {
    getTask(taskId: $taskId) {
      TaskName
      StartDate
      EndDate
      Priority
      Comments
      AssignedTo
      Steps {
        Number
        Description
      }
    }
  }
`;

function MyCompanyTaskCard({
  taskName,
  createDate,
  priority,
  companyName,
  taskStatus,
  task_id,
  colorReq,
  StartDate,
  EndDate,
  Comment
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [taskData, setTaskData] = useState({
    name: taskName,
    priority: priority,
    startDate: StartDate,
    endDate: EndDate,
    assignedTo: "",
    comment: Comment,
    steps: [],
  });
  const {
    loading,
    error,
    data: taskQueryData,
  } = useQuery(GET_TASK, {
    variables: {
      taskId: task_id,
    },
  });

  const [updateTaskMutation, { data: mutationData }] = useMutation(UPDATE_TASK);

  useEffect(() => {
    if (!loading && !error && taskQueryData) {
      const {
        TaskName,
        StartDate,
        EndDate,
        Priority,
        Comments,
        AssignedTo,
        Steps,
      } = taskQueryData.getTask;
      setTaskData({
        ...taskData,
        name: TaskName,
        startDate: StartDate,
        endDate: EndDate,
        priority: Priority,
        comment: Comments,
        assignedTo: AssignedTo,
        steps: Steps,
      });
    }
  }, [loading, error, taskQueryData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveData = () => {
    updateTaskMutation({
      variables: {
        taskId: task_id,
        task: {
          ...taskData,
        },
      },
    });
  };
  return (
    <div className="MyCompanyTaskCardAll">
      <div className="MyCompanyTaskCardMain">
        <div className="MyCompanyTaskCardName">
          <div className="MyCompanyTaskCardName1">
            <h6 className="MyCompanyTaskCardText">{companyName}</h6>
          </div>
        </div>
        <div className="MyCompanyTaskCardDesign">
          <div className="MyCompanyTaskCardEditButton">
            <div>
              <Modal opened={opened} onClose={close} title="Edit Task" centered>
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
                    <TextInput
                      label="For"
                      name="assignedTo"
                      value={taskData.assignedTo}
                      onChange={handleInputChange}
                      placeholder="User of Team Name"
                    />
                    <TextInput
                      label="Comment"
                      name="comment"
                      value={taskData.comment}
                      onChange={handleInputChange}
                      placeholder="Your Comment"
                    />
                  </div>
                  <div className='EditTaskSteps'>
              <span className="EditTaskLabel">Steps</span>
              {taskData.steps.map((step, index) => (
                <CreateTaskCard key={index} number={step.Number} description={step.Description} />
              ))}
              <CreateTeamAddOnsCard/>
            </div>
                </div>
                <div className="d-flex flex-row justify-content-end pt-3" >
                <Button variant="filled" color="#388E3C" onClick={handleSaveData}>Save</Button>
                </div>
              </Modal>

              <Button
                onClick={open}
                variant="transparent"
                color="green"
                className="MyCompanyTaskCardEditButtonText"
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="MyCompanyTaskCardCenter">
            <div className="MyCompanyTaskCardCenterPart1">
              <Link
                to={`/TaskPage/${task_id}`}
                className="MyCompanyTaskCardCenterPart1Text1"
              >
                <h6 className="MyCompanyTaskCardCenterPart1Text1">
                  {taskName}
                </h6>
              </Link>
              <h6 className="MyCompanyTaskCardCenterPart1Text2">
                {createDate}
              </h6>
            </div>
            <h6 className="MyCompanyTaskCardCenterPart2Text1">{priority}</h6>
          </div>
          <p className="MyCompanyTaskCardCenterParagraphTexts">
            Brainstorming brings team members' diverse experience into play.
          </p>

          <div className="MyCompanyTaskCardCenterCardOther">
            <RequirementNeed textReq={taskStatus} colorReq={colorReq} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCompanyTaskCard;
