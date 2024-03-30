import "./EditPost.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button} from "@mantine/core";
function EditPost() {
  return (
    <div className="EditPostAll">
      <SideBar />
      <div className="EditPostMain">
        <NavBar />
        <div className="EditPostCenter">
          <div className="EditPostContent">
            <span className="EditPostHeader">Edit Post</span>
            <div className="EditPostPostAllInput">
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
