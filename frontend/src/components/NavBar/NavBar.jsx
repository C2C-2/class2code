import {
  useMantineColorScheme,
  useComputedColorScheme,
  Menu,
  Button,
} from "@mantine/core";
import {
  IconUser,
  IconPassword,
  IconMail,
  IconQuestionMark,
  IconLogout,
} from "@tabler/icons-react";
import "./NavBar.css";
import { useEffect, useState } from "react";
import MainLogo from "./logo2 2.png";
import { Link } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Paths } from "../../assets/Paths";
// import LightDarkMode from "./Light_DarkMode/LightDarkMode";
function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const [navClass, setNavClass] = useState("Nav");
  const [topClass, setTopClass] = useState("TopImage");
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [userImage, setUserImage] = useState("");

  const GET_USER_IMAGE = gql`
    query Friends($userId: String!) {
      getUser(userId: $userId) {
        ImageUrl
      }
    }
  `;

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

  const DELETE_USER = gql`
    query Query($userId: String!) {
      deleteUser(userId: $userId)
    }
  `;

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
            <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
              <Menu.Target>
                <Button variant="subtle">
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
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Notifications</Menu.Label>
                <Menu.Divider />
                <Menu.Item>Danger zone</Menu.Item>
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
