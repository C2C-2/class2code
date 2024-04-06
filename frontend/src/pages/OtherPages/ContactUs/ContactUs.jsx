import { useEffect, useState } from "react";
import "./ContactUs.css";
import NewNavBar from "../../../components/NewNavBar/NewNavBar";
function ContactUs() {
  const [receivedData, setReceivedData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(receivedData === "dark");
  }, [receivedData]);
  const receiveDataFromChild = (data) => {
    setReceivedData(data);
  };
  useEffect(() => {
    document.getElementById("man").style.backgroundColor =
      receivedData === "light" ? "#fff" : "#000";
  }, [receivedData]);
  return (
    <div className="ContactUsAll" id="man">
      <NewNavBar sendDataToParent={receiveDataFromChild} />
      <div className="ContactUsCenter">
        <span>
          <span
            className={`${
              isDarkMode ? "ContactUsCenterText1Dark" : "ContactUsCenterText1"
            }`}
          >
            Contact{" "}
          </span>
          <span className="ContactUsCenterText2">Us</span>
        </span>
        <span className="ContactUsCenterText3">
          Any question or remarks? Just write us a message!
        </span>
      </div>
    </div>
  );
}

export default ContactUs;
