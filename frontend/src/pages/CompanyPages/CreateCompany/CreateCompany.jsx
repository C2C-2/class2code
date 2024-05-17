import { useState } from "react";
import "./CreateCompany.css";
import { Button } from "@mantine/core";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const CREATE_NEW_COMPANY = gql`
  mutation CreateNewCompany($company: CompanyInput!, $userId: String!) {
    createNewCompany(company: $company, userId: $userId) {
      CompanyDescription
      CompanyName
      Domain
    }
  }
`;

function CreateCompany() {
  const [companyData, setCompanyData] = useState({
    CompanyName: "",
    CompanyDescription: "",
    Domain: "",
  });
  const user_id = localStorage.getItem("id");

  const [createCompany] = useMutation(CREATE_NEW_COMPANY);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCompany = () => {
    createCompany({ variables: { company: companyData, userId: user_id } })
      .then((res) => {
        // Handle success, e.g., show a success message
        console.log("Company created successfully:", res.data.createNewCompany);
        // Redirect or perform other actions after successful creation
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error creating company:", error);
      });
  };

  return (
    <div className="CreateCompany" id="man">
      <div className="CreateComp">
        <div className="Part2CreateCompany">
          <div className="FakeDivNews"></div>
          <div className="ContentCreateCompany">
            <div className="CreateCompanyButtonBack">
              <Link to="/Dashboard">
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
            </div>
            <div className="CreateCompanyInputs">
              <div className="Part1Inputs">
                <div className="GeneralInformationCreateCompany">
                  General Information
                </div>
                <div className="InputsCreateCompanyAll">
                  <div className="InputOverAll">
                    <h6 className="TextPartCmopany">Company Name</h6>
                    <input
                      type="text"
                      name="CompanyName"
                      value={companyData.CompanyName}
                      onChange={handleInputChange}
                      placeholder="Enter Company Name"
                      className="TextInputCreateCompany"
                    />
                  </div>
                  <div className="InputOverAll">
                    <h6 className="TextPartCmopany">Company Description</h6>
                    <input
                      type="text"
                      name="CompanyDescription"
                      value={companyData.CompanyDescription}
                      onChange={handleInputChange}
                      placeholder="Enter Company Description"
                      className="TextInputCreateCompany"
                    />
                  </div>
                  <div className="InputOverAll">
                    <h6 className="TextPartCmopany">Company Domain</h6>
                    <input
                      type="text"
                      name="Domain"
                      value={companyData.Domain}
                      onChange={handleInputChange}
                      placeholder="Enter Company Domain"
                      className="TextInputCreateCompany"
                    />
                  </div>
                </div>
              </div>
              <div className="Part2Teams">
                <Link to="/MyCompanies" className="ButtonCreateCompany">
                  <Button
                    variant="filled"
                    size="md"
                    color="#388E3C"
                    w={200}
                    h={40}
                    onClick={handleCreateCompany}
                  >
                    Create
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
