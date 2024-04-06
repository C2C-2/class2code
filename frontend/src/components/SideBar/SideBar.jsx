import "./SideBar.css";
import ProImg from "./Avatar.png";
import { useState ,useEffect} from "react";

function SideBar({colorSide}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [isSettingDropdownOpen, setSettingDropdownOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    setIsDarkMode(colorSide === "dark");
  }, [colorSide]);

  const toggleTeamDropdown = () => {
    setTeamDropdownOpen(!isTeamDropdownOpen);
  };
  const toggleSettingDropdown = () => {
    setSettingDropdownOpen(!isSettingDropdownOpen);
  };
  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen(!isCompanyDropdownOpen);
  };
  const handleTextClick = (text) => {
    setSelectedText(selectedText === text ? null : text);
  };
  return (
    <div className={`${
      isDarkMode ? "SideBarMainDark" : "SideBarMain"
    }`}>
      <div className="SideBarSectionProfile">
        <div className="SideBarSectionProfilePart1">
          <img
            className="SideBarSectionProfilePart1Img"
            alt="Avatar"
            src={ProImg}
          />
          <div className="SideBarSectionProfilePart1Texts">
            <span className="SideBarSectionProfilePart1Text1">
              PRODUCT MANAGER
            </span>
            <span className={`${
      isDarkMode ? "SideBarSectionProfilePart1Text2Dark" : "SideBarSectionProfilePart1Text2"
    }`}>
              Andrew Smith
            </span>
          </div>
        </div>
        <hr className={`${
      isDarkMode ? "SideBarSectionProfilePart2Dark" : "SideBarSectionProfilePart2"
    }`}></hr>
      </div>
      <div className="SideBarSectionCenter">
        <div className="SideBarSectionCenterMain">
          <span className="SideBarSectionCenterMainText">Main</span>
        </div>
        <div className="SideBarSectionCenterContent">
          <ul className="SideBarSectionCenterContentSections">
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.99935 2.23145C9.23796 2.23145 8.49113 2.44007 7.83997 2.83466L3.67331 5.35966C3.06059 5.73095 2.55395 6.25397 2.20234 6.87819C1.85072 7.50241 1.666 8.20675 1.66602 8.92318V14.1665C1.66602 15.2716 2.105 16.3314 2.8864 17.1128C3.6678 17.8942 4.72761 18.3332 5.83268 18.3332H14.166C15.2711 18.3332 16.3309 17.8942 17.1123 17.1128C17.8937 16.3314 18.3327 15.2716 18.3327 14.1665V8.92235C18.3325 8.20608 18.1477 7.50176 17.7961 6.87774C17.4445 6.25372 16.938 5.73087 16.3254 5.35966L12.1587 2.83466C11.5076 2.44008 10.7607 2.23145 9.99935 2.23145ZM8.70373 4.26003C9.09443 4.02328 9.54252 3.89811 9.99935 3.89811C10.4562 3.89811 10.9043 4.02328 11.295 4.26003L15.4616 6.78503C15.8292 7.00776 16.1331 7.32147 16.3441 7.69589C16.555 8.07025 16.6659 8.49266 16.666 8.92235V14.1665C16.666 14.8296 16.4026 15.4654 15.9338 15.9343C15.4649 16.4031 14.8291 16.6665 14.166 16.6665H13.3327V14.1665C13.3327 13.2825 12.9815 12.4346 12.3564 11.8095C11.7312 11.1844 10.8834 10.8332 9.99935 10.8332C9.11529 10.8332 8.26745 11.1844 7.64233 11.8095C7.0172 12.4346 6.66601 13.2825 6.66601 14.1665V16.6665H5.83268C5.16964 16.6665 4.53376 16.4031 4.06491 15.9343C3.59607 15.4654 3.33268 14.8296 3.33268 14.1665V8.92318C3.33267 8.49332 3.4435 8.07069 3.65447 7.69616C3.86544 7.32163 4.16942 7.00782 4.53706 6.78504L8.70373 4.26003ZM11.1779 12.988C11.4904 13.3006 11.666 13.7245 11.666 14.1665V16.6665H8.33268V14.1665C8.33268 13.7245 8.50828 13.3006 8.82084 12.988C9.1334 12.6754 9.55732 12.4999 9.99935 12.4999C10.4414 12.4999 10.8653 12.6754 11.1779 12.988Z"
                    fill={`${
                      isDarkMode ? "#fff" : "#000"
                    }`}
                    stroke={`${selectedText === "Dashboard" ? "#008000" : ""}`}
                    fill-opacity="0.5"
                    stroke-width="0.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Dashboard" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Dashboard")}
                >
                  Dashboard
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M17.3684 11C17.3684 11.3184 17.1079 11.5789 16.7895 11.5789H11.5789V16.7895C11.5789 17.1079 11.3184 17.3684 11 17.3684C10.6816 17.3684 10.4211 17.1079 10.4211 16.7895V11.5789H5.21053C4.89211 11.5789 4.63158 11.3184 4.63158 11C4.63158 10.6816 4.89211 10.4211 5.21053 10.4211H10.4211V5.21053C10.4211 4.89211 10.6816 4.63158 11 4.63158C11.3184 4.63158 11.5789 4.89211 11.5789 5.21053V10.4211H16.7895C17.1079 10.4211 17.3684 10.6816 17.3684 11ZM22 11C22 17.0789 17.0789 22 11 22C4.92105 22 0 17.0789 0 11C0 4.92105 4.92105 0 11 0C17.0789 0 22 4.92105 22 11ZM20.8421 11C20.8421 5.55789 16.4421 1.15789 11 1.15789C5.55789 1.15789 1.15789 5.55789 1.15789 11C1.15789 16.4421 5.55789 20.8421 11 20.8421C16.4421 20.8421 20.8421 16.4421 20.8421 11Z"
                    fill={`${
                      isDarkMode ? "#fff" : "#000"
                    }`}
                    stroke={`${
                      selectedText === "Post" ? "#008000" : "#00000099"
                    }`}
                    fill-opacity="0.6"
                    stroke-width="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Post" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Post")}
                >
                  Post
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                  className={`SvgImg ${
                    selectedText === "Chat" ? "active" : ""
                  }`}
                >
                  <path
                    d="M15.999 11.5C16.2751 11.5 16.499 11.2761 16.499 11C16.499 10.7239 16.2751 10.5 15.999 10.5C15.7229 10.5 15.499 10.7239 15.499 11C15.499 11.2761 15.7229 11.5 15.999 11.5Z"
                    fill={`${
                      isDarkMode ? "#fff" : "#000"
                    }`}
                    fill-opacity="0.6"
                    stroke={` ${selectedText === "Chat" ? "active" : "#000"}`}
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 11.5C11.2761 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.2761 10.5 11 10.5C10.7239 10.5 10.5 10.7239 10.5 11C10.5 11.2761 10.7239 11.5 11 11.5Z"
                    fill={`${
                      isDarkMode ? "#fff" : "#000"
                    }`}
                    fill-opacity="0.6"
                    stroke={` ${selectedText === "Chat" ? "active" : "#000"}`}
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.99902 11.5C6.27516 11.5 6.49902 11.2761 6.49902 11C6.49902 10.7239 6.27516 10.5 5.99902 10.5C5.72288 10.5 5.49902 10.7239 5.49902 11C5.49902 11.2761 5.72288 11.5 5.99902 11.5Z"
                    fill={`${
                      isDarkMode ? "#fff" : "#000"
                    }`}
                    stroke={` ${selectedText === "Chat" ? "active" : "#000"}`}
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 12.8214 1.48697 14.5291 2.33782 16L1.5 20.5L6 19.6622C7.47087 20.513 9.1786 21 11 21Z"
                    stroke={` ${isDarkMode ? "#fff" : selectedText === "Chat" ? "green" : "#000"}`}

                    
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Chat" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Chat")}
                >
                  Chat
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.23535 11.25V11.6465L7.50712 11.9353L12.9586 17.728C11.7821 18.5183 10.4013 18.9797 8.9217 18.9994L8.92164 18.9994C4.8068 19.0543 1.14933 15.4357 1.00472 10.92C0.869934 6.70578 3.62941 3.23118 7.23535 2.43365V11.25ZM13.3061 17.4806L13.3059 17.4808L13.3061 17.4806ZM12.9946 12.25H18.9344C18.6401 13.8509 17.9201 15.2829 16.9114 16.4116L12.9946 12.25ZM19.0033 11.8151L19.0032 11.8154L19.0033 11.8151ZM16.8965 17.0406L16.4901 17.4231L16.8965 17.0406ZM11 1.04648C14.5163 1.52673 17.3625 4.52254 17.7884 8.37495H11V1.04648Z"
                    stroke={`${
                      selectedText === "Available Projects" ? "#008000" : "#000"
                    }`}
                    fill={`${
                      isDarkMode ? "#fff" : "#000"
                    }`}
                    stroke-opacity="0.6"
                    stroke-width="2"
                  />
                </svg>

                <div
                  className={`SideBarText ${
                    selectedText === "Available Projects" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Available Projects")}
                >
                  Available Projects
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div
                  className={`SideBarSectionText ${
                    isTeamDropdownOpen ? "active" : ""
                  }`}
                  onClick={toggleTeamDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9993 1.66667C12.6457 1.66667 12.3066 1.80715 12.0565 2.0572C11.8065 2.30725 11.666 2.64638 11.666 3V6.66667H7.99935C7.64573 6.66667 7.30659 6.80714 7.05654 7.05719C6.80649 7.30724 6.66601 7.64638 6.66601 8V12.5H2.99935C2.64573 12.5 2.30659 12.6405 2.05654 12.8905C1.80649 13.1406 1.66602 13.4797 1.66602 13.8333V17C1.66602 17.3536 1.80649 17.6928 2.05654 17.9428C2.30659 18.1929 2.64573 18.3333 2.99935 18.3333H16.9993C17.353 18.3333 17.6921 18.1929 17.9422 17.9428C18.1922 17.6928 18.3327 17.3536 18.3327 17V3C18.3327 2.64638 18.1922 2.30725 17.9422 2.0572C17.6921 1.80715 17.353 1.66667 16.9993 1.66667H12.9993ZM8.33268 8.33334H11.666V16.6667H8.33268V8.33334ZM16.666 16.6667H13.3327V3.33334H16.666V16.6667ZM6.66601 14.1667V16.6667H3.33268V14.1667H6.66601Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                  </svg>
                  <span className="SideBarText">My Teams</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`icon-chevron ${
                      isTeamDropdownOpen ? "active" : ""
                    }`}
                  >
                    <path
                      d="M11.5289 10.4715C11.7893 10.7318 12.2114 10.7318 12.4717 10.4715C12.7321 10.2111 12.7321 9.78903 12.4717 9.52868L8.47173 5.52868C8.21138 5.26833 7.78927 5.26833 7.52892 5.52868L3.52892 9.52868C3.26857 9.78903 3.26857 10.2111 3.52892 10.4715C3.78927 10.7318 4.21138 10.7318 4.47173 10.4715L8.00033 6.94289L11.5289 10.4715Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
              {isTeamDropdownOpen && (
                <div className="SubSection">
                  {/* Dropdown items */}
                  <div className="Subs">
                    <div className="SubText">My companies Teams</div>
                    <div className="Arrow" />
                  </div>
                  <div className="Subs">
                    <p className="SubText">Teams I am working In it</p>
                    <div className="Arrow" />
                  </div>
                  <div className="lineSub" />
                </div>
              )}
            </li>
            <li>
              <a href="#">
                <div
                  className={`SideBarSectionTextMyCompanies ${
                    isCompanyDropdownOpen ? "active" : ""
                  }`}
                  onClick={toggleCompanyDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9993 1.66667C12.6457 1.66667 12.3066 1.80715 12.0565 2.0572C11.8065 2.30725 11.666 2.64638 11.666 3V6.66667H7.99935C7.64573 6.66667 7.30659 6.80714 7.05654 7.05719C6.80649 7.30724 6.66601 7.64638 6.66601 8V12.5H2.99935C2.64573 12.5 2.30659 12.6405 2.05654 12.8905C1.80649 13.1406 1.66602 13.4797 1.66602 13.8333V17C1.66602 17.3536 1.80649 17.6928 2.05654 17.9428C2.30659 18.1929 2.64573 18.3333 2.99935 18.3333H16.9993C17.353 18.3333 17.6921 18.1929 17.9422 17.9428C18.1922 17.6928 18.3327 17.3536 18.3327 17V3C18.3327 2.64638 18.1922 2.30725 17.9422 2.0572C17.6921 1.80715 17.353 1.66667 16.9993 1.66667H12.9993ZM8.33268 8.33334H11.666V16.6667H8.33268V8.33334ZM16.666 16.6667H13.3327V3.33334H16.666V16.6667ZM6.66601 14.1667V16.6667H3.33268V14.1667H6.66601Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                  </svg>
                  <div className="SideBarText">My Companies</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`icon-chevron ${
                      isCompanyDropdownOpen ? "active" : ""
                    }`}
                  >
                    <path
                      d="M11.5289 10.4715C11.7893 10.7318 12.2114 10.7318 12.4717 10.4715C12.7321 10.2111 12.7321 9.78903 12.4717 9.52868L8.47173 5.52868C8.21138 5.26833 7.78927 5.26833 7.52892 5.52868L3.52892 9.52868C3.26857 9.78903 3.26857 10.2111 3.52892 10.4715C3.78927 10.7318 4.21138 10.7318 4.47173 10.4715L8.00033 6.94289L11.5289 10.4715Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
              {isCompanyDropdownOpen && (
                <div className="SubSectionCompany">
                  <div className="Subs">
                    <div className="SubText">Create Company</div>
                    <div className="Arrow" />
                  </div>
                  <div className="Subs">
                    <div className="SubText">My Companies</div>
                    <div className="Arrow" />
                  </div>
                  <div className="Subs">
                    <p className="SubText">Companies I am working in it</p>
                    <div className="Arrow" />
                  </div>
                  <div className="SubsUnder">
                    <div className="SubText">Companies Tasks</div>
                    <div className="Arrow1" />
                  </div>
                  <div className="lineSubCompany" />
                </div>
              )}
            </li>
          </ul>
          <hr className="SideBarCenterLine"></hr>
        </div>
      </div>
      <div className="SideBarSettings">
        <span className="SideBarSettingText">Setting</span>
        <div className="SideBarSettingsCenter">
          <ul className="SideBarSettingsCenterSections">
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    stroke={` ${selectedText === "Profile" ? "#008000" : ""}`}
                    clip-rule="evenodd"
                    d="M10.0007 2.5C8.89558 2.5 7.83577 2.93899 7.05437 3.72039C6.27297 4.50179 5.83398 5.5616 5.83398 6.66667C5.83398 7.77174 6.27297 8.83154 7.05437 9.61294C7.10934 9.66791 7.16568 9.72119 7.22333 9.77273C6.50956 10.0998 5.85246 10.5534 5.28661 11.1193C4.03636 12.3695 3.33398 14.0652 3.33398 15.8333V16.6667C3.33398 17.1269 3.70708 17.5 4.16732 17.5C4.62755 17.5 5.00065 17.1269 5.00065 16.6667V15.8333C5.00065 14.5073 5.52744 13.2355 6.46512 12.2978C7.4028 11.3601 8.67457 10.8333 10.0007 10.8333C11.3267 10.8333 12.5985 11.3601 13.5362 12.2978C14.4739 13.2355 15.0007 14.5073 15.0007 15.8333V16.6667C15.0007 17.1269 15.3737 17.5 15.834 17.5C16.2942 17.5 16.6673 17.1269 16.6673 16.6667V15.8333C16.6673 14.0652 15.9649 12.3695 14.7147 11.1193C14.1488 10.5534 13.4917 10.0998 12.778 9.77273C12.8356 9.72119 12.892 9.66791 12.9469 9.61294C13.7283 8.83154 14.1673 7.77174 14.1673 6.66667C14.1673 5.5616 13.7283 4.50179 12.9469 3.72039C12.1655 2.93899 11.1057 2.5 10.0007 2.5ZM8.23288 4.8989C8.70172 4.43006 9.33761 4.16667 10.0007 4.16667C10.6637 4.16667 11.2996 4.43006 11.7684 4.8989C12.2373 5.36774 12.5007 6.00363 12.5007 6.66667C12.5007 7.32971 12.2373 7.96559 11.7684 8.43443C11.2996 8.90327 10.6637 9.16667 10.0007 9.16667C9.33761 9.16667 8.70172 8.90327 8.23288 8.43443C7.76404 7.96559 7.50065 7.32971 7.50065 6.66667C7.50065 6.00363 7.76404 5.36774 8.23288 4.8989Z"
                    fill="rgba(82, 82, 82, 1)"
                    fill-opacity="0.8"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Profile" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Profile")}
                >
                  Profile
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div
                  className={`SideBarSectionTextSetting ${
                    isSettingDropdownOpen ? "active" : ""
                  }`}
                  onClick={toggleSettingDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_386_6054)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.0007 6.66668C9.1166 6.66668 8.26875 7.01787 7.64363 7.64299C7.01851 8.26811 6.66732 9.11596 6.66732 10C6.66732 10.8841 7.01851 11.7319 7.64363 12.357C8.26875 12.9822 9.1166 13.3333 10.0007 13.3333C10.8847 13.3333 11.7326 12.9822 12.3577 12.357C12.9828 11.7319 13.334 10.8841 13.334 10C13.334 9.11596 12.9828 8.26811 12.3577 7.64299C11.7326 7.01787 10.8847 6.66668 10.0007 6.66668ZM8.82214 8.8215C9.1347 8.50894 9.55862 8.33334 10.0007 8.33334C10.4427 8.33334 10.8666 8.50894 11.1792 8.8215C11.4917 9.13406 11.6673 9.55798 11.6673 10C11.6673 10.442 11.4917 10.866 11.1792 11.1785C10.8666 11.4911 10.4427 11.6667 10.0007 11.6667C9.55862 11.6667 9.1347 11.4911 8.82214 11.1785C8.50958 10.866 8.33398 10.442 8.33398 10C8.33398 9.55798 8.50958 9.13406 8.82214 8.8215Z"
                        fill="#757575"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.15148 0.833344C8.77294 0.833344 8.44196 1.08848 8.3456 1.45455L7.9233 3.05888L6.5816 3.62448L5.55456 2.71074C5.2248 2.41737 4.72349 2.43199 4.4114 2.74409L2.74473 4.41075C2.44281 4.71267 2.41794 5.19395 2.68712 5.52538L3.58723 6.63364L3.03527 7.99157L1.47786 8.35516C1.10075 8.4432 0.833984 8.77942 0.833984 9.16668V10.8333C0.833984 11.2091 1.08547 11.5384 1.448 11.6373L3.05773 12.0764L3.62485 13.4218L2.71203 14.4454C2.41802 14.7751 2.43237 15.2769 2.74473 15.5893L4.4114 17.2559C4.71372 17.5583 5.1958 17.5827 5.52719 17.3126L6.63506 16.4095L7.95961 16.9543L8.35934 18.5374C8.45278 18.9074 8.78566 19.1667 9.16732 19.1667H10.834C11.2155 19.1667 11.5483 18.9076 11.6419 18.5378L12.0426 16.954L13.4115 16.3871C13.5492 16.5026 13.7072 16.6383 13.8645 16.7751C14.0207 16.9112 14.1659 17.0394 14.2721 17.1336C14.3252 17.1807 14.3684 17.2193 14.3983 17.2459L14.4435 17.2864C14.7731 17.5821 15.2769 17.569 15.5899 17.2559L17.2566 15.5893C17.5633 15.2826 17.5834 14.7919 17.3029 14.461L16.3951 13.3906L16.9569 12.0339L18.5436 11.6216C18.9109 11.5261 19.1673 11.1945 19.1673 10.815V9.16668C19.1673 8.78558 18.9088 8.45303 18.5394 8.35907L16.9625 7.95788L16.4023 6.60446L17.3037 5.53797C17.5834 5.20709 17.5629 4.7171 17.2566 4.41075L15.5899 2.74409C15.2823 2.43649 14.7899 2.41724 14.4592 2.69988L13.4006 3.60474L11.9995 3.02867L11.5858 1.45482C11.4895 1.08862 11.1585 0.833344 10.7798 0.833344H9.15148ZM15.5353 14.9535L14.9652 15.5236L14.9589 15.5182C14.6512 15.2502 14.2547 14.9111 14.0311 14.7513C13.7971 14.584 13.4934 14.5492 13.2276 14.6593L11.0184 15.5743C10.7753 15.675 10.594 15.8846 10.5294 16.1398L10.1853 17.5H9.81638L9.47279 16.1393C9.40815 15.8833 9.22602 15.6731 8.98184 15.5727L6.81017 14.6793C6.52739 14.563 6.20361 14.6109 5.96661 14.8041L5.0576 15.5451L4.47975 14.9673L5.21927 14.138C5.43336 13.8979 5.49016 13.556 5.36521 13.2596L4.43604 11.0555C4.33663 10.8196 4.13437 10.6426 3.88747 10.5752L2.50065 10.1969V9.82787L3.83427 9.51652C4.09773 9.45501 4.31494 9.26944 4.41681 9.0188L5.31681 6.80464C5.43128 6.52303 5.38332 6.20143 5.19168 5.96547L4.45458 5.05792L5.03405 4.47845L5.86674 5.21928C6.1068 5.43285 6.44827 5.48938 6.74436 5.36457L8.94852 4.4354C9.18676 4.33497 9.36489 4.12966 9.4307 3.87964L9.79385 2.50001H10.1372L10.493 3.85354C10.5594 4.10618 10.7405 4.31307 10.9821 4.41241L13.2379 5.33991C13.5271 5.45882 13.8586 5.40581 14.0963 5.20264L14.9563 4.46751L15.5361 5.04735L14.8017 5.91622C14.6005 6.15432 14.5489 6.48485 14.6682 6.77291L15.5823 8.98125C15.6829 9.22411 15.8921 9.40531 16.1468 9.47012L17.5006 9.81454V10.1705L16.1361 10.5251C15.8831 10.5909 15.6757 10.7714 15.5757 11.0129L14.6607 13.2229C14.5412 13.5114 14.5931 13.8425 14.7951 14.0806L15.5353 14.9535Z"
                        fill="#757575"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_386_6054">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="SideBarText">Setting</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`icon-chevron ${
                      isSettingDropdownOpen ? "active" : ""
                    }`}
                  >
                    <path
                      d="M11.5289 10.4715C11.7893 10.7318 12.2114 10.7318 12.4717 10.4715C12.7321 10.2111 12.7321 9.78903 12.4717 9.52868L8.47173 5.52868C8.21138 5.26833 7.78927 5.26833 7.52892 5.52868L3.52892 9.52868C3.26857 9.78903 3.26857 10.2111 3.52892 10.4715C3.78927 10.7318 4.21138 10.7318 4.47173 10.4715L8.00033 6.94289L11.5289 10.4715Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
              {isSettingDropdownOpen && (
                <div className="SubSection">
                  {/* Dropdown items */}
                  <div className="Subs">
                    <div className="SubText">Edit Password</div>
                    <div className="Arrow" />
                  </div>
                  <div className="Subs">
                    <p className="SubText">Edit Email</p>
                    <div className="Arrow" />
                  </div>
                  <div className="lineSub" />
                </div>
              )}
            </li>
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_386_6069)">
                    <path
                      d="M8.33398 7.50001C8.33398 7.01087 8.51643 6.69804 8.75595 6.49481C9.01358 6.27621 9.38679 6.14584 9.79232 6.14584C10.1979 6.14584 10.5711 6.27621 10.8287 6.49481C11.0682 6.69804 11.2507 7.01087 11.2507 7.50001C11.2507 7.86432 11.1648 8.06657 11.0651 8.21615C10.9487 8.39066 10.7957 8.52827 10.5368 8.76099L10.4848 8.80768C10.2185 9.04738 9.86812 9.37142 9.60096 9.84342C9.32563 10.3298 9.16732 10.9176 9.16732 11.6667C9.16732 12.1269 9.54041 12.5 10.0007 12.5C10.4609 12.5 10.834 12.1269 10.834 11.6667C10.834 11.1658 10.9361 10.8681 11.0514 10.6644C11.1748 10.4463 11.3453 10.2756 11.5998 10.0465C11.6227 10.0259 11.6469 10.0044 11.672 9.98191C11.8998 9.77892 12.2117 9.50088 12.4518 9.14065C12.7427 8.70429 12.9173 8.17737 12.9173 7.50001C12.9173 6.53082 12.5268 5.7499 11.907 5.22396C11.3052 4.71339 10.5326 4.47918 9.79232 4.47918C9.05202 4.47918 8.27939 4.71339 7.67765 5.22396C7.05779 5.7499 6.66732 6.53082 6.66732 7.50001C6.66732 7.96025 7.04041 8.33334 7.50065 8.33334C7.96089 8.33334 8.33398 7.96025 8.33398 7.50001Z"
                      fill="#757575"
                      stroke={` ${
                        selectedText === "Any Questions?" ? "#008000" : ""
                      }`}
                    />
                    <path
                      d="M10.6256 15.5598C10.9352 15.2192 10.9101 14.6922 10.5696 14.3826C10.229 14.073 9.70198 14.0981 9.39238 14.4386L9.38405 14.4478C9.07445 14.7883 9.09953 15.3153 9.44007 15.6249C9.78061 15.9345 10.3077 15.9095 10.6173 15.5689L10.6256 15.5598Z"
                      fill="#757575"
                      stroke={` ${
                        selectedText === "Any Questions?" ? "#008000" : ""
                      }`}
                    />
                    <path
                      fill-rule="evenodd"
                      stroke={` ${
                        selectedText === "Any Questions?" ? "#008000" : ""
                      }`}
                      clip-rule="evenodd"
                      d="M10.0007 0.833344C4.93791 0.833344 0.833984 4.93727 0.833984 10C0.833984 15.0627 4.93791 19.1667 10.0007 19.1667C15.0634 19.1667 19.1673 15.0627 19.1673 10C19.1673 4.93727 15.0634 0.833344 10.0007 0.833344ZM2.50065 10C2.50065 5.85775 5.85839 2.50001 10.0007 2.50001C14.1429 2.50001 17.5007 5.85775 17.5007 10C17.5007 14.1423 14.1429 17.5 10.0007 17.5C5.85839 17.5 2.50065 14.1423 2.50065 10Z"
                      fill="#757575"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_386_6069">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div
                  className={`SideBarText ${
                    selectedText === "Any Questions?" ? "active" : ""
                  }`}
                  onClick={() => handleTextClick("Any Questions?")}
                >
                  Any Questions?
                </div>
              </a>
            </li>
          </ul>
          <div className="SideBarSettingButton">
            <button className={`${
                  isDarkMode
                    ? "SideBarSettingLogoutDark"
                    : "SideBarSettingLogout"
                }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect width="20" height="20" fill="none" />
                <path
                  d="M5.83398 1.66666C5.17094 1.66666 4.53506 1.93005 4.06622 2.39889C3.59738 2.86773 3.33398 3.50362 3.33398 4.16666V15.8333C3.33398 16.4964 3.59738 17.1322 4.06622 17.6011C4.53506 18.0699 5.17094 18.3333 5.83398 18.3333H14.1673C14.8304 18.3333 15.4662 18.0699 15.9351 17.6011C16.4039 17.1322 16.6673 16.4964 16.6673 15.8333V15C16.6673 14.5398 16.2942 14.1667 15.834 14.1667C15.3737 14.1667 15.0007 14.5398 15.0007 15V15.8333C15.0007 16.0543 14.9129 16.2663 14.7566 16.4226C14.6003 16.5789 14.3883 16.6667 14.1673 16.6667H5.83398C5.61297 16.6667 5.40101 16.5789 5.24473 16.4226C5.08845 16.2663 5.00065 16.0543 5.00065 15.8333V4.16666C5.00065 3.94564 5.08845 3.73368 5.24473 3.5774C5.40101 3.42112 5.61297 3.33332 5.83398 3.33332H14.1673C14.3883 3.33332 14.6003 3.42112 14.7566 3.5774C14.9129 3.73368 15.0007 3.94564 15.0007 4.16666V4.99999C15.0007 5.46023 15.3737 5.83332 15.834 5.83332C16.2942 5.83332 16.6673 5.46023 16.6673 4.99999V4.16666C16.6673 3.50361 16.4039 2.86773 15.9351 2.39889C15.4662 1.93005 14.8304 1.66666 14.1673 1.66666H5.83398Z"
                  fill="#EB5757"
                />
                <path
                  d="M13.9232 6.91073C13.5978 6.5853 13.0702 6.5853 12.7447 6.91073C12.4193 7.23617 12.4193 7.76381 12.7447 8.08925L13.8221 9.16666H10.0007C9.54041 9.16666 9.16732 9.53975 9.16732 9.99999C9.16732 10.4602 9.54041 10.8333 10.0007 10.8333H13.8221L12.7447 11.9107C12.4193 12.2362 12.4193 12.7638 12.7447 13.0892C13.0702 13.4147 13.5978 13.4147 13.9232 13.0892L16.4232 10.5892C16.7487 10.2638 16.7487 9.73617 16.4232 9.41073L13.9232 6.91073Z"
                  fill="#EB5757"
                />
              </svg>
              <span className="SideBarSettingLogoutText">Logout Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
