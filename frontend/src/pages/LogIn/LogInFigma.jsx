import React from "react";
import "./LogInFigma.css";
import MainLogo from "./logo2 2.png";
import { Link } from "react-router-dom";
export default function LogInFigma() {
  return (
    <div className="LogInFigmaMain">
      <div className="LogInFigmaMainPart1">
        <img src={MainLogo} alt="Logo" className="LogInFigmaMainPart1Logo" />
        <div className="LogInFigmaMainPart1Center">
          <div className="LogInFigmaMainPart1Center1">
            <span className="LogInFigmaMainPart1Center1Text1">
              Welcome back to Class2Code!
            </span>
            <span className="LogInFigmaMainPart1Center1Text2">
              Please login to access your account.
            </span>
          </div>
          <div className="LogInFigmaMainPart1Center2">
            <p className="LogInFigmaMainPart1Center2Text">
              We're excited to have you back on the Class2Code platform. Logging
              into your account allows you to continue your learning journey and
              development through engaging in simulated software projects.
            </p>
          </div>
          <button className="LogInFigmaMainPart1Center3">
            <span className="LogInFigmaMainPart1Center3Text">
              Create New Account
            </span>
          </button>
        </div>
        <div className="LogInFigmaMainPart1Under">
          <span className="LogInFigmaMainPart1UnderText">
            @ 2023 Class2Code
          </span>
        </div>
      </div>
      <div className="LogInFigmaMainPart2">
        <div className="LogInFigmaMainPart2Design">
          <div className="LogInFigmaMainPart2DesignTop">
            <div className="LogInFigmaMainPart2DesignTop1">
              <img
                src={MainLogo}
                alt="Logo"
                className="LogInFigmaMainPart2DesignTop1Img"
              />
              <span className="LogInFigmaMainPart2DesignTop1Text">
                Class2Code
              </span>
            </div>
            <hr className="LogInFigmaMainPart2DesignTopLine" />
          </div>
          <div className="LogInFigmaMainPart2DesignCenter">
            <div className="LogInFigmaMainPart2DesignCenter1">
              <span className="LogInFigmaMainPart2DesignCenter1Text1">
                Login to Your Account
              </span>
              <span className="LogInFigmaMainPart2DesignCenter1Text2">
                Enter Yours Details to Login
              </span>
            </div>
            <div className="LogInFigmaMainPart2DesignCenter2">
              <div className="LogInFigmaMainPart2DesignCenter2Social">
                <a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&ec=GAlAwAE&hl=ar&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-653569872%3A1706287175450347&theme=glif">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    className="LogInFigmaMainPart2DesignCenter2SocialAround"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.54 12.2614C22.54 11.4459 22.4668 10.6618 22.3309 9.90909H11.5V14.3575H17.6891C17.4225 15.795 16.6123 17.013 15.3943 17.8284V20.7139H19.1109C21.2855 18.7118 22.54 15.7636 22.54 12.2614Z"
                      fill="#4285F4"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5 23.4998C14.605 23.4998 17.2081 22.4701 19.1109 20.7137L15.3943 17.8282C14.3645 18.5182 13.0472 18.926 11.5 18.926C8.50474 18.926 5.96951 16.903 5.06519 14.1848H1.22314V17.1644C3.11542 20.9228 7.00451 23.4998 11.5 23.4998Z"
                      fill="#34A853"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.06523 14.1851C4.83523 13.4951 4.70455 12.758 4.70455 12.0001C4.70455 11.2421 4.83523 10.5051 5.06523 9.81506V6.83552H1.22318C0.444318 8.38802 0 10.1444 0 12.0001C0 13.8557 0.444318 15.6121 1.22318 17.1646L5.06523 14.1851Z"
                      fill="#FBBC05"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5 5.07386C13.1884 5.07386 14.7043 5.65409 15.8961 6.79364L19.1945 3.49523C17.2029 1.63955 14.5997 0.5 11.5 0.5C7.00451 0.5 3.11542 3.07705 1.22314 6.83545L5.06519 9.815C5.96951 7.09682 8.50474 5.07386 11.5 5.07386Z"
                      fill="#EA4335"
                    />
                  </svg>
                </a>
                <a href="https://github.com/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    className="LogInFigmaMainPart2DesignCenter2SocialAround"
                  >
                    <path
                      d="M12.5003 0.569824C6.0286 0.569824 0.780762 5.81675 0.780762 12.2893C0.780762 17.4674 4.13876 21.8604 8.79531 23.41C9.38099 23.5185 9.59607 23.1558 9.59607 22.8462C9.59607 22.5668 9.58513 21.6435 9.58017 20.6643C6.3197 21.3732 5.63172 19.2815 5.63172 19.2815C5.09862 17.9269 4.33049 17.5668 4.33049 17.5668C3.26723 16.8394 4.41064 16.8543 4.41064 16.8543C5.58751 16.937 6.20719 18.062 6.20719 18.062C7.25244 19.8537 8.94881 19.3357 9.61758 19.0363C9.72273 18.2788 10.0265 17.7618 10.3616 17.4692C7.75861 17.1727 5.02214 16.1679 5.02214 11.6773C5.02214 10.3978 5.47997 9.35232 6.22971 8.53162C6.10802 8.23639 5.7069 7.04445 6.34323 5.43016C6.34323 5.43016 7.32735 5.11517 9.56693 6.63147C10.5017 6.37173 11.5043 6.24157 12.5003 6.23716C13.4963 6.24157 14.4996 6.37173 15.4362 6.63147C17.6731 5.11517 18.6559 5.43016 18.6559 5.43016C19.2938 7.04445 18.8925 8.23639 18.7708 8.53162C19.5222 9.35232 19.9769 10.3978 19.9769 11.6773C19.9769 16.1785 17.2352 17.1697 14.6256 17.4598C15.0459 17.8235 15.4205 18.5368 15.4205 19.6301C15.4205 21.1981 15.4069 22.4602 15.4069 22.8462C15.4069 23.1581 15.6178 23.5236 16.212 23.4085C20.8659 21.8571 24.2197 17.4657 24.2197 12.2893C24.2197 5.81675 18.9726 0.569824 12.5003 0.569824Z"
                      fill="#24292F"
                    />
                    <path
                      d="M5.16985 17.2641C5.14411 17.3222 5.05238 17.3397 4.96902 17.2998C4.884 17.2616 4.8362 17.1822 4.86377 17.1237C4.88905 17.0638 4.98078 17.047 5.06562 17.0873C5.15082 17.1254 5.19935 17.2056 5.16985 17.2641ZM5.74633 17.7784C5.69045 17.8302 5.58117 17.8062 5.50699 17.7243C5.43033 17.6426 5.416 17.5334 5.47271 17.4807C5.53034 17.4289 5.63631 17.4531 5.71315 17.5349C5.78981 17.6176 5.8047 17.7261 5.74624 17.7785M6.14184 18.4365C6.06997 18.4864 5.9525 18.4396 5.87998 18.3354C5.80819 18.2313 5.80819 18.1063 5.88154 18.0562C5.95434 18.0061 6.06996 18.0511 6.1435 18.1545C6.21519 18.2605 6.21519 18.3855 6.14175 18.4366M6.81061 19.1988C6.74636 19.2695 6.60959 19.2506 6.50941 19.1539C6.40701 19.0594 6.37843 18.9253 6.44286 18.8544C6.50784 18.7835 6.64544 18.8034 6.74636 18.8993C6.84811 18.9936 6.87918 19.1287 6.8107 19.1988M7.67497 19.4561C7.64675 19.5478 7.51495 19.5896 7.38222 19.5506C7.24968 19.5104 7.16292 19.4029 7.18966 19.3102C7.21724 19.2178 7.34959 19.1743 7.48333 19.216C7.61569 19.256 7.70264 19.3627 7.67506 19.4561M8.65882 19.5652C8.66213 19.6619 8.54953 19.7421 8.41019 19.7438C8.27002 19.7468 8.15669 19.6686 8.15522 19.5736C8.15522 19.476 8.26524 19.3966 8.40532 19.3943C8.54466 19.3915 8.65882 19.4692 8.65882 19.5652ZM9.62521 19.5282C9.64193 19.6225 9.54506 19.7194 9.40673 19.7451C9.27069 19.7699 9.14477 19.7117 9.1274 19.6183C9.11049 19.5216 9.2092 19.4248 9.34496 19.3997C9.48357 19.3756 9.60756 19.4323 9.62521 19.5282Z"
                      fill="#24292F"
                    />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    className="LogInFigmaMainPart2DesignCenter2SocialAround"
                  >
                    <path
                      d="M0.000488281 2.14797C0.000488281 1.23861 0.761792 0.500488 1.70026 0.500488H21.2997C22.2386 0.500488 22.9995 1.23861 22.9995 2.14797V21.8523C22.9995 22.7619 22.2386 23.4995 21.2997 23.4995H1.70026C0.761882 23.4995 0.000488281 22.762 0.000488281 21.8526V2.1477V2.14797Z"
                      fill="#0A66C2"
                    />
                    <path
                      d="M6.98966 19.7475V9.39322H3.54807V19.7475H6.99002H6.98966ZM5.26959 7.97977C6.46949 7.97977 7.21651 7.18469 7.21651 6.19106C7.19405 5.17479 6.46949 4.40189 5.29241 4.40189C4.11451 4.40189 3.34521 5.17479 3.34521 6.19097C3.34521 7.1846 4.09196 7.97968 5.24704 7.97968H5.26932L5.26959 7.97977ZM8.89463 19.7475H12.3359V13.9658C12.3359 13.6568 12.3584 13.3469 12.4493 13.1262C12.698 12.5076 13.2643 11.8673 14.2152 11.8673C15.4602 11.8673 15.9586 12.8168 15.9586 14.2088V19.7475H19.3998V13.8107C19.3998 10.6304 17.7022 9.15047 15.4379 9.15047C13.5816 9.15047 12.7663 10.188 12.3133 10.8947H12.3362V9.39358H8.89481C8.93973 10.3649 8.89454 19.7478 8.89454 19.7478L8.89463 19.7475Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="LogInFigmaMainPart2DesignCenter2Lines">
                <hr className="LogInFigmaMainPart2DesignCenter2LinesAll" />
                <span className="LogInFigmaMainPart2DesignCenter2LinesOr">
                  Or
                </span>
                <hr className="LogInFigmaMainPart2DesignCenter2LinesAll" />
              </div>
            </div>
          </div>
          <div className="LogInFigmaMainPart2DesignUnder">
            <div className="LogInFigmaMainPart2DesignUnder1Inputs">
              <div className="LogInFigmaMainPart2DesignUnder1Packs">
                <div className="LogInFigmaMainPart2DesignUnder1Pack1">
                  Email
                </div>
                <input
                  type="email"
                  className="LogInFigmaMainPart2DesignUnder1Pack2"
                  placeholder="mail@abc.com"
                ></input>
              </div>
              <div className="LogInFigmaMainPart2DesignUnder1Packs">
                <div className="LogInFigmaMainPart2DesignUnder1Pack1">
                  Password
                </div>
                <input
                  type="password"
                  className="LogInFigmaMainPart2DesignUnder1Pack2"
                  placeholder="*************"
                ></input>
              </div>
            </div>
            <div className="LogInFigmaMainPart2DesignUnder2">
              <div className="LogInFigmaMainPart2DesignUnder2Check">
                <input type="checkbox" id="remember" name="rem" value="" />
                <span className="LogInFigmaMainPart2DesignUnder2TextRemember">
                  Remember Me
                </span>
              </div>
              <div className="LogInFigmaMainPart2DesignUnder2TextForget">
                <button className="LogInFigmaMainPart2DesignUnder2ForgetPass">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
          <button className="LogInFigmaMainPart2DesignButtonLogin">
            <span className="LogInFigmaMainPart2DesignButtonText">Login</span>
          </button>
          <div className="LogInFigmaMainPart2DesignSignup">
            <p className="LogInFigmaMainPart2DesignSignupText">
              I don’t have an Account?
            </p>
            <Link to="/SignUp" className="LogInFigmaMainPart2DesignButtonTextSignup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
