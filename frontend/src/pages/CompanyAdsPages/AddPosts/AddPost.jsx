import { useEffect, useState } from "react";
import "./AddPost.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
function AddPost() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
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
  return (
    <div className="AddPostAll" id="man">
      <SideBar />
      <div className="AddPostMain">
        <NavBar  sendDataToParent={receiveDataFromChild}/>
        <div   className={`${
                  isDarkMode
                    ? "AddPostCenterDark"
                    : "AddPostCenter"
                }`}>
          <div   className={`${
                  isDarkMode
                    ? "AddPostContentDark"
                    : "AddPostContent"
                }`}>
            <span className={`${
                  isDarkMode
                    ? "AddPostHeaderDark"
                    : "AddPostHeader"
                }`}>Add Post</span>
            <div className="AddPostAllInput">
            <div className="AddPostInput">
                  <span className={`${
                  isDarkMode
                    ? "TextPartLabelDark"
                    : "TextPartLabel"
                }`}>Company</span>
                  <input
                    type="text"
                    placeholder="Company A"
                    className="AddPostTextInput"
                  />
                </div>
                <div className="AddPostInputPost">
                  <span   className={`${
                  isDarkMode
                    ? "TextPartLabelDark"
                    : "TextPartLabel"
                }`}>Post</span>
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
