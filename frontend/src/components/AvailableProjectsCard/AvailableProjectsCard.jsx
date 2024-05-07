import { Link } from "react-router-dom";
import "./AvailableProjectCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
import { ActionIcon, Button } from "@mantine/core";

function AvailableProjectsCard({
  projectName,
  applications,
  projectDescription,
  requirements,
  colorProp,
  project_id,
}) {
  return (
    <div className="AvailableProjectDesign">
      <div className="w-100 d-flex justify-content-end">
        <ActionIcon
          className="PlusIcon"
          color="#fff4e6"
          variant="filled"
          radius="xl"
          aria-label="Settings"
          size={"lg"}
        >
          <h4>+</h4>
        </ActionIcon>
      </div>
      <Link to={`/ProjectPage/${project_id}`}>
        <div className="PartTextAvailableProject">
          <h5>{projectName}</h5>
          <span>{applications} Apply</span>
          <p>{projectDescription}</p>
        </div>
        <br />
        <div className="RequirementsAvailableProject">
          <h6>Requirements</h6>
          <div className="ReqNeed">
            {requirements?.map((requirement, index) => (
              <RequirementNeed
                key={index}
                colorProps={colorProp}
                textReq={requirement}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AvailableProjectsCard;
