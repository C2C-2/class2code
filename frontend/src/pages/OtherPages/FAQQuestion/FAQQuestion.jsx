import "./FAQQuestion.css";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
function FAQQuestion() {
  return (
    <div className="FAQQuestionAll" id="man">
      <div className="FAQQuestionMain">
        <div className="FAQQuestionCenter">
          <div className="FAQQuestionFakeDiv"></div>
          <div className="FAQQuestionCenterDesign">
            <Link to="/Dashboard">
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
            </Link>
            <div className="FAQQuestionCenterContent">
              <h5 className="FAQQuestionCenterContentText1">FAQs</h5>
              <hr className="FAQQuestionCenterContentLine" />
              <div className="FAQQuestionCenterContentDivText">
                <h5 className="FAQQuestionCenterContentText2">
                  What is Webflow and why is it the best website builder?
                </h5>
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.82422 12.0001H15.8574"
                      stroke="#388E3C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <hr className="FAQQuestionCenterContentLine" />
              <div className="FAQQuestionCenterContentDivText">
                <h5 className="FAQQuestionCenterContentText3">
                  What is your favorite template from BRIX Templates?
                </h5>
                <div className="FAQQuestionCenterContentDivTextInside">
                  <h5 className="FAQQuestionCenterContentText4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit id
                    venenatis pretium risus euismod dictum egestas orci netus
                    feugiat ut egestas ut sagittis tincidunt phasellus elit
                    etiam cursus orci in. Id sed montes.
                  </h5>
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.8574 16.3203L7.82422 7.68034L15.8574 16.3203Z"
                        fill="#EB5757"
                      />
                      <path
                        d="M15.8574 16.3203L7.82422 7.68034"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.82422 12.0001H15.8574"
                      stroke="#388E3C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.82422 12.0001H15.8574"
                      stroke="#388E3C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <hr className="FAQQuestionCenterContentLine" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQQuestion;
