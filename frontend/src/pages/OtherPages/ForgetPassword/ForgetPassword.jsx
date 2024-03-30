import React from "react";
import "./ForgetPassword.css";
import Logo from "./logo2 14.png";
import { Button } from "@mantine/core";
function ForgetPassword() {
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
            />
          </div>
          <Button variant="filled" color="#388E3C" w="100%" h={50}>
            <span className="ForgetPasswordButton">Continue</span>
          </Button>
        </div>
      </div>
      <div className="ForgetPasswordUnder" ><span>@ 2024 Class2Code </span></div>
    </div>
  );
}

export default ForgetPassword;
