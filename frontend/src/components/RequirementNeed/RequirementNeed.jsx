import "./RequirementNeed.css";

function RequirementNeed({ colorProps, textReq }) {
  console.log(textReq);
  return (
    <div className="ReqNeedAllCard">
      <button className={colorProps === "dark" ? "ReqTextCardDark" : "ReqTextCard"}>{textReq}</button>
    </div>
  );
}

export default RequirementNeed;
