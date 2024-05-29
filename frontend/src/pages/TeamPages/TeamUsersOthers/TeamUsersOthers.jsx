import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Alert, Button, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Paths } from "../../../assets/Paths";

const TeamUsersOthers = () => {
  const { team_id } = useParams();
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
      teamId: parseInt(team_id),
    },
  });

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

export default TeamUsersOthers;
