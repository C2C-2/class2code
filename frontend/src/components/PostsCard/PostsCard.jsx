import React from "react";
import "./PostsCard.css";
import Profile from "./Ellipse 1.png";
import { Button } from '@mantine/core';
function PostsCard() {
  return (
    <div className="PostsCardAll">
      <div className="PostsCardDesign">
        <div className="PostsCardProfile">
          <img src={Profile} alt="Profile" className="PostsCardImg" />
          <div className="PostsCardImgText">
            <span className="ImgText1">John Kappa</span>
            <span className="ImgText2">Company Name</span>
          </div>
        </div>
        <div className="PostsCardPost">
          <p className="ParagraphPost">
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
