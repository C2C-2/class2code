import "./NewNavBar.css";
import MainLogo from "./logo2 2.png";
import { useState, useEffect } from "react";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import clsx from "clsx";
import classes from "./Light_DarkMode/LightDarkMode.module.css";
import ProfileLogo from "./Profile.png";
function NewNavBar({ sendDataToParent }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  sendDataToParent(computedColorScheme);
  useEffect(() => {
    setIsDarkMode(computedColorScheme === "dark");
  }, [computedColorScheme]);

  return (
    <div
      className="NewMainNav"
      style={{
        backgroundColor: computedColorScheme === "dark" ? "#000" : "#fff",
      }}
    >
      <div className={`${isDarkMode ? "NewNavDark" : "NewNav"}`}>
        <div className="NewTopImage">
          <img className="NewNavMainLogo" alt="Logo" src={MainLogo} />
          <span className={`${isDarkMode ? "NewNavTextBarDark" : "NewNavTextBar"}`}>
            Class2Code
          </span>
        </div>
        <div className="NewTopPartNavBar">
          <span className="NewBackSearch">
            <button className="NewButtonSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                className="NewSvg"
              >
                <circle
                  cx="5"
                  cy="5.5"
                  r="4.3"
                  stroke="#2B3674"
                  stroke-width="1.4"
                />
                <line
                  x1="10.0101"
                  y1="11.5"
                  x2="8"
                  y2="9.48995"
                  stroke="#2B3674"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search"
              className="NewTextSearch"
            ></input>
          </span>
          <div className="NewSvg">
            <button className="NewButtonSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <g clip-path="url(#clip0_214_3796)">
                  <path
                    d="M19.2896 17.79L17.9996 16.5V11.5C17.9996 8.43 16.3596 5.86 13.4996 5.18V4.5C13.4996 3.67 12.8296 3 11.9996 3C11.1696 3 10.4996 3.67 10.4996 4.5V5.18C7.62956 5.86 5.99956 8.42 5.99956 11.5V16.5L4.70956 17.79C4.07956 18.42 4.51956 19.5 5.40956 19.5H18.5796C19.4796 19.5 19.9196 18.42 19.2896 17.79ZM15.9996 17.5H7.99956V11.5C7.99956 9.02 9.50956 7 11.9996 7C14.4896 7 15.9996 9.02 15.9996 11.5V17.5ZM11.9996 22.5C13.0996 22.5 13.9996 21.6 13.9996 20.5H9.99956C9.99956 21.6 10.8896 22.5 11.9996 22.5Z"
                    fill="#A3AED0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_214_3796">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              variant="transparent"
              color="gray"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun
                className={clsx(classes.icon, classes.light)}
                stroke={3}
              />
              <IconMoon
                className={clsx(classes.icon, classes.dark)}
                stroke={1.5}
              />
            </ActionIcon>
            <button className="NewButtonSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <g clip-path="url(#clip0_214_3789)">
                  <path
                    d="M11 7.5H13V9.5H11V7.5ZM12 17.5C12.55 17.5 13 17.05 13 16.5V12.5C13 11.95 12.55 11.5 12 11.5C11.45 11.5 11 11.95 11 12.5V16.5C11 17.05 11.45 17.5 12 17.5ZM12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM12 20.5C7.59 20.5 4 16.91 4 12.5C4 8.09 7.59 4.5 12 4.5C16.41 4.5 20 8.09 20 12.5C20 16.91 16.41 20.5 12 20.5Z"
                    fill="#A3AED0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_214_3789">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className="NewButtonSvg">
              <img className="NewProfileLogo" alt="Logo" src={ProfileLogo} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewNavBar;
