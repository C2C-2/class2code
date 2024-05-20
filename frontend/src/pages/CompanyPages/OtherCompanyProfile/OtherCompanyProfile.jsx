import { useState } from "react";
import "./OtherCompanyProfile.css";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import CommentComp from "../../../components/Comments/CommentComp";
import CurrentProject from "../../../components/CurrentProject/CurrentProject";
import TeamOther from "../../../components/TeamOther/TeamOther";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

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
  const [commentText, setCommentText] = useState("");
  const company_id = useParams();
  const { loading, error, data } = useQuery(GET_COMPANY_QUERY, {
    variables: {
      companyId: parseInt(company_id),
    },
  });

  const navigate = useNavigate();

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  const handleSendComment = async () => {
    try {
      await createComment({
        variables: {
          comment: {
            Value: commentText,
          },
          companyId: parseInt(company_id),
        },
      });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <div className="ShowAllPostsAll">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="EditMyCompaniesContentData">
              <Button
                justify="center"
                variant="filled"
                color="#283739"
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
              <div className="EditMyCompaniesHead  d-flex justify-content-around align-items-center">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex gap-3 align-items-center">
                    <h4>Company Name</h4>
                    <h4>{data?.getCompany?.CompanyName}</h4>
                    <div className="d-flex gap-1">
                      <h6>{data?.getCompany?.Rate}</h6>
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
                    </div>
                  </div>
                  <span>{}</span>
                </div>
                <div className="d-flex flex-column gap-1">
                  <h4>Domain</h4>
                  <span>{data?.getCompany?.Domain}</span>
                </div>
                <div className="d-flex flex-column gap-1">
                  <h4>Create Date</h4>
                  <span>{data?.getCompany?.CreateDate?.slice(0, 10)}</span>
                </div>
              </div>
              <div className="EditMyCompaniesBody">
                <div className="d-flex flex-column gap-4" style={{ flex: 1 }}>
                  <Textarea
                    resize="vertical"
                    size="md"
                    variant="filled"
                    label="Description"
                    value={data?.getCompany?.CompanyDescription}
                    w={"100%"}
                  />
                  <div className="d-flex flex-column align-items-start gap-3">
                    {data?.getCompany?.Comments.map((comment) => (
                      <CommentComp
                        key={comment._id}
                        commenterName={comment.UserName}
                        commentText={comment.Value}
                        ImageUser={comment.ImageUser}
                        timestamp={comment.CreatedDate}
                      />
                    ))}
                  </div>

                  <div className="d-flex gap-3 justify-content-start">
                    <TextInput
                      type="text"
                      w="70%"
                      value={commentText}
                      onChange={handleCommentChange}
                    ></TextInput>
                    <Button
                      variant="filled"
                      color="#388E3C"
                      size="md"
                      onClick={handleSendComment}
                    >
                      Send
                    </Button>
                  </div>
                </div>
                <div
                  className="d-flex flex-column gap-4"
                  style={{ minWidth: 350 }}
                >
                  <div className="d-flex flex-column gap-2">
                    <h4 className={"CP1"}>Current Projects</h4>
                    {data?.getCompany?.CurrentProjects.map((project) => (
                      <CurrentProject
                        key={project._id}
                        project={project.ProjectName}
                      />
                    ))}
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <h4 className={"TA1"}>Teams</h4>
                    {data?.getCompany?.Teams?.map((team) => (
                      <TeamOther key={team._id} team={team} />
                    ))}
                  </div>
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
