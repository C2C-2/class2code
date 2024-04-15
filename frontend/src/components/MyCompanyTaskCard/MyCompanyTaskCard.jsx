import "./MyCompanyTaskCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
// import { useHistory } from 'react-router-dom';
function MyCompanyTaskCard({ taskName, createDate, priority, companyName, taskStatus, task_id  }) {
  // const history = useHistory();
  const handleEditClick = () => {
    // Redirect to the EditTask page with the task ID as a parameter
    // history.push(`/edit-task/${id}`);
  };
  return (
    <button className="MyCompanyTaskCardAll">
      <div className="MyCompanyTaskCardMain">
        <div className="MyCompanyTaskCardName">
          <span className="MyCompanyTaskCardName1">
            <span className="MyCompanyTaskCardText">{companyName}</span>
          </span>
        </div>
        <div className="MyCompanyTaskCardDesign">
          <div className="MyCompanyTaskCardEditButton">
            <button className="MyCompanyTaskCardEditButtonText"onClick={handleEditClick}>. . .</button>
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
    </button>
  );
}

export default MyCompanyTaskCard;
