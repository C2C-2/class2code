import "./SideBar.css";
import ProImg from "./Avatar.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Divider, Menu, NavLink, rem, Text } from "@mantine/core";
import {
  IconActivity,
  IconChevronRight,
  IconFingerprint,
  IconGauge,
} from "@tabler/icons-react";
import { FaTeamspeak, FaUser, FaUserFriends } from "react-icons/fa";
import { Paths } from "../../assets/Paths";

function SideBar({ colorSide }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [isSettingDropdownOpen, setSettingDropdownOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    setIsDarkMode(colorSide === "dark");
  }, [colorSide]);

  const toggleTeamDropdown = () => {
    setTeamDropdownOpen(!isTeamDropdownOpen);
  };
  const toggleSettingDropdown = () => {
    setSettingDropdownOpen(!isSettingDropdownOpen);
  };
  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen(!isCompanyDropdownOpen);
  };
  const handleTextClick = (text) => {
    setSelectedText(selectedText === text ? null : text);
  };

  const data = [
    {
      icon: IconGauge,
      label: "Dashboard",
      link: Paths.Dashboard,
    },
    {
      icon: IconFingerprint,
      label: "Security",
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    },
    { icon: IconActivity, label: "Activity" },
  ];

  return (
    <div className={`${isDarkMode ? "SideBarMainDark" : "SideBarMain"}`}>
      <div className="SideBarSectionProfile">
        <div className="SideBarSectionProfilePart1">
          <img
            className="SideBarSectionProfilePart1Img"
            alt="Avatar"
            src={ProImg}
          />
          <div className="SideBarSectionProfilePart1Texts">
            <span className="SideBarSectionProfilePart1Text1">
              PRODUCT MANAGER
            </span>
            <span
              className={`${
                isDarkMode
                  ? "SideBarSectionProfilePart1Text2Dark"
                  : "SideBarSectionProfilePart1Text2"
              }`}
            >
              Andrew Smith
            </span>
          </div>
        </div>
        <hr
          className={`${
            isDarkMode
              ? "SideBarSectionProfilePart2Dark"
              : "SideBarSectionProfilePart2"
          }`}
        ></hr>
      </div>
      <div className="SideBarSectionCenter">
        <div className="SideBarSectionCenterMain">
          <span className="SideBarSectionCenterMainText">Main</span>
        </div>
        <SideBarMenuCard data={data} />
      </div>
      <Divider my="md" w={"100%"} />
      <div className="SideBarSettings">
        <span className="SideBarSettingText">Setting</span>
        <div className="SideBarSettingsCenter">
          <ul className="SideBarSettingsCenterSections">
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    stroke={` ${selectedText === "Profile" ? "#008000" : ""}`}
                    clipRule="evenodd"
                    d="M10.0007 2.5C8.89558 2.5 7.83577 2.93899 7.05437 3.72039C6.27297 4.50179 5.83398 5.5616 5.83398 6.66667C5.83398 7.77174 6.27297 8.83154 7.05437 9.61294C7.10934 9.66791 7.16568 9.72119 7.22333 9.77273C6.50956 10.0998 5.85246 10.5534 5.28661 11.1193C4.03636 12.3695 3.33398 14.0652 3.33398 15.8333V16.6667C3.33398 17.1269 3.70708 17.5 4.16732 17.5C4.62755 17.5 5.00065 17.1269 5.00065 16.6667V15.8333C5.00065 14.5073 5.52744 13.2355 6.46512 12.2978C7.4028 11.3601 8.67457 10.8333 10.0007 10.8333C11.3267 10.8333 12.5985 11.3601 13.5362 12.2978C14.4739 13.2355 15.0007 14.5073 15.0007 15.8333V16.6667C15.0007 17.1269 15.3737 17.5 15.834 17.5C16.2942 17.5 16.6673 17.1269 16.6673 16.6667V15.8333C16.6673 14.0652 15.9649 12.3695 14.7147 11.1193C14.1488 10.5534 13.4917 10.0998 12.778 9.77273C12.8356 9.72119 12.892 9.66791 12.9469 9.61294C13.7283 8.83154 14.1673 7.77174 14.1673 6.66667C14.1673 5.5616 13.7283 4.50179 12.9469 3.72039C12.1655 2.93899 11.1057 2.5 10.0007 2.5ZM8.23288 4.8989C8.70172 4.43006 9.33761 4.16667 10.0007 4.16667C10.6637 4.16667 11.2996 4.43006 11.7684 4.8989C12.2373 5.36774 12.5007 6.00363 12.5007 6.66667C12.5007 7.32971 12.2373 7.96559 11.7684 8.43443C11.2996 8.90327 10.6637 9.16667 10.0007 9.16667C9.33761 9.16667 8.70172 8.90327 8.23288 8.43443C7.76404 7.96559 7.50065 7.32971 7.50065 6.66667C7.50065 6.00363 7.76404 5.36774 8.23288 4.8989Z"
                    fill="rgba(82, 82, 82, 1)"
                    fillOpacity="0.8"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Profile" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Profile")}
                >
                  Profile
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div
                  className={`SideBarSectionTextSetting ${
                    isSettingDropdownOpen ? "active" : ""
                  }`}
                  onClick={toggleSettingDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_386_6054)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0007 6.66668C9.1166 6.66668 8.26875 7.01787 7.64363 7.64299C7.01851 8.26811 6.66732 9.11596 6.66732 10C6.66732 10.8841 7.01851 11.7319 7.64363 12.357C8.26875 12.9822 9.1166 13.3333 10.0007 13.3333C10.8847 13.3333 11.7326 12.9822 12.3577 12.357C12.9828 11.7319 13.334 10.8841 13.334 10C13.334 9.11596 12.9828 8.26811 12.3577 7.64299C11.7326 7.01787 10.8847 6.66668 10.0007 6.66668ZM8.82214 8.8215C9.1347 8.50894 9.55862 8.33334 10.0007 8.33334C10.4427 8.33334 10.8666 8.50894 11.1792 8.8215C11.4917 9.13406 11.6673 9.55798 11.6673 10C11.6673 10.442 11.4917 10.866 11.1792 11.1785C10.8666 11.4911 10.4427 11.6667 10.0007 11.6667C9.55862 11.6667 9.1347 11.4911 8.82214 11.1785C8.50958 10.866 8.33398 10.442 8.33398 10C8.33398 9.55798 8.50958 9.13406 8.82214 8.8215Z"
                        fill="#757575"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.15148 0.833344C8.77294 0.833344 8.44196 1.08848 8.3456 1.45455L7.9233 3.05888L6.5816 3.62448L5.55456 2.71074C5.2248 2.41737 4.72349 2.43199 4.4114 2.74409L2.74473 4.41075C2.44281 4.71267 2.41794 5.19395 2.68712 5.52538L3.58723 6.63364L3.03527 7.99157L1.47786 8.35516C1.10075 8.4432 0.833984 8.77942 0.833984 9.16668V10.8333C0.833984 11.2091 1.08547 11.5384 1.448 11.6373L3.05773 12.0764L3.62485 13.4218L2.71203 14.4454C2.41802 14.7751 2.43237 15.2769 2.74473 15.5893L4.4114 17.2559C4.71372 17.5583 5.1958 17.5827 5.52719 17.3126L6.63506 16.4095L7.95961 16.9543L8.35934 18.5374C8.45278 18.9074 8.78566 19.1667 9.16732 19.1667H10.834C11.2155 19.1667 11.5483 18.9076 11.6419 18.5378L12.0426 16.954L13.4115 16.3871C13.5492 16.5026 13.7072 16.6383 13.8645 16.7751C14.0207 16.9112 14.1659 17.0394 14.2721 17.1336C14.3252 17.1807 14.3684 17.2193 14.3983 17.2459L14.4435 17.2864C14.7731 17.5821 15.2769 17.569 15.5899 17.2559L17.2566 15.5893C17.5633 15.2826 17.5834 14.7919 17.3029 14.461L16.3951 13.3906L16.9569 12.0339L18.5436 11.6216C18.9109 11.5261 19.1673 11.1945 19.1673 10.815V9.16668C19.1673 8.78558 18.9088 8.45303 18.5394 8.35907L16.9625 7.95788L16.4023 6.60446L17.3037 5.53797C17.5834 5.20709 17.5629 4.7171 17.2566 4.41075L15.5899 2.74409C15.2823 2.43649 14.7899 2.41724 14.4592 2.69988L13.4006 3.60474L11.9995 3.02867L11.5858 1.45482C11.4895 1.08862 11.1585 0.833344 10.7798 0.833344H9.15148ZM15.5353 14.9535L14.9652 15.5236L14.9589 15.5182C14.6512 15.2502 14.2547 14.9111 14.0311 14.7513C13.7971 14.584 13.4934 14.5492 13.2276 14.6593L11.0184 15.5743C10.7753 15.675 10.594 15.8846 10.5294 16.1398L10.1853 17.5H9.81638L9.47279 16.1393C9.40815 15.8833 9.22602 15.6731 8.98184 15.5727L6.81017 14.6793C6.52739 14.563 6.20361 14.6109 5.96661 14.8041L5.0576 15.5451L4.47975 14.9673L5.21927 14.138C5.43336 13.8979 5.49016 13.556 5.36521 13.2596L4.43604 11.0555C4.33663 10.8196 4.13437 10.6426 3.88747 10.5752L2.50065 10.1969V9.82787L3.83427 9.51652C4.09773 9.45501 4.31494 9.26944 4.41681 9.0188L5.31681 6.80464C5.43128 6.52303 5.38332 6.20143 5.19168 5.96547L4.45458 5.05792L5.03405 4.47845L5.86674 5.21928C6.1068 5.43285 6.44827 5.48938 6.74436 5.36457L8.94852 4.4354C9.18676 4.33497 9.36489 4.12966 9.4307 3.87964L9.79385 2.50001H10.1372L10.493 3.85354C10.5594 4.10618 10.7405 4.31307 10.9821 4.41241L13.2379 5.33991C13.5271 5.45882 13.8586 5.40581 14.0963 5.20264L14.9563 4.46751L15.5361 5.04735L14.8017 5.91622C14.6005 6.15432 14.5489 6.48485 14.6682 6.77291L15.5823 8.98125C15.6829 9.22411 15.8921 9.40531 16.1468 9.47012L17.5006 9.81454V10.1705L16.1361 10.5251C15.8831 10.5909 15.6757 10.7714 15.5757 11.0129L14.6607 13.2229C14.5412 13.5114 14.5931 13.8425 14.7951 14.0806L15.5353 14.9535Z"
                        fill="#757575"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_386_6054">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="SideBarText">Setting</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`icon-chevron ${
                      isSettingDropdownOpen ? "active" : ""
                    }`}
                  >
                    <path
                      d="M11.5289 10.4715C11.7893 10.7318 12.2114 10.7318 12.4717 10.4715C12.7321 10.2111 12.7321 9.78903 12.4717 9.52868L8.47173 5.52868C8.21138 5.26833 7.78927 5.26833 7.52892 5.52868L3.52892 9.52868C3.26857 9.78903 3.26857 10.2111 3.52892 10.4715C3.78927 10.7318 4.21138 10.7318 4.47173 10.4715L8.00033 6.94289L11.5289 10.4715Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
              {isSettingDropdownOpen && (
                <div className="SubSection">
                  <div className="Subs">
                    <div className="SubTextSetting">Edit Password</div>
                    <div className="ArrowSetting1" />
                  </div>
                  <div className="Subs">
                    <p className="SubTextSetting">Edit Email</p>
                    <div className="ArrowSetting2" />
                  </div>
                  <div className="lineSub" />
                </div>
              )}
            </li>
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_386_6069)">
                    <path
                      d="M8.33398 7.50001C8.33398 7.01087 8.51643 6.69804 8.75595 6.49481C9.01358 6.27621 9.38679 6.14584 9.79232 6.14584C10.1979 6.14584 10.5711 6.27621 10.8287 6.49481C11.0682 6.69804 11.2507 7.01087 11.2507 7.50001C11.2507 7.86432 11.1648 8.06657 11.0651 8.21615C10.9487 8.39066 10.7957 8.52827 10.5368 8.76099L10.4848 8.80768C10.2185 9.04738 9.86812 9.37142 9.60096 9.84342C9.32563 10.3298 9.16732 10.9176 9.16732 11.6667C9.16732 12.1269 9.54041 12.5 10.0007 12.5C10.4609 12.5 10.834 12.1269 10.834 11.6667C10.834 11.1658 10.9361 10.8681 11.0514 10.6644C11.1748 10.4463 11.3453 10.2756 11.5998 10.0465C11.6227 10.0259 11.6469 10.0044 11.672 9.98191C11.8998 9.77892 12.2117 9.50088 12.4518 9.14065C12.7427 8.70429 12.9173 8.17737 12.9173 7.50001C12.9173 6.53082 12.5268 5.7499 11.907 5.22396C11.3052 4.71339 10.5326 4.47918 9.79232 4.47918C9.05202 4.47918 8.27939 4.71339 7.67765 5.22396C7.05779 5.7499 6.66732 6.53082 6.66732 7.50001C6.66732 7.96025 7.04041 8.33334 7.50065 8.33334C7.96089 8.33334 8.33398 7.96025 8.33398 7.50001Z"
                      fill="#757575"
                      stroke={` ${
                        selectedText === "Any Questions?" ? "#008000" : ""
                      }`}
                    />
                    <path
                      d="M10.6256 15.5598C10.9352 15.2192 10.9101 14.6922 10.5696 14.3826C10.229 14.073 9.70198 14.0981 9.39238 14.4386L9.38405 14.4478C9.07445 14.7883 9.09953 15.3153 9.44007 15.6249C9.78061 15.9345 10.3077 15.9095 10.6173 15.5689L10.6256 15.5598Z"
                      fill="#757575"
                      stroke={` ${
                        selectedText === "Any Questions?" ? "#008000" : ""
                      }`}
                    />
                    <path
                      fillRule="evenodd"
                      stroke={` ${
                        selectedText === "Any Questions?" ? "#008000" : ""
                      }`}
                      clipRule="evenodd"
                      d="M10.0007 0.833344C4.93791 0.833344 0.833984 4.93727 0.833984 10C0.833984 15.0627 4.93791 19.1667 10.0007 19.1667C15.0634 19.1667 19.1673 15.0627 19.1673 10C19.1673 4.93727 15.0634 0.833344 10.0007 0.833344ZM2.50065 10C2.50065 5.85775 5.85839 2.50001 10.0007 2.50001C14.1429 2.50001 17.5007 5.85775 17.5007 10C17.5007 14.1423 14.1429 17.5 10.0007 17.5C5.85839 17.5 2.50065 14.1423 2.50065 10Z"
                      fill="#757575"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_386_6069">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Any Questions?" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Any Questions?")}
                >
                  Any Questions?
                </div>
              </a>
            </li>
          </ul>
          <div className="SideBarSettingButton">
            <Button
              variant="outline"
              color="red"
              w={"90%"}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect width="20" height="20" fill="none" />
                <path
                  d="M5.83398 1.66666C5.17094 1.66666 4.53506 1.93005 4.06622 2.39889C3.59738 2.86773 3.33398 3.50362 3.33398 4.16666V15.8333C3.33398 16.4964 3.59738 17.1322 4.06622 17.6011C4.53506 18.0699 5.17094 18.3333 5.83398 18.3333H14.1673C14.8304 18.3333 15.4662 18.0699 15.9351 17.6011C16.4039 17.1322 16.6673 16.4964 16.6673 15.8333V15C16.6673 14.5398 16.2942 14.1667 15.834 14.1667C15.3737 14.1667 15.0007 14.5398 15.0007 15V15.8333C15.0007 16.0543 14.9129 16.2663 14.7566 16.4226C14.6003 16.5789 14.3883 16.6667 14.1673 16.6667H5.83398C5.61297 16.6667 5.40101 16.5789 5.24473 16.4226C5.08845 16.2663 5.00065 16.0543 5.00065 15.8333V4.16666C5.00065 3.94564 5.08845 3.73368 5.24473 3.5774C5.40101 3.42112 5.61297 3.33332 5.83398 3.33332H14.1673C14.3883 3.33332 14.6003 3.42112 14.7566 3.5774C14.9129 3.73368 15.0007 3.94564 15.0007 4.16666V4.99999C15.0007 5.46023 15.3737 5.83332 15.834 5.83332C16.2942 5.83332 16.6673 5.46023 16.6673 4.99999V4.16666C16.6673 3.50361 16.4039 2.86773 15.9351 2.39889C15.4662 1.93005 14.8304 1.66666 14.1673 1.66666H5.83398Z"
                  fill="#EB5757"
                />
                <path
                  d="M13.9232 6.91073C13.5978 6.5853 13.0702 6.5853 12.7447 6.91073C12.4193 7.23617 12.4193 7.76381 12.7447 8.08925L13.8221 9.16666H10.0007C9.54041 9.16666 9.16732 9.53975 9.16732 9.99999C9.16732 10.4602 9.54041 10.8333 10.0007 10.8333H13.8221L12.7447 11.9107C12.4193 12.2362 12.4193 12.7638 12.7447 13.0892C13.0702 13.4147 13.5978 13.4147 13.9232 13.0892L16.4232 10.5892C16.7487 10.2638 16.7487 9.73617 16.4232 9.41073L13.9232 6.91073Z"
                  fill="#EB5757"
                />
              </svg>
              &nbsp; Logout Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SideBarMenuCard = ({ data }) => {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => {
    if (!item.rightSection) {
      return (
        <NavLink
          href="#required-for-focus"
          key={item.label}
          active={index === active}
          label={item.label}
          description={item.description}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => {
            setActive(index);
            window.location.replace(item.link);
          }}
        />
      );
    } else {
      return (
        <NavLink
          href="#required-for-focus"
          key={item.label}
          active={index === active}
          label={item.label}
          description={item.description}
          rightSection={item.rightSection}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => {
            setActive(index);
            item.onClick();
          }}
        >
          {item?.childs?.map((child) => (
            <NavLink
              key={child.label}
              label={child.label}
              description={child.description}
              onClick={child.onClick}
            />
          ))}
        </NavLink>
      );
    }
  });

  return <Box w={220}>{items}</Box>;
};

export default SideBar;
