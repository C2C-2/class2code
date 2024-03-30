import React from 'react'
import "./EditTask.css"
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard"
import { Button, Input } from "@mantine/core";
import CreateTaskCard from '../../../components/CreateTaskCard/CreateTaskCard';
function EditTask() {
  return (
    <div className="EditTaskAll">
    <SideBar />
    <div className="EditTaskMain">
      <NavBar />
      <div className="EditTaskContent">
        <div className="EditTaskCenter">
        <span className="EditTaskHeader">Add Task</span>
        <div className="InputsAll">
          <div className="EditTaskInput1">
          <div className="EditTaskDataInput">
                <span className="EditTaskLabel">Name</span>
                <input
                  type="text"
                  placeholder="Task Name"
                  className="EditTaskTextInput"
                />
              </div>
              <div className="EditTaskDataInput">
                <span className="EditTaskLabel">Priority</span>
                <input
                  type="number"
                  placeholder="2"
                  className="EditTaskTextInput"
                />
              </div>
          </div>
          <div className="EditTaskInput2">
          <div className="EditTaskDataInput">
                <span className="EditTaskLabel">Start Date</span>
                <input
                  type="date"
                  placeholder="12/3/2005"
                  className="EditTaskTextInput"
                />
              </div>
              <div className="EditTaskDataInput">
                <span className="EditTaskLabel">End Date</span>
                <input
                  type="date"
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
                  placeholder="User of Team Name"
                  className="EditTaskTextInput"
                />
              </div>
              <div className="EditTaskDataInput">
                <span className="CreateTaskLabel">Comment</span>
                <input
                  type="text"
                  placeholder="Your Comment"
                  className="EditTaskTextInput"
                />
              </div>
          </div>
        </div>
        <div className='EditTaskSteps'>
        <span className="EditTaskLabel">Steps</span>
        <CreateTaskCard/>
        <CreateTaskCard/>
        <CreateTeamAddOnsCard/>
        </div>
      <div className="EditTaskButton">
              <Button variant="filled" color="#388E3C" w={130} h={40}>Save</Button>
              </div> 
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditTask