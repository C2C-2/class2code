import { useEffect, useState } from "react";
import "./ShowAllPosts.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button, Input, Pagination } from "@mantine/core";
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Paths } from "../../../assets/Paths";

function ShowAllPosts() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [postsData, setPostsData] = useState([]);

  const GET_POSTS = gql`
    query Query($userId: String!, $page: Int, $limit: Int) {
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
      variables: { userId: localStorage.getItem("id"), page, limit },
    });

    setPostsData(queryPostsData);
  }, [page]);

  return (
    <div className="ShowAllPostsAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="ShowAllPostsMain">
        <NavBar />
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="PostsSearchPart">
              <Link to="/Dashboard">
                <Button
                  justify="center"
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
              <div className="SearchPartShowAllPosts">
                <Input
                  type="text"
                  placeholder="Search for Posts"
                  className={`${
                    isDarkMode
                      ? "TextPartShowAllPostsDark"
                      : "TextPartShowAllPosts"
                  }`}
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
                  color="rgba(202, 204, 202, 1)"
                  w={70}
                  onClick={() => {}}
                >
                  <span style={{ color: "#000000" }}>Date</span>
                </Button>
              </div>
              <div className="ShowAllPostsCards">
                {postsData?.getAllPosts?.map((post, index) => (
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
                    <p>{post?.Content}</p>
                    <div className="PostsCardTime">
                      <p className="PostTime">
                        {post?.CreatedDate?.slice(0, 15)}
                      </p>
                      <Button
                        variant="filled"
                        color="#388E3C"
                        size="xs"
                        h={30}
                        w={110} // Pass post id to handleApplyClick
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
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

export default ShowAllPosts;
