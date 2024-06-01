import React, { useEffect, useState } from "react";
import "./Applys.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, InputLabel, Modal, TextInput } from "@mantine/core";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDisclosure } from "@mantine/hooks";
import { updateFieldWithKey } from "../../../config/firebase";

const DELETE_APPLY = gql`
  query Query($postId: Int!, $userId: String!) {
    deletePostPositionApply(postId: $postId, userId: $userId)
  }
`;

const GET_MY_Teams = gql`
  query GetCompany($companyId: Int!) {
    getCompany(companyId: $companyId) {
      Teams {
        _id
        TeamName
      }
    }
  }
`;

const ADD_USER_TO_TEAM = gql`
  mutation Mutation($teamId: Int!, $userId: String!, $role: String!) {
    addUserToTeam(teamId: $teamId, userId: $userId, role: $role)
  }
`;

const GET_APPLIES = gql`
  query GetPost($postId: Int!) {
    getPost(postId: $postId) {
      Applies {
        LastName
        FirstName
        ImageUrl
        Work
        Bio
        Skills {
          _id
          Skill
        }
        id
      }
    }
  }
`;

const Applys = () => {
  const { id, companyId } = useParams();
  const navigate = useNavigate();
  const [applies, setApplies] = useState([]);
  const [role, setRole] = useState("Member");
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");

  const {
    data,
    loading,
    error,
    refetch: refetchApplies,
  } = useQuery(GET_APPLIES, {
    variables: {
      postId: parseInt(id),
    },
  });

  const [deleteApply, { loading: deleteLoading }] = useLazyQuery(DELETE_APPLY);

  const { data: myTeams } = useQuery(GET_MY_Teams, {
    variables: {
      companyId: parseInt(companyId),
    },
  });

  useEffect(() => {
    if (myTeams) {
      setTeamId(myTeams?.getCompany?.Teams[0]?._id);
    }
  }, [myTeams]);

  const [addUserToTeam] = useMutation(ADD_USER_TO_TEAM);

  useEffect(() => {
    if (!data) {
      setApplies(data?.getPost?.Applies);
    }
  }, [data]);

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
              {data?.getPost?.Applies?.length === 0 ? (
                <h1 className="text-center w-100">No Applies</h1>
              ) : (
                data?.getPost?.Applies?.map((user, index) => (
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

                    <div className="d-flex gap-2">
                      <Modal
                        xOffset={"30%"}
                        yOffset={"8%"}
                        padding={"xl"}
                        size={"lg"}
                        opened={opened}
                        onClose={close}
                        title="Select Team"
                        centered
                      >
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await addUserToTeam({
                              variables: {
                                teamId: parseInt(teamId),
                                userId: user?.id,
                                role: role,
                              },
                            }).then(() => {
                              deleteApply({
                                variables: {
                                  postId: parseInt(id),
                                  userId: user?.id,
                                },
                              }).then(() => {
                                refetchApplies();
                                close();
                              });
                            });
                            await updateFieldWithKey(
                              `notifications/${user?.id}`,
                              {
                                notification: `You have been added to (${teamName}) team`,
                              }
                            ).catch((err) => console.log(err));
                          }}
                        >
                          <label htmlFor="team" className="form-label">
                            Team Name
                          </label>
                          <select
                            name="team"
                            className="form-select"
                            aria-label="Default select example"
                            required
                            onChange={(e) => {
                              setTeamId(e.target.value);
                              setTeamName(e.target.options[e.target.selectedIndex].text);
                            }}
                          >
                            {myTeams?.getCompany?.Teams?.map((team, index) => (
                              <option key={index} value={team?._id}>
                                {team?.TeamName}
                              </option>
                            ))}
                          </select>
                          <br />

                          <TextInput
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Role"
                            required
                            value={role}
                          />
                          <br />

                          <div className="w-100 d-flex justify-content-end">
                            <Button color="green" type="submit">
                              Add
                            </Button>
                          </div>
                        </form>
                      </Modal>
                      <Button onClick={open} color="green">
                        Approve
                      </Button>

                      <Button
                        color="red"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await deleteApply({
                            variables: {
                              postId: parseInt(id),
                              userId: user?.id,
                            },
                          }).then(() => refetchApplies());
                        }}
                      >
                        {deleteLoading ? "Deleting" : "Delete"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applys;
