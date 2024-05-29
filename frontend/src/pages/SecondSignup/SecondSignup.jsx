import "./SecondSignup.css";
import {
  Alert,
  Button,
  FileInput,
  Input,
  Loader,
  Pill,
  PillsInput,
  TextInput,
} from "@mantine/core";
import Young from "./young man sitting with laptop and waving.png";
import { useRef, useState } from "react";
import { uploadImage } from "../../config/firebase";
import { gql, useMutation } from "@apollo/client";

const SecondSignup = ({ close }) => {
  const ref = useRef(null);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const UPDATE_PROFILE = gql`
    mutation Mutation($userId: String!, $user: UserInput!) {
      updateUser(userId: $userId, user: $user) {
        id
      }
    }
  `;

  const [createProfile] = useMutation(UPDATE_PROFILE);

  const CREATE_SKILL = gql`
    mutation CreateNewSkill($skill: SkillInput!, $userId: String!) {
      createNewSkill(skill: $skill, userId: $userId) {
        _id
      }
    }
  `;

  const [createSkill] = useMutation(CREATE_SKILL);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const url = await uploadImage(image);
      await createProfile({
        variables: {
          userId: localStorage.getItem("id"),
          user: {
            ImageUrl: url,
            DateOfBirth: dateOfBirth,
            Gender: gender,
            Work: specialty,
            Country: country,
            Username: username,
          },
        },
      });

      for (const skill of skills) {
        await createSkill({
          variables: {
            userId: localStorage.getItem("id"),
            skill: { Skill: skill },
          },
        });
      }

      localStorage.setItem("type", "");
    } catch (error) {
      setError("Error submitting form:", error);
    } finally {
      setLoading(false);
      close();
      window.location.reload();
    }
  };

  return (
    <div className="SecondSignupAll">
      {error && <Alert text={error} color="red" title="Error" />}

      <div className="SecondSignupTitle">
        <h4>Lets Complete Your Profile!</h4>
        <p className="SecondSignupCenterTopPart1Text2">
          Add Your Information & Skills
        </p>
      </div>

      <div className="Second_SignUp_body">
        {loading ? <Loader color="green" /> : null}
        <form onSubmit={handleSubmit} className="inputs">
          <FileInput
            label="Upload Your Image"
            description="Select a file or drag and drop here"
            placeholder="JPG, PNG file size no more than 10MB"
            ref={ref}
            accept="image/png,image/jpeg"
            onChange={setImage}
            icon={<img src={Young} alt="image" />}
            required
          />

          <div className="htmlInputGroup">
            <label htmlFor="date">Date Of Birth</label>
            <input
              className="htmlInput"
              type="date"
              defaultValue={new Date()}
              placeholder="DD/MM/YYYY"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(() => e.target.value)}
              required
            />
          </div>

          <div className="htmlInputGroup">
            <label htmlFor="Gender">Gender</label>
            <select
              className="htmlInput"
              name="Gender"
              id="Gender"
              value={gender}
              onChange={(e) => setGender(() => e.target.value)}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <TextInput
            value={username}
            onChange={(e) => setUsername(() => e.target.value)}
            label="Your Username"
            placeholder="Username"
            required
          />

          <TextInput
            value={specialty}
            onChange={(e) => setSpecialty(() => e.target.value)}
            label="Your Specialty"
            placeholder="Software Engineer"
            required
          />
          <TextInput
            value={country}
            onChange={(e) => setCountry(() => e.target.value)}
            label="Country"
            placeholder="Pakistan"
            required
          />

          <div className="Second_SignUp_footer">
            <Button type="submit" variant="filled" color="#283739" size="md">
              Save
            </Button>
          </div>
        </form>
        <div className="skills">
          <PillsInput label="Skills" description="Add Your Skills">
            <Pill.Group>
              {skills.map((skill) => (
                <Pill
                  key={skill}
                  value={skill}
                  withRemoveButton
                  onRemove={() => setSkills(skills.filter((s) => s !== skill))}
                  size="md"
                >
                  {skill}
                </Pill>
              ))}
            </Pill.Group>
          </PillsInput>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              if (!skill) return;
              if (skills.includes(skill)) return;
              if (skill.trim() === "") return;
              setSkills([...skills, skill]);
              setSkill("");
            }}
            className="addSkillForm"
          >
            <Input
              placeholder="Enter tags"
              value={skill}
              onChange={(event) => {
                setSkill(event.target.value);
              }}
            />

            <div className="addSkillBtn">
              <Button
                variant="filled"
                color="green"
                size="sm"
                onClick={() => {
                  if (!skill) return;
                  if (skills.includes(skill)) return;
                  if (skill.trim() === "") return;
                  setSkills([...skills, skill]);
                  setSkill("");
                }}
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondSignup;
