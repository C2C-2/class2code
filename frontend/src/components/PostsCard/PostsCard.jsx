import React, { useState, useEffect } from "react";
import "./PostsCard.css";
import { Button } from '@mantine/core';
import pro from "./Avatar.png"
function PostsCard({ color,postDate,postContent }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);


  return (
    <div className={`${
      isDarkMode
        ? "PostsCardAllDark"
        : "PostsCardAll"
    }`}>
        <div className="PostsCardDesign">
          <div className="PostsCardProfile">
              <img src={pro} alt="Profile" className="PostsCardImg" />
            <div className="PostsCardImgText">
    
                <span className={`${
                  isDarkMode
                    ? "ImgText1Dark"
                    : "ImgText1"
                  }`}>Osama Ghneem</span>
                <span className="ImgText2">Alkader</span>
          
            </div>
          </div>
          <div className="PostsCardPost">
            <p className={`${
              isDarkMode
                ? "ParagraphPostDark"
                : "ParagraphPost"
              }`}>
        {postContent}
            </p>
          </div>
          <div className="PostsCardTime">
            <span className="PostTime">{postDate}</span>
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
    </div>
  );
}

export default PostsCard;
