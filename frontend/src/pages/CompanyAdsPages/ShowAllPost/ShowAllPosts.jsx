import { useEffect, useState } from "react";
import "./ShowAllPosts.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import PostsCard from "../../../components/PostsCard/PostsCard";
import { useQuery,useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
function ShowAllPosts({ userId }) {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#000";
  }, [receivedData]);

  const GET_ALL_POSTS = gql`
    query GetAllPosts($userId: String!) {
      getAllPosts(userId: $userId) {
        Content
        CreatedDate
        _id
      }
    }
  `;
  const APPLY_TO_POST = gql`
  mutation ApplyToPost($postId: Int!, $userId: String!) {
    applyToPost(postId: $postId, userId: $userId)
  }
`;
const [applyToPost] = useMutation(APPLY_TO_POST);

  const handleApplyToPost = (postId) => {
    applyToPost({ variables: { postId, userId } });
  };
  const GET_ALL_POSTS_SORTED_BY_DATE = gql`
    query GetAllPostsSortedByDate($userId: String!, $isDesc: Boolean) {
      getAllPostsSortedByDate(userId: $userId, isDESC: $isDesc) {
        Content
        CreatedDate
      }
    }
  `;

  const GET_USER = gql`
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        FirstName
        LastName
        ImageUrl
        MyCompanies {
          CompanyName
        }
      }
    }
  `;

  const SEARCH_IN_MY_POSTS = gql`
    query SearchInMyPosts($word: String!, $userId: String!) {
      searchInMyPosts(word: $word, userId: $userId) {
        Content
        CreatedDate
      }
    }
  `;
  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_IN_MY_POSTS, {
    variables: { word: searchWord, userId },
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { userId },
  });

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_ALL_POSTS, {
    variables: { userId },
  });
  const {
    loading: sortedPostsLoading,
    error: sortedPostsError,
    data: sortedPostsData,
  } = useQuery(GET_ALL_POSTS_SORTED_BY_DATE, {
    variables: { userId, isDesc: true }, // Assuming you want to sort in descending order
  });

  const combinedData = {
    user: userData?.getUser,
    posts: postsData?.getAllPosts,
  };

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  return (
    <div className="ShowAllPostsAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="ShowAllPostsMain">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="ShowAllPostsContent">
          <div className="ShowAllPostsButtonBack">
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
          <div className="ShowAllPostsData">
            <div className="SearchPartShowAllPosts">
              <input
                type="text"
                placeholder="Search for Posts"
                className={`${
                  isDarkMode
                    ? "TextPartShowAllPostsDark"
                    : "TextPartShowAllPosts"
                }`}
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
              ></input>
              <button className="SvgPartShowAllPosts">
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
              </button>
            </div>
            <div className="ShowAllPostsButtons">
              <Button variant="filled" color="#EE7214" w={150}>
                My Posts
              </Button>
              <Button
                variant="filled"
                color="rgba(202, 204, 202, 1)"
                w={70}
                onClick={handleSortByDate}
              >
                <span style={{ color: "#000000" }}>Date</span>
              </Button>
            </div>
            <div className="ShowAllPostsCards">
              {!userLoading && !postsLoading && (
                <PostsCard
                  color={receivedData}
                  userData={combinedData.user}
                  postsData={
                    searchWord
                      ? searchData?.searchInMyPosts
                      : combinedData.posts
                  }
                  onApply={handleApplyToPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAllPosts;
