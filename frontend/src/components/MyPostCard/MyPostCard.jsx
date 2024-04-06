import { useState,useEffect } from "react";
import "./MyPostCard.css"
import Profile from "./Ellipse 1.png";
import { Button } from '@mantine/core';
function MyPostCard({color}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(color === "dark");
  }, [color]);
  return (
    <div  className={`${
      isDarkMode
        ? "MyPostsCardAllDark"
        : "MyPostsCardAll"
    }`}>
    <div className="MyPostsCardDesign ">
      <div className="MyPostsCardProfile">
        <img src={Profile} alt="Profile" className="MyPostsCardImg" />
        <div className="MyPostsCardImgText">
          <span className={`${
      isDarkMode
        ? "MyImgText1Dark"
        : "MyImgText1"
    }`}>John Kappa</span>
          <span className="MyImgText2">Company Name</span>
        </div>
      </div>
      <div className="MyPostsCardPost">
        <p className={`${
          isDarkMode
            ? "MyParagraphPostDark"
            : "MyParagraphPost"
        }`}>
          This is the original component. Edit me to make global changes to
          all. 🎉
        </p>
      </div>
      <div className="MyPostsCardTime">
          <span className="MyPostTime">12:30 PM · Apr 21, 2021</span>
          <Button variant="filled" color="#388E3C" size="xs"h={30} w={110}>Edit</Button>
      </div>
    </div>
  </div>
  )
}

export default MyPostCard