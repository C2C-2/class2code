import "./EditEmail.css";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
const EDIT_EMAIL_USER = gql`
  mutation UpdateUser($userId: String!, $user: UserInput!) {
    updateUser(userId: $userId, user: $user) {
      Email
    }
  }
`;
function EditEmail() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const user_id = localStorage.getItem("id");
  const [updateEmail] = useMutation(EDIT_EMAIL_USER);
  const handleUpdate = () => {
    updateEmail({
      variables: {
        userId: user_id,
        user: {
          Email: email,
        },
      },
    });
  };
  return (
    <div className="EditEmailMain">
      <div className="EditEmailCenter">
        <div className="EditEmailContent">
          <div className="EditEmailContentFake"></div>
          <div className="EditEmailContentData">
            <Button
              justify="center "
              variant="filled"
              color="#283739"
              radius="md"
              onClick={() => navigation(-1)}
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

            <div className="EditEmailContentDataInput">
              <div className="EditEmailContentDataInputDesign">
                <h5>Change your Email</h5>
                <TextInput
                  label="New Email"
                  value={email}
                  placeholder="Enter new email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  w={400}
                />
                <Button
                  variant="filled"
                  color="#388E3C"
                  w={400}
                  onClick={handleUpdate}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmail;
