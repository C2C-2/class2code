import { useState } from "react";
import "./ForgetPassword.css";
import Logo from "./logo2 14.png";
import { Button, TextInput } from "@mantine/core";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import { Paths } from "../../../assets/Paths";

import Alert from "../../../components/Alert/AlertBox.jsx";
function ForgetPassword() {
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [email, setEmail] = useState("");

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setError("Email is required");
        const time = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(time);
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Invalid email");
        const time = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(time);
      }

      await sendPasswordResetEmail(auth, email);
      setInfo("Check your email for password reset link");
      const time = setTimeout(() => setInfo(null), 3000);
      return () => clearTimeout(time);
    } catch (a) {
      setError(a.message);
      const time = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(time);
    }
  };
  return (
    <div className="ForgetPasswordAll">
      {error && <Alert color="red" text={error} title={"Error"} />}
      {info && <Alert color="green" text={info} title={"Info"} />}
      <div className="ForgetPasswordPart1">
        <img src={Logo} alt="Logo" className="ForgetPasswordImg" />
        <Button
          variant="filled"
          color="green"
          w={120}
          h={45}
          onClick={() => {
            window.location.replace(Paths.Login);
          }}
        >
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
            <TextInput
              label="Email"
              placeholder="mail@abc.com"
              mt="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              w={"100%"}
            />
          </div>
          <Button
            variant="filled"
            color="#283739"
            w="100%"
            h={50}
            onClick={handleForgetPassword}
          >
            Send
          </Button>
        </div>
      </div>
      <div className="ForgetPasswordUnder">
        <span>@ 2024 Class2Code </span>
      </div>
    </div>
  );
}

export default ForgetPassword;
