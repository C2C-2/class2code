import {useState} from "react";
import "./ForgetPassword.css";
import Logo from "./logo2 14.png";
import { Button } from "@mantine/core";
import { useMutation, gql } from "@apollo/client";
const FORGET_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [forgetPassword, { loading, error }] = useMutation(FORGET_PASSWORD);

  const handleForgetPassword = async () => {
    try {
      await forgetPassword({ variables: { email } });
      // Handle success, maybe show a message to the user
    } catch (error) {
      // Handle error, maybe show an error message to the user
      console.error("Error sending forget password request:", error);
    }
  };
  return (
    <div className="ForgetPasswordAll">
      <div className="ForgetPasswordPart1">
        <img src={Logo} alt="Logo" className="ForgetPasswordImg" />
        <Button variant="filled" color="#283739" w={120} h={45}>
          Log In
        </Button>
      </div>
      <div className="ForgetPasswordPart2">
        <div className="ForgetPasswordLogoPart">
          <img src={Logo} alt="Logo" className="ForgetPasswordLogo" />
          <span className="ForgetPasswordLogoPartText">Class2Code</span>
        </div>
        <div className="ForgetPasswordTextsPart">
          <span className="ForgetPasswordPart2Text1">Forgot password</span>
          <p className="ForgetPasswordPart2Text2">
            Enter your email for the verification process,we will send 4 digits
            code to your email.
          </p>
          <div className="ForgetPasswordInput">
            <span className="ForgetPasswordLabelText">Email</span>
            <input
              type="email"
              placeholder="mail@abc.com"
              className="ForgetPasswordTextInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            variant="filled"
            color="#388E3C"
            w="100%"
            h={50}
            onClick={handleForgetPassword}
            disabled={loading || email.trim() === ""}
          >
            <span className="ForgetPasswordButton">
              {loading ? "Sending..." : "Continue"}
            </span>
          </Button>
          {error && (
            <p className="ForgetPasswordError">
              Error: {error.message || "An error occurred."}
            </p>
          )}
        </div>
      </div>
      <div className="ForgetPasswordUnder" ><span>@ 2024 Class2Code </span></div>
    </div>
  );
}

export default ForgetPassword;
