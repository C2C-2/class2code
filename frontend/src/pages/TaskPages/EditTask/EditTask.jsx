import { useState, useEffect } from 'react';
import "./EditTask.css";
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard";
import { Button } from "@mantine/core";
import { useMutation, useQuery, gql } from '@apollo/client';
import CreateTaskCard from '../../../components/CreateTaskCard/CreateTaskCard';

function EditTask({task_id}) {
  const [taskData, setTaskData] = useState({
    name: '',
    priority: 2,
    startDate: '',
    endDate: '',
    assignedTo: '',
    comment: '',
    steps: [],
  });

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

  const { loading, error, data: taskQueryData } = useQuery(GET_TASK, {
    variables: {
      taskId:task_id
    },
  });

  const [updateTaskMutation, { data: mutationData }] = useMutation(UPDATE_TASK);

  useEffect(() => {
    if (!loading && !error && taskQueryData) {
      const { TaskName, StartDate, EndDate, Priority, Comments, AssignedTo, Steps } = taskQueryData.getTask;
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
    setTaskData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveData = () => {
    updateTaskMutation({
      variables: {
        taskId: null,
        task: {
          ...taskData,
        }
      }
    });
  };

  return (
    <div className="EditTaskAll" id="man"> 
      <div className="EditTaskMain">
        <div className="EditTaskContent">
          <div className="EditTaskCenter">
            <span className="EditTaskHeader">Edit Task</span>
            <div className="InputsAll">
              <div className="EditTaskInput1">
                <div className="EditTaskDataInput">
                  <span className="EditTaskLabel">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={taskData.name}
                    onChange={handleInputChange}
                    placeholder="Task Name"
                    className="EditTaskTextInput"
                  />
                </div>
                <div className="EditTaskDataInput">
                  <span className="EditTaskLabel">Priority</span>
                  <input
                    type="number"
                    placeholder="2"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleInputChange}
                    className="EditTaskTextInput"
                  />
                </div>
              </div>
              <div className="EditTaskInput2">
                <div className="EditTaskDataInput">
                  <span className="EditTaskLabel">Start Date</span>
                  <input
                    type="date"
                    name="startDate"
                    value={taskData.startDate}
                    onChange={handleInputChange}
                    placeholder="12/3/2005"
                    className="EditTaskTextInput"
                  />
                </div>
                <div className="EditTaskDataInput">
                  <span className="EditTaskLabel">End Date</span>
                  <input
                    type="date"
                    name="endDate"
                    value={taskData.endDate}
                    onChange={handleInputChange}
                    placeholder="22/9/2005"
                    className="EditTaskTextInput"
                  />
                </div>
              </div>
              <div className="EditTaskInput2">
                <div className="EditTaskDataInput">
                  <span className="CreateTaskLabel">For</span>
                  <input
                    type="text"
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handleInputChange}
                    placeholder="User of Team Name"
                    className="EditTaskTextInput"
                  />
                </div>
                <div className="EditTaskDataInput">
                  <span className="CreateTaskLabel">Comment</span>
                  <input
                    type="text"
                    name="comment"
                    value={taskData.comment}
                    onChange={handleInputChange}
                    placeholder="Your Comment"
                    className="EditTaskTextInput"
                  />
                </div>
              </div>
            </div>
            <div className='EditTaskSteps'>
              <span className="EditTaskLabel">Steps</span>
              {taskData.steps.map((step, index) => (
                <CreateTaskCard key={index} number={step.Number} description={step.Description} />
              ))}
              <CreateTeamAddOnsCard/>
            </div>
            <div className="EditTaskButton">
              <Button variant="filled" color="#388E3C" w={130} h={40} onClick={handleSaveData}>Save</Button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
