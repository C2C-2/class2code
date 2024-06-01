import { Link } from "react-router-dom";
import "./AvailableProjectCard.css";
import RequirementNeed from "../RequirementNeed/RequirementNeed";
import { ActionIcon, Alert, Button, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

function AvailableProjectsCard({
  projectName,
  applications,
  projectDescription,
  requirements,
  colorProp,
  project_id,
  setError,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [companyId, setCompanyId] = useState("");

  const GET_MY_COMPANIES = gql`
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        MyCompanies {
          CompanyName
          _id
        }
      }
    }
  `;

  const { data: CompaniesData } = useQuery(GET_MY_COMPANIES, {
    variables: { userId: localStorage.getItem("id") },
  });

  useEffect(() => {
    if (CompaniesData) {
      setCompanyId(CompaniesData?.getUser?.MyCompanies[0]?._id);
    }
  }, [CompaniesData]);

  const APPLY_TO_PROJECT = gql`
    mutation Mutation($projectId: Int!, $companyId: Int!) {
      applyForProject(projectId: $projectId, companyId: $companyId)
    }
  `;

  const [applyToProject, { loading: applyLoading, error: applyError }] =
    useMutation(APPLY_TO_PROJECT);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (applyError) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); // 3 seconds

      // Cleanup the timer if the component is unmounted or if applyError changes
      return () => clearTimeout(timer);
    }
  }, [applyError]);

  return (
    <div className="AvailableProjectDesign">
      {showError && (
        <div
          style={{
            zIndex: 1000000000000000,
            position: "absolute",
            top: "2%",
            right: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert
            style={{ width: "fit-content" }}
            color="red"
            title={applyError.message}
          />
        </div>
      )}

      <div className="w-100 d-flex justify-content-end">
        <Modal
          xOffset={"30%"}
          yOffset={"10%"}
          opened={opened}
          onClose={close}
          title="Take Project By Company"
          centered
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyToProject({
                variables: {
                  projectId: parseInt(project_id),
                  companyId: parseInt(companyId),
                },
              }).then(() => {
                console.log("aaa");
                setError("Applied Successfully!");
                const time = setTimeout(() => setError(null), 3000);
                close();
                return () => clearTimeout(time);
              });
            }}
          >
            <div className="htmlInputGroup">
              <label htmlFor="PostCompany">Company</label>
              <select
                className="htmlInput"
                name="Company"
                id="PostCompany"
                required
                onChange={(e) => setCompanyId(e.target.value)}
              >
                {CompaniesData?.getUser?.MyCompanies?.map((company, index) => {
                  return (
                    <option key={index} value={company?._id}>
                      {company?.CompanyName}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <div className="w-100 d-flex justify-content-end">
              <Button variant="filled" color="green" type="submit">
                {applyLoading ? "Loading..." : "Apply"}
              </Button>
            </div>
          </form>
        </Modal>

        <ActionIcon
          className="PlusIcon"
          color="#fff4e6"
          variant="filled"
          radius="xl"
          aria-label="Settings"
          size={"lg"}
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
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
