import { useState,useEffect } from "react";
import "./PostsCard.css";
import Profile from "./Ellipse 1.png";
import { Button } from '@mantine/core';
function PostsCard({color}) {
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
          <img src={Profile} alt="Profile" className="PostsCardImg" />
          <div className="PostsCardImgText">
            <span className={`${
      isDarkMode
        ? "ImgText1Dark"
        : "ImgText1"
    }`} >John Kappa</span>
            <span className="ImgText2">Company Name</span>
          </div>
        </div>
        <div className="PostsCardPost">
          <p className={`${
      isDarkMode
        ? "ParagraphPostDark"
        : "ParagraphPost"
    }`}>
            This is the original component. Edit me to make global changes to
            all. 🎉
          </p>
        </div>
        <div className="PostsCardTime">
            <span className="PostTime">12:30 PM · Apr 21, 2021</span>
            <Button variant="filled" color="#388E3C" size="xs"h={30} w={110}>Apply</Button>
        </div>
      </div>
    </div>
  );
}

export default PostsCard;
