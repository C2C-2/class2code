import React from 'react';
import "./TeamOther.css";

function TeamOther({ team }) {
  console.log(team);
  return (
    <button className='TeamAllCard'>
        <span className='TACard'>{team.TeamName}</span>
    </button>
  );
}

export default TeamOther;
