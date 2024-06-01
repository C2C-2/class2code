import { useEffect, useState } from "react";
import "./ShowAllPosts.css";
import { Alert, Button, Input, Pagination } from "@mantine/core";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../../assets/Paths";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { updateFieldWithKey } from "../../../config/firebase";

function ShowAllPosts() {
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [err, setErr] = useState(null);
  const [isDesc, setIsDesc] = useState(true);

  const navigation = useNavigate();

  const [postsData, setPostsData] = useState([]);

  const GET_POSTS = gql`
    query GetAllPosts($userId: String!, $page: Int, $limit: Int) {
      getAllPosts(userId: $userId, page: $page, limit: $limit) {
        _id
        Content
        CreatedDate
        Company {
          CompanyName
        }
        User {
          FirstName
          ImageUrl
          LastName
        }
      }
    }
  `;

  const [getPosts, { data: queryPostsData }] = useLazyQuery(GET_POSTS);

  useEffect(() => {
    getPosts({
      variables: { userId: localStorage.getItem("id"), page: page - 1, limit },
    }).then((e) => {
      setPostsData(e?.data?.getAllPosts);
    });
  }, [page, getPosts]);

  const APPLAY_FOR_POST = gql`
    mutation Mutation($postId: Int!, $userId: String!) {
      applyToPost(postId: $postId, userId: $userId)
    }
  `;

  const [applyToPost, { loading: loadingApplyToPost }] =
    useMutation(APPLAY_FOR_POST);

  const sortedPosts = postsData?.slice().sort((a, b) => {
    const dateA = new Date(a.CreatedDate);
    const dateB = new Date(b.CreatedDate);
    return isDesc ? dateB - dateA : dateA - dateB;
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
          <Alert style={{ width: "fit-content" }} color="green" title={err} />
        </div>
      )}
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="PostsSearchPart">
              <Button
                justify="center"
                variant="filled"
                color="#283739"
                radius="md"
                onClick={() => navigation(-1)}
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
              <div className="SearchPartShowAllPosts">
                <Input
                  type="text"
                  placeholder="Search for Posts"
                  className={"TextPartShowAllPosts"}
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  radius="md"
                ></Input>
                <Button variant="filled" color="green" radius="md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3547 12.9681C8.67003 15.0575 4.78756 14.869 2.31969 12.4011C-0.352547 9.72885 -0.352769 5.39584 2.31969 2.72338C4.99215 0.0509178 9.32517 0.0511395 11.9974 2.72338C14.4653 5.19124 14.6538 9.07371 12.5645 11.7584L15.6265 14.8205C15.7872 14.9812 15.8712 15.1902 15.8766 15.3998C15.8832 15.6271 15.8001 15.8567 15.6265 16.0302C15.2925 16.3643 14.7512 16.3646 14.4168 16.0302L11.3547 12.9681ZM10.7877 3.93309C12.7925 5.93786 12.792 9.18705 10.7877 11.1914C8.78336 13.1957 5.53418 13.1961 3.52941 11.1914C1.52464 9.18661 1.52508 5.93742 3.52941 3.93309C5.53373 1.92877 8.78292 1.92832 10.7877 3.93309Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="ShowAllPostsData">
              <div className="ShowAllPostsButtons">
                <Link to={Paths.MyPosts}>
                  <Button variant="filled" color="#EE7214" w={150}>
                    My Posts
                  </Button>
                </Link>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={() => {
                    setIsDesc(!isDesc);
                  }}
                  rightSection={isDesc ? <FaArrowUp /> : <FaArrowDown />}
                >
                  Date
                </Button>
              </div>
              <div className="ShowAllPostsCards">
                {sortedPosts?.map((post, index) => (
                  <div key={index} className="PostsCardDesign">
                    <div className="PostsCardProfile">
                      <img
                        src={post?.User?.ImageUrl}
                        alt="Profile"
                        className="PostsCardImg"
                      />
                      <div className="PostsCardImgText">
                        <h6>
                          {post?.User?.FirstName} {post?.User?.LastName}
                        </h6>
                        <p>{post?.Company?.CompanyName}</p>
                      </div>
                    </div>
                    <p id="PostsCardContent">{post?.Content}</p>
                    <div className="PostsCardTime">
                      <p className="PostTime">
                        {post?.CreatedDate?.slice(0, 15)}
                      </p>
                      <Button
                        variant="filled"
                        color="#388E3C"
                        size="xs"
                        h={30}
                        w={110}
                        onClick={async (e) => {
                          e.preventDefault();

                          if (!confirm("Are you sure?")) {
                            return;
                          }

                          await applyToPost({
                            variables: {
                              postId: parseInt(post?._id),
                              userId: localStorage.getItem("id"),
                            },
                          }).then(() => {
                            setErr("Applied");
                            const time = setTimeout(() => setErr(null), 3000);
                            return () => clearTimeout(time);
                          });
                        }}
                      >
                        {loadingApplyToPost ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <Pagination
                total={Math.ceil(postsData?.length / limit) || 1}
                color="orange"
                value={page}
                onChange={setPage}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAllPosts;
