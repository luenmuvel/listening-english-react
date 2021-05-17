import React from "react";

const Time = ({ currentTime, totalTime }) => {
  return (
    <>
      <p>
        <span>{currentTime}</span> - <span>{totalTime}</span>
      </p>
    </>
  );
};

export default Time;
