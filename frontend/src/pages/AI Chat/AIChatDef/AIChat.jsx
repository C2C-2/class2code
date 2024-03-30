import React from "react";
import "./AIChat.css";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";

import NavBarAI from "../../../components/NavBarAI/NavBarAI";
import SideBarAI from "../../../components/SideBarAI/SideBarAI";
function AIChat() {
  return (
    <div className="MainAiDef">
      <div className="Part1AiDef">
        <SideBarAI />
      </div>
      <div className="Part2AiDef">
        <div className="TopPartDef">
          <NavBarAI />
        </div>
        <div className="UnderPartDef">
          <div className="Un1Def">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="350"
              height="350"
              viewBox="0 0 304 453"
              fill="none"
              className="SvgPartDef"
            >
              <path
                d="M96.9677 285.612H15.5241C9.39882 285.612 4.86645 282.864 1.92703 277.369C-1.01239 271.875 -0.589048 266.503 3.19707 261.255L177.671 8.01901C180.256 4.53086 183.488 2.13847 187.366 0.841847C191.244 -0.454372 195.123 -0.253718 199.001 1.44381C202.879 2.98723 205.949 5.58027 208.212 9.22293C210.474 12.8656 211.282 16.755 210.636 20.8913L189.536 189.3H288.247C294.926 189.3 299.635 192.248 302.375 198.144C305.114 204.04 304.391 209.612 300.205 214.86L108.002 446.148C105.416 449.39 102.084 451.497 98.006 452.469C93.9278 453.441 90.1497 453.078 86.6717 451.381C83.0396 449.837 80.2308 447.321 78.2453 443.833C76.2603 440.345 75.514 436.455 76.0066 432.164L96.9677 285.612Z"
                fill="url(#paint0_linear_91_467)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_91_467"
                  x1="152"
                  y1="0"
                  x2="152"
                  y2="453"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FBFBFF" />
                  <stop offset="1" stop-color="#CACAFF" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="Un2Def">
            <div className="Part1UnderDef">
              <input
                placeholder="Send Message"
                className="InputsAiDef"
              />
              <Button
                variant="filled"
                color="#388E3C"
                size="md"
                radius="xl"
                className="ButtonAiDef"
              >
                Submit
              </Button>
            </div>
            <div className="Part2UnderDef">
              <div className="LeftSideDef">
                <span className="LeftTextDef">@2023Class2Code</span>
              </div>
              <div className="RightSideAiDef">
                <div className="TextsDef">
                  <span className="LeftTextDef">HomePage</span>
                  <span className="LeftTextDef">License</span>
                  <span className="LeftTextDef">Terms of Use</span>
                  <span className="LeftTextDef">PrivacyPolicy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
