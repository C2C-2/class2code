import React from "react";
import "./SecondSignup.css";
<<<<<<< HEAD
import { useState } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";
import upload from "./feather_upload-cloud.png";
import Young from "./young man sitting with laptop and waving.png";
import GreenBox2 from "../../components/GreenBox/GreenBox2";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
const SecondSignup = () => {
  const [files, setFiles] = useState([]);
  return (
    <div className="SecondSignupAll">
      <SideBar />
      <div className="SecondSignupMain">
        <NavBar />
        <div className="SecondSignupCenter">
          <div className="SecondSignupCenterTop">
            <div className="SecondSignupCenterTopPart1">
              <span className="SecondSignupCenterTopPart1Text1">
                Lets Complete Your Profile !
              </span>
              <span className="SecondSignupCenterTopPart1Text2">
                Add Your Information & Skills
              </span>
            </div>
            <img src={Young} alt="Young" />
          </div>
          <div className="SecondSignupContent">
            <div className="SecondSignupContentPart1">
              <div className="SecondSignupUpload">
                <span className="SecondSignupUploadText">
                  Upload Your Image
                </span>
                <div className="SecondSignupUploadBox">
                  <img src={upload} alt="Upload" />
                  <div className="SecondSignupUploadBoxText">
                    <span className="SecondSignupUploadBoxText1">
                      Select a file or drag and drop here
                    </span>
                    <span className="SecondSignupUploadBoxText2">
                      JPG, PNG or PDF, file size no more than 10MB
                    </span>
                  </div>
                  <Group justify="center">
                    <FileButton
                      onChange={setFiles}
                      accept="image/png,image/jpeg"
                      multiple
                    >
                      {(props) => (
                        <Button h={45} w={120} color="#388E3C" {...props}>
                          Select File
                        </Button>
                      )}
                    </FileButton>
                  </Group>
                  {files.length > 0 && (
                    <Text size="sm" mt="sm">
                      Picked files:
                    </Text>
                  )}
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="SecondSignupInputs">
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Date Of Birth</h6>
                  <input
                    type="text"
                    className="SecondSignupInputText"
                    placeholder="day/month/year"
                  ></input>
                </div>
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Gender</h6>
                  <input
                    type="text"
                    className="SecondSignupInputText"
                    placeholder="Female"
                  ></input>
                </div>
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Your Work</h6>
                  <input
                    type="text"
                    className="SecondSignupInputText"
                    placeholder="Frontend Developer"
                  ></input>
                </div>
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Country</h6>
                  <input
                    type="text"
                    className="SecondSignupInputText"
                    placeholder="Palestine"
                  ></input>
                </div>
              </div>
            </div>
            <div className="SecondSignupContentPart2">
              <div className="SecondSignupContentPart2Design">
                <span className="SecondSignupContentPart2Text1">Skills</span>
                <div className="SecondSignupContentPart2Card">
                  <GreenBox2 />
                  <GreenBox2 />
                </div>
                <div className="SecondSignupContentPart2ButtonAdd">
                  <Button
                    variant="filled"
                    color="#388E3C"
                    radius="xl"
                    w={80}
                    h={50}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="SecondSignupContentPart2ButtonFinish">
                <button className="SecondSignupButtonFinish">
                  <span className="SecondSignupButtonFinishText">Finish</span>
                </button>
              </div>
            </div>
          </div>
=======
import YoungMan from "./images/yongMan.svg";
import GreenBox from "../../components/greenBox/GreenBox";
const SecondSignup = () => {
  const skills = [
    "frontend",
    "backend",
    "database",
    "security",
    "devops",
    "ui/ux",
  ];

  return (
    <div className="main w-100 d-flex align-items-center justify-content-center">
      <div className="mainCenterDiv shadow p-4">
        <div className="hello d-flex w-100 justify-content-between p-4">
          <div className="title d-flex flex-column justify-content-center">
            <h4 className="mainTitle">Lets Complete Your Profile !</h4>
            <p className="subtitle">Add Your Information &amp; Skills</p>
          </div>
          <img
            src={YoungMan}
            alt="youngMan"
            className="youngMan"
            style={{ width: "80px", height: "80px" }}
          ></img>
        </div>
        <div className="skills">
          {skills.map((skill, i) => {
            return <GreenBox key={i} title={skill} />;
          })}
>>>>>>> main
        </div>
      </div>
    </div>
  );
};

export default SecondSignup;
