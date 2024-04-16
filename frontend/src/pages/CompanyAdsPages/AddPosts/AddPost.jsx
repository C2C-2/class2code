import { useEffect, useState } from "react";
import "./AddPost.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import { useMutation, useQuery, gql } from "@apollo/client";

const CREATE_POSITION_POST = gql`
  mutation CreatePositionPost($post: PositionPostInput!, $companyId: Int!) {
    createPositionPost(post: $post, companyId: $companyId) {
      Content
      CreatedDate
      _id
    }
  }
`;

const GET_COMPANY = gql`
  query GetCompany($companyId: Int!) {
    getCompany(companyId: $companyId) {
      CompanyName
    }
  }
`;

function AddPost({ companyId }) {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [postData, setPostData] = useState({
    post: null,
    companyId: companyId,
  });
  const [createPost] = useMutation(CREATE_POSITION_POST);
  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { companyId: companyId },
  });

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

  useEffect(() => {
    if (!loading && !error && data) {
      setPostData((prevData) => ({
        ...prevData,
        post: {
          ...prevData.post,
          Company: data.getCompany.CompanyName,
        },
      }));
    }
  }, [loading, error, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      post: {
        ...prevData.post,
        [name]: value,
      },
    }));
  };
  const handleAddPost = () => {
    createPost({ variables: postData })
      .then((res) => {
        // Handle success, e.g., show a success message
        console.log("Post created successfully:", res.data.createPositionPost);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error creating post:", error);
      });
  };
  return (
    <div className="AddPostAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="AddPostMain">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div
          className={`${isDarkMode ? "AddPostCenterDark" : "AddPostCenter"}`}
        >
          <div
            className={`${
              isDarkMode ? "AddPostContentDark" : "AddPostContent"
            }`}
          >
            <span
              className={`${
                isDarkMode ? "AddPostHeaderDark" : "AddPostHeader"
              }`}
            >
              Add Post
            </span>
            <div className="AddPostAllInput">
              <div className="AddPostInput">
                <span
                  className={`${
                    isDarkMode ? "TextPartLabelDark" : "TextPartLabel"
                  }`}
                >
                  Company
                </span>
                <input
                  type="text"
                  name="Company"
                  value={postData.post.Company || ""}
                  readOnly
                  className="AddPostTextInput"
                />
              </div>
              <div className="AddPostInputPost">
                <span
                  className={`${
                    isDarkMode ? "TextPartLabelDark" : "TextPartLabel"
                  }`}
                >
                  Post
                </span>
                <input
                  type="text"
                  placeholder="New Content"
                  name="Content"
                  onChange={handleInputChange}
                  className="AddPostTextInput1"
                />
              </div>
            </div>
            <div className="AddPostButton">
              <Button
                variant="filled"
                color="#388E3C"
                w={120}
                h={35}
                onClick={handleAddPost}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
