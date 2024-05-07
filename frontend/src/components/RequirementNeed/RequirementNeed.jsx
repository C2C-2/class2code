import "./RequirementNeed.css";

function RequirementNeed({ colorProps, textReq ,colorReq }) {
  return (
    <div className="ReqNeedAllCard" >
      <button className={colorProps === "dark" ? "ReqTextCardDark" : "ReqTextCard" } style={{backgroundColor:colorReq}}>{textReq}</button>
    </div>
  );
}

export default RequirementNeed;
