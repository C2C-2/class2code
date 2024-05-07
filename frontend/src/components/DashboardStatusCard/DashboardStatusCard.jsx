import React from "react";
import "./DashboardStatusCard.css";
function DashboardStatusCard({status, color}) {
  return (
    <div className="DashboardStatusCardAll">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="9"
        viewBox="0 0 8 9"
        fill="none"
      >
        <ellipse cx="4" cy="4.5" rx="4" ry="4" fill={color} />
      </svg>
      <span className="DashboardStatusCardText">{status}</span>
    </div>
  );
}

export default DashboardStatusCard;
