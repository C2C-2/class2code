import React from 'react';
import "./CommentComp.css";
import defaultProfileImage from "./Oval.png";

function CommentComp({ commenterName, profilePicture, commentText, timestamp }) {
  return (
    <div className="Comments">
      <div className="Comments1">
        <button className='CommentsProfileButton'>
          <img src={profilePicture || defaultProfileImage} alt="CommentsProfile" />
        </button>
        <button className="ComText">{commenterName}</button>
        <span className="ComText1">{timestamp}</span>
      </div>
      <div className="Comments2">
        <p className="Para1">
          {commentText}
        </p>
      </div>
    </div>
  );
}

export default CommentComp;
