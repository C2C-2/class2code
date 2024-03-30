import React from "react";
import "./AIChatResponse.css";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import NavBarAI from "../../../components/NavBarAI/NavBarAI";
import SideBarAI from "../../../components/SideBarAI/SideBarAI";
import { IconAt } from "@tabler/icons-react";
import { Text, rem } from "@mantine/core";
import classes from "./TextInput.module.css";
function AIChatResponse() {
  return (
    <div className="AIChatResponseMainAi">
      <div className="AIChatResponsePart1Ai">
        <SideBarAI />
      </div>
      <div className="AIChatResponsePart2Ai">
        <div className="AIChatResponseTopPart">
          <NavBarAI />
        </div>
        <div className="AIChatResponseUnderPart">
          <div className="AIChatResponseUn1">
            <div className="AIChatResponseUserPart">
              <svg
                width="64px"
                height="64px"
                viewBox="-1.5 -1.5 18.00 18.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#dedede"
                className="AIChatResponseSvgImg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.09"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M5 5.5C5 4.11929 6.11929 3 7.5 3C8.88071 3 10 4.11929 10 5.5C10 6.88071 8.88071 8 7.5 8C6.11929 8 5 6.88071 5 5.5Z"
                    fill="#383838"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5C14 9.34956 13.2275 11.0187 11.9875 12.2024C11.8365 10.4086 10.3328 9 8.5 9H6.5C4.66724 9 3.16345 10.4086 3.01247 12.2024C1.77251 11.0187 1 9.34956 1 7.5Z"
                    fill="#383838"
                  ></path>
                </g>
              </svg>
              <div className="AIChatResponseInputUser">
                <span className="AIChatResponseTextUser">
                  The advantages of Artificial Intelligence
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_91_832)">
                    <path
                      d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                      fill="#718096"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_91_832">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="AIChatResponseAIPart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#283739" />
                <g filter="url(#filter0_ddi_91_835)">
                  <path
                    d="M25.5398 16.8526C25.4742 16.8526 25.4185 16.8395 25.3725 16.8133C25.3266 16.787 25.2905 16.7412 25.2643 16.6756L24.6936 15.3388L23.2569 14.7097C23.1913 14.6835 23.1454 14.6474 23.1192 14.6016C23.0929 14.5557 23.0798 14.5 23.0798 14.4345C23.0798 14.3689 23.0929 14.3132 23.1192 14.2673C23.1454 14.2215 23.1913 14.1854 23.2569 14.1592L24.6936 13.5498L25.2643 12.2719C25.2905 12.2064 25.3266 12.1605 25.3725 12.1343C25.4185 12.1081 25.4742 12.095 25.5398 12.095C25.6054 12.095 25.6612 12.1081 25.7071 12.1343C25.753 12.1605 25.7891 12.2064 25.8153 12.2719L26.386 13.5498L27.8227 14.1592C27.8883 14.1854 27.9342 14.2215 27.9604 14.2673C27.9867 14.3132 27.9998 14.3689 27.9998 14.4345C27.9998 14.5 27.9867 14.5557 27.9604 14.6016C27.9342 14.6474 27.8883 14.6835 27.8227 14.7097L26.386 15.3388L25.8153 16.6756C25.7891 16.7412 25.753 16.787 25.7071 16.8133C25.6612 16.8395 25.6054 16.8526 25.5398 16.8526ZM25.5398 28.5697C25.4873 28.5697 25.4349 28.5565 25.3824 28.5303C25.3299 28.5041 25.2905 28.4583 25.2643 28.3927L24.6936 27.1149L23.2766 26.5054C23.211 26.4792 23.1651 26.4431 23.1389 26.3973C23.1126 26.3514 23.0995 26.2957 23.0995 26.2302C23.0995 26.1646 23.1126 26.1089 23.1389 26.0631C23.1651 26.0172 23.211 25.9812 23.2766 25.9549L24.6936 25.3455L25.2643 23.989C25.2905 23.9235 25.3266 23.8776 25.3725 23.8514C25.4185 23.8252 25.4742 23.812 25.5398 23.812C25.6054 23.812 25.6612 23.8252 25.7071 23.8514C25.753 23.8776 25.7891 23.9235 25.8153 23.989L26.386 25.3455L27.803 25.9549C27.8686 25.9812 27.9145 26.0172 27.9408 26.0631C27.967 26.1089 27.9801 26.1646 27.9801 26.2302C27.9801 26.2957 27.967 26.3514 27.9408 26.3973C27.9145 26.4431 27.8686 26.4792 27.803 26.5054L26.386 27.1149L25.8153 28.3927C25.7891 28.4583 25.7497 28.5041 25.6973 28.5303C25.6448 28.5565 25.5923 28.5697 25.5398 28.5697ZM16.9003 25.1686C16.7953 25.1686 16.6937 25.1391 16.5953 25.0801C16.4969 25.0211 16.4214 24.9392 16.369 24.8343L15.0898 22.1017L12.3346 20.8631C12.2296 20.8107 12.1476 20.7353 12.0886 20.637C12.0295 20.5387 12 20.4372 12 20.3323C12 20.2275 12.0295 20.1259 12.0886 20.0276C12.1476 19.9293 12.2296 19.8539 12.3346 19.8015L15.0898 18.563L16.369 15.8499C16.4214 15.732 16.4969 15.6435 16.5953 15.5845C16.6937 15.5256 16.7953 15.4961 16.9003 15.4961C17.0053 15.4961 17.1069 15.5256 17.2053 15.5845C17.3037 15.6435 17.3792 15.7254 17.4317 15.8303L18.7305 18.563L21.4661 19.8015C21.5841 19.8539 21.6727 19.9293 21.7317 20.0276C21.7908 20.1259 21.8203 20.2275 21.8203 20.3323C21.8203 20.4372 21.7908 20.5387 21.7317 20.637C21.6727 20.7353 21.5841 20.8107 21.4661 20.8631L18.7305 22.1017L17.4317 24.8343C17.3792 24.9523 17.3037 25.0375 17.2053 25.0899C17.1069 25.1423 17.0053 25.1686 16.9003 25.1686Z"
                    fill="url(#paint0_linear_91_835)"
                    shape-rendering="crispEdges"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_ddi_91_835"
                    x="5.63323"
                    y="6.5332"
                    width="28.0017"
                    height="29.5742"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="-1.31726" dy="2.48816" />
                    <feGaussianBlur stdDeviation="2.52475" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0506089 0 0 0 0 0.0159861 0 0 0 0 0.191833 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_91_835"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="1.24408" dy="-1.1709" />
                    <feGaussianBlur stdDeviation="2.19544" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_dropShadow_91_835"
                      result="effect2_dropShadow_91_835"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_91_835"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3.07361" />
                    <feGaussianBlur stdDeviation="1.9393" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect3_innerShadow_91_835"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_91_835"
                    x1="22.7967"
                    y1="19.8497"
                    x2="20.3181"
                    y2="31.3722"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0.96" />
                    <stop offset="1" stop-color="white" stop-opacity="0.23" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="AIChatResponseInputAI">
                <span className="">
                  Artificial Intelligence (AI) offers numerous advantages and
                  has the potential to revolutionize various aspects of our
                  lives. Here are some key advantages of AI: Automation: AI can
                  automate repetitive and mundane tasks, saving time and effort
                  for humans. It can handle large volumes of data, perform
                  complex calculations, and execute tasks with precision and
                  consistency. This automation leads to increased productivity
                  and efficiency in various industries.
                  <br></br> Decision-making: AI
                  systems can analyze vast amounts of data, identify patterns,
                  and make informed decisions based on that analysis. This
                  ability is particularly useful in complex scenarios where
                  humans may struggle to process large datasets or where quick
                  and accurate decisions are crucial.
                </span>
              </div>
            </div>
          </div>
          <div className="AIChatResponseUn2">
            <div className="AIChatResponsePart1Under">
              <Input
                radius="lg"
                placeholder="Send Message"
                className="AIChatResponseInputsAi"
              />
              <Button
                variant="filled"
                color="#388E3C"
                size="md"
                radius="xl"
                className="AIChatResponseButtonAi"
              >
                Submit
              </Button>
            </div>
            <div className="AIChatResponsePart2Under">
              <div className="AIChatResponseLeftSide">
                <span className="AIChatResponseLeftText">@2023Class2Code</span>
              </div>
              <div className="AIChatResponseRightSideAi">
                <div className="AIChatResponseTexts">
                  <span className="AIChatResponseLeftText">HomePage</span>
                  <span className="AIChatResponseLeftText">License</span>
                  <span className="AIChatResponseLeftText">Terms of Use</span>
                  <span className="AIChatResponseLeftText">PrivacyPolicy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatResponse;
