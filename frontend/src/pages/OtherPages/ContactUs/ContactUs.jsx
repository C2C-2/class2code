import React from "react";
import "./ContactUs.css";
import NavBar from "../../../components/NavBar/NavBar";
function ContactUs() {
  return (
    <div className="ContactUsAll">
      <NavBar />
      <div className="ContactUsCenter">
        <span>
          <span className="ContactUsCenterText1">Contact </span>
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
