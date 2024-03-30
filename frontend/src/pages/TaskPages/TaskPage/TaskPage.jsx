import React from "react";
import "./TaskPage.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button, Input, TextInput, Checkbox } from "@mantine/core";
import { GoArrowUp, GoCheck } from "react-icons/go";
function TaskPage() {
  return (
    <div className="TaskPageAll">
      <SideBar />
      <div className="TaskPageCenter">
        <NavBar />
        <div className="TaskPageMain">
          <div className="TaskPageButtonBack">
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
          <div className="TaskPageContent">
            <div className="TaskPageContentPart1">
              <div className="TSCP1">
                <div className="ArrowDesign">
                  <GoArrowUp className="TaskPageArrow" />
                </div>
                <span className="TaskPageText1Part1">Task Name</span>
                <span className="TaskPageText2Part1">12 Parts</span>
              </div>
              <div className="TSCP2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.4 9L17.16 7.8C17.07 7.34 16.66 7 16.18 7H9C8.45 7 8 7.45 8 8V23C8 23.55 8.45 24 9 24C9.55 24 10 23.55 10 23V17H15.6L15.84 18.2C15.93 18.67 16.34 19 16.82 19H22C22.55 19 23 18.55 23 18V10C23 9.45 22.55 9 22 9H17.4Z"
                    fill="#164B60"
                  />
                </svg>
                <div className="TaskPageTimes">
                  <span className="TaskPageText1Part1">StartDate:</span>
                  <span className="TaskPageText1Part1">Sep 20, 9pm</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.99 5C9.47 5 5 9.48 5 15C5 20.52 9.47 25 14.99 25C20.52 25 25 20.52 25 15C25 9.48 20.52 5 14.99 5ZM15 23C10.58 23 7 19.42 7 15C7 10.58 10.58 7 15 7C19.42 7 23 10.58 23 15C23 19.42 19.42 23 15 23ZM14.78 10H14.72C14.32 10 14 10.32 14 10.72V15.44C14 15.79 14.18 16.12 14.49 16.3L18.64 18.79C18.98 18.99 19.42 18.89 19.62 18.55C19.83 18.21 19.72 17.76 19.37 17.56L15.5 15.26V10.72C15.5 10.32 15.18 10 14.78 10Z"
                    fill="#C3CAD9"
                  />
                </svg>
                <div className="TaskPageTimes">
                  <span className="TaskPageText1Part1">EndDate:</span>
                  <span className="TaskPageText1Part1">Sep 22, 9pm</span>
                </div>
              </div>
            </div>
            <div className="TaskPageContentPart2">
              <div className="TaskPagePart2TitleAll">
                <div className="TaskPageContentPart2Title">
                  <div className="TaskPageTitle1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9205 8.42249L18.3805 10.8825C18.7705 11.2725 19.4005 11.2725 19.7905 10.8825C20.1805 10.4925 20.1805 9.86249 19.7905 9.47249L16.6205 6.29249C16.4337 6.10523 16.1801 6 15.9155 6C15.651 6 15.3974 6.10523 15.2105 6.29249L12.0405 9.47249C11.6505 9.86249 11.6505 10.4925 12.0405 10.8825C12.4305 11.2725 13.0605 11.2725 13.4505 10.8825L15.9205 8.42249ZM15.9205 20.7625L13.4605 18.3025C13.2737 18.1152 13.0201 18.01 12.7555 18.01C12.491 18.01 12.2374 18.1152 12.0505 18.3025C11.6605 18.6925 11.6605 19.3225 12.0505 19.7125L15.2205 22.8925C15.6105 23.2825 16.2405 23.2825 16.6305 22.8925L19.8005 19.7225C20.1905 19.3325 20.1905 18.7025 19.8005 18.3125C19.6137 18.1252 19.3601 18.02 19.0955 18.02C18.831 18.02 18.5774 18.1252 18.3905 18.3125L15.9205 20.7625Z"
                        fill="#C3CAD9"
                      />
                    </svg>
                    <span className="TaskPageText1Part1">Task Parts</span>
                  </div>
                  <div className="TaskPageTitle2">
                    <span className="TaskPageText1Part1">PRIORIY</span>
                  </div>
                </div>
                <hr className="TaskPageLine" />
              </div>
              <div className="TaskPagePart2TitleAll">
                <div className="TaskPageContentPart2Title">
                  <div className="TaskPageTitle1">
                    <Checkbox
                      defaultChecked
                      color="#388E3C"
                      radius="xl"
                    />
                    <span className="TaskPageText1Part1">
                      Make Money Online Through Advertising
                    </span>
                  </div>
                </div>
                <hr className="TaskPageLine" />
              </div>
              <div className="TaskPagePart2TitleAll">
                <div className="TaskPageContentPart2Title">
                  <div className="TaskPageTitle1">
                  <Checkbox
                      defaultChecked
                      color="#388E3C"
                      radius="xl"
                    />
                    <span className="TaskPageText1Part1">
                      Overseas Adventure Travel In Nepal
                    </span>
                  </div>
                </div>
                <hr className="TaskPageLine" />
              </div>
              <div className="TaskPagePart2TitleAll">
                <div className="TaskPageContentPart2Title">
                  <div className="TaskPageTitle1">
                  <Checkbox
                      defaultChecked
                      color="#388E3C"
                      radius="xl"
                    />
                    <span className="TaskPageText1Part1">
                      Importance Of The Custom Company Logo Design
                    </span>
                  </div>
                </div>
                <hr className="TaskPageLine" />
              </div>
            </div>
            <div className="TaskPageContentPart3">
              <button className="TaskPageButton1">
                <span className="TaskPageButton1Text">Start</span>
              </button>
              <button className="TaskPageButton2">
                <span className="TaskPageButton2Text">Done</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
