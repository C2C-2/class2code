import { useCallback, useEffect, useState } from "react";
import "./ShowMyPost.css";
import { Button, Input, Pagination, Modal, Textarea } from "@mantine/core";
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { Paths } from "../../../assets/Paths";

function ShowAllPosts() {
  const [searchWord, setSearchWord] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [description, setDescription] = useState("");
  const [isDesc, setIsDesc] = useState(true);
  const navigation = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [postsData, setPostsData] = useState([]);

  const GET_POSTS = gql`
    query Query($limit: Int, $page: Int, $userId: String!, $isDesc: Boolean) {
      getAllMyPostsSortedByDate(
        limit: $limit
        page: $page
        userId: $userId
        isDESC: $isDesc
      ) {
        _id
        Content
        CreatedDate
        User {
          id
          FirstName
          LastName
          ImageUrl
        }
        Company {
          _id
          CompanyName
        }
      }
    }
  `;

  const [getPosts, { data: queryPostsData, refetch: refetchPosts }] =
    useLazyQuery(GET_POSTS);

  const SEARCH_IN_POSTS = gql`
    query Query($word: String!, $userId: String!, $limit: Int, $page: Int) {
      searchInMyPosts(
        word: $word
        userId: $userId
        limit: $limit
        page: $page
      ) {
        _id
        Content
        CreatedDate
        User {
          id
          FirstName
          LastName
          ImageUrl
        }
        Company {
          _id
          CompanyName
        }
      }
    }
  `;

  const [searchInPosts, { data: searchInPostsData }] =
    useLazyQuery(SEARCH_IN_POSTS);

  const GET_MY_COMPANIES = gql`
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        MyCompanies {
          CompanyName
          _id
        }
      }
    }
  `;

  const { data: CompaniesData } = useQuery(GET_MY_COMPANIES, {
    variables: { userId: localStorage.getItem("id") },
  });

  const CREATE_POST = gql`
    mutation Mutation($post: PositionPostInput!, $companyId: Int!) {
      createPositionPost(post: $post, companyId: $companyId) {
        _id
      }
    }
  `;

  const [createPost] = useMutation(CREATE_POST);

  const fetch = useCallback(() => {
    getPosts({
      variables: {
        userId: localStorage.getItem("id"),
        page: page - 1,
        limit,
        isDesc,
      },
    }).then(() => {
      refetchPosts().then((e1) => {
        setPostsData(e1?.data?.getAllMyPostsSortedByDate);
      });
    });
  }, [page, limit, isDesc]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    setCompanyId(() => CompaniesData?.getUser?.MyCompanies[0]?._id);
  }, []);

  const [opened, { open, close }] = useDisclosure(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      post: {
        Content: description,
      },
      companyId: parseInt(companyId),
    });

    createPost({
      variables: {
        post: {
          Content: description,
        },
        companyId: parseInt(companyId),
      },
    })
      .then(() => {
        fetch();
        setDescription("");
        close();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };
  return (
    <div className="ShowAllPostsAll">
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
                onClick={() => {
                  navigation(-1);
                }}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchWord === "") {
                    fetch();
                  }
                  searchInPosts({
                    variables: {
                      word: searchWord,
                      userId: localStorage.getItem("id"),
                      page: page - 1,
                      limit,
                    },
                  }).then((e) => {
                    setPostsData(() => e?.data?.searchInMyPosts);
                  });
                }}
                className="SearchPartShowAllPosts"
              >
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.3547 12.9681C8.67003 15.0575 4.78756 14.869 2.31969 12.4011C-0.352547 9.72885 -0.352769 5.39584 2.31969 2.72338C4.99215 0.0509178 9.32517 0.0511395 11.9974 2.72338C14.4653 5.19124 14.6538 9.07371 12.5645 11.7584L15.6265 14.8205C15.7872 14.9812 15.8712 15.1902 15.8766 15.3998C15.8832 15.6271 15.8001 15.8567 15.6265 16.0302C15.2925 16.3643 14.7512 16.3646 14.4168 16.0302L11.3547 12.9681ZM10.7877 3.93309C12.7925 5.93786 12.792 9.18705 10.7877 11.1914C8.78336 13.1957 5.53418 13.1961 3.52941 11.1914C1.52464 9.18661 1.52508 5.93742 3.52941 3.93309C5.53373 1.92877 8.78292 1.92832 10.7877 3.93309Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </form>
            </div>
            <div className="ShowAllPostsData">
              <div className="ShowAllPostsButtons">
                <>
                  <Modal
                    xOffset={"30%"}
                    yOffset={"10%"}
                    opened={opened}
                    onClose={close}
                    centered={true}
                  >
                    <h4>Add Post</h4>
                    <br />
                    <form onSubmit={handleSubmit}>
                      <div className="htmlInputGroup">
                        <label htmlFor="PostCompany">Company</label>
                        <select
                          className="htmlInput"
                          name="Company"
                          id="PostCompany"
                          required
                          onChange={(e) => setCompanyId(e.target.value)}
                        >
                          {CompaniesData?.getUser?.MyCompanies?.map(
                            (company, index) => {
                              return (
                                <option key={index} value={company?._id}>
                                  {company?.CompanyName}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                      <br />
                      <Textarea
                        label="Description"
                        placeholder="Enter your description here"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                      <br />
                      <br />
                      <div className="w-100 d-flex justify-content-end">
                        <Button variant="filled" color="green" type="submit">
                          Create
                        </Button>
                      </div>
                    </form>
                  </Modal>

                  <Button variant="filled" color="#EE7214" onClick={open}>
                    Create New
                  </Button>
                </>
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
                {postsData?.map((post, index) => {
                  return (
                    <PostCard
                      key={index}
                      post={post}
                      index={index}
                      fetch={fetch}
                      companyId={post?.Company?._id}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <Pagination
                total={postsData?.getAllPosts?.length / limit || 1}
                color="orange"
                value={page}
                onChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PostCard = ({ post, index, fetch, companyId }) => {
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);

  const [description, setDescription] = useState("");

  const UPDATE_POST = gql`
    mutation Mutation(
      $positionPostId: Int!
      $positionPost: PositionPostInput!
    ) {
      updatePositionPost(
        positionPostId: $positionPostId
        positionPost: $positionPost
      ) {
        _id
      }
    }
  `;

  const [updatePost] = useMutation(UPDATE_POST);

  const DELETE_POST = gql`
    query Query($postId: Int!) {
      deletePost(postId: $postId)
    }
  `;

  const [deletePost, { loading: loadingDelete }] = useLazyQuery(DELETE_POST);

  return (
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
        <p className="PostTime">{post?.CreatedDate?.slice(0, 15)}</p>
        <>
          <Modal
            xOffset={"30%"}
            yOffset={"10%"}
            opened={editOpened}
            onClose={editClose}
            centered={true}
          >
            <h4>Add Post</h4>
            <br />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePost({
                  variables: {
                    positionPostId: parseInt(post?._id),
                    positionPost: {
                      Content: description,
                    },
                  },
                }).then(() => {
                  fetch();
                  editClose();
                });
              }}
            >
              <Textarea
                label="Description"
                placeholder="Enter your description here"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <br />
              <br />
              <div className="w-100 d-flex justify-content-end">
                <Button variant="filled" color="green" type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </Modal>

          <div className="d-flex gap-2">
            <Button
              onClick={() => {
                setDescription(post?.Content);
                editOpen();
              }}
              variant="filled"
              color="#388E3C"
              size="xs"
            >
              Edit
            </Button>
            <Link to={`${Paths.Applys}/${companyId}/${post?._id}`}>
              <Button variant="filled" size="xs">
                Apples
              </Button>
            </Link>
            <Button
              variant="filled"
              size="xs"
              color="red"
              onClick={() => {
                deletePost({
                  variables: {
                    postId: parseInt(post?._id),
                  },
                }).then(() => {
                  fetch();
                });
              }}
            >
              {loadingDelete ? "Loading..." : <FaTrash />}
            </Button>
          </div>
        </>
      </div>
    </div>
  );
};

export default ShowAllPosts;
