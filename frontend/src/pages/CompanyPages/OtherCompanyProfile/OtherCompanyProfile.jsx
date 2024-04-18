import { useEffect, useState } from "react";
import "./OtherCompanyProfile.css";
import { Button } from "@mantine/core";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CommentComp from "../../../components/Comments/CommentComp";
import CurrentProject from "../../../components/CurrentProject/CurrentProject";
import TeamOther from "../../../components/TeamOther/TeamOther";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import pro1 from "./Oval.png"
import pro2 from "./Avatar.png"
const GET_COMPANY_QUERY = gql`
  query Comments($companyId: Int!) {
    getCompany(companyId: $companyId) {
      Comments {
        CreatedDate
        Value
        _id
      }
      CompanyDescription
      CompanyName
      CreateDate
      Domain
      Project {
        ProjectName
        _id
      }
      Rate
      Teams {
        TeamName
        _id
      }
    }
  }
`;
const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCompanyComment($comment: CommentInput!, $companyId: Int!) {
    createCompanyComment(comment: $comment, companyId: $companyId) {
      Value
      CreatedDate
    }
  }
`;
function OtherCompanyProfile() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { loading, error, data } = useQuery(GET_COMPANY_QUERY, {
    variables: {
      companyId: null,
      company: null,
      teamId: null,
    },
  });
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);

  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };

  useEffect(() => {
    const element = document.getElementById("man");
    if (element) {
      element.style.backgroundColor =
        receivedData === "light" ? "#fff" : "#000";
    }
  }, [receivedData]);

  if (loading) return <p>Loading...</p>;

  const handleSendComment = async () => {
    try {
      await createComment({
        variables: {
          comment: {
            Value: commentText,
          },
          companyId: null,
        },
      });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };
  const dummyData = {
    getCompany: {
      Comments: [
        {UserName:"Rose", CreatedDate: "2023-04-11", Value: "Great company!", _id: 1
      ,ImageUser:pro1 },
        {
          CreatedDate: "2023-04-12",
          Value: "Awesome work environment",
          UserName:"Omer Salah",
          ImageUser:pro2,
          _id: 2,
        },
      ],
      CompanyDescription:
        "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over it. Love the look and feel.",
      CompanyName: "Web Company",
      CreateDate: "2022-01-01",
      Domain: "Technology",

      Project: [
        { ProjectName: "Web Project", _id: 1 },
        { ProjectName: "School Project", _id: 2 },
      ],
      Rate: 4.5,
      Teams: [
        { TeamName: "Frontend Team", _id: 1 },
        { TeamName: "Backend Team", _id: 2 },
      ],
    },
  };

  const companyData = dummyData.getCompany;

  return (
    <div className="OtherProfileCompany" id="man">
      <SideBar />
      <div className="OtherCompany">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="Part2OtherProfile">
          <div className="OtherProfileButtonBack">
            <Link to="/Dashboard">
              <Button
                justify="center "
                variant="filled"
                color="#283739"
                radius="md"
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
            </Link>
          </div>
          <div className="OtherProfileDescriptionCenter">
            <div className="OtherProfileDescription">
              <div className="CompanyName">
                <div className="C1">
                  <span className="C1Text">{companyData.CompanyName}</span>
                  <span className="C1Number">
                    {companyData.Rate}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M15.2904 5.9597L10.8896 5.31899L8.92295 1.33849C8.74616 0.982806 8.40129 0.803009 8.05643 0.803009C7.71368 0.803009 7.37122 0.980401 7.19383 1.33849L5.22658 5.31869L0.825457 5.9588C0.0362136 6.07305 -0.280085 7.0439 0.292079 7.60013L3.47581 10.697L2.72235 15.071C2.61531 15.6958 3.11411 16.197 3.67275 16.197C3.82098 16.197 3.97341 16.1618 4.11984 16.0843L8.05703 14.0193L11.9939 16.0849C12.1401 16.1615 12.2922 16.1964 12.4398 16.1964C12.9991 16.1964 13.4988 15.697 13.3917 15.0719L12.6392 10.6976L15.8235 7.60133C16.396 7.0451 16.0797 6.07395 15.2904 5.9597ZM11.6301 9.66389L11.0853 10.1937L11.214 10.9417L11.8009 14.3527L8.73022 12.7415L8.05733 12.3885L8.05824 2.85174L9.59253 5.9573L9.92867 6.6377L10.6806 6.74714L14.1151 7.24715L11.6301 9.66389Z"
                        fill="#F4CE14"
                      />
                    </svg>
                  </span>
                </div>
                <div className="C2">
                  <span className="C2Text">Andrew Smith</span>
                </div>
              </div>
              <div className="Domain">
                <div className="D1">
                  <span className="D1Text">{companyData.Domain}</span>
                </div>
                <div className="D2">
                  <span className="D2Text">Domain</span>
                </div>
              </div>
              <div className="CreateDate">
                <div className="CD1">
                  <span className="CD1Text"> {companyData.CreateDate}</span>
                </div>
                <div className="CD2">
                  <span className="CD2Text">Created Date </span>
                </div>
              </div>
            </div>
            <div className="UnderOtherProfile">
              <div className="Part1UnderOther">
                <div className="UnderDescription">
                  <h6>Description</h6>
                  <p className="Para">{companyData.CompanyDescription}</p>
                </div>
                <div className="CommentsCard">
                  {companyData.Comments.map((comment) => (
                    <CommentComp
                      key={comment._id}
                      commenterName={comment.UserName}
                      commentText={comment.Value}
                      ImageUser={comment.ImageUser}
                      timestamp={comment.CreatedDate}
                    />
                  ))}
                </div>
                <div className="Part1UnderAddComments">
                  <input
                    type="text"
                    className="Part1UnderAddCommentsInputs"
                    value={commentText}
                    onChange={handleCommentChange}
                  ></input>
                  <Button
                    variant="filled"
                    color="#388E3C"
                    h={50}
                    w={90}
                    onClick={handleSendComment}
                  >
                    Send
                  </Button>
                </div>
              </div>
              <div className="Part2UnderOther">
                <div className="CurrentProjects">
                  <div className={`${isDarkMode ? "CP1Dark" : "CP1"}`}>
                    Current Projects
                  </div>
                  {companyData.Project.map((project) => (
                    <CurrentProject
                      key={project._id}
                      project={project.ProjectName}
                    />
                  ))}
                </div>
                <div className="TeamAll">
                  <div className={`${isDarkMode ? "TA1Dark" : "TA1"}`}>
                    Teams
                  </div>
                  {companyData.Teams?.map((team) => (
                    <TeamOther key={team._id} team={team} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherCompanyProfile;
