import "./MyCompanyTaskCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
function MyCompanyTaskCard({ taskName, createDate, priority, companyName, taskStatus, task_id  }) {
  return (
    <Link to={`/TaskPage/${task_id}`} className="MyCompanyTaskCardAll">
      <div className="MyCompanyTaskCardMain">
        <div className="MyCompanyTaskCardName">
          <span className="MyCompanyTaskCardName1">
            <span className="MyCompanyTaskCardText">{companyName}</span>
          </span>
        </div>
        <div className="MyCompanyTaskCardDesign">
          <div className="MyCompanyTaskCardEditButton">
          <Link to={`/EditTask/${task_id}`}>
            <button className="MyCompanyTaskCardEditButtonText">. . .</button>
            </Link>
          </div>
          <div className="MyCompanyTaskCardCenter">
            <div className="MyCompanyTaskCardCenterPart1">
              <span className="MyCompanyTaskCardCenterPart1Text1">{taskName}</span>
              <span className="MyCompanyTaskCardCenterPart1Text2">{createDate}</span>
            </div>
            <span className="MyCompanyTaskCardCenterPart2Text1">{priority}</span>
          </div>
          <div className="MyCompanyTaskCardCenterParagraph">
            <p className="MyCompanyTaskCardCenterParagraphTexts">
              Brainstorming brings team members' diverse experience into play.
            </p>
          </div>
          <div className="MyCompanyTaskCardCenterCardOther">
            <RequirementNeed textReq={taskStatus} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MyCompanyTaskCard;
