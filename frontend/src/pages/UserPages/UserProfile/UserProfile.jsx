import "./UserProfile.css";
import SideBar from "../../../components/SideBar/SideBar";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import RequirementNeed from "../../../components/RequirementNeed/RequirementNeed"
import GreenBox2 from "../../../components/GreenBox/GreenBox2"
import {
  Button,
  Autocomplete,
  Input,
  TextInput,
  Textarea,
} from "@mantine/core";
function UserProfile() {
  return (
    <div className="AllUserProfile">
      <SideBar />
      <div className="MainUserProfile">
        <NavBar />
        <div className="FakeDivUserProfile"></div>
        <div className="UserProfileCenter">
          <div className="UserProfileBackGroundColor">
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
          <div className="UserProfileContent">
            <div className="UserProfileImage">
              <div className="UserProfileImg"></div>
              <div className="UserProfileImageText">
                <h6 className="UserProfileImageText1"> Product Manager</h6>
                <h6 className="UserProfileImageText2">
                  Andrew Smith 4.7
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M15.7904 5.95969L11.3896 5.31897L9.42295 1.33848C9.24616 0.982791 8.90129 0.802994 8.55643 0.802994C8.21368 0.802994 7.87122 0.980386 7.69383 1.33848L5.72658 5.31867L1.32546 5.95878C0.536214 6.07304 0.219915 7.04388 0.792079 7.60011L3.97581 10.697L3.22235 15.071C3.11531 15.6958 3.61411 16.197 4.17275 16.197C4.32098 16.197 4.47341 16.1618 4.61984 16.0843L8.55703 14.0193L12.4939 16.0849C12.6401 16.1615 12.7922 16.1964 12.9398 16.1964C13.4991 16.1964 13.9988 15.697 13.8917 15.0719L13.1392 10.6976L16.3235 7.60131C16.896 7.04508 16.5797 6.07394 15.7904 5.95969ZM12.1301 9.66387L11.5853 10.1936L11.714 10.9417L12.3009 14.3527L9.23022 12.7415L8.55733 12.3885L8.55824 2.85172L10.0925 5.95728L10.4287 6.63768L11.1806 6.74713L14.6151 7.24713L12.1301 9.66387Z"
                      fill="#F4CE14"
                    />
                  </svg>
                </h6>
              </div>
            </div>
            <div className="UserProfileData">
              <div className="UserProfileDataDesign">
                <h6 className="UserProfileDataTextNumber">21</h6>
                <span className="UserProfileDataText">Project</span>
              </div>
              <hr className="UserProfileDataLine" />
              <div className="UserProfileDataDesign">
                <h6 className="UserProfileDataTextNumber">238</h6>
                <span className="UserProfileDataText">Task</span>
              </div>
              <hr className="UserProfileDataLine" />
              <div className="UserProfileDataDesign">
                <h6 className="UserProfileDataTextNumber">101</h6>
                <span className="UserProfileDataText">Team</span>
              </div>
            </div>
            <div className="UserProfileButtons">
              <Button variant="filled" c="black" color="#F4CE14" w={150}>
                Upload Photo
              </Button>
              <Button variant="filled" color="#388E3C" w={150}>
                Update Profile
              </Button>
              <Button variant="transparent" color="#283739" size="md">
                Reset
              </Button>
            </div>
            <div className="UserProfileDetails">
              <div className="UserProfileDetails1">
                <div className="DivAboutMe">
                  <h5 className="UserProfileDetailsAboutMe">About me</h5>
                  <Textarea w={500} placeholder="Input placeholder" />
                </div>
                <h5>General Information</h5>
                <Input.Wrapper
                  label="Full Name"
                  description=""
                  error=""
                  size="md"
                >
                  <Input placeholder="Andrew Smith" w={500} />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Your Work"
                  description=""
                  error=""
                  size="md"
                >
                  <Input placeholder="Product Manager " w={500} />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Date Of Birth"
                  description=""
                  error=""
                  size="md"
                >
                  <Input placeholder="22/9/2002" w={500} />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Country"
                  description=""
                  error=""
                  size="md"
                >
                  <Input placeholder="Palestine" w={500} />
                </Input.Wrapper>
                <Input.Wrapper label="Gender" description="" error="" size="md">
                  <Input placeholder="Male"  w={500}/>
                </Input.Wrapper>
              </div>
              <div className="UserProfileDetails2">
                <h5>Skills</h5>
                <Input.Wrapper label="Add Skill"  size="md">
                  <Input placeholder="Web developer" w={250} />
                </Input.Wrapper>
                <div className="UserProfileDetails2Skills">
                    <GreenBox2 title={"React"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
