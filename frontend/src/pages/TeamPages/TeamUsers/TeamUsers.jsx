import { useEffect, useState } from "react";
import "./Team.css";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Modal, MultiSelect, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const TeamUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applies, setApplies] = useState([]);

  const GET_APPLIES = gql`
    query GetTeam($teamId: Int!) {
      getTeam(teamId: $teamId) {
        Members {
          FirstName
          ImageUrl
          LastName
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

  const { data, loading, error } = useQuery(GET_APPLIES, {
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
        FirstName
        LastName
      }
    }
  `;

  const {
    data: users,
    loading: loading2,
    error: error2,
  } = useQuery(GET_ALL_USERS);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="ShowAllPostsAll">
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

            <div className="postApplies">
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    addUserToTeam({
                      variables: {
                        teamId: parseInt(id),
                        userId: "621f2c7b8a0f0d0b8f5a5c8",
                        role: "Member",
                      },
                    });
                    close();
                  }}
                >
                  <Select
                    label="Select Users"
                    placeholder="User Name"
                    data={users?.getAllUsers?.map(
                      (user) => user?.FirstName + " " + user?.LastName
                    )}
                    searchable
                  />

                  <br />
                  <Select
                    label="Role"
                    placeholder="Leader"
                    data={["Member", "Leader"]}
                  />

                  <br />
                  <Button type="submit" color="orange">
                    Add
                  </Button>
                </form>
              </Modal>

              <Button onClick={open} color="orange">
                New
              </Button>
              {data?.getTeam?.Members?.map((user, index) => (
                <div className="apply" key={index}>
                  <img src={user?.ImageUrl} />
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamUsers;
