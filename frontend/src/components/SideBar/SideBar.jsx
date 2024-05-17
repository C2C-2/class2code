import "./SideBar.css";
import ProImg from "./Avatar.png";
import { useState, useEffect } from "react";
import { Box, Button, Divider, NavLink } from "@mantine/core";
import { IconChevronRight, IconGauge } from "@tabler/icons-react";
import { BsChatDots, BsPostcard, BsClipboard2Data } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineTeam, AiOutlineQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Paths } from "../../assets/Paths";
import { Link } from "react-router-dom";

function SideBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const data = [
    {
      icon: IconGauge,
      label: "Dashboard",
      link: Paths.Dashboard,
    },
    {
      icon: BsChatDots,
      label: "AI Chat",
      link: Paths.AIChat,
    },
    {
      icon: BsPostcard,
      label: "Post",
      link: Paths.Posts,
    },
    {
      icon: BsChatDots,
      label: "Chat",
      link: Paths.Chat,
    },
    {
      icon: BsClipboard2Data,
      label: "Available Projects",
      link: Paths.AvailableProject,
    },
    {
      icon: AiOutlineTeam,
      label: "My Teams",
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
      links: [
        { label: "My companies Teams", link: Paths.MyCompaniesTeams },
        { label: "Teams I am working In it", link: Paths.TeamsWorkingWith },
      ],
    },
    {
      icon: RiTeamLine,
      label: "My Companies",
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
      links: [
        { label: "Create Company", link: Paths.CreateCompany },
        { label: "My Companies", link: Paths.MyCompanies },
        {
          label: "Companies I am working in it ",
          link: Paths.CompanyWorkingWith,
        },
        { label: "Companies Tasks ", link: Paths.MyCompanyTask },
      ],
    },
  ];
  const data2 = [
    {
      icon: CgProfile,
      label: "Profile",
      link: Paths.UserProfile,
    },
    {
      icon: CiSettings,
      label: "Settings",
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
      links: [
        {
          label: "Change Password",
          link: Paths.EditPassword,
        },
        {
          label: "Change Email",
          link: Paths.EditEmail,
        },
      ],
    },
    {
      icon: AiOutlineQuestionCircle,
      label: "Any Question",
      link: Paths.FAQQuestion,
    },
  ];

  return (
    <div className={`${isDarkMode ? "SideBarMainDark" : "SideBarMain"}`}>
      <div className="SideBarSectionProfile">
        <div className="SideBarSectionProfilePart1">
          <Link to="/UserProfile">
            <img
              className="SideBarSectionProfilePart1Img"
              alt="Avatar"
              src={ProImg}
            />
          </Link>
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
      <div className="SideBarSettingsCenter">
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
  );
}

const SideBarMenuCard = ({ data }) => {
  const [active, setActive] = useState(0);

  const items = data?.map((item, index) => {
    if (!item.rightSection) {
      return (
        <NavLink
          href={item.link}
          key={item.label}
          active={index === active}
          label={item.label}
          description={item.description}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => {
            setActive(index);
          }}
          color="green"
        />
      );
    } else {
      return (
        <NavLink
          href={item.link}
          key={item.label}
          active={index === active}
          label={item.label}
          description={item.description}
          rightSection={item.rightSection}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => {
            setActive(index);
          }}
          color="green"
        >
          {item?.links?.map((child) => (
            <NavLink
              href={child.link}
              key={child.label}
              label={child.label}
              description={child.description}
            />
          ))}
        </NavLink>
      );
    }
  });

  return <Box w="100%">{items}</Box>;
};

export default SideBar;
