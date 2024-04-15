import React, { useState, useEffect } from "react";
import "./PostsCard.css";
import { Button } from '@mantine/core';

function PostsCard({ color, userData, postsData, onApply }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);

  const handleApplyClick = (postId) => {
    // Call the onApply function with the postId as an argument
    onApply(postId);
  };

  return (
    <div className={`${
      isDarkMode
        ? "PostsCardAllDark"
        : "PostsCardAll"
    }`}>
      {postsData && postsData.map((post, index) => (
        <div key={index} className="PostsCardDesign">
          <div className="PostsCardProfile">
            {userData && (
              <img src={userData.ImageUrl} alt="Profile" className="PostsCardImg" />
            )}
            <div className="PostsCardImgText">
              {userData && (
                <span className={`${
                  isDarkMode
                    ? "ImgText1Dark"
                    : "ImgText1"
                  }`}>{userData.FirstName} {userData.LastName}</span>
              )}
              {userData && userData.MyCompanies && userData.MyCompanies.length > 0 && (
                <span className="ImgText2">{userData.MyCompanies[0].CompanyName}</span>
              )}
            </div>
          </div>
          <div className="PostsCardPost">
            <p className={`${
              isDarkMode
                ? "ParagraphPostDark"
                : "ParagraphPost"
              }`}>
              {post.Content}
            </p>
          </div>
          <div className="PostsCardTime">
            <span className="PostTime">{post.CreatedDate}</span>
            <Button
              variant="filled"
              color="#388E3C"
              size="xs"
              h={30}
              w={110}
              onClick={() => handleApplyClick(post.id)} // Pass post id to handleApplyClick
            >
              Apply
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsCard;
