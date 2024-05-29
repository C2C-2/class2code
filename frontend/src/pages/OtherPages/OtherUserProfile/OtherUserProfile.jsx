import "./OtherUserProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Pill,
  PillsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
function UserProfile() {
  const [skills, setSkills] = useState([]);
  const { user_id: userId } = useParams();
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState("");
  const [rate, setRate] = useState(0);
  const [Bio, setBio] = useState("");

  const navigate = useNavigate();

  const UPDATE_USER = gql`
    mutation Mutation($userId: String!, $user: UserInput!) {
      updateUser(userId: $userId, user: $user) {
        id
      }
    }
  `;

  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER);

  const GET_USER_IMAGE = gql`
    query Friends($userId: String!) {
      getUser(userId: $userId) {
        ImageUrl
        Work
        FirstName
        LastName
        Country
        Rate
        Bio
        DateOfBirth
        Gender
        Skills {
          Skill
          _id
        }
      }
    }
  `;

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(GET_USER_IMAGE, {
    variables: { userId },
  });

  const GET_STATISTICS = gql`
    query Query($userId: String!) {
      getProfileStatistics(userId: $userId) {
        NumberOfProjects
        NumberOfTeams
        NumberOfTasks
        NumberOfMyCompanies
      }
    }
  `;

  const {
    loading: statisticsLoading,
    error: statisticsError,
    data: statisticsData,
    refetch: statisticsRefetch,
  } = useQuery(GET_STATISTICS, {
    variables: { userId: userId },
  });

  const fetch = useCallback(() => {
    if (userData) {
      setImage(userData?.getUser?.ImageUrl);
      setFullName(
        userData?.getUser?.FirstName + " " + userData?.getUser?.LastName
      );
      setSpecialty(userData?.getUser?.Work);
      setCountry(userData?.getUser?.Country);
      setRate(userData?.getUser?.Rate);
      setBio(userData?.getUser?.Bio);
      setDateOfBirth(userData?.getUser?.DateOfBirth);
      setSkills(userData?.getUser?.Skills?.map((e) => e.Skill));
      setGender(userData?.getUser?.Gender);
    }
  }, [userData, statisticsData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const UPDATE_SKILLS = gql`
    mutation UpdateUserSkills($userId: String!, $skills: [String]!) {
      updateUserSkills(userId: $userId, skills: $skills)
    }
  `;

  const [updateSkills, { loading: skillsLoading, error: skillsError }] =
    useMutation(UPDATE_SKILLS);

  return (
    <div className="ShowAllPostsAll" id="man">
      <div className="ShowAllPostsMain">
        <div className="ShowAllPostsContent">
          <div className="sideBareFake"></div>
          <div className="postsBody">
            <div className="navbarFake"></div>
            <div className="UserProfileBackGroundColor"></div>
            <Button
              justify="center "
              variant="filled"
              color="#283739"
              radius="md"
              onClick={() => navigate(-1)}
              w={"fit-content"}
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
            <div className="UserProfileContent">
              <div className="UserProfileImage">
                <img
                  src={image}
                  className="UserProfileImg"
                  alt="User Profile"
                />
                <div className="UserProfileImageText">
                  <h6 className="UserProfileImageText1">{fullName}</h6>
                  <h6 className="UserProfileImageText2">
                    {specialty} {rate}
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
                  <h6 className="UserProfileDataTextNumber">
                    {statisticsData?.getProfileStatistics?.NumberOfProjects}
                  </h6>
                  <span className="UserProfileDataText">Project</span>
                </div>
                <hr className="UserProfileDataLine" />
                <div className="UserProfileDataDesign">
                  <h6 className="UserProfileDataTextNumber">
                    {statisticsData?.getProfileStatistics?.NumberOfTasks}
                  </h6>
                  <span className="UserProfileDataText">Task</span>
                </div>
                <hr className="UserProfileDataLine" />
                <div className="UserProfileDataDesign">
                  <h6 className="UserProfileDataTextNumber">
                    {statisticsData?.getProfileStatistics?.NumberOfTeams}
                  </h6>
                  <span className="UserProfileDataText">Team</span>
                </div>
              </div>
              <div className="UserProfileDetails">
                <div className="UserProfileDetails1">
                  <Textarea
                    label="About me"
                    value={Bio || "No bio"}
                    disabled
                  />
                  <TextInput
                    label="Full Name"
                    value={fullName}
                    disabled
                  />
                  <TextInput
                    label="Your Work"
                    value={specialty}
                    disabled
                  />
                  <div>
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="form-control"
                      placeholder="Date Of Birth"
                      value={dateOfBirth}
                      disabled
                    />
                  </div>
                  <TextInput
                    label="Country"
                    value={country}
                    disabled
                  />
                  <div className="genderContainer">
                    <h6 className="genderText fw-semibold">Gender</h6>
                    <select
                      className="form-control"
                      name="gender"
                      id="gender"
                      value={gender}
                      disabled
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="skills">
                  <div className="addSkill">
                    <PillsInput label="Skills" description="Add Your Skills">
                      <Pill.Group>
                        {skills?.map((skill) => (
                          <Pill
                            key={skill}
                            value={skill}
                            withRemoveButton
                            disabled
                            size="md"
                          >
                            {skill}
                          </Pill>
                        ))}
                      </Pill.Group>
                    </PillsInput>
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

const UserProfileImg = ({ image, setImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="UserProfileImgContainer"
      onClick={() => document.getElementById("fileInput").click()}
    >
      <img src={image} className="UserProfileImg" alt="User Profile" />
      <div className="EditIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-edit-2"
        >
          <path d="M17 3l4 4L7 21H3v-4L17 3z"></path>
        </svg>
      </div>
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default UserProfile;
