import {useState,useEffect} from "react";
import "./CreateCompany.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import GreenBox2 from "../../../components/GreenBox/GreenBox2";
import { useMutation, gql } from "@apollo/client";

const CREATE_NEW_COMPANY = gql`
  mutation CreateNewCompany($company: CompanyInput!, $userId: String!) {
    createNewCompany(company: $company, userId: $userId) {
      CompanyDescription
      CompanyName
      Domain
      Teams {
        TeamName
      }
      Project {
        ProjectName
      }
    }
  }
`;
function CreateCompany() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [companyData, setCompanyData] = useState({
    company: null,
    userId: null,
  });
  const [createCompany] = useMutation(CREATE_NEW_COMPANY);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  };

  const handleCreateCompany = () => {
    createCompany({ variables: companyData })
      .then((res) => {
        // Handle success, e.g., show a success message
        console.log("Company created successfully:", res.data.createNewCompany);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error creating company:", error);
      });
  };


  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };

  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#000";
  }, [receivedData]);

  return (
    <div className="CreateCompany" id="man">
        <SideBar colorSide={receivedData}/>
      <div className="CreateComp">
          <NavBar sendDataToParent={receiveDataFromChild} /> 
        <div className="Part2CreateCompany">
          <div className="CreateCompanyButtonBack">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.49999 11L1.5 6L6.49999 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="CreateCompanyInputs">
            <div className="Part1Inputs">
              <div className="GeneralInformation">General Information</div>
              <div className="InputsCreateCompanyAll">
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Name</span>
                  <input
                    type="text"
                    name="CompanyName"
                    onChange={handleInputChange}
                    placeholder="Enter Company Name"
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Description</span>
                  <input
                    type="text"
                    name="CompanyDescription"
                    onChange={handleInputChange}
                    placeholder="Enter Company Description"
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Admin</span>
                  <input
                    type="text"
                    placeholder="Enter Company Admin"
                    name="CompanyAdmin"
                    onChange={handleInputChange}
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Domain</span>
                  <input
                    type="text"
                    placeholder="Enter Company Domain"
                    name="Domain"
                    onChange={handleInputChange}
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Select Project</span>
                  <input
                    type="text"
                    placeholder="Select Project"
                    name="Project"
                    onChange={handleInputChange}
                    className="TextInput"
                  />
                </div>
              </div>
            </div>
            <div className="Part2Teams">
              <div className="TextTeamCreateCompany">Teams</div>
              <div className="InputOverAllTeam">
                
                <span className="TextPartCmopany">Select Team</span>
                <input
                  type="text"
                  placeholder="Select Team"
                  name="Team"
                  onChange={handleInputChange}
                  className="TextInput"
                />
              </div>
              <div className="AddTeamsCreateCompany">
              </div>
              <div className="ButtonCreateCompany">
                <Button variant="filled" color="#388E3C" w={150} h={40}  onClick={handleCreateCompany}>
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
