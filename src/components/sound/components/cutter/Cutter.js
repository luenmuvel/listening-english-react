import React from "react";

const Cutter = ({ markStart, markEnd, listenTrack, saveTrack }) => {
  return (
    <>
      <button onClick={markStart} className="btn btn-secondary">
        <i className="bi bi-align-start"></i>
      </button>
      &nbsp;
      <button onClick={markEnd} className="btn btn-secondary">
        <i className="bi bi-align-end"></i>
      </button>
      &nbsp;
      <button onClick={listenTrack} className="btn btn-secondary">
        <i className="bi bi-megaphone"></i>
      </button>
      &nbsp;
      <button onClick={saveTrack} className="btn btn-dark">
        <i className="bi bi-scissors"></i> Guardar
      </button>
    </>
  );
};

export default Cutter;
