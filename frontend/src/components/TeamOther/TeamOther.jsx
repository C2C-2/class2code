import React from 'react';
import "./TeamOther.css";

function TeamOther({ team }) {
  return (
    <div className='TeamAllCard'>
        <h6>Name: {team?.TeamName}</h6>
        <p>Role: {team?.TeamRole}</p>
    </div>
  );
}

export default TeamOther;
