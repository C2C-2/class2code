import { useState } from "react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import Pro from "./logo2 1 (1).png"
import Pro1 from "./Avatar.png"
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { BiLogIn } from "react-icons/bi";
import { BsChatDots, BsPostcard, BsClipboard2Data } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { RiTeamLine ,RiRobot2Fill } from "react-icons/ri";
import { AiOutlineTeam, AiOutlineQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import classes from "./SideBarRes.module.css";
import { Paths } from "../../assets/Paths";
import { Link } from "react-router-dom";
interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconGauge, label: "Dashboard", link: "/Dashboard" },
  { icon: RiRobot2Fill , label: "AI Chat", link: "/AIChat" },
  { icon: BsPostcard, label: "Post", link: "/Posts" },
  { icon: BsChatDots, label: "Chat", link: "/Chat" },
  {
    icon: BsClipboard2Data,
    label: "Available Projects",
    link: "/AvailableProject",
  },
  {
    icon: AiOutlineTeam,
    label: "My Teams"
  }
  ,{
    icon: RiTeamLine,
    label: "My Companies",
  }
];

export default function SideBarRes() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  function YourComponent() {
    return <a href="/Profile" className={classes.buttonClick}><img src={Pro1} alt="Image" height={40} /></a>;
  }
  return (
    <nav className={classes.navbar}>
      <Center>
    <YourComponent/>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      <Stack justify="center" gap={0}>
        <NavbarLink icon={CgProfile} label="Profile" />
        <NavbarLink icon={CiSettings} label="Settings" />
        <NavbarLink icon={BiLogIn} label="Logout" />
      </Stack>
    </nav>
  );
}
