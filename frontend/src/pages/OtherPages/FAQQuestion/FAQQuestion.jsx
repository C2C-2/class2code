import React from "react";
import "./FAQQuestion.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
function FAQQuestion() {
  return (
    <div className="FAQQuestionAll">
      <SideBar />
      <div className="FAQQuestionMain">
        <NavBar />
        <div className="FAQQuestionCenter">
          <div className="FAQQuestionCenterButtonBack">
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
          <div className="FAQQuestionCenterContent">
            <span className="FAQQuestionCenterContentText1">FAQs </span>
            <hr className="FAQQuestionCenterContentLine" />
            <div className="FAQQuestionCenterContentDivText">
              <span className="FAQQuestionCenterContentText2">
                What is Webflow and why is it the best website builder?
              </span>
              <button  className="FAQQuestionCenterContentButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <ellipse
                  cx="11.8408"
                  cy="12.0001"
                  rx="11.1572"
                  ry="12"
                  fill="#F2F1FA"
                />
                <path
                  d="M11.8398 7.6801V16.3201"
                  stroke="#388E3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.82422 12.0001H15.8574"
                  stroke="#388E3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </button >
            </div>
            <hr className="FAQQuestionCenterContentLine" />
            <div className="FAQQuestionCenterContentDivText">
              <span className="FAQQuestionCenterContentText3">
                What is your favorite template from BRIX Templates?
              </span>
              <div className="FAQQuestionCenterContentDivTextInside">
                <span className="FAQQuestionCenterContentText4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit id
                  venenatis pretium risus euismod dictum egestas orci netus
                  feugiat ut egestas ut sagittis tincidunt phasellus elit etiam
                  cursus orci in. Id sed montes.
                </span>
                <button className="FAQQuestionCenterContentButton1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                >
                  <ellipse
                    cx="11.8408"
                    cy="12.0001"
                    rx="11.1572"
                    ry="12"
                    fill="#EB5757"
                  />
                  <path
                    d="M7.82422 16.3203L15.8574 7.68034L7.82422 16.3203Z"
                    fill="#EB5757"
                  />
                  <path
                    d="M7.82422 16.3203L15.8574 7.68034"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.8574 16.3203L7.82422 7.68034L15.8574 16.3203Z"
                    fill="#EB5757"
                  />
                  <path
                    d="M15.8574 16.3203L7.82422 7.68034"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                </button>
              </div>
            </div>
            <hr className="FAQQuestionCenterContentLine" />
            <div className="FAQQuestionCenterContentDivText">
              <span className="FAQQuestionCenterContentText2">
              How do you clone a Webflow Template?
              </span>
              <button className="FAQQuestionCenterContentButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <ellipse
                  cx="11.8408"
                  cy="12.0001"
                  rx="11.1572"
                  ry="12"
                  fill="#F2F1FA"
                />
                <path
                  d="M11.8398 7.6801V16.3201"
                  stroke="#388E3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.82422 12.0001H15.8574"
                  stroke="#388E3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </button>
            </div>
            <hr className="FAQQuestionCenterContentLine" />
            <div className="FAQQuestionCenterContentDivText">
              <span className="FAQQuestionCenterContentText2">
              Why is BRIX Templates the best Webflow agency?
              </span>
              <button className="FAQQuestionCenterContentButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <ellipse
                  cx="11.8408"
                  cy="12.0001"
                  rx="11.1572"
                  ry="12"
                  fill="#F2F1FA"
                />
                <path
                  d="M11.8398 7.6801V16.3201"
                  stroke="#388E3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.82422 12.0001H15.8574"
                  stroke="#388E3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </button>
            </div>
            <hr className="FAQQuestionCenterContentLine" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQQuestion;
