import "./SecondSignup.css";
import {
  Button,
  FileInput,
  Input,
  Pill,
  PillsInput,
  Select,
  TextInput,
} from "@mantine/core";
import Young from "./young man sitting with laptop and waving.png";
import { useRef, useState } from "react";
import { DateInput } from "@mantine/dates";

const SecondSignup = ({ close }) => {
  const ref = useRef(null);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  return (
    <div className="SecondSignupAll">
      {/* <div className="SecondSignupCenterTop">
        <div className="SecondSignupCenterTopPart1">
          <h4>Lets Complete Your Profile !</h4>
          <p className="SecondSignupCenterTopPart1Text2">
            Add Your Information & Skills
          </p>
        </div>
        <img src={Young} id="SecondSignupImage" />
      </div> */}

      <div className="SecondSignupTitle">
        <h4>Lets Complete Your Profile !</h4>
        <p className="SecondSignupCenterTopPart1Text2">
          Add Your Information & Skills
        </p>
      </div>

      <div className="Second_SignUp_body">
        <div className="inputs">
          <FileInput
            label="Upload Your Image"
            description="Select a file or drag and drop here"
            placeholder="JPG, PNG file size no more than 10MB"
            ref={ref}
            accept="image/png,image/jpeg"
          />
          <DateInput
            clearable
            defaultValue={new Date()}
            label="Date Of Birth"
            placeholder="DD/MM/YYYY"
          />

          <Select
            label="Gender"
            placeholder="Male/Female"
            data={["Male", "Female"]}
          />

          <TextInput label="Your specialty" placeholder="Software Engineer" />
          <TextInput label="Country" placeholder="Pakistan" />
        </div>
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
            onSubmit={() => {
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

      <div className="Second_SignUp_footer">
        <Button
          variant="filled"
          color="#283739"
          size="md"
          onClick={() => {
            close();
            localStorage.setItem("type", "");
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SecondSignup;
