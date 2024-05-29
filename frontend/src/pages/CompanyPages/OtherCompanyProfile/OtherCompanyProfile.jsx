import { useEffect, useState } from "react";
import "./OtherCompanyProfile.css";
import { Button, Rating, Textarea, TextInput } from "@mantine/core";
import CommentComp from "../../../components/Comments/CommentComp";
import TeamOther from "../../../components/TeamOther/TeamOther";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../../assets/Paths";

const GET_COMPANY_QUERY = gql`
  query GetCompany($companyId: Int!) {
    getCompany(companyId: $companyId) {
      Admin {
        FirstName
        LastName
      }
      Comments {
        CreatedDate
        Value
        _id
        User {
          FirstName
          LastName
          ImageUrl
        }
      }
      CompanyDescription
      CompanyName
      CreateDate
      Domain
      Project {
        ProjectName
      }
      Rate
      Teams {
        _id
        TeamName
        TeamRole
      }
      _id
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation Mutation(
    $comment: CommentInput!
    $companyId: Int!
    $userId: String!
  ) {
    createCompanyComment(
      comment: $comment
      companyId: $companyId
      userId: $userId
    ) {
      _id
    }
  }
`;

const UPDATE_COMPANY = gql`
  mutation Mutation($companyId: Int!, $company: CompanyInput!) {
    updateCompany(companyId: $companyId, company: $company) {
      _id
    }
  }
`;

const MAKE_RATE = gql`
  mutation RateCompany($companyId: Int!, $userId: String!, $rate: Int!) {
    rateCompany(companyId: $companyId, userId: $userId, rate: $rate)
  }
`;

const GET_USER_RATE = gql`
  query Query($userId: String!, $companyId: Int!) {
    getCompanyRateForUser(userId: $userId, companyId: $companyId)
  }
`;

function OtherCompanyProfile() {
  const [commentText, setCommentText] = useState("");
  const [rate, setRate] = useState(0);
  const [userRate, setUserRate] = useState(0);
  const company = useParams();

  const { data, refetch: refetchCompany } = useQuery(GET_COMPANY_QUERY, {
    variables: {
      companyId: parseInt(company?.company_id),
    },
  });

  useEffect(() => {
    if (data) {
      setRate(data.getCompany.Rate);
    }
  }, [data]);

  const [makeRate] = useMutation(MAKE_RATE);
  const { data: userRateData } = useQuery(GET_USER_RATE, {
    variables: {
      userId: localStorage.getItem("id"),
      companyId: parseInt(company?.company_id),
    },
  });

  useEffect(() => {
    if (userRateData) {
      setUserRate(userRateData.getCompanyRateForUser || 0);
    }
  }, [userRateData]);

  const navigate = useNavigate();

  const [createComment, { loading: createCommentLoading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );

  const handleRateChange = async (newRate) => {
    setUserRate(newRate);
    try {
      await makeRate({
        variables: {
          companyId: parseInt(company?.company_id),
          userId: localStorage.getItem("id"),
          rate: newRate,
        },
      }).then(() => {
        refetchCompany();
      });
    } catch (error) {
      console.error("Error making rate:", error);
    }
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
                  <Rating
                    defaultValue={data?.getCompany?.Rate}
                    size="lg"
                    className="mt-2"
                    value={userRate}
                    onChange={handleRateChange}
                  />
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
                    w={"90%"}
                  />
                  <h4>Comments</h4>
                  <div className="d-flex flex-column align-items-start gap-3">
                    {console.log(data?.getCompany?.Comments)}
                    {data?.getCompany?.Comments.map((comment) => (
                      <CommentComp
                        key={comment._id}
                        commenterName={
                          comment?.User?.FirstName +
                          " " +
                          comment?.User?.LastName
                        }
                        commentText={comment.Value}
                        ImageUser={comment?.User?.ImageUrl}
                        timestamp={comment.CreatedDate}
                      />
                    ))}
                  </div>
                  <div className="d-flex gap-3 justify-content-start">
                    <TextInput
                      type="text"
                      w="70%"
                      value={commentText}
                      onChange={() => {
                        setCommentText(event.target.value);
                      }}
                    ></TextInput>
                    <Button
                      variant="filled"
                      color="#388E3C"
                      onClick={() => {
                        console.log({
                          comment: {
                            Value: commentText,
                          },
                          companyId: parseInt(company?.company_id),
                          userId: localStorage.getItem("id"),
                        });
                        createComment({
                          variables: {
                            comment: {
                              Value: commentText,
                            },
                            companyId: parseInt(company?.company_id),
                            userId: localStorage.getItem("id"),
                          },
                        }).then(() => {
                          refetchCompany();
                          setCommentText("");
                        });
                      }}
                    >
                      {createCommentLoading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
                <div
                  className="d-flex flex-column gap-5"
                  style={{ minWidth: 300 }}
                >
                  <div className="d-flex flex-column gap-2">
                    <h4>Current Project</h4>
                    <div className="project_name">
                      <h6>{data?.getCompany?.Project?.ProjectName}</h6>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2 pt-5">
                    <h4>Teams</h4>
                    {data?.getCompany?.Teams?.map((team) => (
                      <Link
                        to={`${Paths.TeamUsersOthers}/${team._id}`}
                        key={team._id}
                      >
                        <TeamOther team={team} />
                      </Link>
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
