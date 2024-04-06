import { useEffect, useState } from "react";
import "./CreateTask.css"
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CreateTeamCard from "../../../components/CreateTeamCard/CreateTeamCard"
import CreateTeamAddOnsCard from "../../../components/CreateTeamAddOnsCard/CreateTeamAddOnsCard"
import { Button, Input } from "@mantine/core";
import CreateTaskCard from '../../../components/CreateTaskCard/CreateTaskCard';
function CreateTask() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#000";
  }, [receivedData]);
  return (
    <div className="CreateTaskAll" id="man">
    <SideBar />
    <div className="CreateTaskMain">
      <NavBar sendDataToParent={receiveDataFromChild} />
      <div className={`${
                  isDarkMode
                    ? "CreateTaskContent bg-black"
                    : "CreateTaskContent"
                }`}>
        <div className={`${
                  isDarkMode
                    ? "CreateTaskCenterDark "
                    : "CreateTaskCenter"
                }`}>
        <span className={`${
                  isDarkMode
                    ? "CreateTaskHeaderDark"
                    : "CreateTaskHeader"
                }`}>Add Task</span>
        <div className="InputsAll">
          <div className="CreateTaskInput1">
          <div className="CreateTaskDataInput">
                <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel"
                }`}>Name</span>
                <input
                  type="text"
                  placeholder="Task Name"
                  className="CreateTaskTextInput"
                />
              </div>
              <div className="CreateTaskDataInput">
                <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel"
                }`}>Priority</span>
                <input
                  type="number"
                  placeholder="2"
                  className="CreateTaskTextInput"
                />
              </div>
          </div>
          <div className="CreateTaskInput2">
          <div className="CreateTaskDataInput">
                <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel" 
                }`}>Start Date</span>
                <input
                  placeholder="12/3/2005"
                  className="CreateTaskTextInput"
                />
              </div>
              <div className="CreateTaskDataInput">
                <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel"
                }`}>End Date</span>
                <input
                  placeholder="22/9/2005"
                  className="CreateTaskTextInput"
                />
              </div>
          </div>
          <div className="CreateTaskInput2">
          <div className="CreateTaskDataInput">
                <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel"
                }`}>For</span>
                <input
                  type="text"
                  placeholder="User of Team Name"
                  className="CreateTaskTextInput"
                />
              </div>
              <div className="CreateTaskDataInput">
                <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel"
                }`}>Comment</span>
                <input
                  type="text"
                  placeholder="Your Comment"
                  className="CreateTaskTextInput"
                />
              </div>
          </div>
        </div>
        <div className='CreateTaskSteps'>
        <span className={`${
                  isDarkMode
                    ? "CreateTaskLabelDark"
                    : "CreateTaskLabel"
                }`}>Steps</span>
        <CreateTaskCard color={receivedData}/>
        <CreateTaskCard/>
        <CreateTeamAddOnsCard/>
        </div>
      <div className="CreateTaskButton">
              <Button variant="filled" color="#388E3C" w={130} h={40}>Create</Button>
              </div> 
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreateTask