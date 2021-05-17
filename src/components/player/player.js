import React from "react";

const Player = ({ sound }) => {
  return (
    <>
      <audio controls autoPlay>
        <source src={sound} type="audio/mpeg"></source>
      </audio>
    </>
  );
};

export default Player;
