import "./SecondSignup.css";
import { useState, useEffect } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";
import upload from "./feather_upload-cloud.png";
import Young from "./young man sitting with laptop and waving.png";
import GreenBox2 from "../../components/greenBox/GreenBox";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import { gql, useMutation, useQuery } from "@apollo/client";
const SecondSignup = () => {
  const [receivedData, setReceivedData] = useState("");
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    image: "",
    dateOfBirth: "",
    gender: "",
    work: "",
    country: "",
    skills: [""],
    newSkill: "",
    isAddingSkill: false,
  });
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#000";
  }, [receivedData]);
  const handleAddSkill = () => {
    const newSkill = formData.newSkill.trim();
    if (newSkill !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill],
        newSkill: "",
        isAddingSkill: false,
      });
    }
  };

  const toggleAddSkill = () => {
    setFormData({
      ...formData,
      isAddingSkill: !formData.isAddingSkill,
    });
  };
  const deleteSkill = gql`
    query Query($skillId: Int!) {
      deleteSkill(skillId: $skillId)
    }
  `;

  const createUser = gql`
    mutation CreateUser($user: UserInput!) {
      createUser(user: $user) {
        id
        dateOfBirth
        gender
        work
        country
        skills {
          id
          skill
        }
      }
    }
  `;
  const getAllSkills = gql`
    query Query($userId: String!) {
      getUser(userId: $userId) {
        Skills {
          Skill
          _id
        }
      }
    }
  `;
  const [mutateFunction, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(createUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    mutateFunction({
      variables: {
        user: {
          Country: formData.country,
          DateOfBirth: formData.dateOfBirth,
          Gender: formData.gender,
          ImageUrl: formData.image,
          Work: formData.work,
          skills: formData.skills.map((skill) => ({ skill })),
        },
      },
    });
  };
  const { loading: queryLoading , error: queryError, data: queryData } = useQuery(getAllSkills, {
    variables: { userId: "your_user_id" }, // Replace "your_user_id" with the actual user ID
  });
  const removeSkill = (skillId) => {
    const updatedSkills = formData.skills.filter(
      (skill) => skill._id !== skillId
    );
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  return (
    <div className="SecondSignupAll" id="man">
      <SideBar colorSide={receivedData} />
      <div className="SecondSignupMain">
        <NavBar sendDataToParent={receiveDataFromChild} />
        <div className="SecondSignupCenter">
          <div className="SecondSignupCenterTop">
            <div className="SecondSignupCenterTopPart1">
              <span className="SecondSignupCenterTopPart1Text1">
                Lets Complete Your Profile !
              </span>
              <span className="SecondSignupCenterTopPart1Text2">
                Add Your Information & Skills
              </span>
            </div>
            <img src={Young} alt="Young" />
          </div>
          <div className="SecondSignupContent">
            <div className="SecondSignupContentPart1">
              <div className="SecondSignupUpload">
                <span className="SecondSignupUploadText">
                  Upload Your Image
                </span>
                <div className="SecondSignupUploadBox">
                  <img src={upload} alt="Upload" />
                  <div className="SecondSignupUploadBoxText">
                    <span className="SecondSignupUploadBoxText1">
                      Select a file or drag and drop here
                    </span>
                    <span className="SecondSignupUploadBoxText2">
                      JPG, PNG or PDF, file size no more than 10MB
                    </span>
                  </div>
                  <Group justify="center">
                    <FileButton
                      onChange={(files) => {
                        setFiles(files); // Save uploaded files
                        setFormData({
                          ...formData,
                          image: files[0] ? URL.createObjectURL(files[0]) : "", // Save image URL
                        });
                      }}
                      value={formData.image}
                      accept="image/png,image/jpeg"
                      multiple={false} // Allow only one file to be uploaded
                    >
                      {(props) => (
                        <Button h={45} w={120} color="#388E3C" {...props}>
                          Select File
                        </Button>
                      )}
                    </FileButton>
                  </Group>
                  {files.length > 0 && (
                    <Text size="sm" mt="sm">
                      Picked files:
                    </Text>
                  )}
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="SecondSignupInputs">
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Date Of Birth</h6>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="SecondSignupInputText"
                    placeholder="day/month/year"
                  ></input>
                </div>
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Gender</h6>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="SecondSignupInputText"
                    placeholder="Female"
                  ></input>
                </div>
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Your Work</h6>
                  <input
                    type="text"
                    name="work"
                    value={formData.work}
                    onChange={handleChange}
                    className="SecondSignupInputText"
                    placeholder="Frontend Developer"
                  ></input>
                </div>
                <div className="SecondSignupPacks">
                  <h6 className="SecondSignupLabelText">Country</h6>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="SecondSignupInputText"
                    placeholder="Palestine"
                  ></input>
                </div>
              </div>
            </div>
            <div className="SecondSignupContentPart2">
              <div className="SecondSignupContentPart2Design">
                <span className="SecondSignupContentPart2Text1">Skills</span>
                <div className="SecondSignupContentPart2Card">
                  {formData.skills
                    .filter((skill) => skill.trim() !== "")
                    .map((skill, index) => (
                      <GreenBox2
                        key={index}
                        title={skill}
                        index={index}
                        removeSkill={removeSkill}
                      />
                    ))}
                </div>
                {formData.isAddingSkill && (
                  <input
                    type="text"
                    name="newSkill"
                    className="SecondSignupContentPart2ButtonAddinput"
                    value={formData.newSkill}
                    onChange={handleChange}
                    placeholder="Add new skill"
                  />
                )}
                <div className="SecondSignupContentPart2ButtonAdd">
                  <Button
                    variant="filled"
                    color="#388E3C"
                    radius="xl"
                    w={70}
                    h={40}
                    onClick={toggleAddSkill}
                  >
                    {formData.isAddingSkill ? "-" : "+"}
                  </Button>
                  {formData.isAddingSkill && (
                    <Button
                      variant="filled"
                      color="#388E3C"
                      radius="xl"
                      w={70}
                      h={40}
                      onClick={handleAddSkill}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
              <div className="SecondSignupContentPart2ButtonFinish">
                <button
                  className="SecondSignupButtonFinish"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <span className="SecondSignupButtonFinishText">Finish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSignup;
