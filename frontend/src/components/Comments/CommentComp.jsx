import React from 'react'
import "./CommentComp.css"
import Com from "./Oval.png";
function CommentComp() {
  return (
    <div className="Comments">
    <div className="Comments1">
      <button className='CommentsProfileButton'>
      <img src={Com} alt="CommentsProfile" />
      </button>
      <button className="ComText">amyrobson</button>
      <span className="ComText1">1 month ago</span>
    </div>
    <div className="Comments2">
      <p className="Para1">
        Impressive! Though it seems the drag feature could be
        improved. But overall it looks incredible. You’ve nailed the
        design and the responsiveness at various breakpoints works
        really well.
      </p>
    </div>
  </div>
  )
}

export default CommentComp;