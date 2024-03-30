import React from "react";
import "./ShowMyPost.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button, Input, TextInput } from "@mantine/core";
import MyPostCard from "../../../components/MyPostCard/MyPostCard";
function ShowMyPost() {
  return (
    <div className="ShowAllPostsAll">
      <SideBar />
      <div className="ShowAllPostsMain">
        <NavBar />
        <div className="ShowAllPostsContent">
          <div className="ShowAllPostsButtonBack">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.49999 11L1.5 6L6.49999 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="ShowMyPostData">
            <div className="SearchPartShowMyPost">
              <input
                type="text"
                placeholder="Search for Posts"
                className="TextPartShowMyPost"
              ></input>
              <button className="SvgPartShowMyPost">
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
            <div className="ShowMyPostButtons">
              <Button variant="filled" color="#EE7214" w={150}>
                My Posts
              </Button>
              <Button variant="filled" color="rgba(202, 204, 202, 1)" w={70}>
                <span style={{ color: "#000000" }}>Date</span>
              </Button>
            </div>
            <div className="ShowMyPostCards">
              <MyPostCard />
              <MyPostCard />
              <MyPostCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMyPost;
