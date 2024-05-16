import { useState, useEffect } from "react";
import "./EditMyCompanyProfile.css";
import { Button, Textarea, TextInput } from "@mantine/core";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import CurrentProject from "../../../components/CurrentProject/CurrentProject";
import EditTeamMyCompanyProfile from "../../../components/EditTeamMyCompanyProfile/EditTeamMyCompanyProfile";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

function EditMyCompanyProfile() {
  const { company_id } = useParams();
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const GET_COMPANY_DATA = gql`
    query GetCompany($companyId: Int!) {
      getCompany(companyId: $companyId) {
        _id
        Rate
        CompanyName
        CreateDate
        Domain
        CompanyDescription
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_COMPANY_DATA, {
    variables: { companyId: Number(company_id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const {
    CompanyName,
    Domain,
    CreateDate,
    CompanyDescription,
    teams,
    project,
  } = data.getCompany;
  return (
    <div className="EditMyCompaniesAll">
      <SideBar />
      <div className="EditMyCompaniesMain">
        <NavBar />
        <div className="EditMyCompaniesCenter">
          <div className="EditMyCompaniesFakeDiv"></div>
          <div className="EditMyCompaniesContent">
            <Link to="/MyCompanies" className="EditMyCompanyProfileButtonBack">
              <Button
                justify="center "
                variant="filled"
                color="#283739"
                radius="md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                >
                  <path
                    d="M1.5 6H16.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.49999 11L1.5 6L6.49999 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Link>
            <div className="EditMyCompaniesContentData">
              <div className="EditMyCompaniesContentDataTop">
                <div className="EditMyCompaniesContentDataTopDesign">
                  <div className="EditMyCompaniesContentDataTopDesignInside">
                    <h4>{CompanyName}</h4>
                    <div className="EditMyCompaniesContentDataTopDesignInsideRate">
                      <h6>4.9</h6>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M15.2904 5.9597L10.8896 5.31899L8.92295 1.33849C8.74616 0.982806 8.40129 0.803009 8.05643 0.803009C7.71368 0.803009 7.37122 0.980401 7.19383 1.33849L5.22658 5.31869L0.825457 5.9588C0.0362136 6.07305 -0.280085 7.0439 0.292079 7.60013L3.47581 10.697L2.72235 15.071C2.61531 15.6958 3.11411 16.197 3.67275 16.197C3.82098 16.197 3.97341 16.1618 4.11984 16.0843L8.05703 14.0193L11.9939 16.0849C12.1401 16.1615 12.2922 16.1964 12.4398 16.1964C12.9991 16.1964 13.4988 15.697 13.3917 15.0719L12.6392 10.6976L15.8235 7.60133C16.396 7.0451 16.0797 6.07395 15.2904 5.9597ZM11.6301 9.66389L11.0853 10.1937L11.214 10.9417L11.8009 14.3527L8.73022 12.7415L8.05733 12.3885L8.05824 2.85174L9.59253 5.9573L9.92867 6.6377L10.6806 6.74714L14.1151 7.24715L11.6301 9.66389Z"
                          fill="#F4CE14"
                        />
                      </svg>
                    </div>
                  </div>
                  <h4>Osama Ghneem</h4>
                </div>
                <div className="EditMyCompaniesContentDataTopDesign">
                  <h4>Domain</h4>
                  <h5>{Domain}</h5>
                </div>
                <div className="EditMyCompaniesContentDataTopDesign">
                  <h4>Create Date</h4>
                  <h6>{CreateDate}</h6>
                </div>
              </div>
              <div className="EditMyCompaniesContentDataCenter">
                <div className="EditMyCompaniesContentDataCenterPart1">
                  <Textarea
                    label="Description"
                    placeholder={CompanyDescription}
                    size="lg"
                    w={500}
                  />
                  <div className="EditMyCompaniesContentDataCenterPart1General">
                    <h3>General Information</h3>
                    <TextInput
                      label="Company Name"
                      placeholder={CompanyName}
                      size="lg"
                      w={500}
                    />
                    <TextInput
                      label="Domain"
                      placeholder={Domain}
                      size="lg"
                      w={500}
                    />
                  </div>
                </div>
                <div className="EditMyCompaniesContentDataCenterPart2">
                  <div className="EditMyCompaniesContentDataCenterPart2Project">
                    <h5>Current Project</h5>
                    <TextInput
                      label="Create Project"
                      placeholder="Input placeholder"
                      w={300}
                      size="lg"
                    />
                  </div>
                  <div className="EditMyCompaniesContentDataCenterPart2Project">
                    <h5>Current Team</h5>
                    <TextInput
                      label="Create Team"
                      placeholder="Input placeholder"
                      w={300}
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMyCompanyProfile;
