import { useEffect, useState } from "react";
import "./Team.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Button,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Paths } from "../../../assets/Paths";

const TeamUsers = () => {
  const { id, company_id } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("Member");
  const [err, setErr] = useState(null);

  const GET_APPLIES = gql`
    query GetTeam($teamId: Int!) {
      getTeam(teamId: $teamId) {
        Members {
          id
          FirstName
          ImageUrl
          LastName
          Role
          Skills {
            Skill
            _id
          }
          Bio
          Work
        }
      }
    }
  `;

  const {
    data,
    loading,
    error,
    refetch: refetchApplies,
  } = useQuery(GET_APPLIES, {
    variables: {
      teamId: parseInt(id),
    },
  });

  const ADD_USER_TO_TEAM = gql`
    mutation Mutation($teamId: Int!, $userId: String!, $role: String!) {
      addUserToTeam(teamId: $teamId, userId: $userId, role: $role)
    }
  `;

  const [addUserToTeam] = useMutation(ADD_USER_TO_TEAM);

  const GET_ALL_USERS = gql`
    query Query {
      getAllUsers {
        id
        Username
      }
    }
  `;

  const {
    data: users,
    loading: loading2,
    error: error2,
  } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (users) {
      setUserId(users?.getAllUsers[0]?.id);
    }
  }, [users]);

  const DELETE_USER_FROM_TEAM = gql`
    mutation DeleteUserFromTeam($userId: String!, $teamId: Int!) {
      deleteUserFromTeam(userId: $userId, teamId: $teamId)
    }
  `;

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(
    DELETE_USER_FROM_TEAM,
    {
      refetchQueries: [
        {
          query: GET_APPLIES,
          variables: {
            teamId: parseInt(id),
          },
        },
      ],
    }
  );

  const ADD_TASK_TO_USER = gql`
    mutation CreateTaskForUser(
      $task: TaskInput!
      $userId: String!
      $userCreateTaskId: String!
      $companyId: Int!
      $teamId: Int!
    ) {
      createTaskForUser(
        task: $task
        userId: $userId
        userCreateTaskId: $userCreateTaskId
        companyId: $companyId
        teamId: $teamId
      ) {
        _id
      }
    }
  `;

  const [createTaskForUser, { loading: loadingCreateTask }] =
    useMutation(ADD_TASK_TO_USER);

  const [opened, { open, close }] = useDisclosure(false);
  const [addTaskOpened, { open: openAddTask, close: closeAddTask }] =
    useDisclosure(false);

  return (
    <div className="ShowAllPostsAll">
      {err && (
        <div
          style={{
            zIndex: 1000000000000000,
            position: "absolute",
            top: "2%",
            right: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert
            style={{ width: "fit-content" }}
            color="red"
            title={"Error: " + err}
          />
        </div>
      )}
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <Button
              justify="center"
              variant="filled"
              color="#283739"
              radius="md"
              onClick={() => navigate(-1)}
              w={"fit-content"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
              >
                <path
                  d="M1.5 6H16.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.49999 11L1.5 6L6.49999 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <>
              <Modal
                xOffset={"30%"}
                yOffset={"8%"}
                padding={"xl"}
                size={"lg"}
                opened={opened}
                onClose={close}
                title="Add New User"
              >
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                      data?.getTeam?.Members?.find(
                        (member) => member?.id === userId
                      )
                    ) {
                      alert("User already in team");
                      return;
                    }

                    if (
                      data?.getTeam?.Members?.find(
                        (member) => member?.Role === "Leader"
                      ) &&
                      role === "Leader"
                    ) {
                      alert("Team already has a leader");
                      return;
                    }

                    await addUserToTeam({
                      variables: {
                        teamId: parseInt(id),
                        userId: userId,
                        role: role,
                      },
                    }).then((e) => {
                      if (e?.data?.addUserToTeam == false) {
                        setErr("Check if this company has project");
                        const time = setTimeout(() => setErr(null), 3000);
                        close();
                        return () => clearTimeout(time);
                      }
                      refetchApplies();
                      close();
                    });
                  }}
                >
                  <Select
                    id="users-select"
                    placeholder="Pick a user"
                    searchable
                    nothingFound="No users found"
                    data={users?.getAllUsers?.map((user) => ({
                      value: user?.id,
                      label: user?.Username,
                    }))}
                    onChange={setUserId}
                  />

                  <br />
                  <Select
                    label="Role"
                    placeholder="Leader"
                    data={["Member", "Leader"]}
                    onChange={(e) => setRole(e)}
                  />

                  <br />
                  <Button type="submit" color="orange">
                    Add
                  </Button>
                </form>
              </Modal>

              <Button w={"fit-content"} onClick={open} color="orange">
                New
              </Button>
            </>

            <div className="postApplies">
              {data?.getTeam?.Members?.map((user, index) => (
                <div className="apply" key={index}>
                  <img className="applyImg" src={user?.ImageUrl} />
                  <div className="d-flex flex-column gap-1 text-center">
                    <h4>
                      {user?.FirstName} {user?.LastName}
                    </h4>
                    <h6>{user?.Work}</h6>
                  </div>

                  <p>{user?.Bio || "No Bio"}</p>

                  <div className="d-flex gap-2 flex-wrap">
                    {user?.Skills?.map((skill, index) => (
                      <div className="skill" key={index}>
                        <h6>{skill?.Skill}</h6>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex gap-2 align-items-center justify-content-center flex-wrap">
                    <Link to={`${Paths.OtherUserProfile}/${user?.id}`}>
                      <Button color="orange">View Profile</Button>
                    </Link>
                    <Button
                      color="red"
                      onClick={async () => {
                        await deleteUser({
                          variables: { userId: user?.id, teamId: parseInt(id) },
                        });
                      }}
                    >
                      {deleteUserLoading ? "Deleting..." : "Delete"}
                    </Button>

                    <Link to={`${Paths.UserTasks}/${company_id}/${id}/${user?.id}`}>
                      <Button color="yellow">Tasks</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamUsers;
