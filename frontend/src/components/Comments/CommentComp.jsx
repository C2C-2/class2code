import React from "react";
import "./CommentComp.css";
import defaultProfileImage from "./Oval.png";

function CommentComp({
  commenterName,
  profilePicture,
  commentText,
  timestamp,
  ImageUser,
}) {
  return (
    <div className="Comments">
      <div className="Comments1 d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <img src={ImageUser} alt="CommentsProfile" className="imgEdit" />
          <h6>{commenterName}</h6>
        </div>
        <span className="ComText1">{timestamp.slice(0, 10)}</span>
      </div>
      <div className="Comments2">
        <p className="mt-2 mx-4">{commentText}</p>
      </div>
    </div>
  );
}

export default CommentComp;
