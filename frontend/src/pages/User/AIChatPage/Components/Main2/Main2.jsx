import { useState } from "react";
import { Button } from "@mantine/core";
import "./Main2.css";

const Main2 = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {};
  return (
    <div>
      <div className="content">
        <div className="MainTop">
          <span>ChatUI</span>
        </div>
        <div className="mid">
          <div className="userSend">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="100"
              className="svgUser"
              viewBox="0 0 96 100"
              fill="none"
            >
              <circle cx="48" cy="20" r="19.5" stroke="#E2E8F0" />
              <g filter="url(#filter0_d_91_838)">
                <path
                  d="M48 19.0461C47.099 19.0461 46.3577 18.7622 45.7762 18.1944C45.1946 17.6266 44.9039 16.9028 44.9039 16.023C44.9039 15.1375 45.1946 14.4122 45.7762 13.8473C46.3577 13.2824 47.099 13 48 13C48.901 13 49.6423 13.2824 50.2238 13.8473C50.8054 14.4122 51.0961 15.1375 51.0961 16.023C51.0961 16.9028 50.8054 17.6266 50.2238 18.1944C49.6423 18.7622 48.901 19.0461 48 19.0461ZM42.0769 26C41.7778 26 41.5235 25.8978 41.3141 25.6933C41.1047 25.4888 41 25.2406 41 24.9485V24.2703C41 23.7808 41.1328 23.3543 41.3985 22.991C41.6641 22.6276 42.0093 22.3484 42.4341 22.1533C43.4165 21.7269 44.3636 21.4056 45.2754 21.1894C46.1872 20.9733 47.0954 20.8652 48 20.8652C48.9046 20.8652 49.8104 20.9756 50.7174 21.1964C51.6244 21.4172 52.5691 21.7362 53.5515 22.1533C53.9859 22.3484 54.3359 22.6276 54.6015 22.991C54.8672 23.3543 55 23.7808 55 24.2703V24.9485C55 25.2406 54.8953 25.4888 54.6859 25.6933C54.4765 25.8978 54.2222 26 53.9231 26H42.0769Z"
                  fill="black"
                  fillOpacity="0.6"
                  shapeRendering="crispEdges"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_91_838"
                  x="0.0499992"
                  y="4.55"
                  width="95.9"
                  height="94.9"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="32.5" />
                  <feGaussianBlur stdDeviation="20.475" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.262745 0 0 0 0 0.0941176 0 0 0 0 1 0 0 0 0.28 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_91_838"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_91_838"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <div className="inp1">
              <text className="textUser">
                The advantages of Artificial Intelligence
              </text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="edit"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_91_832)">
                  <path
                    d="M3 17.4601V20.5001C3 20.7801 3.22 21.0001 3.5 21.0001H6.54C6.67 21.0001 6.8 20.9501 6.89 20.8501L17.81 9.94006L14.06 6.19006L3.15 17.1001C3.05 17.2001 3 17.3201 3 17.4601ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z"
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
          <div className="aiResponse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              className="svgUser1"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle cx="20" cy="20" r="20" fill="#283739" />
              <g filter="url(#filter0_ddi_91_835)">
                <path
                  d="M25.5398 16.8526C25.4742 16.8526 25.4185 16.8395 25.3725 16.8133C25.3266 16.787 25.2905 16.7412 25.2643 16.6756L24.6936 15.3388L23.2569 14.7097C23.1913 14.6835 23.1454 14.6474 23.1192 14.6016C23.0929 14.5557 23.0798 14.5 23.0798 14.4345C23.0798 14.3689 23.0929 14.3132 23.1192 14.2673C23.1454 14.2215 23.1913 14.1854 23.2569 14.1592L24.6936 13.5498L25.2643 12.2719C25.2905 12.2064 25.3266 12.1605 25.3725 12.1343C25.4185 12.1081 25.4742 12.095 25.5398 12.095C25.6054 12.095 25.6612 12.1081 25.7071 12.1343C25.753 12.1605 25.7891 12.2064 25.8153 12.2719L26.386 13.5498L27.8227 14.1592C27.8883 14.1854 27.9342 14.2215 27.9604 14.2673C27.9867 14.3132 27.9998 14.3689 27.9998 14.4345C27.9998 14.5 27.9867 14.5557 27.9604 14.6016C27.9342 14.6474 27.8883 14.6835 27.8227 14.7097L26.386 15.3388L25.8153 16.6756C25.7891 16.7412 25.753 16.787 25.7071 16.8133C25.6612 16.8395 25.6054 16.8526 25.5398 16.8526ZM25.5398 28.5697C25.4873 28.5697 25.4349 28.5565 25.3824 28.5303C25.3299 28.5041 25.2905 28.4583 25.2643 28.3927L24.6936 27.1149L23.2766 26.5054C23.211 26.4792 23.1651 26.4431 23.1389 26.3973C23.1126 26.3514 23.0995 26.2957 23.0995 26.2302C23.0995 26.1646 23.1126 26.1089 23.1389 26.0631C23.1651 26.0172 23.211 25.9812 23.2766 25.9549L24.6936 25.3455L25.2643 23.989C25.2905 23.9235 25.3266 23.8776 25.3725 23.8514C25.4185 23.8252 25.4742 23.812 25.5398 23.812C25.6054 23.812 25.6612 23.8252 25.7071 23.8514C25.753 23.8776 25.7891 23.9235 25.8153 23.989L26.386 25.3455L27.803 25.9549C27.8686 25.9812 27.9145 26.0172 27.9408 26.0631C27.967 26.1089 27.9801 26.1646 27.9801 26.2302C27.9801 26.2957 27.967 26.3514 27.9408 26.3973C27.9145 26.4431 27.8686 26.4792 27.803 26.5054L26.386 27.1149L25.8153 28.3927C25.7891 28.4583 25.7497 28.5041 25.6973 28.5303C25.6448 28.5565 25.5923 28.5697 25.5398 28.5697ZM16.9003 25.1686C16.7953 25.1686 16.6937 25.1391 16.5953 25.0801C16.4969 25.0211 16.4214 24.9392 16.369 24.8343L15.0898 22.1017L12.3346 20.8631C12.2296 20.8107 12.1476 20.7353 12.0886 20.637C12.0295 20.5387 12 20.4372 12 20.3323C12 20.2275 12.0295 20.1259 12.0886 20.0276C12.1476 19.9293 12.2296 19.8539 12.3346 19.8015L15.0898 18.563L16.369 15.8499C16.4214 15.732 16.4969 15.6435 16.5953 15.5845C16.6937 15.5256 16.7953 15.4961 16.9003 15.4961C17.0053 15.4961 17.1069 15.5256 17.2053 15.5845C17.3037 15.6435 17.3792 15.7254 17.4317 15.8303L18.7305 18.563L21.4661 19.8015C21.5841 19.8539 21.6727 19.9293 21.7317 20.0276C21.7908 20.1259 21.8203 20.2275 21.8203 20.3323C21.8203 20.4372 21.7908 20.5387 21.7317 20.637C21.6727 20.7353 21.5841 20.8107 21.4661 20.8631L18.7305 22.1017L17.4317 24.8343C17.3792 24.9523 17.3037 25.0375 17.2053 25.0899C17.1069 25.1423 17.0053 25.1686 16.9003 25.1686Z"
                  fill="url(#paint0_linear_91_835)"
                  shapeRendering="crispEdges"
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
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                  <stop stopColor="white" stopOpacity="0.96" />
                  <stop offset="1" stopColor="white" stopOpacity="0.23" />
                </linearGradient>
              </defs>
            </svg>
            <text className="AiText">
              Artificial Intelligence (AI) offers numerous advantages and has
              the potential to revolutionize various aspects of our lives. Here
              are some key advantages of AI: Automation: AI can automate
              repetitive and mundane tasks, saving time and effort for humans.
              It can handle large volumes of data, perform complex calculations,
              and execute tasks with precision and consistency. This automation
              leads to increased productivity and efficiency in various
              industries. Decision-making: AI systems can analyze vast amounts
              of data, identify patterns, and make informed decisions based on
              that analysis. This ability is particularly useful in complex
              scenarios where humans may struggle to process large datasets or
              where quick and accurate decisions are crucial. Improved accuracy:
              AI algorithms can achieve high levels of accuracy and precision in
              tasks such as image recognition, natural language processing, and
              data analysis. They can eliminate human errors caused by fatigue,
              distractions, or bias, leading to more reliable and consistent
              results. Continuous operation: AI systems can work tirelessly
              without the need for breaks, resulting in uninterrupted 24/7
              operations. This capability is especially beneficial in
              applications like customer support chatbots, manufacturing
              processes, and surveillance systems.
            </text>
          </div>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="filled"
              color="green"
              size="md"
              radius="lg"
              onClick={sendMessage}
              className="newButtonSubmit"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="Under">
        <div className="UnderClass">© 2023 Class2Code.</div>
        <div className="UnderHome">Home Page</div>
        <div className="UnderLicense">License</div>
        <div className="UnderTeamOfUse">Team of Use</div>
        <div className="UnderPrivacy">Privacy Policy</div>
      </div>
    </div>
  );
};

export default Main2;
