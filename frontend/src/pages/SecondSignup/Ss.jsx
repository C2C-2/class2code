import "./Ss.css";
const SignUpNew = () => {
  return (
    <div className="signup">
      <div className="part1">
        <div className="text-Create">Create your own company</div>
        <p className="para">
          We&#39;re excited to welcome you to the Class2Code community! By
          creating an account, you&#39;ll gain access to a wealth of learning
          opportunities through our simulated software development projects.
        </p>

        <div className="Under">@ 2023 Class2Code</div>
      </div>
      <span className="lineBetween"></span>

      <div className="part2">
        <div className="PackTop">
          <div className="top">
            <span className="text-top">Class2Code</span>
          </div>
          <span className="line-top" />
        </div>
        <div className="Mid">
          <div className="text-mid">
            <p className="sign">Sign Up to Your Account</p>
            <p className="text-wrapper-3">Enter Yours Details to Sign Up</p>
          </div>
          <div className="MidLink">
            <div className="SocialLink">
              <a
                href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&ec=GAlAwAE&hl
           =ar&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-653569872%3A1706287175450347&theme=glif"
              ></a>
              <a href="https://github.com/login"></a>
              <a href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"></a>
            </div>
            <div className="ClassOr">
              <span className="LineOr"></span>
              <span className="Or">or</span>
              <span className="LineOr"></span>
            </div>
          </div>
        </div>
        <div className="UnderPart2">
          <div className="inputs">
            <div className="text-input">Full Name</div>
            <input
              type="text"
              className="text-label"
              placeholder="Osama Ghneem"
            ></input>
          </div>
          <div className="inputs">
            <div className="text-input">Username</div>
            <input
              type="text"
              className="text-label"
              placeholder="Osama1"
            ></input>
          </div>
          <div className="inputs">
            <div className="text-input">Email</div>
            <input
              type="email"
              className="text-label"
              placeholder="mail@abc.com"
            ></input>
          </div>
          <div className="inputs">
            <div className="text-input">Password</div>
            <input
              type="password"
              className="text-label"
              placeholder="*"
            ></input>
          </div>

          <div className="UnderSignup">
            <div className="text-signUp">Sign Up</div>
          </div>
          <div className="UnderLogin">
            <div className="text-already">Already have an Account?</div>
            <div className="text-Login">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpNew;
