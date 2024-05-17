import "./EditPost.css";
import { Button} from "@mantine/core";
function EditPost() {
  return (
    <div className="EditPostAll" id="man">
      <div className="EditPostMain">
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
