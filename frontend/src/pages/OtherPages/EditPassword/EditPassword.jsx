import "./EditPassword.css";
import { Button, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
function EditPassword() {
  return (
    <div className="EditPasswordMain">
      <div className="EditPasswordCenter">
        <div className="EditPasswordContent">
          <div className="EditPasswordContentFake"></div>
          <div className="EditPasswordContentData">
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
            <div className="EditPasswordContentDataInput">
              <div className="EditPasswordContentDataInputDesign">
                <h5>Change your Password</h5>
                <TextInput
                  label="New Password"
                  placeholder="Enter new password"
                  w={400}
                />
                <Button variant="filled" color="#388E3C" w={400}>Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;
