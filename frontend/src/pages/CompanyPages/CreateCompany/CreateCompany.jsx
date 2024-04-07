import "./CreateCompany.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Button } from "@mantine/core";
import GreenBox2 from "../../../components/greenBox/GreenBox";
function CreateCompany() {
  return (
    <div className="CreateCompany">
      <div className="CreateCompanySideBar">
        <SideBar />
      </div>
      <div className="CreateComp">
        <div className="Part1CreateCompany">
          <NavBar />
        </div>
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
                    placeholder="Enter Company Name"
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Description</span>
                  <input
                    type="text"
                    placeholder="Enter Company Description"
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Admin</span>
                  <input
                    type="text"
                    placeholder="Enter Company Admin"
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Company Domain</span>
                  <input
                    type="text"
                    placeholder="Enter Company Domain"
                    className="TextInput"
                  />
                </div>
                <div className="InputOverAll">
                  <span className="TextPartCmopany">Select Project</span>
                  <input
                    type="text"
                    placeholder="Select Project"
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
                  className="TextInput"
                />
              </div>
              <div className="AddTeamsCreateCompany">
                <GreenBox2 />
              </div>
              <div className="ButtonCreateCompany">
                <Button variant="filled" color="#388E3C" w={150} h={40}>
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
