import React from "react";
import "./AddPost.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button, Input } from "@mantine/core";
function AddPost() {
  return (
    <div className="AddPostAll">
      <SideBar />
      <div className="AddPostMain">
        <NavBar />
        <div className="AddPostCenter">
          <div className="AddPostContent">
            <span className="AddPostHeader">Add Post</span>
            <div className="AddPostAllInput">
            <div className="AddPostInput">
                  <span className="TextPartLabel">Company</span>
                  <input
                    type="text"
                    placeholder="Company A"
                    className="AddPostTextInput"
                  />
                </div>
                <div className="AddPostInputPost">
                  <span className="TextPartLabel">Post</span>
                  <input
                    type="text"
                    placeholder="New Content"
                    className="AddPostTextInput1"
                  />
                </div>
                </div><div className="AddPostButton">
                <Button variant="filled" color="#388E3C" w={120} h={35}>Add</Button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
