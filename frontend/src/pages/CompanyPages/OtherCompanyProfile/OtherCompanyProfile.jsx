import React from "react";
import "./OtherCompanyProfile.css";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CommentComp from "../../../components/Comments/CommentComp";
import CurrentProject from "../../../components/CurrentProject/CurrentProject";
import TeamOther from "../../../components/TeamOther/TeamOther";
function OtherCompanyProfile() {
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
  const icon = <IconArrowLeft size={18} />;
  return (
    <div className="OtherProfileCompany" id="man">
        <SideBar />
      <div className="OtherCompany">
          <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="Part2OtherProfile">
          <div className="OtherProfileButtonBack">
            <Button
              justify="center "
              variant="filled"
              color="#283739"
              radius="md"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.49999 11L1.5 6L6.49999 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="OtherProfileDescriptionCenter">
          <div className="OtherProfileDescription">
            <div className="CompanyName">
              <div className="C1">
                <span className="C1Text">Company Name</span>
                <span className="C1Number">
                  4.9{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M15.2904 5.9597L10.8896 5.31899L8.92295 1.33849C8.74616 0.982806 8.40129 0.803009 8.05643 0.803009C7.71368 0.803009 7.37122 0.980401 7.19383 1.33849L5.22658 5.31869L0.825457 5.9588C0.0362136 6.07305 -0.280085 7.0439 0.292079 7.60013L3.47581 10.697L2.72235 15.071C2.61531 15.6958 3.11411 16.197 3.67275 16.197C3.82098 16.197 3.97341 16.1618 4.11984 16.0843L8.05703 14.0193L11.9939 16.0849C12.1401 16.1615 12.2922 16.1964 12.4398 16.1964C12.9991 16.1964 13.4988 15.697 13.3917 15.0719L12.6392 10.6976L15.8235 7.60133C16.396 7.0451 16.0797 6.07395 15.2904 5.9597ZM11.6301 9.66389L11.0853 10.1937L11.214 10.9417L11.8009 14.3527L8.73022 12.7415L8.05733 12.3885L8.05824 2.85174L9.59253 5.9573L9.92867 6.6377L10.6806 6.74714L14.1151 7.24715L11.6301 9.66389Z"
                      fill="#F4CE14"
                    />
                  </svg>
                </span>
              </div>
              <div className="C2">
                <span className="C2Text">Andrew Smith</span>
              </div>
            </div>
            <div className="Domain">
              <div className="D1">
                <span className="D1Text">Domain</span>
              </div>
              <div className="D2">
                <span className="D2Text">Company Domain</span>
              </div>
            </div>
            <div className="CreateDate">
              <div className="CD1">
                <span className="CD1Text">Created Date</span>
              </div>
              <div className="CD2">
                <span className="CD2Text">22/4/2022</span>
              </div>
            </div>
          </div>
          <div className="UnderOtherProfile">
            <div className="Part1UnderOther">
              <div className="UnderDescription">
                <h6>Description</h6>
                <p className="Para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidata.
                </p>
              </div>
              <CommentComp />  
             
              <div className="Part1UnderAddComments">
                <input type="text" className="Part1UnderAddCommentsInputs"></input>
                <Button variant="filled" color="#388E3C" h={50} w={90}>Send</Button>
              </div>
            </div>
            <div className="Part2UnderOther">
              <div className="CurrentProjects">
                <div className={`${
                  isDarkMode
                    ? "CP1Dark"
                    : "CP1"
                }`}>Current Projects</div>
                <CurrentProject/>
              </div>
              <div className="TeamAll">
                <div className={`${
                  isDarkMode
                    ? "TA1Dark"
                    : "TA1"
                }`}>Teams</div>
                <TeamOther/>
                <TeamOther/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherCompanyProfile;
