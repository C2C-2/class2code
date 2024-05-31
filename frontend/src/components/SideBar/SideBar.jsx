import { Badge, Box, Button, NavLink } from "@mantine/core";
import { IconChevronRight, IconGauge } from "@tabler/icons-react";
import {
  BsChatDots,
  BsPostcard,
  BsClipboard2Data,
  BsChatText,
} from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Paths } from "../../assets/Paths";
import "./SideBar.css";

const data = [
  {
    icon: IconGauge,
    label: "Dashboard",
    link: Paths.Dashboard,
  },
  {
    icon: BsChatDots,
    label: "Chat with Customers",
    link: Paths.AIChat,
  },
  {
    icon: BsPostcard,
    label: "Posts of companies for recruitment",
    link: Paths.Posts,
  },
  {
    icon: BsChatText,
    label: "Chat with your colleagues",
    link: Paths.Chat,
    rightSection: (
      <Badge size="sm" color="red" circle>
        3
      </Badge>
    ),
  },
  {
    icon: BsClipboard2Data,
    label: "Available Projects",
    link: Paths.AvailableProject,
  },
  {
    icon: FaTasks,
    label: "New Tasks",
    link: Paths.NewTasksUser,
  },
  {
    icon: RiTeamLine,
    label: "My Companies",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    links: [
      { label: "My Companies", link: Paths.MyCompanies },
      {
        label: "Companies I am working in",
        link: Paths.CompanyWorkingWith,
      },
    ],
  },
];

function SideBar() {
  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }

    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="SideBarMain">
      <div className="SideBarBody">
        <div className="SideBarSectionCenter">
          <div className="SideBarSectionCenterMain">
            <span className="SideBarSectionCenterMainText">Main</span>
          </div>
          <br />
          <SideBarMenuCard data={data} />
        </div>
        <Button
          className="w-100 p-0"
          color="red"
          w={"90%"}
          onClick={handleLogout}
        >
          &nbsp; Logout Account
        </Button>
      </div>
    </div>
  );
}

const SideBarMenuCard = ({ data }) => {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => {
    const { label, link, description, icon: Icon, rightSection, links } = item;

    return (
      <Link key={label} to={link}>
        <NavLink
          active={index === active}
          label={label}
          description={description}
          rightSection={rightSection}
          leftSection={<Icon size="1rem" stroke={1.5} />}
          onClick={() => setActive(index)}
          color="green"
        >
          {links &&
            links.map(
              ({
                label: childLabel,
                link: childLink,
                description: childDescription,
              }) => (
                <Link key={childLabel} to={childLink}>
                  <NavLink label={childLabel} description={childDescription} />
                </Link>
              )
            )}
        </NavLink>
      </Link>
    );
  });

  return (
    <Box className="SideBarMenuCard" w="100%">
      {items}
    </Box>
  );
};

export default SideBar;
