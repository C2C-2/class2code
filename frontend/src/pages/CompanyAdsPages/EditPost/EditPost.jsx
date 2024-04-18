import "./EditPost.css";
import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button} from "@mantine/core";
function EditPost() {
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
    <div className="EditPostAll" id="man">
      <SideBar />
      <div className="EditPostMain">
        <NavBar sendDataToParent={receiveDataFromChild}/>
        <div className="EditPostCenter">
          <div className="EditPostContent">
            <span className="EditPostHeader">Edit Post</span>
            <div className="EditPostAllInput">
              <div className="EditPostInput">
                <span className="TextPartLabel">Company</span>
                <input
                  type="text"
                  placeholder="Company A"
                  className="EditPostTextInput"
                />
              </div>
              <div className="EditPostInputPost">
                <span className="TextPartLabel">Post</span>
                <input
                  type="text"
                  placeholder="New Content"
                  className="EditPostTextInput1"
                />
              </div>
            </div>
            <div className="EditPostButton">
              <Button variant="filled" color="#388E3C" w={120} h={35}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
