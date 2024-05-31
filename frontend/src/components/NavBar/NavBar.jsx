import { useComputedColorScheme, Menu, Button, Badge } from "@mantine/core";
import {
  IconUser,
  IconPassword,
  IconMail,
  IconQuestionMark,
  IconLogout,
} from "@tabler/icons-react";
import "./NavBar.css";
import { useCallback, useEffect, useState } from "react";
import MainLogo from "./logo2 2.png";
import { Link } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Paths } from "../../assets/Paths";
import { read, deleteFieldAtPath } from "../../config/firebase";
import { IoIosNotifications, IoMdNotifications } from "react-icons/io";

const GET_USER_IMAGE = gql`
  query Friends($userId: String!) {
    getUser(userId: $userId) {
      ImageUrl
    }
  }
`;

const DELETE_USER = gql`
  query Query($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navClass, setNavClass] = useState("Nav");
  const [topClass, setTopClass] = useState("TopImage");
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [userImage, setUserImage] = useState("");

  const {
    loading,
    error,
    data: userImageData,
  } = useQuery(GET_USER_IMAGE, {
    variables: { userId },
  });

  useEffect(() => {
    if (userImageData?.getUser?.ImageUrl) {
      setUserImage(userImageData.getUser.ImageUrl);
    }
  }, [userImageData]);

  const [
    deleteUserFromNeo,
    { loading: deleteUserLoading, error: deleteUserError },
  ] = useLazyQuery(DELETE_USER);

  useEffect(() => {
    setIsDarkMode(computedColorScheme === "dark");
  }, [computedColorScheme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setNavClass("NavOriginal");
        setTopClass("TopImage");
      } else {
        setNavClass("Nav");
        setTopClass("TopImageOriginal");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNotifications = useCallback(() => {
    read(`notifications/${userId}`, (data) => {
      setNotifications(data ? Object?.values(data) : []);
    });
  }, [userId]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div
      className="MainNav"
      style={{
        backgroundColor: computedColorScheme === "dark" ? "#000" : "#fff",
      }}
    >
      <div className={`${isDarkMode ? "NavDark" : navClass}`}>
        <Link to="/Dashboard">
          <div className={topClass}>
            <img className="NavMainLogo" alt="Logo" src={MainLogo} />
            <span className={`${isDarkMode ? "NavTextBarDark" : "NavTextBar"}`}>
              Class2Code
            </span>
          </div>
        </Link>
        <div className="TopPartNavBar">
          <div className="Svg">
            <Menu
              zIndex={10001}
              trigger="click-hover"
              openDelay={100}
              closeDelay={400}
              onClose={async () => {
                await deleteFieldAtPath(`notifications/${userId}`);
                getNotifications();
              }}
            >
              <Menu.Target>
                <Button color="#283739" variant="subtle" className="Notifications">
                <IoMdNotifications size={24} />
                  {notifications?.length > 0 && (
                    <Badge color="red" variant="filled" size="sm">
                      {notifications?.length}
                    </Badge>
                  )}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Notifications</Menu.Label>
                <Menu.Divider />
                {notifications?.map((notification, index) => (
                  <Menu.Item key={index}>{notification.notification}</Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            {/* <ActionIcon
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
            </ActionIcon> */}

            <Menu zIndex={10001} shadow="md" width={200}>
              <Menu.Target>
                <img className="ProfileLogo" alt="Logo" src={userImage} />
              </Menu.Target>

              <Menu.Dropdown>
                <Link to={Paths?.UserProfile}>
                  <Menu.Item leftSection={<IconUser size={14} />}>
                    My Account
                  </Menu.Item>
                </Link>
                <Link to={Paths?.EditPassword}>
                  <Menu.Item leftSection={<IconPassword size={14} />}>
                    Change Password
                  </Menu.Item>
                </Link>
                <Link to={Paths?.EditEmail}>
                  <Menu.Item leftSection={<IconMail size={14} />}>
                    Change Email
                  </Menu.Item>
                </Link>
                <Link to={Paths?.FAQuestion}>
                  <Menu.Item leftSection={<IconQuestionMark size={14} />}>
                    Any Questions
                  </Menu.Item>
                </Link>

                <Menu.Divider />

                <Menu.Label>Logout</Menu.Label>
                <Menu.Item>
                  <Button
                    color="red"
                    onClick={() => {
                      const confirm = window.confirm(
                        "Are you sure you want to logout?"
                      );
                      if (!confirm) {
                        return;
                      }
                      localStorage.clear();
                      window.location.reload();
                    }}
                    leftSection={<IconLogout size={14} />}
                  >
                    Logout Account
                  </Button>
                </Menu.Item>
                <Menu.Item
                  color="red"
                  className="text-center"
                  onClick={async () => {
                    await deleteUserFromNeo({ variables: { userId: userId } });
                    // deleteImage(userImage);
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Delete my account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
