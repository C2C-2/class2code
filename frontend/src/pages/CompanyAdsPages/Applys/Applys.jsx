import React, { useEffect, useState } from "react";
import "./Applys.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
const Applys = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applies, setApplies] = useState([]);

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

  const { data, loading, error } = useQuery(GET_APPLIES, {
    variables: {
      postId: parseInt(id),
    },
  });

  const DELETE_APPLY = gql`
    query Query($postId: Int!, $userId: String!) {
      deletePostPositionApply(postId: $postId, userId: $userId)
    }
  `;

  const [deleteApply] = useLazyQuery(DELETE_APPLY);

  useEffect(() => {
    if (!data) {
      setApplies(data?.getPost?.Applies);
    }
  }, [data]);

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
              {data?.getPost?.Applies?.map((user, index) => (
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
                    <Button color="green">Approve</Button>
                    <Button
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteApply({
                          variables: { postId: parseInt(id), userId: user?.id },
                        });
                      }}
                    >
                      Disapprove
                    </Button>
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

export default Applys;
