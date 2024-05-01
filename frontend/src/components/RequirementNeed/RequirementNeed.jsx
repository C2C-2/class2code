import "./RequirementNeed.css";

function RequirementNeed({ colorProps, textReq ,colorReq }) {
  return (
    <div className="ReqNeedAllCard" style={{backgroundColor:colorReq}}>
      <button className={colorProps === "dark" ? "ReqTextCardDark" : "ReqTextCard" }>{textReq}</button>
    </div>
  );
}

export default RequirementNeed;
